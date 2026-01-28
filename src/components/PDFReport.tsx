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
  onClose,
}: PDFReportProps) {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const completedDate = new Date(results.completedAt).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  );

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
              <div className="text-center mb-8">
                <h1 className="text-3xl font-serif font-bold text-warm-800 mb-2">
                  Big Five Personality Report
                </h1>
                <p className="text-warm-500">
                  Assessment completed on {completedDate}
                </p>
              </div>

              {/* Disclaimer */}
              <div className="bg-sage-50 border border-sage-200 rounded-xl p-4 mb-8">
                <p className="text-sm text-sage-700">
                  <strong>Disclaimer:</strong> This report is based on the
                  IPIP-NEO-120 personality inventory and is intended for
                  educational and self-reflection purposes only. It is not a
                  clinical assessment, diagnosis, or professional psychological
                  evaluation. Results reflect self-reported tendencies at a
                  particular moment in time and should not be used for medical,
                  employment, or legal decisions.
                </p>
              </div>

              {/* Overview Section */}
              <div className="mb-8">
                <h2 className="text-xl font-serif font-semibold text-warm-800 mb-4 pb-2 border-b border-sage-200">
                  Overview
                </h2>
                <div className="space-y-4">
                  {interpretationReport.map((report) => (
                    <div key={report.trait} className="flex items-center gap-4">
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: TRAIT_COLORS[report.trait] }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-warm-700">
                            {TRAIT_LABELS[report.trait]}
                          </span>
                          <span className="font-semibold text-warm-700">
                            {report.score}%
                          </span>
                        </div>
                        <div className="h-2 bg-sage-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${report.score}%`,
                              backgroundColor: TRAIT_COLORS[report.trait],
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Results */}
              {interpretationReport.map((report) => (
                <div
                  key={report.trait}
                  className="mb-8"
                  style={{ pageBreakInside: 'avoid' }}
                >
                  <div
                    className="flex items-center gap-3 mb-3 pb-2 border-b"
                    style={{ borderColor: TRAIT_COLORS[report.trait] }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: TRAIT_COLORS[report.trait] }}
                    >
                      <span className="text-white font-bold text-sm">
                        {TRAIT_LABELS[report.trait].charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-serif font-semibold text-warm-800">
                        {TRAIT_LABELS[report.trait]}
                      </h3>
                      <p className="text-sm text-warm-500">
                        Score: {report.score}% (
                        {getScoreRangeLabel(report.range)})
                      </p>
                    </div>
                  </div>

                  <p className="text-warm-600 mb-4 leading-relaxed">
                    {report.traitInterpretation}
                  </p>

                  {/* Facets */}
                  <div className="bg-sage-50 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-warm-700 uppercase tracking-wide mb-3">
                      Facets
                    </h4>
                    <div className="space-y-2">
                      {report.facets.map((facet) => (
                        <div
                          key={facet.facet}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-warm-600">
                            {facet.facetLabel}
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-1.5 bg-sage-100 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${facet.score}%`,
                                  backgroundColor: TRAIT_COLORS[report.trait],
                                  opacity: 0.8,
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium text-warm-700 w-10 text-right">
                              {facet.score}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Profile Summary Section */}
              <div className="mb-8" style={{ pageBreakBefore: 'always' }}>
                <h2 className="text-xl font-serif font-semibold text-warm-800 mb-4 pb-2 border-b border-sage-200">
                  Your Personality Profile
                </h2>

                <div className="bg-sage-50 rounded-xl p-4 mb-4 text-center">
                  <h3 className="text-lg font-bold text-sage-700 mb-1">
                    {profileSummary.personalityPattern}
                  </h3>
                  <p className="text-sm text-warm-600">
                    Based on your unique combination of traits
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-sage-50/70 rounded-xl p-3">
                    <h4 className="text-sm font-semibold text-warm-700 mb-2">
                      Communication Style
                    </h4>
                    <p className="text-xs text-warm-600">
                      {profileSummary.communicationStyle}
                    </p>
                  </div>
                  <div className="bg-sage-50/70 rounded-xl p-3">
                    <h4 className="text-sm font-semibold text-warm-700 mb-2">
                      Under Pressure
                    </h4>
                    <p className="text-xs text-warm-600">
                      {profileSummary.stressResponse}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-sage-50/70 rounded-xl p-3">
                    <h4 className="text-sm font-semibold text-warm-700 mb-2">
                      Key Strengths
                    </h4>
                    <ul className="text-xs text-warm-600 space-y-1">
                      {profileSummary.overallStrengths
                        .slice(0, 4)
                        .map((strength, i) => (
                          <li key={i}>• {strength}</li>
                        ))}
                    </ul>
                  </div>
                  <div className="bg-sage-50/70 rounded-xl p-3">
                    <h4 className="text-sm font-semibold text-warm-700 mb-2">
                      What Motivates You
                    </h4>
                    <ul className="text-xs text-warm-600 space-y-1">
                      {profileSummary.motivationDrivers.map((driver, i) => (
                        <li key={i}>• {driver}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Detailed Insights Section */}
              <div className="mb-8">
                <h2 className="text-xl font-serif font-semibold text-warm-800 mb-4 pb-2 border-b border-sage-200">
                  Detailed Insights & Interesting Facts
                </h2>

                {traitInsights.map((insight) => (
                  <div
                    key={insight.trait}
                    className="mb-6"
                    style={{ pageBreakInside: 'avoid' }}
                  >
                    <div
                      className="flex items-center gap-2 mb-3 pb-2 border-b"
                      style={{ borderColor: TRAIT_COLORS[insight.trait] }}
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: TRAIT_COLORS[insight.trait] }}
                      >
                        <span className="text-white font-bold text-xs">
                          {TRAIT_LABELS[insight.trait].charAt(0)}
                        </span>
                      </div>
                      <h3 className="text-base font-serif font-semibold text-warm-800">
                        {TRAIT_LABELS[insight.trait]}
                      </h3>
                      <span className="text-sm text-warm-500">
                        ({insight.score}%)
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {/* Interesting Facts */}
                      <div className="bg-openness-light rounded-xl p-3">
                        <h4 className="text-xs font-semibold text-openness mb-2">
                          ✦ Did You Know?
                        </h4>
                        <ul className="text-xs text-warm-700 space-y-1">
                          {insight.interestingFacts
                            .slice(0, 2)
                            .map((fact, i) => (
                              <li key={i}>• {fact}</li>
                            ))}
                        </ul>
                      </div>

                      {/* Career Environments */}
                      <div className="bg-agreeableness-light rounded-xl p-3">
                        <h4 className="text-xs font-semibold text-agreeableness mb-2">
                          💼 Suitable Environments
                        </h4>
                        <ul className="text-xs text-warm-700 space-y-1">
                          {insight.careerEnvironments
                            .slice(0, 3)
                            .map((env, i) => (
                              <li key={i}>→ {env}</li>
                            ))}
                        </ul>
                      </div>

                      {/* Growth Tips */}
                      <div className="bg-conscientiousness-light rounded-xl p-3">
                        <h4 className="text-xs font-semibold text-conscientiousness mb-2">
                          📈 Growth Tips
                        </h4>
                        <ul className="text-xs text-warm-700 space-y-1">
                          {insight.growthTips.slice(0, 2).map((tip, i) => (
                            <li key={i}>✓ {tip}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Strengths */}
                      <div className="bg-sage-50 rounded-xl p-3">
                        <h4 className="text-xs font-semibold text-sage-700 mb-2">
                          ⭐ Your Strengths
                        </h4>
                        <ul className="text-xs text-warm-700 space-y-1">
                          {insight.strengths.slice(0, 3).map((strength, i) => (
                            <li key={i}>+ {strength}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Relationship Insight */}
                    <div className="bg-neuroticism-light rounded-xl p-3 mb-2">
                      <h4 className="text-xs font-semibold text-neuroticism mb-1">
                        💕 Relationships
                      </h4>
                      <p className="text-xs text-warm-700">
                        {insight.relationshipInsight}
                      </p>
                    </div>

                    {/* Famous Figures */}
                    {insight.famousFigures.length > 0 && (
                      <p className="text-xs text-warm-500 italic">
                        Notable figures with similar traits:{' '}
                        {insight.famousFigures.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-8 pt-4 border-t border-sage-200 text-center">
                <p className="text-xs text-warm-500">
                  Based on the IPIP-NEO-120 • International Personality Item
                  Pool • Public Domain
                </p>
                <p className="text-xs text-warm-400 mt-1">
                  Session ID: {results.sessionId}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
