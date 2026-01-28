import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTest } from '../context/TestContext';
import { questions } from '../data/questions';
import { LIKERT_SCALE, LikertValue, TRAIT_SHORT_LABELS, BigFiveTrait } from '../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  AlertCircle,
  X
} from 'lucide-react';

export default function TestPage() {
  const navigate = useNavigate();
  const {
    state,
    startTest,
    answerQuestion,
    goToQuestion,
    submitTest,
    getCurrentQuestion,
    getProgress,
    getResponseForQuestion,
    canSubmit
  } = useTest();

  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Initialize test if no session
  useEffect(() => {
    if (!state.session) {
      startTest();
    }
  }, [state.session, startTest]);

  // Redirect to results if test is complete
  useEffect(() => {
    if (state.results) {
      navigate('/results');
    }
  }, [state.results, navigate]);

  const currentQuestion = getCurrentQuestion();
  const progress = getProgress();
  const currentIndex = state.session?.currentQuestionIndex ?? 0;

  if (!currentQuestion || !state.session) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  const currentResponse = getResponseForQuestion(currentQuestion.id);
  const isLastQuestion = currentIndex === questions.length - 1;
  const isFirstQuestion = currentIndex === 0;

  const handleAnswer = (value: LikertValue) => {
    answerQuestion(currentQuestion.id, value);
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      goToQuestion(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      goToQuestion(currentIndex + 1);
    }
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
      neuroticism: 'bg-neuroticism'
    };
    return colors[trait];
  };

  // Find unanswered questions
  const answeredIds = new Set(state.session.responses.map(r => r.questionId));
  const unansweredQuestions = questions.filter(q => !answeredIds.has(q.id));

  return (
    <div className="min-h-[calc(100vh-12rem)] flex flex-col">
      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {progress.answered} answered ({progress.percent}%)
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-900 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
          {/* Mini progress showing answered */}
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden mt-1">
            <div
              className="h-full bg-conscientiousness transition-all duration-300"
              style={{ width: `${progress.percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="flex-1 flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-2xl">
          {/* Trait Badge */}
          <div className="flex items-center justify-center mb-6">
            <span className={`
              inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white
              ${getTraitColor(currentQuestion.trait)}
            `}>
              {TRAIT_SHORT_LABELS[currentQuestion.trait]}
            </span>
          </div>

          {/* Question Text */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 animate-fadeIn">
            <h2 className="text-xl sm:text-2xl font-medium text-gray-900 text-center leading-relaxed">
              "{currentQuestion.text}"
            </h2>
          </div>

          {/* Likert Scale */}
          <div className="space-y-3">
            {LIKERT_SCALE.map(({ value, label }) => {
              const isSelected = currentResponse === value;
              return (
                <button
                  key={value}
                  onClick={() => handleAnswer(value)}
                  className={`
                    w-full p-4 rounded-xl border-2 transition-all duration-200
                    flex items-center justify-between
                    ${isSelected
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 bg-white hover:border-gray-400 text-gray-700'
                    }
                  `}
                >
                  <span className="font-medium">{label}</span>
                  <span className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center
                    ${isSelected ? 'border-white bg-white' : 'border-gray-300'}
                  `}>
                    {isSelected && <Check className="w-4 h-4 text-gray-900" />}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={isFirstQuestion}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
                ${isFirstQuestion
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }
              `}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="flex items-center gap-2">
              {/* Quick navigation dots - show nearby questions */}
              {Array.from({ length: Math.min(5, questions.length) }, (_, i) => {
                const dotIndex = Math.max(0, Math.min(currentIndex - 2 + i, questions.length - 1));
                const question = questions[dotIndex];
                const isAnswered = answeredIds.has(question.id);
                const isCurrent = dotIndex === currentIndex;
                
                return (
                  <button
                    key={dotIndex}
                    onClick={() => goToQuestion(dotIndex)}
                    className={`
                      w-2 h-2 rounded-full transition-all
                      ${isCurrent 
                        ? 'w-4 bg-gray-900' 
                        : isAnswered 
                          ? 'bg-conscientiousness' 
                          : 'bg-gray-300'
                      }
                    `}
                    title={`Question ${dotIndex + 1}`}
                  />
                );
              })}
            </div>

            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                className={`
                  flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors
                  ${canSubmit()
                    ? 'bg-conscientiousness text-white hover:bg-conscientiousness-dark'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }
                `}
              >
                Submit
                <Check className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Exit button */}
          <div className="text-center mt-8">
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
              You have {unansweredQuestions.length} unanswered question{unansweredQuestions.length !== 1 ? 's' : ''}. 
              Please answer all questions before submitting.
            </p>
            <div className="max-h-32 overflow-y-auto mb-4">
              <div className="flex flex-wrap gap-2">
                {unansweredQuestions.slice(0, 20).map(q => (
                  <button
                    key={q.id}
                    onClick={() => {
                      goToQuestion(q.id - 1);
                      setShowConfirmSubmit(false);
                    }}
                    className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-sm hover:bg-amber-200 transition-colors"
                  >
                    Q{q.id}
                  </button>
                ))}
                {unansweredQuestions.length > 20 && (
                  <span className="px-2 py-1 text-gray-500 text-sm">
                    +{unansweredQuestions.length - 20} more
                  </span>
                )}
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
              Your progress ({progress.answered} of {progress.total} questions) has been saved. 
              You can continue from where you left off at any time.
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
