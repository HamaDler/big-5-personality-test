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

export default function FacetBreakdown({ facets, traitColor }: FacetBreakdownProps) {
  const [expandedFacet, setExpandedFacet] = useState<Facet | null>(null);

  return (
    <div className="space-y-3">
      {facets.map((facet) => {
        const isExpanded = expandedFacet === facet.facet;
        
        return (
          <div
            key={facet.facet}
            className="bg-gray-50 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setExpandedFacet(isExpanded ? null : facet.facet)}
              className="w-full p-4 text-left hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ChevronRight 
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      isExpanded ? 'rotate-90' : ''
                    }`}
                  />
                  <span className="font-medium text-gray-900">
                    {facet.facetLabel}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {getScoreRangeLabel(facet.range)}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {facet.score}%
                  </span>
                </div>
              </div>
              
              {/* Score Bar */}
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden ml-6">
                <div
                  className={`h-full ${traitColor} transition-all duration-500`}
                  style={{ width: `${facet.score}%`, opacity: 0.7 }}
                />
              </div>
            </button>

            {/* Expanded Interpretation */}
            {isExpanded && (
              <div className="px-4 pb-4 ml-6 animate-fadeIn">
                <p className="text-sm text-gray-600 leading-relaxed">
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
