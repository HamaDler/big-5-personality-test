import { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { TestResults, TRAIT_LABELS, BigFiveTrait } from '../types';
import { InterpretationReport, getScoreRangeLabel } from '../lib/interpretations';
import { X, Download, Loader2 } from 'lucide-react';

interface PDFReportProps {
  results: TestResults;
  interpretationReport: InterpretationReport[];
  onClose: () => void;
}

const TRAIT_COLORS: Record<BigFiveTrait, string> = {
  openness: '#9B59B6',
  conscientiousness: '#27AE60',
  extraversion: '#F1C40F',
  agreeableness: '#3498DB',
  neuroticism: '#E74C3C'
};

export default function PDFReport({ results, interpretationReport, onClose }: PDFReportProps) {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const completedDate = new Date(results.completedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const generatePDF = async () => {
    if (!reportRef.current) return;

    setIsGenerating(true);

    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
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
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', imgX, position * ratio, imgWidth * ratio, imgHeight * ratio);
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
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4 flex items-start justify-center">
        <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full">
          {/* Modal Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl p-4 flex items-center justify-between z-10">
            <h2 className="text-lg font-semibold text-gray-900">PDF Report Preview</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={generatePDF}
                disabled={isGenerating}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* PDF Content */}
          <div className="p-8">
            <div ref={reportRef} className="bg-white" style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}>
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Big Five Personality Report
                </h1>
                <p className="text-gray-500">
                  Assessment completed on {completedDate}
                </p>
              </div>

              {/* Disclaimer */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
                <p className="text-sm text-amber-800">
                  <strong>Disclaimer:</strong> This report is based on the IPIP-NEO-120 personality inventory 
                  and is intended for educational and self-reflection purposes only. It is not a clinical 
                  assessment, diagnosis, or professional psychological evaluation. Results reflect self-reported 
                  tendencies at a particular moment in time and should not be used for medical, employment, 
                  or legal decisions.
                </p>
              </div>

              {/* Overview Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  Overview
                </h2>
                <div className="space-y-4">
                  {interpretationReport.map((report) => (
                    <div 
                      key={report.trait} 
                      className="flex items-center gap-4"
                    >
                      <div 
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: TRAIT_COLORS[report.trait] }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900">
                            {TRAIT_LABELS[report.trait]}
                          </span>
                          <span className="font-semibold text-gray-900">
                            {report.score}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ 
                              width: `${report.score}%`,
                              backgroundColor: TRAIT_COLORS[report.trait]
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Results */}
              {interpretationReport.map((report, index) => (
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
                      <h3 className="text-lg font-semibold text-gray-900">
                        {TRAIT_LABELS[report.trait]}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Score: {report.score}% ({getScoreRangeLabel(report.range)})
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {report.traitInterpretation}
                  </p>

                  {/* Facets */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                      Facets
                    </h4>
                    <div className="space-y-2">
                      {report.facets.map((facet) => (
                        <div key={facet.facet} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{facet.facetLabel}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{ 
                                  width: `${facet.score}%`,
                                  backgroundColor: TRAIT_COLORS[report.trait],
                                  opacity: 0.7
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-900 w-10 text-right">
                              {facet.score}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Footer */}
              <div className="mt-8 pt-4 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-500">
                  Based on the IPIP-NEO-120 • International Personality Item Pool • Public Domain
                </p>
                <p className="text-xs text-gray-400 mt-1">
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
