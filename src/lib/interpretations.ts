/**
 * Psychological Interpretation Engine
 *
 * This module generates meaningful, responsible interpretations for Big Five
 * personality results. Key principles:
 *
 * 1. Frame results as tendencies, not fixed traits
 * 2. Avoid deterministic or identity-defining language
 * 3. Use neutral, respectful tone
 * 4. No clinical or diagnostic language
 * 5. Encourage self-reflection, not self-labeling
 */

import {
  BigFiveTrait,
  Facet,
  ScoreRange,
  TraitInterpretation,
  FacetInterpretation,
  TraitScore,
  FacetScore,
  TRAIT_LABELS,
  TRAIT_SHORT_LABELS,
  FACET_LABELS,
} from '../types';
import { getScoreRange } from './scoring';

// ============================================================================
// TRAIT INTERPRETATIONS
// ============================================================================

export const traitInterpretations: TraitInterpretation[] = [
  {
    trait: 'openness',
    interpretations: {
      low: 'You tend to appreciate familiar routines and practical, concrete thinking. You may prefer straightforward approaches and traditional methods. This can be a strength in roles requiring consistency and a focus on proven solutions.',
      moderate:
        'You show a balanced approach to new experiences and ideas. You can appreciate both innovation and tradition, adapting your approach based on the situation. This flexibility allows you to engage with novel concepts while also valuing practical considerations.',
      high: 'You tend to be drawn to new ideas, creative expression, and intellectual exploration. You may enjoy abstract thinking, artistic experiences, and considering unconventional perspectives. This openness can be valuable in creative and innovative endeavors.',
    },
  },
  {
    trait: 'conscientiousness',
    interpretations: {
      low: 'You tend toward a flexible, spontaneous approach to tasks and responsibilities. You may prefer to adapt to situations as they arise rather than following strict plans. This can be beneficial in dynamic environments requiring quick adaptation.',
      moderate:
        'You show a balanced approach to organization and flexibility. You can be methodical when needed while also adapting to changing circumstances. This allows you to meet responsibilities while remaining responsive to unexpected situations.',
      high: 'You tend to be organized, thorough, and goal-oriented in your approach to tasks. You may value planning, reliability, and attention to detail. These tendencies can be strengths in roles requiring persistence and careful execution.',
    },
  },
  {
    trait: 'extraversion',
    interpretations: {
      low: 'You tend to prefer quieter environments and may find solitude energizing. You might favor deep conversations with close friends over large social gatherings. This reflective nature can be valuable for roles requiring independent focus and careful consideration.',
      moderate:
        'You show a balanced social orientation. You can enjoy social interactions while also appreciating time alone. This flexibility allows you to adapt to various social situations and find energy from both group activities and solitary pursuits.',
      high: 'You tend to be energized by social interactions and may enjoy being around others. You might naturally take initiative in group settings and feel comfortable in the spotlight. These tendencies can be valuable in collaborative and leadership roles.',
    },
  },
  {
    trait: 'agreeableness',
    interpretations: {
      low: 'You tend to prioritize directness and may be comfortable with competition and critical analysis. You might value objective evaluation over social harmony in certain situations. This can be valuable in roles requiring tough decisions and skeptical analysis.',
      moderate:
        'You show a balanced approach to interpersonal interactions. You can be cooperative and empathetic while also being willing to assert your position when needed. This allows you to maintain relationships while still advocating for your interests.',
      high: "You tend to value harmony, cooperation, and the wellbeing of others. You may naturally consider others' perspectives and prefer collaborative approaches. These tendencies can be strengths in team settings and helping professions.",
    },
  },
  {
    trait: 'neuroticism',
    interpretations: {
      low: 'You may experience more frequent emotional fluctuations and sensitivity to stress. This emotional awareness can provide valuable information about your environment and relationships. It may be helpful to develop coping strategies that work for you.',
      moderate:
        'You show a balanced emotional responsiveness. You experience a range of emotions while generally maintaining equilibrium. This allows you to be attuned to emotional cues while also maintaining stability in various situations.',
      high: 'You tend to maintain emotional stability across various situations. You may find it easier to stay calm under pressure and recover from setbacks. This resilience can be valuable in high-stress environments and leadership roles.',
    },
  },
];

// ============================================================================
// FACET INTERPRETATIONS
// ============================================================================

