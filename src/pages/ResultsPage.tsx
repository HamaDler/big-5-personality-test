import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTest, loadResults } from '../context/TestContext';
import {
  TestResults,
  BigFiveTrait,
  TRAIT_LABELS,
  TRAIT_SHORT_LABELS,
} from '../types';
import {
  generateInterpretationReport,
  getScoreRangeLabel,
  detailedTraitInterpretations,
} from '../lib/interpretations';
import { getAllTraitInsights } from '../lib/insights';
import TraitChart from '../components/TraitChart';
import FacetBreakdown from '../components/FacetBreakdown';
import PDFReport from '../components/PDFReport';
import {
  Download,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Info,
  Lightbulb,
  Briefcase,
  Heart,
  TrendingUp,
  Star,
  Leaf,
  Sparkles,
} from 'lucide-react';

export default function ResultsPage() {
  const navigate = useNavigate();
  const { state, resetTest } = useTest();
  const [results, setResults] = useState<TestResults | null>(null);
  const [expandedTraits, setExpandedTraits] = useState<Set<BigFiveTrait>>(
    new Set(),
  );
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [fullName, setFullName] = useState('');

  // Load results from state or storage
  useEffect(() => {
    if (state.results) {
      setResults(state.results);
    } else {
      const savedResults = loadResults();
      if (savedResults) {
        setResults(savedResults);
      }
    }
  }, [state.results]);

  if (!results) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 bg-sage-100 rounded-2xl flex items-center justify-center mb-4">
          <Leaf className="w-8 h-8 text-sage-400" />
        </div>
        <h2 className="text-xl font-serif font-semibold text-warm-800 mb-2">
          No Results Found
        </h2>
        <p className="text-warm-500 mb-6 text-center max-w-sm">
          You haven't completed the assessment yet, or your results have been
          cleared.
        </p>
        <button onClick={() => navigate('/test')} className="btn-zen">
          Take the Assessment
        </button>
      </div>
    );
  }

  const interpretationReport = generateInterpretationReport(results.traits);

  // Generate personality insights
  const traitInsights = getAllTraitInsights(
    results.traits.map((t) => ({
      trait: t.trait,
      percentScore: t.percentScore,
    })),
  );

  const toggleTrait = (trait: BigFiveTrait) => {
    setExpandedTraits((prev) => {
      const next = new Set(prev);
      if (next.has(trait)) {
        next.delete(trait);
      } else {
        next.add(trait);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedTraits(new Set(results.traits.map((t) => t.trait)));
  };

  const collapseAll = () => {
    setExpandedTraits(new Set());
  };

  const handleRetake = () => {
    resetTest();
    navigate('/test');
  };

  const getTraitColorClasses = (trait: BigFiveTrait) => {
    const colors: Record<
      BigFiveTrait,
      { bg: string; text: string; border: string; light: string }
    > = {
      openness: {
        bg: 'bg-openness',
        text: 'text-openness',
        border: 'border-openness',
        light: 'bg-openness-light',
      },
      conscientiousness: {
        bg: 'bg-conscientiousness',
        text: 'text-conscientiousness',
        border: 'border-conscientiousness',
        light: 'bg-conscientiousness-light',
      },
      extraversion: {
        bg: 'bg-extraversion',
        text: 'text-extraversion',
        border: 'border-extraversion',
        light: 'bg-extraversion-light',
      },
      agreeableness: {
        bg: 'bg-agreeableness',
        text: 'text-agreeableness',
        border: 'border-agreeableness',
        light: 'bg-agreeableness-light',
      },
      neuroticism: {
        bg: 'bg-neuroticism',
        text: 'text-neuroticism',
        border: 'border-neuroticism',
        light: 'bg-neuroticism-light',
      },
    };
    return colors[trait];
  };

  const completedDate = new Date(results.completedAt).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  );

  return (
    <div className="animate-fadeIn pb-16">
      {/* Header */}
      <section className="bg-white/80 backdrop-blur-md border-b border-sage-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-sage-500" />
                <span className="text-sage-600 text-sm font-medium">
                  Your Journey Results
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-warm-800">
                Your Personality Profile
              </h1>
              <p className="text-warm-500 mt-1">Completed on {completedDate}</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleRetake}
                className="flex-1 sm:flex-none btn-zen-outline flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Retake
              </button>
              <button
                onClick={() => setShowNameModal(true)}
                className="flex-1 sm:flex-none btn-zen flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Banner */}
      <section className="bg-sage-50 border-b border-sage-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-start gap-3">
            <Leaf className="w-5 h-5 text-sage-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-sage-700">
              <strong>A gentle reminder:</strong> These results reflect
              tendencies and patterns, not fixed traits. Personality can be
              influenced by context and may change over time. This is not a
              clinical assessment—it's a tool for self-reflection.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Chart */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-serif font-semibold text-warm-800 mb-6 text-center">
            Big Five Overview
          </h2>
          <div className="card-zen">
            <TraitChart traits={results.traits} />
          </div>
        </div>
      </section>

      {/* Detailed Results */}
      <section className="py-12 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-serif font-semibold text-warm-800">
              Detailed Breakdown
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={expandAll}
                className="text-sm text-warm-500 hover:text-sage-600 transition-colors"
              >
                Expand All
              </button>
              <span className="text-sage-300">|</span>
              <button
                onClick={collapseAll}
                className="text-sm text-warm-500 hover:text-sage-600 transition-colors"
              >
                Collapse All
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {interpretationReport.map((report) => {
              const colors = getTraitColorClasses(report.trait);
              const isExpanded = expandedTraits.has(report.trait);

              return (
                <div
                  key={report.trait}
                  className={`bg-white rounded-2xl border-l-4 ${colors.border} overflow-hidden transition-all shadow-soft`}
                >
                  {/* Trait Header */}
                  <button
                    onClick={() => toggleTrait(report.trait)}
                    className="w-full p-6 text-left hover:bg-sage-50/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl ${colors.light} flex items-center justify-center`}
                        >
                          <span className={`font-bold text-lg ${colors.text}`}>
                            {TRAIT_SHORT_LABELS[report.trait].charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-warm-800">
                            {TRAIT_LABELS[report.trait]}
                          </h3>
                          <p className="text-sm text-warm-500">
                            {getScoreRangeLabel(report.range)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-2xl font-bold text-warm-800">
                            {report.score}%
                          </span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-warm-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-warm-400" />
                        )}
                      </div>
                    </div>

                    {/* Score Bar */}
                    <div className="mt-4">
                      <div className="h-2 bg-sage-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${colors.bg} transition-all duration-500`}
                          style={{ width: `${report.score}%` }}
                        />
                      </div>
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="px-6 pb-6 animate-fadeIn">
                      {/* Trait Interpretation */}
                      <div className={`${colors.light} rounded-xl p-4 mb-6`}>
                        <p className="text-warm-700 leading-relaxed">
                          {report.traitInterpretation}
                        </p>
                      </div>

                      {/* Facet Breakdown */}
                      <h4 className="text-sm font-semibold text-warm-700 uppercase tracking-wide mb-4">
                        Facets
                      </h4>
                      <FacetBreakdown
                        facets={report.facets}
                        traitColor={colors.bg}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comprehensive Trait Descriptions */}
      <section className="py-12 bg-gradient-to-b from-white to-sage-50/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-serif font-semibold text-warm-800 mb-3">
              Deep Dive: Understanding Your Traits
            </h2>
            <p className="text-warm-600 max-w-3xl mx-auto">
              Each personality trait is complex, with both high and low
              expressions having strengths and challenges. These comprehensive
              descriptions explore what your scores mean across different life
              domains.
            </p>
          </div>

          <div className="space-y-8">
            {results.traits.map((traitScore) => {
              const colors = getTraitColorClasses(traitScore.trait);
              const detailedInfo =
                detailedTraitInterpretations[traitScore.trait];

              return (
                <div
                  key={traitScore.trait}
                  className="bg-white rounded-3xl shadow-soft overflow-hidden border border-sage-100"
                >
                  {/* Header */}
                  <div
                    className={`${colors.light} px-6 sm:px-8 py-6 border-b border-sage-100`}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center shadow-sm`}
                        >
                          <span className="font-bold text-xl text-white">
                            {TRAIT_SHORT_LABELS[traitScore.trait].charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-serif font-semibold text-warm-800">
                            {TRAIT_LABELS[traitScore.trait]}
                          </h3>
                          <p className="text-sm text-warm-600 mt-1">
                            Aspects: {detailedInfo.aspects.join(' • ')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-bold text-warm-800">
                          {traitScore.percentScore}%
                        </div>
                        <div className="text-sm text-warm-500 mt-1">
                          {getScoreRangeLabel(
                            traitScore.percentScore <= 35
                              ? 'low'
                              : traitScore.percentScore >= 66
                                ? 'high'
                                : 'moderate',
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Description */}
                  <div className="px-6 sm:px-8 py-8">
                    <div className="prose prose-sm sm:prose max-w-none">
                      {detailedInfo.fullDescription
                        .split('\n\n')
                        .map((paragraph, idx) => {
                          // Check if this is a heading (starts with **)
                          if (paragraph.trim().startsWith('**')) {
                            const headingText = paragraph
                              .replace(/\*\*/g, '')
                              .trim();
                            return (
                              <h4
                                key={idx}
                                className="text-lg font-semibold text-warm-800 mt-8 mb-4 first:mt-0"
                              >
                                {headingText}
                              </h4>
                            );
                          }
                          // Regular paragraph
                          return (
                            <p
                              key={idx}
                              className="text-warm-700 leading-relaxed mb-4"
                            >
                              {paragraph}
                            </p>
                          );
                        })}
                    </div>
                  </div>

                  {/* Score Indicator */}
                  <div
                    className={`${colors.light} px-6 sm:px-8 py-4 border-t border-sage-100`}
                  >
                    <div className="flex items-center justify-between text-xs text-warm-600 mb-2">
                      <span>Lower Expression</span>
                      <span>Your Score: {traitScore.percentScore}%</span>
                      <span>Higher Expression</span>
                    </div>
                    <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">
                      <div
                        className={`h-full ${colors.bg} transition-all duration-500 rounded-full`}
                        style={{ width: `${traitScore.percentScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Insights by Trait */}
      <section className="py-12 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-sage-200 rounded-xl flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-sage-700" />
            </div>
            <h2 className="text-xl font-serif font-semibold text-warm-800">
              Insights & Interesting Facts
            </h2>
          </div>

          <div className="space-y-6">
            {traitInsights.map((insight) => {
              const colors = getTraitColorClasses(insight.trait);
              return (
                <div
                  key={insight.trait}
                  className="card-zen border-l-4 border-sage-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-8 h-8 rounded-xl ${colors.light} flex items-center justify-center`}
                    >
                      <span className={`font-bold text-sm ${colors.text}`}>
                        {TRAIT_LABELS[insight.trait].charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-warm-800">
                      {TRAIT_LABELS[insight.trait]}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-medium ${colors.light} ${colors.text}`}
                    >
                      {insight.score}%
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Interesting Facts */}
                    <div className="bg-sage-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="w-4 h-4 text-extraversion" />
                        <h4 className="font-medium text-warm-700 text-sm">
                          Did You Know?
                        </h4>
                      </div>
                      <ul className="text-sm text-warm-600 space-y-2">
                        {insight.interestingFacts.slice(0, 2).map((fact, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-extraversion mt-1 flex-shrink-0">
                              ✦
                            </span>
                            <span>{fact}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Career Environments */}
                    <div className="bg-sage-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Briefcase className="w-4 h-4 text-agreeableness" />
                        <h4 className="font-medium text-warm-700 text-sm">
                          Suitable Environments
                        </h4>
                      </div>
                      <ul className="text-sm text-warm-600 space-y-1">
                        {insight.careerEnvironments
                          .slice(0, 3)
                          .map((env, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-agreeableness mt-1 flex-shrink-0">
                                →
                              </span>
                              <span>{env}</span>
                            </li>
                          ))}
                      </ul>
                    </div>

                    {/* Relationship Insights */}
                    <div className="bg-sage-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Heart className="w-4 h-4 text-neuroticism" />
                        <h4 className="font-medium text-warm-700 text-sm">
                          Relationships
                        </h4>
                      </div>
                      <p className="text-sm text-warm-600">
                        {insight.relationshipInsight}
                      </p>
                    </div>

                    {/* Growth Tips */}
                    <div className="bg-sage-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-4 h-4 text-conscientiousness" />
                        <h4 className="font-medium text-warm-700 text-sm">
                          Growth Tips
                        </h4>
                      </div>
                      <ul className="text-sm text-warm-600 space-y-1">
                        {insight.growthTips.slice(0, 2).map((tip, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-conscientiousness mt-1 flex-shrink-0">
                              ✓
                            </span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Strengths */}
                    <div className="bg-sage-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Star className="w-4 h-4 text-sage-600" />
                        <h4 className="font-medium text-warm-700 text-sm">
                          Your Strengths
                        </h4>
                      </div>
                      <ul className="text-sm text-warm-600 space-y-1">
                        {insight.strengths.slice(0, 3).map((strength, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-sage-500 mt-1 flex-shrink-0">
                              +
                            </span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Challenges */}
                    <div className="bg-sage-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Info className="w-4 h-4 text-openness" />
                        <h4 className="font-medium text-warm-700 text-sm">
                          Watch Out For
                        </h4>
                      </div>
                      <ul className="text-sm text-warm-600 space-y-1">
                        {insight.challenges.slice(0, 2).map((challenge, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-openness mt-1 flex-shrink-0">
                              !
                            </span>
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Famous Figures */}
                  {insight.famousFigures.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-sage-100">
                      <p className="text-sm text-warm-500">
                        <span className="font-medium">
                          Notable figures with similar traits:{' '}
                        </span>
                        {insight.famousFigures.join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Understanding Your Results */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-serif font-semibold text-warm-800 mb-6">
            Understanding Your Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="card-zen">
              <h3 className="font-semibold text-warm-700 mb-2">
                Lower Range (0-35%)
              </h3>
              <p className="text-sm text-warm-500">
                Scores in this range suggest you may express this trait less
                frequently or intensely than many others. This is neither good
                nor bad—it simply reflects your natural tendencies.
              </p>
            </div>
            <div className="card-zen">
              <h3 className="font-semibold text-warm-700 mb-2">
                Moderate Range (36-65%)
              </h3>
              <p className="text-sm text-warm-500">
                Scores in this range indicate a balanced expression of this
                trait. You likely adapt your behavior based on context and can
                draw on different aspects as needed.
              </p>
            </div>
            <div className="card-zen">
              <h3 className="font-semibold text-warm-700 mb-2">
                Higher Range (66-100%)
              </h3>
              <p className="text-sm text-warm-500">
                Scores in this range suggest you may express this trait more
                frequently or intensely than many others. This can be a strength
                in many contexts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PDF Preview Modal */}
      {showNameModal && (
        <div className="fixed inset-0 bg-warm-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-soft-xl max-w-md w-full p-8">
            <h2 className="text-2xl font-serif font-semibold text-warm-800 mb-2">
              Export Your Results
            </h2>
            <p className="text-warm-500 mb-6">
              Please enter your full name to include in the PDF report.
            </p>
            <input
              type="text"
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && fullName.trim()) {
                  setShowNameModal(false);
                  setShowPDFPreview(true);
                }
              }}
              className="w-full px-4 py-3 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent mb-6"
              autoFocus
            />
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setShowNameModal(false);
                  setFullName('');
                }}
                className="flex-1 btn-zen-outline"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (fullName.trim()) {
                    setShowNameModal(false);
                    setShowPDFPreview(true);
                  }
                }}
                disabled={!fullName.trim()}
                className="flex-1 btn-zen disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      {showPDFPreview && (
        <PDFReport
          results={results}
          interpretationReport={interpretationReport}
          fullName={fullName}
          onClose={() => {
            setShowPDFPreview(false);
            setFullName('');
          }}
        />
      )}
    </div>
  );
}
