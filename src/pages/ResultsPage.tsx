import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTest, loadResults } from '../context/TestContext';
import { TestResults, BigFiveTrait, TRAIT_LABELS, TRAIT_SHORT_LABELS, FACET_LABELS } from '../types';
import { generateInterpretationReport, getScoreRange, getScoreRangeLabel } from '../lib/interpretations';
import TraitChart from '../components/TraitChart';
import FacetBreakdown from '../components/FacetBreakdown';
import PDFReport from '../components/PDFReport';
import { 
  Download, 
  RefreshCw, 
  ChevronDown, 
  ChevronUp,
  Info,
  AlertTriangle
} from 'lucide-react';

export default function ResultsPage() {
  const navigate = useNavigate();
  const { state, resetTest } = useTest();
  const [results, setResults] = useState<TestResults | null>(null);
  const [expandedTraits, setExpandedTraits] = useState<Set<BigFiveTrait>>(new Set());
  const [showPDFPreview, setShowPDFPreview] = useState(false);

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
        <AlertTriangle className="w-12 h-12 text-amber-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No Results Found</h2>
        <p className="text-gray-600 mb-6 text-center">
          You haven't completed the assessment yet, or your results have been cleared.
        </p>
        <button
          onClick={() => navigate('/test')}
          className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          Take the Assessment
        </button>
      </div>
    );
  }

  const interpretationReport = generateInterpretationReport(results.traits);

  const toggleTrait = (trait: BigFiveTrait) => {
    setExpandedTraits(prev => {
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
    setExpandedTraits(new Set(results.traits.map(t => t.trait)));
  };

  const collapseAll = () => {
    setExpandedTraits(new Set());
  };

  const handleRetake = () => {
    resetTest();
    navigate('/test');
  };

  const getTraitColorClasses = (trait: BigFiveTrait) => {
    const colors: Record<BigFiveTrait, { bg: string; text: string; border: string; light: string }> = {
      openness: { bg: 'bg-openness', text: 'text-openness', border: 'border-openness', light: 'bg-openness-light' },
      conscientiousness: { bg: 'bg-conscientiousness', text: 'text-conscientiousness', border: 'border-conscientiousness', light: 'bg-conscientiousness-light' },
      extraversion: { bg: 'bg-extraversion', text: 'text-extraversion', border: 'border-extraversion', light: 'bg-extraversion-light' },
      agreeableness: { bg: 'bg-agreeableness', text: 'text-agreeableness', border: 'border-agreeableness', light: 'bg-agreeableness-light' },
      neuroticism: { bg: 'bg-neuroticism', text: 'text-neuroticism', border: 'border-neuroticism', light: 'bg-neuroticism-light' },
    };
    return colors[trait];
  };

  const completedDate = new Date(results.completedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="animate-fadeIn pb-16">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Your Results</h1>
              <p className="text-gray-500 mt-1">Completed on {completedDate}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRetake}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Retake
              </button>
              <button
                onClick={() => setShowPDFPreview(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Banner */}
      <section className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>Remember:</strong> These results reflect tendencies and patterns, not fixed traits. 
              Personality can be influenced by context and may change over time. 
              This is not a clinical assessment.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Chart */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Big Five Overview
          </h2>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <TraitChart traits={results.traits} />
          </div>
        </div>
      </section>

      {/* Detailed Results */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Detailed Breakdown
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={expandAll}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Expand All
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={collapseAll}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
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
                  className={`bg-white rounded-xl border-2 ${colors.border} overflow-hidden transition-all`}
                >
                  {/* Trait Header */}
                  <button
                    onClick={() => toggleTrait(report.trait)}
                    className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center`}>
                          <span className="text-white font-bold text-lg">
                            {TRAIT_SHORT_LABELS[report.trait].charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {TRAIT_LABELS[report.trait]}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {getScoreRangeLabel(report.range)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-2xl font-bold text-gray-900">
                            {report.score}%
                          </span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                    
                    {/* Score Bar */}
                    <div className="mt-4">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
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
                      <div className={`${colors.light} rounded-lg p-4 mb-6`}>
                        <p className="text-gray-700 leading-relaxed">
                          {report.traitInterpretation}
                        </p>
                      </div>

                      {/* Facet Breakdown */}
                      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                        Facets
                      </h4>
                      <FacetBreakdown facets={report.facets} traitColor={colors.bg} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Understanding Your Results */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Understanding Your Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Lower Range (0-35%)</h3>
              <p className="text-sm text-gray-600">
                Scores in this range suggest you may express this trait less frequently 
                or intensely than many others. This is neither good nor bad—it simply 
                reflects your natural tendencies.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Moderate Range (36-65%)</h3>
              <p className="text-sm text-gray-600">
                Scores in this range indicate a balanced expression of this trait. 
                You likely adapt your behavior based on context and can draw on 
                different aspects as needed.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Higher Range (66-100%)</h3>
              <p className="text-sm text-gray-600">
                Scores in this range suggest you may express this trait more frequently 
                or intensely than many others. This can be a strength in many contexts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PDF Preview Modal */}
      {showPDFPreview && (
        <PDFReport 
          results={results} 
          interpretationReport={interpretationReport}
          onClose={() => setShowPDFPreview(false)} 
        />
      )}
    </div>
  );
}
