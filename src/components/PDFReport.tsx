import { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { TestResults, TRAIT_LABELS, BigFiveTrait } from '../types';
import {
  InterpretationReport,
  getScoreRangeLabel,
} from '../lib/interpretations';
import { PersonalizedInsight, ProfileSummary } from '../lib/insights';
import { X, Download, Loader2, Leaf } from 'lucide-react';

interface PDFReportProps {
  results: TestResults;
  interpretationReport: InterpretationReport[];
  traitInsights: PersonalizedInsight[];
  profileSummary: ProfileSummary;
  fullName: string;
  onClose: () => void;
}

// Muted zen-inspired trait colors
const TRAIT_COLORS: Record<BigFiveTrait, string> = {
  openness: '#9b8ab8',
  conscientiousness: '#7d9f7d',
  extraversion: '#c4a574',
  agreeableness: '#7ba4ad',
  neuroticism: '#b89898',
};

export default function PDFReport({
  results,
  interpretationReport,
  traitInsights,
  profileSummary,
  fullName,
  onClose,
}: PDFReportProps) {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const completedDate = new Date(results.completedAt);
  const formattedDate = completedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = completedDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const generatePDF = async () => {
    if (!reportRef.current) return;

    setIsGenerating(true);

    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      // Calculate how many pages we need
      const pageHeight = pdfHeight / ratio;
      let heightLeft = imgHeight;
      let position = 0;

      // First page
      pdf.addImage(
        imgData,
        'PNG',
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio,
      );
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(
          imgData,
          'PNG',
          imgX,
          position * ratio,
          imgWidth * ratio,
          imgHeight * ratio,
        );
        heightLeft -= pageHeight;
      }

      pdf.save(`big-five-results-${results.sessionId.slice(0, 8)}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating the PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-warm-900/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4 flex items-start justify-center">
        <div className="bg-white rounded-2xl shadow-soft-xl max-w-4xl w-full">
          {/* Modal Header */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-sage-100 rounded-t-2xl p-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-sage-500" />
              <h2 className="text-lg font-serif font-semibold text-warm-800">
                PDF Report Preview
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={generatePDF}
                disabled={isGenerating}
                className="btn-zen flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Download PDF
                  </>
                )}
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-sage-50 rounded-xl transition-colors text-warm-500 hover:text-warm-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* PDF Content */}
          <div className="p-8">
            <div
              ref={reportRef}
              className="bg-white"
              style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}
            >
              {/* Header */}
              <div className="text-center mb-12">
                <div className="mb-8 pb-8 border-b-2 border-sage-200">
                  <h1 className="text-4xl font-serif font-bold text-warm-800 mb-4">
                    Big Five Personality Report
                  </h1>
                  {fullName && (
                    <p className="text-2xl font-serif text-warm-700 mb-4">
                      for {fullName}
                    </p>
                  )}
                  <div className="flex items-center justify-center gap-4 text-warm-600">
                    <span className="text-sm">
                      Assessment Date: {formattedDate}
                    </span>
                    <span className="text-sage-300">•</span>
                    <span className="text-sm">Time: {formattedTime}</span>
                  </div>
                </div>
                <p className="text-warm-500 text-sm leading-relaxed max-w-2xl mx-auto">
                  This comprehensive personality assessment provides insights
                  into your natural tendencies, behavioral patterns, and unique
                  personality profile based on the Big Five personality model.
                </p>
              </div>

              {/* Disclaimer */}
              <div className="bg-gradient-to-r from-sage-50 to-sage-50/50 border-l-4 border-sage-400 rounded-lg p-6 mb-12">
                <p className="text-sm text-sage-800 leading-relaxed">
                  <strong className="text-sage-900">About This Report:</strong>{' '}
                  This assessment is based on the IPIP-NEO-120 personality
                  inventory and is intended for personal growth,
                  self-reflection, and educational purposes only. Results
                  reflect self-reported tendencies at this particular moment and
                  should not be used for clinical diagnosis, professional
                  evaluations, employment decisions, or medical purposes.
                  Personality is dynamic and can shift across time and
                  situations.
                </p>
              </div>

              {/* Overview Section */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-sage-200">
                  <div className="w-1 h-8 bg-gradient-to-b from-sage-400 to-sage-300 rounded-full"></div>
                  <h2 className="text-2xl font-serif font-bold text-warm-800">
                    Your Personality Snapshot
                  </h2>
                </div>
                <div className="space-y-4">
                  {interpretationReport.map((report) => (
                    <div
                      key={report.trait}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white border border-sage-100 hover:border-sage-200 transition-colors"
                    >
                      <div
                        className="w-6 h-6 rounded-full flex-shrink-0 shadow-sm"
                        style={{ backgroundColor: TRAIT_COLORS[report.trait] }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-warm-800">
                            {TRAIT_LABELS[report.trait]}
                          </span>
                          <span className="font-bold text-warm-800 text-lg">
                            {report.score}%
                          </span>
                        </div>
                        <div className="h-2.5 bg-sage-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${report.score}%`,
                              backgroundColor: TRAIT_COLORS[report.trait],
                              boxShadow: `0 0 8px ${TRAIT_COLORS[report.trait]}20`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Results */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-sage-200">
                  <div className="w-1 h-8 bg-gradient-to-b from-sage-400 to-sage-300 rounded-full"></div>
                  <h2 className="text-2xl font-serif font-bold text-warm-800">
                    Detailed Trait Analysis
                  </h2>
                </div>

                {interpretationReport.map((report) => (
                  <div
                    key={report.trait}
                    className="mb-10 p-6 rounded-xl border-2 bg-white"
                    style={{
                      borderColor: TRAIT_COLORS[report.trait],
                      pageBreakInside: 'avoid',
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                        style={{ backgroundColor: TRAIT_COLORS[report.trait] }}
                      >
                        <span className="text-white font-bold text-lg">
                          {TRAIT_LABELS[report.trait].charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-serif font-bold text-warm-800">
                          {TRAIT_LABELS[report.trait]}
                        </h3>
                        <p className="text-sm text-warm-500">
                          {report.score}% • {getScoreRangeLabel(report.range)}
                        </p>
                      </div>
                    </div>

                    <p className="text-warm-700 mb-4 leading-relaxed text-sm">
                      {report.traitInterpretation}
                    </p>

                    {/* Facets */}
                    <div className="bg-gradient-to-br from-sage-50 to-sage-50/50 rounded-lg p-4 mt-4">
                      <h4 className="text-sm font-bold text-warm-800 uppercase tracking-wide mb-3 flex items-center gap-2">
                        <span style={{ color: TRAIT_COLORS[report.trait] }}>
                          ▸
                        </span>
                        Key Aspects
                      </h4>
                      <div className="space-y-3">
                        {report.facets.map((facet) => (
                          <div
                            key={facet.facet}
                            className="flex items-start gap-3 p-3 rounded-lg bg-white/60"
                          >
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-semibold text-warm-800">
                                  {facet.facetLabel}
                                </span>
                                <span className="text-sm font-bold text-warm-700">
                                  {facet.score}%
                                </span>
                              </div>
                              <div className="w-full h-1.5 bg-sage-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: `${facet.score}%`,
                                    backgroundColor: TRAIT_COLORS[report.trait],
                                    opacity: 0.8,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Profile Summary Section */}
              <div className="mb-12" style={{ pageBreakBefore: 'always' }}>
                <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-sage-200">
                  <div className="w-1 h-8 bg-gradient-to-b from-sage-400 to-sage-300 rounded-full"></div>
                  <h2 className="text-2xl font-serif font-bold text-warm-800">
                    Your Personality Profile
                  </h2>
                </div>

                <div className="bg-gradient-to-br from-sage-50 to-sage-50/50 rounded-xl p-6 mb-6 border border-sage-200">
                  <h3 className="text-xl font-serif font-bold text-warm-800 mb-2">
                    {profileSummary.personalityPattern}
                  </h3>
                  <p className="text-sm text-warm-600 leading-relaxed">
                    Based on your unique combination of traits
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div
                    className="bg-white border-l-4 rounded-lg p-4"
                    style={{ borderColor: TRAIT_COLORS.openness }}
                  >
                    <h4 className="text-sm font-bold text-warm-800 mb-2 flex items-center gap-2">
                      <span style={{ color: TRAIT_COLORS.openness }}>→</span>
                      Communication Style
                    </h4>
                    <p className="text-xs text-warm-700 leading-relaxed">
                      {profileSummary.communicationStyle}
                    </p>
                  </div>
                  <div
                    className="bg-white border-l-4 rounded-lg p-4"
                    style={{ borderColor: TRAIT_COLORS.neuroticism }}
                  >
                    <h4 className="text-sm font-bold text-warm-800 mb-2 flex items-center gap-2">
                      <span style={{ color: TRAIT_COLORS.neuroticism }}>→</span>
                      Under Pressure
                    </h4>
                    <p className="text-xs text-warm-700 leading-relaxed">
                      {profileSummary.stressResponse}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="bg-white border-l-4 rounded-lg p-4"
                    style={{ borderColor: TRAIT_COLORS.conscientiousness }}
                  >
                    <h4 className="text-sm font-bold text-warm-800 mb-2 flex items-center gap-2">
                      <span style={{ color: TRAIT_COLORS.conscientiousness }}>
                        ▸
                      </span>
                      Key Strengths
                    </h4>
                    <ul className="text-xs text-warm-700 space-y-1">
                      {profileSummary.overallStrengths
                        .slice(0, 4)
                        .map((strength, i) => (
                          <li key={i}>• {strength}</li>
                        ))}
                    </ul>
                  </div>
                  <div
                    className="bg-white border-l-4 rounded-lg p-4"
                    style={{ borderColor: TRAIT_COLORS.extraversion }}
                  >
                    <h4 className="text-sm font-bold text-warm-800 mb-2 flex items-center gap-2">
                      <span style={{ color: TRAIT_COLORS.extraversion }}>
                        ✦
                      </span>
                      What Motivates You
                    </h4>
                    <ul className="text-xs text-warm-700 space-y-1">
                      {profileSummary.motivationDrivers.map((driver, i) => (
                        <li key={i}>• {driver}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Detailed Insights Section */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-sage-200">
                  <div className="w-1 h-8 bg-gradient-to-b from-sage-400 to-sage-300 rounded-full"></div>
                  <h2 className="text-2xl font-serif font-bold text-warm-800">
                    Deep Insights & Patterns
                  </h2>
                </div>

                {traitInsights.map((insight) => (
                  <div
                    key={insight.trait}
                    className="mb-8 p-6 rounded-xl border-2 bg-white"
                    style={{
                      borderColor: TRAIT_COLORS[insight.trait],
                      pageBreakInside: 'avoid',
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                        style={{ backgroundColor: TRAIT_COLORS[insight.trait] }}
                      >
                        <span className="text-white font-bold text-lg">
                          {TRAIT_LABELS[insight.trait].charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-serif font-bold text-warm-800">
                          {TRAIT_LABELS[insight.trait]}
                        </h3>
                        <p className="text-xs text-warm-500">
                          Score: {insight.score}%
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {/* Interesting Facts */}
                      <div className="bg-gradient-to-br from-blue-50 to-blue-50/50 rounded-lg p-3 border border-blue-100">
                        <h4 className="text-xs font-bold text-blue-900 mb-2 flex items-center gap-1.5">
                          <span className="text-base">✦</span> Did You Know?
                        </h4>
                        <ul className="text-xs text-warm-700 space-y-1.5">
                          {insight.interestingFacts
                            .slice(0, 2)
                            .map((fact, i) => (
                              <li key={i} className="leading-relaxed">
                                • {fact}
                              </li>
                            ))}
                        </ul>
                      </div>

                      {/* Career Environments */}
                      <div className="bg-gradient-to-br from-green-50 to-green-50/50 rounded-lg p-3 border border-green-100">
                        <h4 className="text-xs font-bold text-green-900 mb-2 flex items-center gap-1.5">
                          <span className="text-base">💼</span> Career Fit
                        </h4>
                        <ul className="text-xs text-warm-700 space-y-1.5">
                          {insight.careerEnvironments
                            .slice(0, 3)
                            .map((env, i) => (
                              <li key={i} className="leading-relaxed">
                                → {env}
                              </li>
                            ))}
                        </ul>
                      </div>

                      {/* Growth Tips */}
                      <div className="bg-gradient-to-br from-amber-50 to-amber-50/50 rounded-lg p-3 border border-amber-100">
                        <h4 className="text-xs font-bold text-amber-900 mb-2 flex items-center gap-1.5">
                          <span className="text-base">📈</span> Growth Path
                        </h4>
                        <ul className="text-xs text-warm-700 space-y-1.5">
                          {insight.growthTips.slice(0, 2).map((tip, i) => (
                            <li key={i} className="leading-relaxed">
                              ✓ {tip}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Strengths */}
                      <div className="bg-gradient-to-br from-purple-50 to-purple-50/50 rounded-lg p-3 border border-purple-100">
                        <h4 className="text-xs font-bold text-purple-900 mb-2 flex items-center gap-1.5">
                          <span className="text-base">⭐</span> Strengths
                        </h4>
                        <ul className="text-xs text-warm-700 space-y-1.5">
                          {insight.strengths.slice(0, 3).map((strength, i) => (
                            <li key={i} className="leading-relaxed">
                              + {strength}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Relationships */}
                      <div className="bg-gradient-to-br from-rose-50 to-rose-50/50 rounded-lg p-3 border border-rose-100">
                        <h4 className="text-xs font-bold text-rose-900 mb-2 flex items-center gap-1.5">
                          <span className="text-base">💕</span> Relationships
                        </h4>
                        <p className="text-xs text-warm-700 leading-relaxed">
                          {insight.relationshipInsight}
                        </p>
                      </div>
                    </div>

                    {/* Famous Figures */}
                    {insight.famousFigures.length > 0 && (
                      <p className="text-xs text-warm-600 italic mt-3 pt-3 border-t border-sage-100">
                        <span className="font-semibold">
                          Individuals with similar traits:
                        </span>{' '}
                        {insight.famousFigures.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-12 pt-6 border-t-2 border-sage-200 text-center">
                <div className="mb-4">
                  <Leaf className="w-6 h-6 text-sage-400 mx-auto mb-2 opacity-60" />
                </div>
                <p className="text-xs text-warm-600 font-medium">
                  Big Five Personality Assessment Report
                </p>
                <p className="text-xs text-warm-500 mt-2">
                  Based on the IPIP-NEO-120 • International Personality Item
                  Pool • Public Domain
                </p>
                <p className="text-xs text-warm-400 mt-3">
                  Session ID: {results.sessionId}
                </p>
                <p className="text-xs text-sage-400 mt-4">
                  Generated on {formattedDate} at {formattedTime}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
