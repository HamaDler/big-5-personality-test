import { Facet, ScoreRange, FACET_LABELS } from '../types';
import { getScoreRangeLabel } from '../lib/interpretations';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface FacetData {
  facet: Facet;
  facetLabel: string;
  score: number;
  range: ScoreRange;
  interpretation: string;
}

interface FacetBreakdownProps {
  facets: FacetData[];
  traitColor: string;
}

export default function FacetBreakdown({
  facets,
  traitColor,
}: FacetBreakdownProps) {
  const [expandedFacet, setExpandedFacet] = useState<Facet | null>(null);

  return (
    <div className="space-y-3">
      {facets.map((facet) => {
        const isExpanded = expandedFacet === facet.facet;

        return (
          <div
            key={facet.facet}
            className="bg-sage-50/50 rounded-xl overflow-hidden border border-sage-100"
          >
            <button
              onClick={() => setExpandedFacet(isExpanded ? null : facet.facet)}
              className="w-full p-4 text-left hover:bg-sage-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ChevronRight
                    className={`w-4 h-4 text-sage-400 transition-transform ${
                      isExpanded ? 'rotate-90' : ''
                    }`}
                  />
                  <span className="font-medium text-warm-700">
                    {facet.facetLabel}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-warm-500">
                    {getScoreRangeLabel(facet.range)}
                  </span>
                  <span className="font-semibold text-warm-700">
                    {facet.score}%
                  </span>
                </div>
              </div>

              {/* Score Bar */}
              <div className="h-1.5 bg-sage-100 rounded-full overflow-hidden ml-6">
                <div
                  className={`h-full ${traitColor} transition-all duration-500`}
                  style={{ width: `${facet.score}%`, opacity: 0.8 }}
                />
              </div>
            </button>

            {/* Expanded Interpretation */}
            {isExpanded && (
              <div className="px-4 pb-4 ml-6 animate-fadeIn">
                <p className="text-sm text-warm-600 leading-relaxed">
                  {facet.interpretation}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
