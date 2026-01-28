/**
 * IPIP-NEO-120 Question Bank
 *
 * This file contains all 120 items from the IPIP representation of the NEO-PI-R.
 * Items are from the public domain International Personality Item Pool (ipip.ori.org).
 *
 * Structure:
 * - 5 Big Five traits
 * - 6 facets per trait (30 total)
 * - 4 items per facet (120 total)
 * - 2 positively keyed + 2 negatively keyed items per facet
 *
 * Scoring:
 * - Regular items: 1=Very Inaccurate to 5=Very Accurate
 * - Reverse-scored items: 5=Very Inaccurate to 1=Very Accurate (6 - response)
 */

import { Question } from '../types';

export const questions: Question[] = [
  // ============================================================================
  // OPENNESS TO EXPERIENCE
  // ============================================================================

  // O1: Imagination
  {
    id: 1,
    text: 'I have a vivid imagination.',
    trait: 'openness',
    facet: 'imagination',
    reverseScored: false,
  },
  {
    id: 2,
    text: 'I have difficulty imagining things.',
    trait: 'openness',
    facet: 'imagination',
    reverseScored: true,
  },
  {
    id: 3,
    text: 'I love to daydream.',
    trait: 'openness',
    facet: 'imagination',
    reverseScored: false,
  },
  {
    id: 4,
    text: 'I seldom daydream.',
    trait: 'openness',
    facet: 'imagination',
    reverseScored: true,
  },

  // O2: Artistic Interests
  {
    id: 5,
    text: 'I believe in the importance of art.',
    trait: 'openness',
    facet: 'artistic_interests',
    reverseScored: false,
  },
  {
    id: 6,
    text: 'I am not interested in abstract ideas.',
    trait: 'openness',
    facet: 'artistic_interests',
    reverseScored: true,
  },
  {
    id: 7,
    text: 'I see beauty in things that others might not notice.',
    trait: 'openness',
    facet: 'artistic_interests',
    reverseScored: false,
  },
  {
    id: 8,
    text: 'I do not like art.',
    trait: 'openness',
    facet: 'artistic_interests',
    reverseScored: true,
  },

  // O3: Emotionality
  {
    id: 9,
    text: 'I experience my emotions intensely.',
    trait: 'openness',
    facet: 'emotionality',
    reverseScored: false,
  },
  {
    id: 10,
    text: 'I seldom get emotional.',
    trait: 'openness',
    facet: 'emotionality',
    reverseScored: true,
  },
  {
    id: 11,
    text: "I feel others' emotions.",
    trait: 'openness',
    facet: 'emotionality',
    reverseScored: false,
  },
  {
    id: 12,
    text: 'I seldom notice my emotional reactions.',
    trait: 'openness',
    facet: 'emotionality',
    reverseScored: true,
  },

  // O4: Adventurousness
  {
    id: 13,
    text: 'I prefer variety to routine.',
    trait: 'openness',
    facet: 'adventurousness',
    reverseScored: false,
  },
  {
    id: 14,
    text: 'I prefer to stick with things that I know.',
    trait: 'openness',
    facet: 'adventurousness',
    reverseScored: true,
  },
  {
    id: 15,
    text: 'I like to visit new places.',
    trait: 'openness',
    facet: 'adventurousness',
    reverseScored: false,
  },
  {
    id: 16,
    text: 'I am attached to conventional ways.',
    trait: 'openness',
    facet: 'adventurousness',
    reverseScored: true,
  },

  // O5: Intellect
  {
    id: 17,
    text: 'I like to solve complex problems.',
    trait: 'openness',
    facet: 'intellect',
    reverseScored: false,
  },
  {
    id: 18,
    text: 'I avoid philosophical discussions.',
    trait: 'openness',
    facet: 'intellect',
    reverseScored: true,
  },
  {
    id: 19,
    text: 'I enjoy thinking about things.',
    trait: 'openness',
    facet: 'intellect',
    reverseScored: false,
  },
  {
    id: 20,
    text: 'I have difficulty understanding abstract ideas.',
    trait: 'openness',
    facet: 'intellect',
    reverseScored: true,
  },

  // O6: Liberalism
  {
    id: 21,
    text: 'I tend to vote for liberal political candidates.',
    trait: 'openness',
    facet: 'liberalism',
    reverseScored: false,
  },
  {
    id: 22,
    text: 'I believe that we should be tough on crime.',
    trait: 'openness',
    facet: 'liberalism',
    reverseScored: true,
  },
  {
    id: 23,
    text: 'I believe in human goodness.',
    trait: 'openness',
    facet: 'liberalism',
    reverseScored: false,
  },
  {
    id: 24,
    text: 'I tend to vote for conservative political candidates.',
    trait: 'openness',
    facet: 'liberalism',
    reverseScored: true,
  },

  // ============================================================================
  // CONSCIENTIOUSNESS
  // ============================================================================

  // C1: Self-Efficacy
  {
    id: 25,
    text: 'I complete tasks successfully.',
    trait: 'conscientiousness',
    facet: 'self_efficacy',
    reverseScored: false,
  },
  {
    id: 26,
    text: 'I misjudge situations.',
    trait: 'conscientiousness',
    facet: 'self_efficacy',
    reverseScored: true,
  },
  {
    id: 27,
    text: 'I excel in what I do.',
    trait: 'conscientiousness',
    facet: 'self_efficacy',
    reverseScored: false,
  },
  {
    id: 28,
    text: "I don't understand things.",
    trait: 'conscientiousness',
    facet: 'self_efficacy',
    reverseScored: true,
  },

  // C2: Orderliness
  {
    id: 29,
    text: 'I like order.',
    trait: 'conscientiousness',
    facet: 'orderliness',
    reverseScored: false,
  },
  {
    id: 30,
    text: 'I leave my belongings around.',
    trait: 'conscientiousness',
    facet: 'orderliness',
    reverseScored: true,
  },
  {
    id: 31,
    text: 'I like to tidy up.',
    trait: 'conscientiousness',
    facet: 'orderliness',
    reverseScored: false,
  },
  {
    id: 32,
    text: 'I often forget to put things back in their proper place.',
    trait: 'conscientiousness',
    facet: 'orderliness',
    reverseScored: true,
  },

  // C3: Dutifulness
  {
    id: 33,
    text: 'I try to follow the rules.',
    trait: 'conscientiousness',
    facet: 'dutifulness',
    reverseScored: false,
  },
  {
    id: 34,
    text: 'I break rules.',
    trait: 'conscientiousness',
    facet: 'dutifulness',
    reverseScored: true,
  },
  {
    id: 35,
    text: 'I keep my promises.',
    trait: 'conscientiousness',
    facet: 'dutifulness',
    reverseScored: false,
  },
  {
    id: 36,
    text: 'I break my promises.',
    trait: 'conscientiousness',
    facet: 'dutifulness',
    reverseScored: true,
  },

  // C4: Achievement-Striving
  {
    id: 37,
    text: 'I work hard.',
    trait: 'conscientiousness',
    facet: 'achievement_striving',
    reverseScored: false,
  },
  {
    id: 38,
    text: 'I do just enough work to get by.',
    trait: 'conscientiousness',
    facet: 'achievement_striving',
    reverseScored: true,
  },
  {
    id: 39,
    text: 'I go straight for the goal.',
    trait: 'conscientiousness',
    facet: 'achievement_striving',
    reverseScored: false,
  },
  {
    id: 40,
    text: 'I am not highly motivated to succeed.',
    trait: 'conscientiousness',
    facet: 'achievement_striving',
    reverseScored: true,
  },

  // C5: Self-Discipline
  {
    id: 41,
    text: 'I get chores done right away.',
    trait: 'conscientiousness',
    facet: 'self_discipline',
    reverseScored: false,
  },
  {
    id: 42,
    text: 'I waste my time.',
    trait: 'conscientiousness',
    facet: 'self_discipline',
    reverseScored: true,
  },
  {
    id: 43,
    text: 'I carry out my plans.',
    trait: 'conscientiousness',
    facet: 'self_discipline',
    reverseScored: false,
  },
  {
    id: 44,
    text: 'I have difficulty starting tasks.',
    trait: 'conscientiousness',
    facet: 'self_discipline',
    reverseScored: true,
  },

  // C6: Cautiousness
  {
    id: 45,
    text: 'I avoid mistakes.',
    trait: 'conscientiousness',
    facet: 'cautiousness',
    reverseScored: false,
  },
  {
    id: 46,
    text: 'I rush into things.',
    trait: 'conscientiousness',
    facet: 'cautiousness',
    reverseScored: true,
  },
  {
    id: 47,
    text: 'I make plans and stick to them.',
    trait: 'conscientiousness',
    facet: 'cautiousness',
    reverseScored: false,
  },
  {
    id: 48,
    text: 'I do things without thinking.',
    trait: 'conscientiousness',
    facet: 'cautiousness',
    reverseScored: true,
  },

  // ============================================================================
  // EXTRAVERSION
  // ============================================================================

  // E1: Friendliness
  {
    id: 49,
    text: 'I make friends easily.',
    trait: 'extraversion',
    facet: 'friendliness',
    reverseScored: false,
  },
  {
    id: 50,
    text: 'I am hard to get to know.',
    trait: 'extraversion',
    facet: 'friendliness',
    reverseScored: true,
  },
  {
    id: 51,
    text: 'I warm up quickly to others.',
    trait: 'extraversion',
    facet: 'friendliness',
    reverseScored: false,
  },
  {
    id: 52,
    text: 'I keep others at a distance.',
    trait: 'extraversion',
    facet: 'friendliness',
    reverseScored: true,
  },

  // E2: Gregariousness
  {
    id: 53,
    text: 'I love large parties.',
    trait: 'extraversion',
    facet: 'gregariousness',
    reverseScored: false,
  },
  {
    id: 54,
    text: 'I prefer to be alone.',
    trait: 'extraversion',
    facet: 'gregariousness',
    reverseScored: true,
  },
  {
    id: 55,
    text: 'I enjoy being part of a group.',
    trait: 'extraversion',
    facet: 'gregariousness',
    reverseScored: false,
  },
  {
    id: 56,
    text: 'I avoid crowds.',
    trait: 'extraversion',
    facet: 'gregariousness',
    reverseScored: true,
  },

  // E3: Assertiveness
  {
    id: 57,
    text: 'I take charge.',
    trait: 'extraversion',
    facet: 'assertiveness',
    reverseScored: false,
  },
  {
    id: 58,
    text: 'I wait for others to lead the way.',
    trait: 'extraversion',
    facet: 'assertiveness',
    reverseScored: true,
  },
  {
    id: 59,
    text: 'I try to lead others.',
    trait: 'extraversion',
    facet: 'assertiveness',
    reverseScored: false,
  },
  {
    id: 60,
    text: 'I keep in the background.',
    trait: 'extraversion',
    facet: 'assertiveness',
    reverseScored: true,
  },

  // E4: Activity Level
  {
    id: 61,
    text: 'I am always busy.',
    trait: 'extraversion',
    facet: 'activity_level',
    reverseScored: false,
  },
  {
    id: 62,
    text: 'I like to take it easy.',
    trait: 'extraversion',
    facet: 'activity_level',
    reverseScored: true,
  },
  {
    id: 63,
    text: 'I am always on the go.',
    trait: 'extraversion',
    facet: 'activity_level',
    reverseScored: false,
  },
  {
    id: 64,
    text: 'I do a lot in my spare time.',
    trait: 'extraversion',
    facet: 'activity_level',
    reverseScored: false,
  },

  // E5: Excitement-Seeking
  {
    id: 65,
    text: 'I love excitement.',
    trait: 'extraversion',
    facet: 'excitement_seeking',
    reverseScored: false,
  },
  {
    id: 66,
    text: 'I would never go hang gliding or bungee jumping.',
    trait: 'extraversion',
    facet: 'excitement_seeking',
    reverseScored: true,
  },
  {
    id: 67,
    text: 'I seek adventure.',
    trait: 'extraversion',
    facet: 'excitement_seeking',
    reverseScored: false,
  },
  {
    id: 68,
    text: 'I dislike loud music.',
    trait: 'extraversion',
    facet: 'excitement_seeking',
    reverseScored: true,
  },

  // E6: Cheerfulness
  {
    id: 69,
    text: 'I radiate joy.',
    trait: 'extraversion',
    facet: 'cheerfulness',
    reverseScored: false,
  },
  {
    id: 70,
    text: 'I am not easily amused.',
    trait: 'extraversion',
    facet: 'cheerfulness',
    reverseScored: true,
  },
  {
    id: 71,
    text: 'I have a lot of fun.',
    trait: 'extraversion',
    facet: 'cheerfulness',
    reverseScored: false,
  },
  {
    id: 72,
    text: 'I seldom joke around.',
    trait: 'extraversion',
    facet: 'cheerfulness',
    reverseScored: true,
  },

  // ============================================================================
  // AGREEABLENESS
  // ============================================================================

  // A1: Trust
  {
    id: 73,
    text: 'I trust others.',
    trait: 'agreeableness',
    facet: 'trust',
    reverseScored: false,
  },
  {
    id: 74,
    text: 'I distrust people.',
    trait: 'agreeableness',
    facet: 'trust',
    reverseScored: true,
  },
  {
    id: 75,
    text: 'I believe that others have good intentions.',
    trait: 'agreeableness',
    facet: 'trust',
    reverseScored: false,
  },
  {
    id: 76,
    text: 'I suspect hidden motives in others.',
    trait: 'agreeableness',
    facet: 'trust',
    reverseScored: true,
  },

  // A2: Morality
  {
    id: 77,
    text: 'I would never cheat on my taxes.',
    trait: 'agreeableness',
    facet: 'morality',
    reverseScored: false,
  },
  {
    id: 78,
    text: 'I use flattery to get ahead.',
    trait: 'agreeableness',
    facet: 'morality',
    reverseScored: true,
  },
  {
    id: 79,
    text: 'I stick to my principles.',
    trait: 'agreeableness',
    facet: 'morality',
    reverseScored: false,
  },
  {
    id: 80,
    text: 'I pretend to be concerned for others.',
    trait: 'agreeableness',
    facet: 'morality',
    reverseScored: true,
  },

  // A3: Altruism
  {
    id: 81,
    text: 'I love to help others.',
    trait: 'agreeableness',
    facet: 'altruism',
    reverseScored: false,
  },
  {
    id: 82,
    text: 'I am indifferent to the feelings of others.',
    trait: 'agreeableness',
    facet: 'altruism',
    reverseScored: true,
  },
  {
    id: 83,
    text: 'I anticipate the needs of others.',
    trait: 'agreeableness',
    facet: 'altruism',
    reverseScored: false,
  },
  {
    id: 84,
    text: 'I look down on others.',
    trait: 'agreeableness',
    facet: 'altruism',
    reverseScored: true,
  },

  // A4: Cooperation
  {
    id: 85,
    text: 'I am easy to satisfy.',
    trait: 'agreeableness',
    facet: 'cooperation',
    reverseScored: false,
  },
  {
    id: 86,
    text: 'I have a sharp tongue.',
    trait: 'agreeableness',
    facet: 'cooperation',
    reverseScored: true,
  },
  {
    id: 87,
    text: "I can't stand confrontations.",
    trait: 'agreeableness',
    facet: 'cooperation',
    reverseScored: false,
  },
  {
    id: 88,
    text: 'I love a good fight.',
    trait: 'agreeableness',
    facet: 'cooperation',
    reverseScored: true,
  },

  // A5: Modesty
  {
    id: 89,
    text: 'I dislike being the center of attention.',
    trait: 'agreeableness',
    facet: 'modesty',
    reverseScored: false,
  },
  {
    id: 90,
    text: 'I think highly of myself.',
    trait: 'agreeableness',
    facet: 'modesty',
    reverseScored: true,
  },
  {
    id: 91,
    text: 'I seldom toot my own horn.',
    trait: 'agreeableness',
    facet: 'modesty',
    reverseScored: false,
  },
  {
    id: 92,
    text: 'I believe that I am better than others.',
    trait: 'agreeableness',
    facet: 'modesty',
    reverseScored: true,
  },

  // A6: Sympathy
  {
    id: 93,
    text: 'I sympathize with the homeless.',
    trait: 'agreeableness',
    facet: 'sympathy',
    reverseScored: false,
  },
  {
    id: 94,
    text: 'I believe in an eye for an eye.',
    trait: 'agreeableness',
    facet: 'sympathy',
    reverseScored: true,
  },
  {
    id: 95,
    text: 'I feel sympathy for those who are worse off than myself.',
    trait: 'agreeableness',
    facet: 'sympathy',
    reverseScored: false,
  },
  {
    id: 96,
    text: 'I try not to think about the needy.',
    trait: 'agreeableness',
    facet: 'sympathy',
    reverseScored: true,
  },

  // ============================================================================
  // NEUROTICISM (Scored as Emotional Stability for positive framing)
  // ============================================================================

  // N1: Anxiety
  {
    id: 97,
    text: 'I worry about things.',
    trait: 'neuroticism',
    facet: 'anxiety',
    reverseScored: false,
  },
  {
    id: 98,
    text: 'I am relaxed most of the time.',
    trait: 'neuroticism',
    facet: 'anxiety',
    reverseScored: true,
  },
  {
    id: 99,
    text: 'I fear for the worst.',
    trait: 'neuroticism',
    facet: 'anxiety',
    reverseScored: false,
  },
  {
    id: 100,
    text: 'I am not easily bothered by things.',
    trait: 'neuroticism',
    facet: 'anxiety',
    reverseScored: true,
  },

  // N2: Anger
  {
    id: 101,
    text: 'I get angry easily.',
    trait: 'neuroticism',
    facet: 'anger',
    reverseScored: false,
  },
  {
    id: 102,
    text: 'I rarely get irritated.',
    trait: 'neuroticism',
    facet: 'anger',
    reverseScored: true,
  },
  {
    id: 103,
    text: 'I lose my temper.',
    trait: 'neuroticism',
    facet: 'anger',
    reverseScored: false,
  },
  {
    id: 104,
    text: 'I seldom get mad.',
    trait: 'neuroticism',
    facet: 'anger',
    reverseScored: true,
  },

  // N3: Depression
  {
    id: 105,
    text: 'I often feel blue.',
    trait: 'neuroticism',
    facet: 'depression',
    reverseScored: false,
  },
  {
    id: 106,
    text: 'I feel comfortable with myself.',
    trait: 'neuroticism',
    facet: 'depression',
    reverseScored: true,
  },
  {
    id: 107,
    text: 'I dislike myself.',
    trait: 'neuroticism',
    facet: 'depression',
    reverseScored: false,
  },
  {
    id: 108,
    text: 'I am very pleased with myself.',
    trait: 'neuroticism',
    facet: 'depression',
    reverseScored: true,
  },

  // N4: Self-Consciousness
  {
    id: 109,
    text: 'I am easily intimidated.',
    trait: 'neuroticism',
    facet: 'self_consciousness',
    reverseScored: false,
  },
  {
    id: 110,
    text: 'I am not embarrassed easily.',
    trait: 'neuroticism',
    facet: 'self_consciousness',
    reverseScored: true,
  },
  {
    id: 111,
    text: 'I am afraid that I will do the wrong thing.',
    trait: 'neuroticism',
    facet: 'self_consciousness',
    reverseScored: false,
  },
  {
    id: 112,
    text: 'I am comfortable in unfamiliar situations.',
    trait: 'neuroticism',
    facet: 'self_consciousness',
    reverseScored: true,
  },

  // N5: Immoderation
  {
    id: 113,
    text: 'I go on binges.',
    trait: 'neuroticism',
    facet: 'immoderation',
    reverseScored: false,
  },
  {
    id: 114,
    text: 'I easily resist temptations.',
    trait: 'neuroticism',
    facet: 'immoderation',
    reverseScored: true,
  },
  {
    id: 115,
    text: 'I love to eat.',
    trait: 'neuroticism',
    facet: 'immoderation',
    reverseScored: false,
  },
  {
    id: 116,
    text: 'I am able to control my cravings.',
    trait: 'neuroticism',
    facet: 'immoderation',
    reverseScored: true,
  },

  // N6: Vulnerability
  {
    id: 117,
    text: 'I panic easily.',
    trait: 'neuroticism',
    facet: 'vulnerability',
    reverseScored: false,
  },
  {
    id: 118,
    text: 'I remain calm under pressure.',
    trait: 'neuroticism',
    facet: 'vulnerability',
    reverseScored: true,
  },
  {
    id: 119,
    text: 'I become overwhelmed by events.',
    trait: 'neuroticism',
    facet: 'vulnerability',
    reverseScored: false,
  },
  {
    id: 120,
    text: 'I can handle complex problems.',
    trait: 'neuroticism',
    facet: 'vulnerability',
    reverseScored: true,
  },
];

// Validate question count
if (questions.length !== 120) {
  console.error(`Expected 120 questions, got ${questions.length}`);
}

// Export utility functions
export const getQuestionsByTrait = (trait: string) =>
  questions.filter((q) => q.trait === trait);

export const getQuestionsByFacet = (facet: string) =>
  questions.filter((q) => q.facet === facet);

export const getQuestionById = (id: number) =>
  questions.find((q) => q.id === id);

export default questions;