export const facetInterpretations: FacetInterpretation[] = [
  // Openness Facets
  {
    facet: 'imagination',
    trait: 'openness',
    interpretations: {
      low: 'You tend to focus on concrete, practical matters and may prefer dealing with the real world as it is rather than imagining how it could be different.',
      moderate:
        'You balance practical thinking with occasional imaginative exploration, able to engage with both realistic and creative perspectives as situations require.',
      high: 'You tend to have an active imagination and may often engage in creative thinking, daydreaming, or envisioning possibilities beyond the present reality.',
    },
  },
  {
    facet: 'artistic_interests',
    trait: 'openness',
    interpretations: {
      low: 'You may be less drawn to artistic or aesthetic experiences, preferring practical activities over engagement with art, music, or beauty for its own sake.',
      moderate:
        'You appreciate beauty and art in moderation, enjoying aesthetic experiences while not making them a central focus of your life.',
      high: 'You tend to be drawn to beauty, art, and aesthetic experiences. You may find deep meaning in creative expression and notice beauty that others might overlook.',
    },
  },
  {
    facet: 'emotionality',
    trait: 'openness',
    interpretations: {
      low: 'You may tend to be less aware of or less expressive about your emotional states, taking a more detached approach to your inner emotional life.',
      moderate:
        'You have a balanced awareness of your emotions, neither overly detached nor intensely focused on your emotional experiences.',
      high: 'You tend to be highly aware of your emotions and may experience them intensely. This emotional depth can enrich your experiences and relationships.',
    },
  },
  {
    facet: 'adventurousness',
    trait: 'openness',
    interpretations: {
      low: 'You tend to prefer familiar routines and environments over novel experiences. You may find comfort in predictability and established patterns.',
      moderate:
        'You balance enjoyment of routine with occasional willingness to try new things, adapting your approach based on the situation.',
      high: 'You tend to seek out new experiences and variety. You may become restless with too much routine and enjoy exploring unfamiliar places and activities.',
    },
  },
  {
    facet: 'intellect',
    trait: 'openness',
    interpretations: {
      low: 'You may prefer straightforward, practical thinking over abstract intellectual pursuits. You might favor hands-on learning over theoretical discussion.',
      moderate:
        'You engage with intellectual topics when relevant while also appreciating practical, concrete approaches to problems.',
      high: 'You tend to enjoy intellectual challenges, philosophical discussions, and exploring complex ideas. Abstract thinking may come naturally to you.',
    },
  },
  {
    facet: 'liberalism',
    trait: 'openness',
    interpretations: {
      low: 'You may tend toward traditional values and established social conventions, finding comfort in time-tested approaches and structures.',
      moderate:
        'You balance respect for tradition with openness to change, evaluating new and established approaches on their merits.',
      high: 'You may tend to question authority and traditional values, often favoring progressive approaches and social change.',
    },
  },

  // Conscientiousness Facets
  {
    facet: 'self_efficacy',
    trait: 'conscientiousness',
    interpretations: {
      low: 'You may sometimes doubt your ability to accomplish tasks or handle challenges. Building confidence through small successes can be helpful.',
      moderate:
        'You have a realistic sense of your capabilities, confident in some areas while recognizing limitations in others.',
      high: 'You tend to feel confident in your ability to accomplish what you set out to do. You may believe in your capacity to handle challenges effectively.',
    },
  },
  {
    facet: 'orderliness',
    trait: 'conscientiousness',
    interpretations: {
      low: 'You may prefer a flexible, less structured approach to organizing your environment and activities. You might thrive in creative disorder.',
      moderate:
        'You maintain reasonable organization while not being overly rigid about neatness or structure in your environment.',
      high: 'You tend to value order and organization. You may prefer having things in their proper place and following systematic approaches.',
    },
  },
  {
    facet: 'dutifulness',
    trait: 'conscientiousness',
    interpretations: {
      low: 'You may prioritize flexibility over strict adherence to rules and obligations, preferring to evaluate situations individually.',
      moderate:
        'You balance respect for rules and obligations with pragmatic flexibility when circumstances warrant.',
      high: 'You tend to take your obligations seriously and feel a strong sense of duty. Keeping promises and following through on commitments is likely important to you.',
    },
  },
  {
    facet: 'achievement_striving',
    trait: 'conscientiousness',
    interpretations: {
      low: 'You may be content with meeting basic requirements rather than striving for exceptional achievement. Work-life balance may be a priority.',
      moderate:
        'You pursue achievement in areas important to you while maintaining balance and not being driven solely by accomplishment.',
      high: 'You tend to be driven to achieve and excel. Setting and pursuing ambitious goals may be central to how you approach work and life.',
    },
  },
  {
    facet: 'self_discipline',
    trait: 'conscientiousness',
    interpretations: {
      low: 'You may find it challenging to persist with difficult or unpleasant tasks. Breaking work into smaller steps might be helpful.',
      moderate:
        "You can maintain focus and persistence when motivated, though you may sometimes struggle with tasks that don't engage you.",
      high: "You tend to persist in completing tasks even when they're difficult or uninteresting. Self-motivation comes relatively naturally to you.",
    },
  },
  {
    facet: 'cautiousness',
    trait: 'conscientiousness',
    interpretations: {
      low: 'You may tend to make quick decisions and act spontaneously, which can be beneficial in fast-paced environments but may sometimes lead to hasty choices.',
      moderate:
        'You balance thoughtful deliberation with timely action, considering options without excessive delay.',
      high: 'You tend to think carefully before acting and may avoid hasty decisions. This caution can help prevent mistakes but may sometimes slow decision-making.',
    },
  },

  // Extraversion Facets
  {
    facet: 'friendliness',
    trait: 'extraversion',
    interpretations: {
      low: 'You may take time to warm up to new people and prefer to keep a certain distance initially. Deep relationships may be more appealing than numerous acquaintances.',
      moderate:
        'You can be warm and friendly when appropriate while also being comfortable maintaining professional distance.',
      high: 'You tend to be warm and approachable, often making others feel welcome. Building rapport with new people may come naturally to you.',
    },
  },
  {
    facet: 'gregariousness',
    trait: 'extraversion',
    interpretations: {
      low: 'You may prefer smaller, quieter gatherings or solitary activities over large social events. You might find crowds draining.',
      moderate:
        'You enjoy social gatherings in moderation, comfortable in groups but also appreciating quiet time.',
      high: 'You tend to enjoy being around others and may seek out social gatherings. You might feel energized by crowds and group activities.',
    },
  },
  {
    facet: 'assertiveness',
    trait: 'extraversion',
    interpretations: {
      low: 'You may prefer to let others take the lead and might be more comfortable in supporting roles rather than directing others.',
      moderate:
        "You can assert yourself and take charge when needed while also being comfortable following others' lead.",
      high: 'You tend to speak up, take charge, and direct activities. Leadership roles and influencing others may feel natural to you.',
    },
  },
  {
    facet: 'activity_level',
    trait: 'extraversion',
    interpretations: {
      low: 'You may prefer a slower, more relaxed pace of life. You might value leisure and may not feel the need to always be busy.',
      moderate:
        'You balance activity with rest, maintaining a sustainable pace that includes both productive periods and downtime.',
      high: 'You tend to maintain a high level of activity and may feel best when staying busy. A fast-paced lifestyle may appeal to you.',
    },
  },
  {
    facet: 'excitement_seeking',
    trait: 'extraversion',
    interpretations: {
      low: 'You may prefer calm, predictable environments over excitement and thrills. Safety and comfort may be priorities.',
      moderate:
        'You enjoy occasional excitement while also appreciating calm and predictability in your daily life.',
      high: 'You tend to seek stimulation, excitement, and thrills. You may be drawn to activities that provide an adrenaline rush.',
    },
  },
  {
    facet: 'cheerfulness',
    trait: 'extraversion',
    interpretations: {
      low: 'You may tend toward a more serious demeanor and might not express positive emotions as readily as others.',
      moderate:
        'You experience and express positive emotions while maintaining a balanced, realistic outlook.',
      high: 'You tend to experience and express positive emotions readily. Others may perceive you as joyful, optimistic, and fun to be around.',
    },
  },

  // Agreeableness Facets
  {
    facet: 'trust',
    trait: 'agreeableness',
    interpretations: {
      low: "You may tend to be cautious about trusting others and might be more vigilant about others' motives. This can protect you but may also limit connection.",
      moderate:
        'You balance trust with appropriate caution, giving people the benefit of the doubt while remaining aware of potential risks.',
      high: 'You tend to believe in the good intentions of others and may give people the benefit of the doubt. Building trust with others may come easily.',
    },
  },
  {
    facet: 'morality',
    trait: 'agreeableness',
    interpretations: {
      low: 'You may be more willing to bend rules or use strategic behavior when it serves your goals. You might view social norms pragmatically.',
      moderate:
        'You generally adhere to ethical standards while recognizing that situations sometimes call for pragmatic flexibility.',
      high: 'You tend to value straightforward, honest dealings and may be uncomfortable with manipulation or deception, even when it might benefit you.',
    },
  },
  {
    facet: 'altruism',
    trait: 'agreeableness',
    interpretations: {
      low: 'You may prioritize your own needs and goals, which can be important for self-care but might sometimes come across as indifferent to others.',
      moderate:
        'You balance concern for others with attention to your own needs, helping when you can without neglecting yourself.',
      high: "You tend to genuinely care about others' wellbeing and may go out of your way to help. Others may see you as generous and caring.",
    },
  },
  {
    facet: 'cooperation',
    trait: 'agreeableness',
    interpretations: {
      low: "You may be more willing to engage in conflict or competition and might not shy away from confrontation when you believe you're right.",
      moderate:
        'You can cooperate and compromise while also being willing to stand firm on important issues.',
      high: "You tend to prefer harmony and may dislike confrontation. You might accommodate others' wishes to maintain peaceful relationships.",
    },
  },
  {
    facet: 'modesty',
    trait: 'agreeableness',
    interpretations: {
      low: 'You may be comfortable acknowledging your accomplishments and might enjoy recognition. This confidence can be valuable in competitive contexts.',
      moderate:
        'You can acknowledge your achievements appropriately while avoiding excessive boasting or false modesty.',
      high: 'You tend to be humble and may downplay your accomplishments. You might feel uncomfortable being the center of attention.',
    },
  },
  {
    facet: 'sympathy',
    trait: 'agreeableness',
    interpretations: {
      low: "You may take a more objective, less emotionally engaged approach to others' problems, which can be useful for making tough decisions.",
      moderate:
        'You feel compassion for others while maintaining enough emotional distance to offer practical help.',
      high: "You tend to be moved by others' suffering and may feel a strong desire to help those in need. Empathy may come naturally to you.",
    },
  },

  // Neuroticism Facets (inverted for Emotional Stability framing)
  {
    facet: 'anxiety',
    trait: 'neuroticism',
    interpretations: {
      low: 'You may experience worry more frequently than others, which can help you anticipate problems but may also cause unnecessary stress. Developing calming practices might be beneficial.',
      moderate:
        'You experience normal levels of concern, worried when appropriate but generally able to manage anxious feelings.',
      high: 'You tend to remain calm and free from persistent worries. You may find it easier than others to feel secure and relaxed.',
    },
  },
  {
    facet: 'anger',
    trait: 'neuroticism',
    interpretations: {
      low: 'You may experience frustration and irritation more readily, which can signal when boundaries are crossed but may also strain relationships if not managed.',
      moderate:
        'You experience and express anger appropriately, feeling frustrated when warranted but generally maintaining control.',
      high: 'You tend to remain even-tempered and may not anger easily. You might find it relatively easy to stay calm when things go wrong.',
    },
  },
  {
    facet: 'depression',
    trait: 'neuroticism',
    interpretations: {
      low: 'You may be more prone to feelings of sadness or discouragement. If persistent low mood affects your daily life, speaking with a professional might be helpful.',
      moderate:
        'You experience normal fluctuations in mood, feeling down sometimes but generally maintaining a sense of wellbeing.',
      high: 'You tend to feel content and satisfied with life. Bouncing back from disappointments may come relatively easily to you.',
    },
  },
  {
    facet: 'self_consciousness',
    trait: 'neuroticism',
    interpretations: {
      low: 'You may be more sensitive to how others perceive you, which can motivate social awareness but may also cause discomfort in social situations.',
      moderate:
        "You have normal social awareness without excessive concern about others' judgments of you.",
      high: 'You tend to feel comfortable in social situations and may not worry much about what others think. Social confidence may come naturally.',
    },
  },
  {
    facet: 'immoderation',
    trait: 'neuroticism',
    interpretations: {
      low: 'You may find it more challenging to resist temptations and impulses. Developing strategies for self-regulation might be helpful.',
      moderate:
        'You can generally control impulses while occasionally indulging, maintaining a reasonable balance.',
      high: 'You tend to have good control over your impulses and cravings. Resisting temptations may come relatively easily to you.',
    },
  },
  {
    facet: 'vulnerability',
    trait: 'neuroticism',
    interpretations: {
      low: 'You may feel more overwhelmed by stress and pressure. Building coping resources and support systems can help manage challenging periods.',
      moderate:
        'You handle normal stresses effectively while recognizing that exceptional pressures can be challenging.',
      high: 'You tend to handle stress well and may remain composed under pressure. Recovering from difficulties may come relatively easily.',
    },
  },
];

