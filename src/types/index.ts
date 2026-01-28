/**
 * IPIP-NEO-120 Big Five Personality Test Type Definitions
 *
 * Based on the International Personality Item Pool representation of the
 * NEO-PI-R™ (Costa & McCrae, 1992). Uses public domain items.
 */

// ============================================================================
// Big Five Traits (OCEAN Model)
// ============================================================================

export type BigFiveTrait =
  | 'openness'
  | 'conscientiousness'
  | 'extraversion'
  | 'agreeableness'
  | 'neuroticism';

export const BIG_FIVE_TRAITS: BigFiveTrait[] = [
  'openness',
  'conscientiousness',
  'extraversion',
  'agreeableness',
  'neuroticism',
];

export const TRAIT_LABELS: Record<BigFiveTrait, string> = {
  openness: 'Openness to Experience',
  conscientiousness: 'Conscientiousness',
  extraversion: 'Extraversion',
  agreeableness: 'Agreeableness',
  neuroticism: 'Emotional Stability', // Framed positively
};

export const TRAIT_SHORT_LABELS: Record<BigFiveTrait, string> = {
  openness: 'Openness',
  conscientiousness: 'Conscientiousness',
  extraversion: 'Extraversion',
  agreeableness: 'Agreeableness',
  neuroticism: 'Emotional Stability',
};

// ============================================================================
// Facets (6 per trait = 30 total)
// ============================================================================

export type OpennessFacet =
  | 'imagination'
  | 'artistic_interests'
  | 'emotionality'
  | 'adventurousness'
  | 'intellect'
  | 'liberalism';

export type ConscientiousnessFacet =
  | 'self_efficacy'
  | 'orderliness'
  | 'dutifulness'
  | 'achievement_striving'
  | 'self_discipline'
  | 'cautiousness';

export type ExtraversionFacet =
  | 'friendliness'
  | 'gregariousness'
  | 'assertiveness'
  | 'activity_level'
  | 'excitement_seeking'
  | 'cheerfulness';

export type AgreeablenessFacet =
  | 'trust'
  | 'morality'
  | 'altruism'
  | 'cooperation'
  | 'modesty'
  | 'sympathy';

export type NeuroticismFacet =
  | 'anxiety'
  | 'anger'
  | 'depression'
  | 'self_consciousness'
  | 'immoderation'
  | 'vulnerability';

export type Facet =
  | OpennessFacet
  | ConscientiousnessFacet
  | ExtraversionFacet
  | AgreeablenessFacet
  | NeuroticismFacet;

export const FACETS_BY_TRAIT: Record<BigFiveTrait, Facet[]> = {
  openness: [
    'imagination',
    'artistic_interests',
    'emotionality',
    'adventurousness',
    'intellect',
    'liberalism',
  ],
  conscientiousness: [
    'self_efficacy',
    'orderliness',
    'dutifulness',
    'achievement_striving',
    'self_discipline',
    'cautiousness',
  ],
  extraversion: [
    'friendliness',
    'gregariousness',
    'assertiveness',
    'activity_level',
    'excitement_seeking',
    'cheerfulness',
  ],
  agreeableness: [
    'trust',
    'morality',
    'altruism',
    'cooperation',
    'modesty',
    'sympathy',
  ],
  neuroticism: [
    'anxiety',
    'anger',
    'depression',
    'self_consciousness',
    'immoderation',
    'vulnerability',
  ],
};

export const FACET_LABELS: Record<Facet, string> = {
  // Openness
  imagination: 'Imagination',
  artistic_interests: 'Artistic Interests',
  emotionality: 'Emotionality',
  adventurousness: 'Adventurousness',
  intellect: 'Intellect',
  liberalism: 'Liberalism',
  // Conscientiousness
  self_efficacy: 'Self-Efficacy',
  orderliness: 'Orderliness',
  dutifulness: 'Dutifulness',
  achievement_striving: 'Achievement-Striving',
  self_discipline: 'Self-Discipline',
  cautiousness: 'Cautiousness',
  // Extraversion
  friendliness: 'Friendliness',
  gregariousness: 'Gregariousness',
  assertiveness: 'Assertiveness',
  activity_level: 'Activity Level',
  excitement_seeking: 'Excitement-Seeking',
  cheerfulness: 'Cheerfulness',
  // Agreeableness
  trust: 'Trust',
  morality: 'Morality',
  altruism: 'Altruism',
  cooperation: 'Cooperation',
  modesty: 'Modesty',
  sympathy: 'Sympathy',
  // Neuroticism
  anxiety: 'Anxiety',
  anger: 'Anger',
  depression: 'Depression',
  self_consciousness: 'Self-Consciousness',
  immoderation: 'Immoderation',
  vulnerability: 'Vulnerability',
};

// ============================================================================
// Question Schema
// ============================================================================

export interface Question {
  id: number;
  text: string;
  trait: BigFiveTrait;
  facet: Facet;
  reverseScored: boolean;
}

// ============================================================================
// Likert Scale
// ============================================================================

export type LikertValue = 1 | 2 | 3 | 4 | 5;

export const LIKERT_SCALE: {
  value: LikertValue;
  label: string;
  shortLabel: string;
}[] = [
  { value: 1, label: 'Very Inaccurate', shortLabel: 'Very Inaccurate' },
  { value: 2, label: 'Moderately Inaccurate', shortLabel: 'Inaccurate' },
  { value: 3, label: 'Neither Accurate Nor Inaccurate', shortLabel: 'Neutral' },
  { value: 4, label: 'Moderately Accurate', shortLabel: 'Accurate' },
  { value: 5, label: 'Very Accurate', shortLabel: 'Very Accurate' },
];

// ============================================================================
// Response and Results
// ============================================================================

export interface QuestionResponse {
  questionId: number;
  value: LikertValue;
  timestamp: number;
}

export interface TestSession {
  id: string;
  startedAt: number;
  completedAt?: number;
  currentQuestionIndex: number;
  responses: QuestionResponse[];
}

export interface FacetScore {
  facet: Facet;
  rawScore: number; // Mean of item scores (1-5)
  percentScore: number; // Normalized to 0-100
  itemCount: number;
}

export interface TraitScore {
  trait: BigFiveTrait;
  rawScore: number; // Mean of facet scores (1-5)
  percentScore: number; // Normalized to 0-100
  facets: FacetScore[];
}

export interface TestResults {
  sessionId: string;
  completedAt: number;
  traits: TraitScore[];
}

// ============================================================================
// Interpretation
// ============================================================================

export type ScoreRange = 'low' | 'moderate' | 'high';

export interface Interpretation {
  range: ScoreRange;
  description: string;
}

export interface TraitInterpretation {
  trait: BigFiveTrait;
  interpretations: Record<ScoreRange, string>;
}

export interface FacetInterpretation {
  facet: Facet;
  trait: BigFiveTrait;
  interpretations: Record<ScoreRange, string>;
}
