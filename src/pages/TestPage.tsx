import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTest } from '../context/TestContext';
import { questions } from '../data/questions';
import {
  LIKERT_SCALE,
  LikertValue,
  TRAIT_SHORT_LABELS,
  BigFiveTrait,
  Question,
} from '../types';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  AlertCircle,
  X,
  Save,
  CheckCircle,
} from 'lucide-react';

const QUESTIONS_PER_STEP = 12;
const TOTAL_STEPS = 10;

export default function TestPage() {
  const navigate = useNavigate();
  const {
    state,
    startTest,
    answerQuestion,
    submitTest,
    getProgress,
    getResponseForQuestion,
    canSubmit,
  } = useTest();

  const [currentStep, setCurrentStep] = useState(0);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [stepSaved, setStepSaved] = useState<Set<number>>(new Set());
  const [saveNotification, setSaveNotification] = useState(false);

  // Get questions for a specific step
  const getQuestionsForStep = (step: number): Question[] => {
    const startIndex = step * QUESTIONS_PER_STEP;
    return questions.slice(startIndex, startIndex + QUESTIONS_PER_STEP);
  };

  // Initialize test if no session
  useEffect(() => {
    if (!state.session) {
      startTest();
    }
  }, [state.session, startTest]);

  // Restore current step from session progress
  useEffect(() => {
    if (state.session && state.session.responses.length > 0) {
      const answeredQuestionIds = new Set(
        state.session.responses.map((r) => r.questionId),
      );

      // Find the first incomplete step
      for (let step = 0; step < TOTAL_STEPS; step++) {
        const stepQuestions = getQuestionsForStep(step);
        const allAnswered = stepQuestions.every((q) =>
          answeredQuestionIds.has(q.id),
        );
        if (!allAnswered) {
          setCurrentStep(step);
          break;
        }
        if (step === TOTAL_STEPS - 1) {
          setCurrentStep(step);
        }
      }

      // Mark completed steps as saved
      const completedSteps = new Set<number>();
      for (let step = 0; step < TOTAL_STEPS; step++) {
        const stepQuestions = getQuestionsForStep(step);
        const allAnswered = stepQuestions.every((q) =>
          answeredQuestionIds.has(q.id),
        );
        if (allAnswered) {
          completedSteps.add(step);
        }
      }
      setStepSaved(completedSteps);
    }
  }, []);

  // Redirect to results if test is complete
  useEffect(() => {
    if (state.results) {
      navigate('/results');
    }
  }, [state.results, navigate]);

  const progress = getProgress();

  // Memoize current step questions
  const currentStepQuestions = useMemo(
    () => getQuestionsForStep(currentStep),
    [currentStep],
  );

  // Check if all questions in current step are answered
  const isCurrentStepComplete = useMemo(() => {
    if (!state.session) return false;
    const answeredIds = new Set(
      state.session.responses.map((r) => r.questionId),
    );
    return currentStepQuestions.every((q) => answeredIds.has(q.id));
  }, [state.session, currentStepQuestions]);

  // Get count of answered questions in current step
  const currentStepAnsweredCount = useMemo(() => {
    if (!state.session) return 0;
    const answeredIds = new Set(
      state.session.responses.map((r) => r.questionId),
    );
    return currentStepQuestions.filter((q) => answeredIds.has(q.id)).length;
  }, [state.session, currentStepQuestions]);

  if (!state.session) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  const isLastStep = currentStep === TOTAL_STEPS - 1;
  const isFirstStep = currentStep === 0;

  const handleAnswer = (questionId: number, value: LikertValue) => {
    answerQuestion(questionId, value);
  };

  const handleSaveStep = () => {
    setStepSaved((prev) => new Set([...prev, currentStep]));
    setSaveNotification(true);
    setTimeout(() => setSaveNotification(false), 2000);
  };

  const handlePreviousStep = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextStep = () => {
    if (!isLastStep) {
      setStepSaved((prev) => new Set([...prev, currentStep]));
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGoToStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    if (canSubmit()) {
      submitTest();
    } else {
      setShowConfirmSubmit(true);
    }
  };

  const getTraitColor = (trait: BigFiveTrait): string => {
    const colors: Record<BigFiveTrait, string> = {
      openness: 'bg-openness',
      conscientiousness: 'bg-conscientiousness',
      extraversion: 'bg-extraversion',
      agreeableness: 'bg-agreeableness',
      neuroticism: 'bg-neuroticism',
    };
    return colors[trait];
  };

  const getTraitBorderColor = (trait: BigFiveTrait): string => {
    const colors: Record<BigFiveTrait, string> = {
      openness: 'border-openness',
      conscientiousness: 'border-conscientiousness',
      extraversion: 'border-extraversion',
      agreeableness: 'border-agreeableness',
      neuroticism: 'border-neuroticism',
    };
    return colors[trait];
  };

  // Find unanswered questions
  const answeredIds = new Set(state.session.responses.map((r) => r.questionId));
  const unansweredQuestions = questions.filter((q) => !answeredIds.has(q.id));

  // Get step completion status
  const getStepStatus = (step: number) => {
    const stepQuestions = getQuestionsForStep(step);
    const answered = stepQuestions.filter((q) => answeredIds.has(q.id)).length;
    return {
      answered,
      total: QUESTIONS_PER_STEP,
      isComplete: answered === QUESTIONS_PER_STEP,
      isCurrent: step === currentStep,
    };
  };

  return (
    <div className="min-h-[calc(100vh-12rem)] flex flex-col">
      {/* Save Notification */}
      {saveNotification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-fadeIn">
          <div className="flex items-center gap-2 px-4 py-2 bg-conscientiousness text-white rounded-lg shadow-lg">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Progress saved!</span>
          </div>
        </div>
      )}

      {/* Progress Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Step indicators */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep + 1} of {TOTAL_STEPS}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {progress.answered} of {progress.total} questions answered (
              {progress.percent}%)
            </span>
          </div>

          {/* Step navigation dots */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => {
              const status = getStepStatus(i);
              return (
                <button
                  key={i}
                  onClick={() => handleGoToStep(i)}
                  className={`
                    relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
                    transition-all duration-200
                    ${
                      status.isCurrent
                        ? 'bg-gray-900 text-white ring-2 ring-gray-900 ring-offset-2'
                        : status.isComplete
                          ? 'bg-conscientiousness text-white'
                          : status.answered > 0
                            ? 'bg-amber-100 text-amber-700 border-2 border-amber-300'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }
                  `}
                  title={`Step ${i + 1}: ${status.answered}/${status.total} answered`}
                >
                  {status.isComplete && !status.isCurrent ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    i + 1
                  )}
                </button>
              );
            })}
          </div>

          {/* Overall progress bar */}
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-conscientiousness transition-all duration-300"
              style={{ width: `${progress.percent}%` }}
            />
          </div>

          {/* Current step progress */}
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>
              This step: {currentStepAnsweredCount}/{QUESTIONS_PER_STEP}{' '}
              answered
            </span>
            {stepSaved.has(currentStep) && (
              <span className="flex items-center gap-1 text-conscientiousness">
                <Check className="w-3 h-3" />
                Saved
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Questions Grid */}
      <div className="flex-1 py-8 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {currentStepQuestions.map((question, index) => {
              const globalIndex = currentStep * QUESTIONS_PER_STEP + index;
              const currentResponse = getResponseForQuestion(question.id);

              return (
                <div
                  key={question.id}
                  className={`
                    bg-white rounded-xl p-6 shadow-sm border-2 transition-all
                    ${currentResponse ? `${getTraitBorderColor(question.trait)} border-opacity-50` : 'border-transparent'}
                  `}
                >
                  {/* Question header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-gray-400">
                      Q{globalIndex + 1}
                    </span>
                    <span
                      className={`
                        inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white
                        ${getTraitColor(question.trait)}
                      `}
                    >
                      {TRAIT_SHORT_LABELS[question.trait]}
                    </span>
                  </div>

                  {/* Question text */}
                  <p className="text-gray-900 font-medium mb-4 min-h-[3rem]">
                    "{question.text}"
                  </p>

                  {/* Likert scale options */}
                  <div className="flex items-center justify-between gap-1">
                    {LIKERT_SCALE.map(({ value, shortLabel }) => {
                      const isSelected = currentResponse === value;
                      return (
                        <button
                          key={value}
                          onClick={() => handleAnswer(question.id, value)}
                          className={`
                            flex-1 py-2 px-1 rounded-lg text-xs font-medium transition-all
                            ${
                              isSelected
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }
                          `}
                          title={shortLabel}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>

                  {/* Scale labels */}
                  <div className="flex justify-between mt-1 text-[10px] text-gray-400">
                    <span>Very Inaccurate</span>
                    <span>Very Accurate</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 bg-white rounded-xl p-4 shadow-sm">
            <button
              onClick={handlePreviousStep}
              disabled={isFirstStep}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
                ${
                  isFirstStep
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }
              `}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous Step
            </button>

            <button
              onClick={handleSaveStep}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <Save className="w-5 h-5" />
              Save Progress
            </button>

            {isLastStep ? (
              <button
                onClick={handleSubmit}
                disabled={!isCurrentStepComplete && !canSubmit()}
                className={`
                  flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors
                  ${
                    canSubmit()
                      ? 'bg-conscientiousness text-white hover:bg-opacity-90'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }
                `}
              >
                Submit Test
                <Check className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleNextStep}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
                  ${
                    isCurrentStepComplete
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }
                `}
              >
                Next Step
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Exit button */}
          <div className="text-center mt-6">
            <button
              onClick={() => setShowExitConfirm(true)}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Save & Exit
            </button>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-fadeIn">
            <div className="flex items-center gap-3 text-amber-600 mb-4">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-lg font-semibold">Incomplete Assessment</h3>
            </div>
            <p className="text-gray-600 mb-4">
              You have {unansweredQuestions.length} unanswered question
              {unansweredQuestions.length !== 1 ? 's' : ''}. Please answer all
              questions before submitting.
            </p>
            <div className="max-h-32 overflow-y-auto mb-4">
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: TOTAL_STEPS }, (_, step) => {
                  const status = getStepStatus(step);
                  if (!status.isComplete) {
                    return (
                      <button
                        key={step}
                        onClick={() => {
                          handleGoToStep(step);
                          setShowConfirmSubmit(false);
                        }}
                        className="px-3 py-1 bg-amber-100 text-amber-700 rounded text-sm hover:bg-amber-200 transition-colors"
                      >
                        Step {step + 1} ({status.answered}/{status.total})
                      </button>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
            <button
              onClick={() => setShowConfirmSubmit(false)}
              className="w-full py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Continue Assessment
            </button>
          </div>
        </div>
      )}

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Save Progress?</h3>
              <button
                onClick={() => setShowExitConfirm(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Your progress ({progress.answered} of {progress.total} questions)
              has been saved. You can continue from where you left off at any
              time.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Continue
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex-1 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