// ============================================================================
// INTERPRETATION FUNCTIONS
// ============================================================================

/**
 * Get the interpretation for a trait based on its percent score.
 */
export function getTraitInterpretation(
  trait: BigFiveTrait,
  percentScore: number,
): string {
  const range = getScoreRange(percentScore);
  const interpretation = traitInterpretations.find((t) => t.trait === trait);
  return interpretation?.interpretations[range] || '';
}

/**
 * Get the interpretation for a facet based on its percent score.
 */
export function getFacetInterpretation(
  facet: Facet,
  percentScore: number,
): string {
  const range = getScoreRange(percentScore);
  const interpretation = facetInterpretations.find((f) => f.facet === facet);
  return interpretation?.interpretations[range] || '';
}

/**
 * Generate a complete interpretation report for all traits and facets.
 */
export interface InterpretationReport {
  trait: BigFiveTrait;
  traitLabel: string;
  score: number;
  range: ScoreRange;
  traitInterpretation: string;
  facets: {
    facet: Facet;
    facetLabel: string;
    score: number;
    range: ScoreRange;
    interpretation: string;
  }[];
}

export function generateInterpretationReport(
  traitScores: TraitScore[],
): InterpretationReport[] {
  return traitScores.map((ts) => ({
    trait: ts.trait,
    traitLabel: TRAIT_LABELS[ts.trait],
    score: ts.percentScore,
    range: getScoreRange(ts.percentScore),
    traitInterpretation: getTraitInterpretation(ts.trait, ts.percentScore),
    facets: ts.facets.map((fs) => ({
      facet: fs.facet,
      facetLabel: FACET_LABELS[fs.facet],
      score: fs.percentScore,
      range: getScoreRange(fs.percentScore),
      interpretation: getFacetInterpretation(fs.facet, fs.percentScore),
    })),
  }));
}

