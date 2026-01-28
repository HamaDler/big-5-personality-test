/**
 * IPIP-NEO-120 Scoring Algorithm
 * 
 * This module implements the scientifically correct scoring methodology for
 * the Big Five personality traits and their 30 facets.
 * 
 * Scoring Process:
 * 1. Apply reverse scoring to reverse-keyed items (score = 6 - response)
 * 2. Calculate facet scores as mean of 4 items each
 * 3. Calculate trait scores as mean of 6 facets each
 * 4. Convert raw scores (1-5) to percent scores (0-100)
 * 
 * Formula for conversion:
 *   percentScore = ((rawScore - 1) / 4) * 100
 *   
 * This maps:
 *   1.0 → 0%
 *   2.0 → 25%
 *   3.0 → 50%
 *   4.0 → 75%
 *   5.0 → 100%
 */

import {
  Question,
  QuestionResponse,
  LikertValue,
  BigFiveTrait,
  Facet,
  FacetScore,
  TraitScore,
  TestResults,
  BIG_FIVE_TRAITS,
  FACETS_BY_TRAIT
} from '../types';
import { questions, getQuestionById } from '../data/questions';

/**
 * Apply reverse scoring to a response if needed.
 * For reverse-scored items: score = 6 - response
 */
export function applyReverseScoring(response: LikertValue, isReversed: boolean): number {
  return isReversed ? 6 - response : response;
}

/**
 * Convert a raw score (1-5 scale) to a percent score (0-100 scale).
 * Formula: percentScore = ((rawScore - 1) / 4) * 100
 */
export function rawToPercent(rawScore: number): number {
  return Math.round(((rawScore - 1) / 4) * 100);
}

/**
 * Calculate the mean of an array of numbers.
 */
export function calculateMean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

/**
 * Get all scored responses for a specific facet.
 * Returns an array of adjusted scores (after reverse scoring).
 */
export function getScoresForFacet(
  facet: Facet,
  responses: QuestionResponse[]
): number[] {
  const facetQuestions = questions.filter(q => q.facet === facet);
  const scores: number[] = [];
  
  for (const question of facetQuestions) {
    const response = responses.find(r => r.questionId === question.id);
    if (response) {
      const adjustedScore = applyReverseScoring(response.value, question.reverseScored);
      scores.push(adjustedScore);
    }
  }
  
  return scores;
}

/**
 * Calculate the score for a single facet.
 * Returns the raw mean score (1-5) and percent score (0-100).
 */
export function calculateFacetScore(
  facet: Facet,
  responses: QuestionResponse[]
): FacetScore {
  const scores = getScoresForFacet(facet, responses);
  const rawScore = calculateMean(scores);
  
  return {
    facet,
    rawScore: Math.round(rawScore * 100) / 100, // Round to 2 decimal places
    percentScore: rawToPercent(rawScore),
    itemCount: scores.length
  };
}

/**
 * Calculate the score for a single Big Five trait.
 * The trait score is the mean of its 6 facet scores.
 */
export function calculateTraitScore(
  trait: BigFiveTrait,
  responses: QuestionResponse[]
): TraitScore {
  const facets = FACETS_BY_TRAIT[trait];
  const facetScores: FacetScore[] = facets.map(facet => 
    calculateFacetScore(facet, responses)
  );
  
  // Calculate trait score as mean of facet raw scores
  const facetRawScores = facetScores.map(f => f.rawScore);
  const traitRawScore = calculateMean(facetRawScores);
  
  // For neuroticism, we invert the score to present as "Emotional Stability"
  // This provides a more positive framing while maintaining scientific accuracy
  let displayRawScore = traitRawScore;
  let displayFacetScores = facetScores;
  
  if (trait === 'neuroticism') {
    // Invert: high neuroticism (5) becomes low emotional stability (1)
    // and vice versa
    displayRawScore = 6 - traitRawScore;
    displayFacetScores = facetScores.map(fs => ({
      ...fs,
      rawScore: Math.round((6 - fs.rawScore) * 100) / 100,
      percentScore: rawToPercent(6 - fs.rawScore)
    }));
  }
  
  return {
    trait,
    rawScore: Math.round(displayRawScore * 100) / 100,
    percentScore: rawToPercent(displayRawScore),
    facets: displayFacetScores
  };
}

/**
 * Calculate all Big Five trait scores and their facets.
 * This is the main scoring function that produces the complete results.
 */
export function calculateAllScores(
  responses: QuestionResponse[],
  sessionId: string
): TestResults {
  const traits: TraitScore[] = BIG_FIVE_TRAITS.map(trait =>
    calculateTraitScore(trait, responses)
  );
  
  return {
    sessionId,
    completedAt: Date.now(),
    traits
  };
}

/**
 * Validate that all 120 questions have been answered.
 */
export function validateResponses(responses: QuestionResponse[]): {
  isValid: boolean;
  missingQuestions: number[];
  message: string;
} {
  const answeredIds = new Set(responses.map(r => r.questionId));
  const missingQuestions: number[] = [];
  
  for (let i = 1; i <= 120; i++) {
    if (!answeredIds.has(i)) {
      missingQuestions.push(i);
    }
  }
  
  return {
    isValid: missingQuestions.length === 0,
    missingQuestions,
    message: missingQuestions.length === 0 
      ? 'All questions answered'
      : `Missing responses for questions: ${missingQuestions.join(', ')}`
  };
}

/**
 * Get a descriptive score range based on percent score.
 * Low: 0-35%
 * Moderate: 36-65%
 * High: 66-100%
 */
export function getScoreRange(percentScore: number): 'low' | 'moderate' | 'high' {
  if (percentScore <= 35) return 'low';
  if (percentScore <= 65) return 'moderate';
  return 'high';
}

/**
 * Generate a score breakdown for debugging/verification purposes.
 */
export function generateScoreBreakdown(
  responses: QuestionResponse[]
): { 
  questionId: number; 
  text: string;
  response: number; 
  isReversed: boolean;
  adjustedScore: number;
  trait: string;
  facet: string;
}[] {
  return responses.map(response => {
    const question = getQuestionById(response.questionId);
    if (!question) {
      throw new Error(`Question ${response.questionId} not found`);
    }
    
    return {
      questionId: question.id,
      text: question.text,
      response: response.value,
      isReversed: question.reverseScored,
      adjustedScore: applyReverseScoring(response.value, question.reverseScored),
      trait: question.trait,
      facet: question.facet
    };
  });
}

// Example usage and verification
export function runScoringExample(): void {
  console.log('=== IPIP-NEO-120 Scoring Algorithm ===\n');
  
  // Example: Generate mock responses (all neutral = 3)
  const mockResponses: QuestionResponse[] = Array.from({ length: 120 }, (_, i) => ({
    questionId: i + 1,
    value: 3 as LikertValue,
    timestamp: Date.now()
  }));
  
  const results = calculateAllScores(mockResponses, 'test-session');
  
  console.log('All-neutral responses (3) should yield ~50% scores:\n');
  for (const trait of results.traits) {
    console.log(`${trait.trait}: ${trait.percentScore}%`);
    for (const facet of trait.facets) {
      console.log(`  - ${facet.facet}: ${facet.percentScore}%`);
    }
  }
}
