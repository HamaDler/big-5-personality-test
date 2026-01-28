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
  Leaf,
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

  const getTraitLightColor = (trait: BigFiveTrait): string => {
    const colors: Record<BigFiveTrait, string> = {
      openness: 'bg-openness-light',
      conscientiousness: 'bg-conscientiousness-light',
      extraversion: 'bg-extraversion-light',
      agreeableness: 'bg-agreeableness-light',
      neuroticism: 'bg-neuroticism-light',
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
          <div className="flex items-center gap-2 px-4 py-2 bg-sage-600 text-white rounded-xl shadow-soft">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Progress saved!</span>
          </div>
        </div>
      )}

      {/* Progress Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-sage-100 sticky top-16 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Step indicators */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-sage-500" />
              <span className="text-sm font-medium text-warm-600">
                Step {currentStep + 1} of {TOTAL_STEPS}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-warm-500">
                {progress.answered} of {progress.total} questions (
                {progress.percent}%)
              </span>
            </div>
          </div>

          {/* Step navigation dots - mobile optimized */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-4 overflow-x-auto py-3">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => {
              const status = getStepStatus(i);
              return (
                <button
                  key={i}
                  onClick={() => handleGoToStep(i)}
                  className={`
                    relative w-7 h-7 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs font-medium
                    transition-all duration-300
                    ${
                      status.isCurrent
                        ? 'bg-sage-600 text-white ring-2 ring-sage-300 ring-offset-2'
                        : status.isComplete
                          ? 'bg-sage-500 text-white'
                          : status.answered > 0
                            ? 'bg-sage-100 text-sage-700 border-2 border-sage-300'
                            : 'bg-warm-100 text-warm-500 hover:bg-sage-100'
                    }
                  `}
                  title={`Step ${i + 1}: ${status.answered}/${status.total} answered`}
                >
                  {status.isComplete && !status.isCurrent ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    i + 1
                  )}
                </button>
              );
            })}
          </div>

          {/* Overall progress bar */}
          <div className="h-2 bg-sage-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-sage-500 transition-all duration-500 ease-out"
              style={{ width: `${progress.percent}%` }}
            />
          </div>

          {/* Current step progress */}
          <div className="flex items-center justify-between mt-2 text-xs text-warm-500">
            <span>
              This step: {currentStepAnsweredCount}/{QUESTIONS_PER_STEP}{' '}
              answered
            </span>
            {stepSaved.has(currentStep) && (
              <span className="flex items-center gap-1 text-sage-600">
                <Check className="w-3 h-3" />
                Saved
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Questions Grid */}
      <div className="flex-1 py-6 sm:py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentStepQuestions.map((question, index) => {
              const globalIndex = currentStep * QUESTIONS_PER_STEP + index;
              const currentResponse = getResponseForQuestion(question.id);

              return (
                <div
                  key={question.id}
                  className={`
                    card-zen border-l-4 transition-all duration-300
                    ${
                      currentResponse
                        ? `${getTraitBorderColor(question.trait)} ${getTraitLightColor(question.trait)} bg-opacity-30`
                        : 'border-sage-200'
                    }
                  `}
                >
                  {/* Question header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-warm-400">
                      Q{globalIndex + 1}
                    </span>
                    <span
                      className={`
                        inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium
                        ${getTraitLightColor(question.trait)} text-warm-700
                      `}
                    >
                      {TRAIT_SHORT_LABELS[question.trait]}
                    </span>
                  </div>

                  {/* Question text */}
                  <p className="text-warm-700 font-medium mb-4 min-h-[3rem] leading-relaxed">
                    "{question.text}"
                  </p>

                  {/* Likert scale options - mobile optimized */}
                  <div className="flex items-center justify-between gap-1 sm:gap-2">
                    {LIKERT_SCALE.map(({ value, shortLabel }) => {
                      const isSelected = currentResponse === value;
                      return (
                        <button
                          key={value}
                          onClick={() => handleAnswer(question.id, value)}
                          className={`
                            flex-1 py-2.5 sm:py-2 px-1 rounded-xl text-xs sm:text-sm font-medium 
                            transition-all duration-300
                            ${
                              isSelected
                                ? 'bg-sage-600 text-white shadow-soft'
                                : 'bg-sage-50 text-warm-600 hover:bg-sage-100'
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
                  <div className="flex justify-between mt-2 text-[10px] sm:text-xs text-warm-400">
                    <span>Inaccurate</span>
                    <span>Accurate</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 bg-white rounded-2xl p-4 shadow-soft border border-sage-100">
            <button
              onClick={handlePreviousStep}
              disabled={isFirstStep}
              className={`
                w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300
                ${
                  isFirstStep
                    ? 'text-warm-300 cursor-not-allowed'
                    : 'text-warm-600 hover:text-sage-700 hover:bg-sage-50'
                }
              `}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Back</span>
            </button>

            <button
              onClick={handleSaveStep}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-warm-500 hover:text-sage-700 hover:bg-sage-50 transition-all duration-300"
            >
              <Save className="w-4 h-4" />
              Save
            </button>

            {isLastStep ? (
              <button
                onClick={handleSubmit}
                disabled={!isCurrentStepComplete && !canSubmit()}
                className={`
                  w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all duration-300
                  ${
                    canSubmit()
                      ? 'bg-sage-600 text-white hover:bg-sage-700 shadow-soft'
                      : 'bg-warm-100 text-warm-500 hover:bg-warm-200'
                  }
                `}
              >
                Complete Assessment
                <Check className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleNextStep}
                className={`
                  w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300
                  ${
                    isCurrentStepComplete
                      ? 'bg-sage-600 text-white hover:bg-sage-700 shadow-soft'
                      : 'text-warm-600 hover:text-sage-700 hover:bg-sage-50'
                  }
                `}
              >
                <span className="hidden sm:inline">Next Step</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Exit button */}
          <div className="text-center mt-6">
            <button
              onClick={() => setShowExitConfirm(true)}
              className="text-sm text-warm-500 hover:text-sage-600 transition-colors"
            >
              Save & Exit
            </button>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 bg-warm-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-fadeIn shadow-soft-lg">
            <div className="flex items-center gap-3 text-extraversion mb-4">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-lg font-serif font-semibold text-warm-800">
                Almost There
              </h3>
            </div>
            <p className="text-warm-600 mb-4">
              You have {unansweredQuestions.length} unanswered question
              {unansweredQuestions.length !== 1 ? 's' : ''}. Please complete all
              questions before finishing.
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
                        className="px-3 py-1.5 bg-sage-100 text-sage-700 rounded-lg text-sm hover:bg-sage-200 transition-colors"
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
              className="w-full py-2.5 bg-sage-600 text-white rounded-xl font-medium hover:bg-sage-700 transition-colors"
            >
              Continue Assessment
            </button>
          </div>
        </div>
      )}

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-warm-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-fadeIn shadow-soft-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-serif font-semibold text-warm-800">
                Save Progress?
              </h3>
              <button
                onClick={() => setShowExitConfirm(false)}
                className="p-1.5 hover:bg-sage-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-warm-500" />
              </button>
            </div>
            <p className="text-warm-600 mb-6">
              Your progress ({progress.answered} of {progress.total} questions)
              has been saved. You can continue your journey anytime.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 py-2.5 bg-sage-50 text-sage-700 rounded-xl font-medium hover:bg-sage-100 transition-colors"
              >
                Continue
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex-1 py-2.5 bg-sage-600 text-white rounded-xl font-medium hover:bg-sage-700 transition-colors"
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