/**
 * Get a summary description based on score range.
 */
export function getScoreRangeLabel(range: ScoreRange): string {
  switch (range) {
    case 'low':
      return 'Lower Range';
    case 'moderate':
      return 'Moderate Range';
    case 'high':
      return 'Higher Range';
  }
}

/**
 * Get color class for a trait (for UI styling).
 */
export function getTraitColorClass(trait: BigFiveTrait): string {
  switch (trait) {
    case 'openness':
      return 'openness';
    case 'conscientiousness':
      return 'conscientiousness';
    case 'extraversion':
      return 'extraversion';
    case 'agreeableness':
      return 'agreeableness';
    case 'neuroticism':
      return 'neuroticism';
  }
}

/**
 * Get a brief one-line summary for a trait score.
 */
export function getTraitSummary(
  trait: BigFiveTrait,
  percentScore: number,
): string {
  const range = getScoreRange(percentScore);
  const summaries: Record<BigFiveTrait, Record<ScoreRange, string>> = {
    openness: {
      low: 'Tends toward practical, conventional approaches',
      moderate: 'Balances tradition with openness to new ideas',
      high: 'Tends toward creativity and intellectual exploration',
    },
    conscientiousness: {
      low: 'Tends toward flexibility and spontaneity',
      moderate: 'Balances organization with adaptability',
      high: 'Tends toward organization and goal achievement',
    },
    extraversion: {
      low: 'Tends toward reflection and quieter settings',
      moderate: 'Balances social engagement with solitude',
      high: 'Tends toward social engagement and energy',
    },
    agreeableness: {
      low: 'Tends toward directness and skepticism',
      moderate: 'Balances cooperation with self-advocacy',
      high: 'Tends toward cooperation and empathy',
    },
    neuroticism: {
      low: 'May experience more emotional sensitivity',
      moderate: 'Shows balanced emotional responsiveness',
      high: 'Tends toward emotional stability and calm',
    },
  };

  return summaries[trait][range];
}
