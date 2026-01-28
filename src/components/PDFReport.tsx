import { useRef, useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { TestResults, TRAIT_LABELS, BigFiveTrait } from '../types';
import {
  InterpretationReport,
  getScoreRangeLabel,
  detailedTraitInterpretations,
} from '../lib/interpretations';

interface PDFReportProps {
  results: TestResults;
  interpretationReport: InterpretationReport[];
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
  fullName,
  onClose,
}: PDFReportProps) {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    if (!reportRef.current || isGenerating) return;

    setIsGenerating(true);
    setError(null);

    try {
      // Wait for fonts and images to load
      await document.fonts.ready;

      // Split the report into multiple pages
      const pages = reportRef.current.querySelectorAll('[data-pdf-page]');
      if (pages.length === 0) {
        throw new Error('No pages found to generate');
      }

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i] as HTMLElement;

        // Use JPEG format which is more reliable than PNG
        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: '#ffffff',
          width: page.offsetWidth,
          height: page.offsetHeight,
          onclone: (clonedDoc) => {
            // Ensure cloned elements are visible
            const clonedElement = clonedDoc.querySelector('[data-pdf-page]');
            if (clonedElement) {
              (clonedElement as HTMLElement).style.visibility = 'visible';
              (clonedElement as HTMLElement).style.position = 'relative';
            }
          },
        });

        // Validate canvas has content
        if (canvas.width === 0 || canvas.height === 0) {
          throw new Error(`Page ${i + 1} generated empty canvas`);
        }

        // Use JPEG format for better compatibility
        const imgData = canvas.toDataURL('image/jpeg', 0.95);

        // Validate image data
        if (!imgData || imgData === 'data:,') {
          throw new Error(`Failed to generate image for page ${i + 1}`);
        }

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Calculate image dimensions to fit on page
        const imgAspect = canvas.width / canvas.height;
        let finalWidth = pdfWidth - 4; // 2mm margin on each side
        let finalHeight = finalWidth / imgAspect;

        // If image is too tall, scale down
        if (finalHeight > pdfHeight - 4) {
          finalHeight = pdfHeight - 4;
          finalWidth = finalHeight * imgAspect;
        }

        if (i > 0) {
          pdf.addPage();
        }

        // Center horizontally
        const xOffset = (pdfWidth - finalWidth) / 2;
        pdf.addImage(imgData, 'JPEG', xOffset, 2, finalWidth, finalHeight);
      }

      pdf.save(
        `big-five-personality-report-${results.sessionId.slice(0, 8)}.pdf`,
      );
      onClose();
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError(
        error instanceof Error ? error.message : 'Failed to generate PDF',
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Auto-generate PDF on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      generatePDF();
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading/Error overlay */}
      {(isGenerating || error) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm mx-4 text-center">
            {isGenerating && (
              <>
                <div className="w-12 h-12 border-4 border-sage-200 border-t-sage-600 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-warm-700 font-medium">
                  Generating your PDF report...
                </p>
                <p className="text-warm-500 text-sm mt-2">
                  This may take a few moments
                </p>
              </>
            )}
            {error && (
              <>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-500 text-2xl">!</span>
                </div>
                <p className="text-warm-700 font-medium mb-2">
                  Error generating PDF
                </p>
                <p className="text-warm-500 text-sm mb-4">{error}</p>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => {
                      setError(null);
                      generatePDF();
                    }}
                    className="px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-warm-200 text-warm-700 rounded-lg hover:bg-warm-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {/* Hidden report container - using absolute positioning off-screen instead of display:none */}
      <div className="fixed" style={{ left: '-9999px', top: 0 }}>
        <div ref={reportRef} className="bg-white" style={{ width: '210mm' }}>
          {/* PAGE 1: Title and Overview */}
          <div
            data-pdf-page
            style={{
              width: '210mm',
              height: '297mm',
              padding: '15mm 20mm',
              boxSizing: 'border-box',
              backgroundColor: '#ffffff',
            }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mb-6 pb-6 border-b-2 border-sage-200">
                <h1 className="text-4xl font-serif font-bold text-warm-800 mb-3">
                  Big Five Personality Report
                </h1>
                {fullName && (
                  <p className="text-2xl font-serif text-warm-700 mb-3">
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
            </div>

            {/* Overview Section */}
            <div>
              <div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-sage-200">
                <div className="w-1 h-8 bg-sage-400 rounded-full"></div>
                <h2 className="text-2xl font-serif font-bold text-warm-800">
                  Your Personality Snapshot
                </h2>
              </div>
              <div className="space-y-3">
                {interpretationReport.map((report) => (
                  <div
                    key={report.trait}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white border border-sage-100"
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

            {/* Page footer */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-xs text-warm-400">
                Page 1 of {interpretationReport.length + 2}
              </p>
            </div>
          </div>

          {/* PAGES 2-6: Individual Trait Pages (one per trait) */}
          {interpretationReport.map((report, index) => (
            <div
              key={report.trait}
              data-pdf-page
              style={{
                width: '210mm',
                height: '297mm',
                padding: '15mm 20mm',
                boxSizing: 'border-box',
                backgroundColor: '#ffffff',
              }}
            >
              {/* Page Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-sage-200">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
                  style={{ backgroundColor: TRAIT_COLORS[report.trait] }}
                >
                  <span className="text-white font-bold text-xl">
                    {TRAIT_LABELS[report.trait].charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-serif font-bold text-warm-800">
                    {TRAIT_LABELS[report.trait]}
                  </h2>
                  <p className="text-warm-500">
                    Your Score:{' '}
                    <span className="font-bold text-warm-700">
                      {report.score}%
                    </span>{' '}
                    • {getScoreRangeLabel(report.range)}
                  </p>
                </div>
              </div>

              {/* Score Bar */}
              <div className="mb-6 p-4 bg-sage-50 rounded-xl">
                <div className="flex items-center justify-between text-xs text-warm-500 mb-2">
                  <span>Low</span>
                  <span>Average</span>
                  <span>High</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-5 bg-white rounded-full overflow-hidden border border-sage-200">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${report.score}%`,
                        backgroundColor: TRAIT_COLORS[report.trait],
                      }}
                    />
                  </div>
                  <span className="text-sm font-bold text-warm-700 w-12 text-right">
                    {report.score}%
                  </span>
                </div>
              </div>

              {/* Trait Interpretation */}
              <div className="mb-6">
                <h3 className="text-lg font-serif font-bold text-warm-800 mb-3">
                  What This Means
                </h3>
                <p className="text-warm-700 leading-relaxed text-sm">
                  {report.traitInterpretation}
                </p>
              </div>

              {/* Full Description */}
              {detailedTraitInterpretations[report.trait] && (
                <div
                  className="mb-6 p-4 bg-white border-l-4 rounded-lg"
                  style={{ borderColor: TRAIT_COLORS[report.trait] }}
                >
                  <h3 className="text-lg font-serif font-bold text-warm-800 mb-3">
                    Understanding {TRAIT_LABELS[report.trait]}
                  </h3>
                  <p
                    className="text-sm text-warm-700 leading-relaxed"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 6,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {detailedTraitInterpretations[report.trait].fullDescription
                      .length > 450
                      ? detailedTraitInterpretations[
                          report.trait
                        ].fullDescription.substring(0, 450) + '...'
                      : detailedTraitInterpretations[report.trait]
                          .fullDescription}
                  </p>
                </div>
              )}

              {/* Facets */}
              <div className="bg-sage-50 rounded-xl p-5">
                <h3 className="text-lg font-serif font-bold text-warm-800 mb-4 flex items-center gap-2">
                  <span style={{ color: TRAIT_COLORS[report.trait] }}>▸</span>
                  Key Facets
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {report.facets.map((facet) => (
                    <div key={facet.facet} className="p-3 rounded-lg bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-warm-800">
                          {facet.facetLabel}
                        </span>
                        <span className="text-sm font-bold text-warm-700">
                          {facet.score}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-sage-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${facet.score}%`,
                            backgroundColor: TRAIT_COLORS[report.trait],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Page footer */}
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-xs text-warm-400">
                  Page {index + 2} of {interpretationReport.length + 2}
                </p>
              </div>
            </div>
          ))}

          {/* FINAL PAGE: Closing & Footer */}
          <div
            data-pdf-page
            style={{
              width: '210mm',
              height: '297mm',
              padding: '15mm 20mm',
              boxSizing: 'border-box',
              backgroundColor: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-sage-200">
                <div className="w-1 h-8 bg-sage-400 rounded-full"></div>
                <h2 className="text-2xl font-serif font-bold text-warm-800">
                  Moving Forward
                </h2>
              </div>

              <div className="bg-sage-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-serif font-bold text-warm-800 mb-4">
                  Remember
                </h3>
                <ul className="space-y-3 text-sm text-warm-700">
                  <li className="flex items-start gap-3">
                    <span className="text-sage-500">✓</span>
                    <span>
                      Your personality traits are tendencies, not limitations.
                      They describe how you naturally operate, not what you're
                      capable of.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sage-500">✓</span>
                    <span>
                      All trait levels have their strengths. There's no "ideal"
                      personality profile—diversity in personalities is
                      valuable.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sage-500">✓</span>
                    <span>
                      Personality can shift over time and across situations.
                      This assessment captures a snapshot of your current
                      tendencies.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sage-500">✓</span>
                    <span>
                      Use these insights for self-awareness and growth, not for
                      self-criticism or limiting beliefs about yourself.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-sage-200 rounded-xl p-6">
                <h3 className="text-lg font-serif font-bold text-warm-800 mb-4">
                  About the Big Five Model
                </h3>
                <p className="text-sm text-warm-700 leading-relaxed mb-4">
                  The Big Five personality model (also known as the Five-Factor
                  Model or OCEAN) is one of the most widely researched and
                  validated frameworks in personality psychology. It measures
                  five broad dimensions of personality that have been
                  consistently found across different cultures and languages.
                </p>
                <p className="text-sm text-warm-700 leading-relaxed">
                  This assessment uses the IPIP-NEO-120, a 120-question
                  inventory from the International Personality Item Pool, which
                  is a public domain collection of personality measures
                  developed for scientific research.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-8 border-t-2 border-sage-200 text-center">
              <p className="text-base text-warm-700 font-serif font-semibold mb-2">
                Big Five Personality Assessment Report
              </p>
              <p className="text-sm text-warm-500 mb-4">
                Based on the IPIP-NEO-120 • International Personality Item Pool
                • Public Domain
              </p>
              <div className="flex items-center justify-center gap-6 text-xs text-warm-400">
                <span>Session ID: {results.sessionId.slice(0, 16)}</span>
                <span>•</span>
                <span>
                  Generated: {formattedDate} at {formattedTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
