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
} from '../lib/interpretations';
import { generateProfileSummary } from '../lib/insights';
import TraitChart from '../components/TraitChart';
import FacetBreakdown from '../components/FacetBreakdown';
import PDFReport from '../components/PDFReport';
import {
  Download,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Info,
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

  // Generate profile summary with personality blends
  const profileSummary = generateProfileSummary(
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
                Download Summary
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

      {/* Personality Blends */}
      {profileSummary.personalityBlends.length > 0 && (
        <section className="py-12 bg-gradient-to-b from-sage-50/50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-100 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-sage-600" />
                <span className="text-sm font-medium text-sage-700">
                  Trait Interactions
                </span>
              </div>
              <h2 className="text-xl font-serif font-semibold text-warm-800 mb-2">
                Your Personality Blends
              </h2>
              <p className="text-warm-500 max-w-2xl mx-auto text-sm">
                The magic of personality often happens at the intersections of
                traits. Here's what your unique combination reveals.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-1">
              {profileSummary.personalityBlends.map((blend, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-soft border border-sage-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sage-400 to-sage-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">
                        {blend.name.split(' ')[1]?.charAt(0) ||
                          blend.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-warm-800 mb-1">
                        {blend.name}
                      </h3>
                      <p className="text-warm-600 mb-4">{blend.description}</p>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-sage-50 rounded-xl p-4">
                          <h4 className="text-sm font-medium text-warm-700 mb-2 flex items-center gap-2">
                            <Star className="w-4 h-4 text-sage-500" />
                            Strengths
                          </h4>
                          <ul className="space-y-1">
                            {blend.strengths.map((strength, i) => (
                              <li
                                key={i}
                                className="text-sm text-warm-600 flex items-start gap-2"
                              >
                                <span className="text-sage-500 mt-0.5">+</span>
                                <span>{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-warm-50 rounded-xl p-4">
                          <h4 className="text-sm font-medium text-warm-700 mb-2 flex items-center gap-2">
                            <Info className="w-4 h-4 text-openness" />
                            Watch Outs
                          </h4>
                          <ul className="space-y-1">
                            {blend.watchOuts.map((watchOut, i) => (
                              <li
                                key={i}
                                className="text-sm text-warm-600 flex items-start gap-2"
                              >
                                <span className="text-openness mt-0.5">!</span>
                                <span>{watchOut}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-serif font-semibold text-warm-800 mb-3">
              Want to Learn More?
            </h2>
            <p className="text-warm-600 max-w-3xl mx-auto mb-6">
              Explore deep dive interpretations and detailed insights about each
              trait, including how they play out across different life domains.
            </p>
            <button
              onClick={() => navigate('/insights')}
              className="btn-zen flex items-center justify-center gap-2 mx-auto"
            >
              <Sparkles className="w-4 h-4" />
              Explore Traits & Insights
            </button>
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
