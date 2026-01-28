/**
 * Test Context Provider
 *
 * Manages the global state for the personality test, including:
 * - Current session
 * - Question responses
 * - Test results
 * - Navigation state
 */

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  TestSession,
  QuestionResponse,
  TestResults,
  LikertValue,
} from '../types';
import { questions } from '../data/questions';
import { calculateAllScores, validateResponses } from '../lib/scoring';
import {
  saveSession,
  loadSession,
  clearSession,
  saveResults,
  loadResults,
} from '../lib/storage';

// ============================================================================
// State Types
// ============================================================================

interface TestState {
  session: TestSession | null;
  results: TestResults | null;
  isLoading: boolean;
  error: string | null;
}

type TestAction =
  | { type: 'START_TEST' }
  | { type: 'RESUME_TEST'; session: TestSession }
  | { type: 'ANSWER_QUESTION'; questionId: number; value: LikertValue }
  | { type: 'GO_TO_QUESTION'; index: number }
  | { type: 'COMPLETE_TEST'; results: TestResults }
  | { type: 'LOAD_RESULTS'; results: TestResults }
  | { type: 'RESET_TEST' }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'CLEAR_ERROR' };

// ============================================================================
// Initial State
// ============================================================================

const initialState: TestState = {
  session: null,
  results: null,
  isLoading: false,
  error: null,
};

// ============================================================================
// Reducer
// ============================================================================

function testReducer(state: TestState, action: TestAction): TestState {
  switch (action.type) {
    case 'START_TEST': {
      const newSession: TestSession = {
        id: uuidv4(),
        startedAt: Date.now(),
        currentQuestionIndex: 0,
        responses: [],
      };
      return {
        ...state,
        session: newSession,
        results: null,
        error: null,
      };
    }

    case 'RESUME_TEST':
      return {
        ...state,
        session: action.session,
        error: null,
      };

    case 'ANSWER_QUESTION': {
      if (!state.session) return state;

      const existingIndex = state.session.responses.findIndex(
        (r) => r.questionId === action.questionId,
      );

      const newResponse: QuestionResponse = {
        questionId: action.questionId,
        value: action.value,
        timestamp: Date.now(),
      };

      const newResponses = [...state.session.responses];
      if (existingIndex >= 0) {
        newResponses[existingIndex] = newResponse;
      } else {
        newResponses.push(newResponse);
      }

      // Auto-advance to next question if not on last question
      const nextIndex =
        state.session.currentQuestionIndex < questions.length - 1
          ? state.session.currentQuestionIndex + 1
          : state.session.currentQuestionIndex;

      return {
        ...state,
        session: {
          ...state.session,
          responses: newResponses,
          currentQuestionIndex: nextIndex,
        },
      };
    }

    case 'GO_TO_QUESTION': {
      if (!state.session) return state;
      return {
        ...state,
        session: {
          ...state.session,
          currentQuestionIndex: Math.max(
            0,
            Math.min(action.index, questions.length - 1),
          ),
        },
      };
    }

    case 'COMPLETE_TEST':
      return {
        ...state,
        session: state.session
          ? {
              ...state.session,
              completedAt: Date.now(),
            }
          : null,
        results: action.results,
      };

    case 'LOAD_RESULTS':
      return {
        ...state,
        results: action.results,
      };

    case 'RESET_TEST':
      return {
        ...initialState,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.error,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

// ============================================================================
// Context
// ============================================================================

interface TestContextValue {
  state: TestState;
  startTest: () => void;
  resumeTest: () => void;
  answerQuestion: (questionId: number, value: LikertValue) => void;
  goToQuestion: (index: number) => void;
  submitTest: () => void;
  resetTest: () => void;
  getCurrentQuestion: () => (typeof questions)[0] | null;
  getProgress: () => { answered: number; total: number; percent: number };
  getResponseForQuestion: (questionId: number) => LikertValue | null;
  canSubmit: () => boolean;
  hasExistingSession: () => boolean;
  hasExistingResults: () => boolean;
}

const TestContext = createContext<TestContextValue | null>(null);

// ============================================================================
// Provider Component
// ============================================================================

interface TestProviderProps {
  children: ReactNode;
}

export function TestProvider({ children }: TestProviderProps) {
  const [state, dispatch] = useReducer(testReducer, initialState);

  // Persist session on changes
  useEffect(() => {
    if (state.session && !state.session.completedAt) {
      saveSession(state.session);
    }
  }, [state.session]);

  // Persist results on completion
  useEffect(() => {
    if (state.results) {
      saveResults(state.results);
    }
  }, [state.results]);

  const startTest = () => {
    clearSession();
    dispatch({ type: 'START_TEST' });
  };

  const resumeTest = () => {
    const savedSession = loadSession();
    if (savedSession) {
      dispatch({ type: 'RESUME_TEST', session: savedSession });
    } else {
      dispatch({ type: 'START_TEST' });
    }
  };

  const answerQuestion = (questionId: number, value: LikertValue) => {
    dispatch({ type: 'ANSWER_QUESTION', questionId, value });
  };

  const goToQuestion = (index: number) => {
    dispatch({ type: 'GO_TO_QUESTION', index });
  };

  const submitTest = () => {
    if (!state.session) return;

    const validation = validateResponses(state.session.responses);
    if (!validation.isValid) {
      dispatch({ type: 'SET_ERROR', error: validation.message });
      return;
    }

    const results = calculateAllScores(
      state.session.responses,
      state.session.id,
    );
    clearSession();
    dispatch({ type: 'COMPLETE_TEST', results });
  };

  const resetTest = () => {
    clearSession();
    dispatch({ type: 'RESET_TEST' });
  };

  const getCurrentQuestion = () => {
    if (!state.session) return null;
    return questions[state.session.currentQuestionIndex] || null;
  };

  const getProgress = () => {
    if (!state.session) {
      return { answered: 0, total: questions.length, percent: 0 };
    }
    const answered = state.session.responses.length;
    return {
      answered,
      total: questions.length,
      percent: Math.round((answered / questions.length) * 100),
    };
  };

  const getResponseForQuestion = (questionId: number): LikertValue | null => {
    if (!state.session) return null;
    const response = state.session.responses.find(
      (r) => r.questionId === questionId,
    );
    return response ? response.value : null;
  };

  const canSubmit = () => {
    if (!state.session) return false;
    return state.session.responses.length === questions.length;
  };

  const hasExistingSession = () => {
    const saved = loadSession();
    return saved !== null && saved.responses.length > 0;
  };

  const hasExistingResults = () => {
    const saved = loadResults();
    return saved !== null;
  };

  const value: TestContextValue = {
    state,
    startTest,
    resumeTest,
    answerQuestion,
    goToQuestion,
    submitTest,
    resetTest,
    getCurrentQuestion,
    getProgress,
    getResponseForQuestion,
    canSubmit,
    hasExistingSession,
    hasExistingResults,
  };

  return <TestContext.Provider value={value}>{children}</TestContext.Provider>;
}

// ============================================================================
// Hook
// ============================================================================

export function useTest() {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
}

export { loadResults };
