/**
 * Personality Insights Engine
 *
 * This module provides extended personality insights including:
 * - Interesting research-based facts about each trait
 * - Career environment suggestions
 * - Relationship insights
 * - Personal growth tips
 * - Famous figures with similar trait profiles
 *
 * All information is presented as tendencies, not absolutes.
 */

import { BigFiveTrait, ScoreRange } from '../types';
import { getScoreRange } from './scoring';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface TraitInsights {
  trait: BigFiveTrait;
  interestingFacts: string[];
  careerEnvironments: {
    low: string[];
    moderate: string[];
    high: string[];
  };
  relationshipInsights: {
    low: string;
    moderate: string;
    high: string;
  };
  growthTips: {
    low: string[];
    moderate: string[];
    high: string[];
  };
  famousFigures: {
    low: string[];
    high: string[];
  };
  strengths: {
    low: string[];
    moderate: string[];
    high: string[];
  };
  challenges: {
    low: string[];
    moderate: string[];
    high: string[];
  };
}

export interface PersonalizedInsight {
  trait: BigFiveTrait;
  score: number;
  range: ScoreRange;
  interestingFacts: string[];
  careerEnvironments: string[];
  relationshipInsight: string;
  growthTips: string[];
  famousFigures: string[];
  strengths: string[];
  challenges: string[];
}

export interface ProfileSummary {
  dominantTraits: BigFiveTrait[];
  personalityPattern: string;
  overallStrengths: string[];
  areasForGrowth: string[];
  idealEnvironments: string[];
  communicationStyle: string;
  stressResponse: string;
  motivationDrivers: string[];
}

// ============================================================================
// TRAIT INSIGHTS DATA
// ============================================================================

const traitInsightsData: TraitInsights[] = [
  {
    trait: 'openness',
    interestingFacts: [
      'Research shows that high Openness is associated with bilingualism and learning multiple languages more easily.',
      'People high in Openness tend to have more vivid dreams and better dream recall.',
      'Studies suggest Openness is the trait most strongly associated with creativity and artistic achievement.',
      'Openness tends to increase slightly with education and exposure to diverse cultures.',
      'This trait has the strongest genetic component among the Big Five, with about 57% heritability.',
      'High Openness is correlated with enjoying ambiguous art and abstract music.',
    ],
    careerEnvironments: {
      low: [
        'Structured corporate environments',
        'Quality assurance and compliance',
        'Accounting and financial analysis',
        'Operations management',
        'Technical support roles',
      ],
      moderate: [
        'Project management',
        'Business analysis',
        'Marketing with data focus',
        'Healthcare administration',
        'Educational coordination',
      ],
      high: [
        'Creative industries (art, design, writing)',
        'Research and academia',
        'Entrepreneurship and startups',
        'Strategic consulting',
        'Innovation and R&D departments',
      ],
    },
    relationshipInsights: {
      low: 'You may prefer partners who share your appreciation for routine and tradition. Clear expectations and stable patterns in relationships likely feel comfortable. You might find overly spontaneous partners challenging.',
      moderate:
        "You can adapt to partners with different levels of openness. You appreciate some adventure while also valuing stability. You're likely flexible about trying new things in relationships.",
      high: 'You may seek partners who enjoy intellectual discussions, trying new experiences, and exploring ideas together. Routine and predictability in relationships might feel stifling over time.',
    },
    growthTips: {
      low: [
        'Challenge yourself to try one new experience per month, even small ones',
        'Listen to a different genre of music or read outside your comfort zone',
        'When you catch yourself saying "that\'s not how we do things," pause and consider alternatives',
        "Travel to a new place, even if it's just a different neighborhood",
      ],
      moderate: [
        'Set aside time for creative pursuits without judgment',
        'Seek out people with different perspectives and genuinely listen',
        'Balance exploration with completion—finish projects before starting new ones',
        "Document your creative ideas, even if you don't act on them immediately",
      ],
      high: [
        'Practice following through on projects before moving to the next idea',
        'Appreciate the value of routines and traditions',
        'Ground abstract ideas in practical applications',
        'Be patient with those who prefer conventional approaches',
      ],
    },
    famousFigures: {
      low: ['Warren Buffett', 'Angela Merkel', 'Bill Belichick'],
      high: ['Leonardo da Vinci', 'David Bowie', 'Maya Angelou', 'Elon Musk'],
    },
    strengths: {
      low: [
        'Reliable and consistent in approach',
        'Practical problem-solving skills',
        'Comfortable with established procedures',
        'Less distracted by shiny new ideas',
      ],
      moderate: [
        'Adaptable to different situations',
        'Can bridge traditional and innovative approaches',
        'Balanced perspective on change',
        'Flexible thinking when needed',
      ],
      high: [
        'Creative and innovative thinking',
        'Intellectual curiosity and love of learning',
        'Ability to see multiple perspectives',
        'Comfortable with ambiguity and complexity',
      ],
    },
    challenges: {
      low: [
        'May miss opportunities for innovation',
        'Can be resistant to necessary changes',
        'Might struggle in rapidly evolving fields',
        'May undervalue creative approaches',
      ],
      moderate: [
        'May sometimes feel pulled between stability and change',
        'Might not fully commit to either traditional or innovative paths',
        'Can struggle to find the right balance',
      ],
      high: [
        'May start many projects without finishing',
        'Can be impractical or unrealistic',
        'Might overlook proven solutions for novel ones',
        'May become bored with routine necessities',
      ],
    },
  },
  {
    trait: 'conscientiousness',
    interestingFacts: [
      'Conscientiousness is the strongest personality predictor of longevity and healthy aging.',
      "Studies show it's the best Big Five predictor of job performance across almost all occupations.",
      'High Conscientiousness is associated with better academic performance, independent of intelligence.',
      'This trait tends to increase naturally from adolescence through middle age.',
      'Research links high Conscientiousness to lower rates of substance abuse and risky behaviors.',
      'Conscientious people tend to have cleaner, more organized personal spaces.',
    ],
    careerEnvironments: {
      low: [
        'Creative agencies with flexible deadlines',
        'Startup environments',
        'Emergency response and crisis work',
        'Artistic and performance roles',
        'Freelance and consulting',
      ],
      moderate: [
        'Balanced corporate environments',
        'Team-based project work',
        'Sales and relationship management',
        'Healthcare (clinical roles)',
        'Education and training',
      ],
      high: [
        'Finance and accounting',
        'Legal professions',
        'Engineering and quality control',
        'Healthcare administration',
        'Project and operations management',
      ],
    },
    relationshipInsights: {
      low: "You bring spontaneity and flexibility to relationships. You may prefer partners who don't expect rigid schedules or detailed planning. Highly organized partners might find your approach frustrating at times.",
      moderate:
        "You can balance planning with flexibility in relationships. You appreciate some structure but don't need everything scheduled. You adapt well to partners with different organizational styles.",
      high: "You likely value reliability and follow-through in relationships. You may become frustrated with partners who are consistently late or don't keep commitments. Shared planning and goal-setting may strengthen your bonds.",
    },
    growthTips: {
      low: [
        'Use tools like calendars, reminders, and to-do lists to support organization',
        'Break large tasks into smaller, manageable steps with deadlines',
        'Find an accountability partner for important goals',
        'Start with just one area of life to organize, then expand',
      ],
      moderate: [
        'Identify which areas benefit most from your organizational energy',
        'Practice saying no to maintain focus on priorities',
        "Build systems that work for you rather than adopting others' methods",
        'Balance achievement with self-compassion',
      ],
      high: [
        'Practice flexibility when plans change unexpectedly',
        'Allow yourself to be spontaneous occasionally',
        'Recognize that imperfection is acceptable',
        'Be patient with less organized people',
      ],
    },
    famousFigures: {
      low: ['Pablo Picasso', 'Richard Branson', 'Robin Williams'],
      high: ['Ruth Bader Ginsburg', 'Jeff Bezos', 'Marie Curie', 'Kobe Bryant'],
    },
    strengths: {
      low: [
        'Flexible and adaptable',
        'Comfortable with ambiguity',
        'Can pivot quickly when needed',
        'Not paralyzed by imperfection',
      ],
      moderate: [
        'Balances structure with flexibility',
        'Can work in various environments',
        'Reliable without being rigid',
        'Adapts organizational approach to context',
      ],
      high: [
        'Highly reliable and dependable',
        'Strong goal achievement',
        'Excellent attention to detail',
        'Self-disciplined and persistent',
      ],
    },
    challenges: {
      low: [
        'May struggle with deadlines and follow-through',
        'Can appear unreliable to others',
        'Might miss important details',
        'May have difficulty with long-term planning',
      ],
      moderate: [
        'May inconsistently apply organizational skills',
        'Could struggle to find the right level of structure',
        'Might overcommit when trying to be flexible',
      ],
      high: [
        'May be perceived as inflexible or rigid',
        'Can become overly perfectionistic',
        'Might be too hard on yourself and others',
        'May struggle to relax and be spontaneous',
      ],
    },
  },
  {
    trait: 'extraversion',
    interestingFacts: [
      'Extraverts tend to report higher levels of happiness, though introverts can be equally content.',
      "Research shows extraverts' brains respond more strongly to rewards and positive stimuli.",
      'Introverts often perform better on tasks requiring deep concentration and careful analysis.',
      'The extraversion-introversion dimension may relate to optimal arousal levels—introverts are more easily stimulated.',
      'Studies show that acting extraverted (even for introverts) can temporarily boost mood.',
      'Extraversion is associated with larger social networks but not necessarily deeper friendships.',
    ],
    careerEnvironments: {
      low: [
        'Research and analysis roles',
        'Writing and content creation',
        'Software development',
        'Accounting and auditing',
        'Laboratory and technical work',
      ],
      moderate: [
        'Consulting and advisory roles',
        'Healthcare professions',
        'Education and training',
        'Project management',
        'Human resources',
      ],
      high: [
        'Sales and business development',
        'Public relations and communications',
        'Politics and public speaking',
        'Event planning and hospitality',
        'Leadership and management',
      ],
    },
    relationshipInsights: {
      low: 'You may prefer deep, meaningful connections with a small circle over a large social network. You might need alone time to recharge, even from people you love. Partners who understand your need for solitude will be most compatible.',
      moderate:
        "You can enjoy both social activities and quiet time. You're likely comfortable in various social situations and can adapt to partners with different social needs. Balance comes naturally to you.",
      high: 'You likely thrive on social connection and may feel lonely without regular interaction. You might prefer partners who enjoy an active social life. Be mindful that quieter partners may need more downtime than you.',
    },
    growthTips: {
      low: [
        'Practice initiating conversations in low-stakes situations',
        'Join groups or clubs aligned with your interests for structured social interaction',
        'Challenge yourself to attend one social event monthly',
        'Recognize that social skills can be developed like any other skill',
      ],
      moderate: [
        'Honor your need for both connection and solitude',
        'Develop awareness of when you need each',
        'Practice transitioning between social and alone time',
        'Use your adaptability to bridge different social groups',
      ],
      high: [
        'Practice active listening without planning what to say next',
        'Cultivate comfort with silence and solitude',
        'Deepen existing relationships rather than always expanding your network',
        'Be mindful of dominating conversations',
      ],
    },
    famousFigures: {
      low: [
        'Albert Einstein',
        'J.K. Rowling',
        'Bill Gates',
        'Eleanor Roosevelt',
      ],
      high: [
        'Oprah Winfrey',
        'Tony Robbins',
        'Muhammad Ali',
        'Freddie Mercury',
      ],
    },
    strengths: {
      low: [
        'Deep thinking and reflection',
        'Strong focus and concentration',
        'Comfortable with independence',
        'Thoughtful decision-making',
      ],
      moderate: [
        'Adaptable in social situations',
        'Can work well alone or in teams',
        'Balanced energy management',
        'Flexible communication style',
      ],
      high: [
        'Natural networking abilities',
        'Energizes and motivates others',
        'Comfortable in the spotlight',
        'Builds rapport easily',
      ],
    },
    challenges: {
      low: [
        'May miss networking opportunities',
        'Can be perceived as aloof or distant',
        'Might struggle with self-promotion',
        'May feel drained by required social interaction',
      ],
      moderate: [
        'May sometimes feel uncertain about social energy needs',
        'Could struggle to commit to a social style',
        'Might be pulled between group and solo activities',
      ],
      high: [
        'May struggle with solitary work',
        'Can dominate conversations unintentionally',
        'Might avoid necessary alone time for reflection',
        'May come across as overwhelming to quieter people',
      ],
    },
  },
  {
    trait: 'agreeableness',
    interestingFacts: [
      'Agreeableness shows the largest gender difference among the Big Five, with women scoring slightly higher on average.',
      'Research suggests highly agreeable people may earn less money, possibly due to less aggressive negotiation.',
      'Low agreeableness is associated with better performance in competitive environments and critical roles.',
      'This trait is most strongly associated with relationship satisfaction and quality.',
      'Agreeableness tends to increase with age, particularly after becoming a parent.',
      'Highly agreeable people are more likely to forgive and less likely to hold grudges.',
    ],
    careerEnvironments: {
      low: [
        'Competitive sales environments',
        'Litigation and legal adversarial roles',
        'Investment banking and trading',
        'Investigative journalism',
        'Quality control and auditing',
      ],
      moderate: [
        'Management and leadership',
        'Consulting and advisory',
        'Healthcare (balanced roles)',
        'Education and training',
        'Diplomatic and negotiation roles',
      ],
      high: [
        'Counseling and therapy',
        'Nursing and caregiving',
        'Social work and nonprofits',
        'Customer service and support',
        'Mediation and conflict resolution',
      ],
    },
    relationshipInsights: {
      low: "You may be direct and honest in relationships, even when it's uncomfortable. You likely value authenticity over harmony. Partners who appreciate straightforward communication will work best with you.",
      moderate:
        "You can be both diplomatic and direct depending on the situation. You balance your own needs with others' feelings. This flexibility serves you well in various relationship dynamics.",
      high: "You likely prioritize harmony and your partner's happiness. Be mindful of not suppressing your own needs for the sake of peace. The healthiest relationships allow both people to express themselves fully.",
    },
    growthTips: {
      low: [
        'Practice expressing disagreement with kindness',
        "Consider others' perspectives before responding",
        'Notice when skepticism might be closing you off to genuine connection',
        'Develop awareness of how your directness affects others',
      ],
      moderate: [
        'Trust your instincts about when to accommodate vs. assert',
        'Practice both empathy and healthy boundary-setting',
        'Use your balanced perspective to mediate conflicts',
        'Develop comfort with both cooperation and competition',
      ],
      high: [
        'Practice saying no without excessive guilt',
        'Recognize that conflict can be healthy and productive',
        'Set and maintain boundaries, even when it feels uncomfortable',
        'Advocate for yourself as much as you advocate for others',
      ],
    },
    famousFigures: {
      low: ['Steve Jobs', 'Gordon Ramsay', 'Simon Cowell', 'Margaret Thatcher'],
      high: ['Mister Rogers', 'Dalai Lama', 'Mother Teresa', 'Keanu Reeves'],
    },
    strengths: {
      low: [
        'Comfortable with conflict when needed',
        'Strong negotiation skills',
        'Able to make tough decisions',
        'Not easily manipulated',
      ],
      moderate: [
        'Balances assertiveness with empathy',
        'Adapts communication style to context',
        'Can be tough or tender as needed',
        'Effective in diverse interpersonal situations',
      ],
      high: [
        'Creates harmony in groups',
        'Natural empathy and compassion',
        'Builds trust easily',
        'Excellent team player',
      ],
    },
    challenges: {
      low: [
        'May be perceived as cold or uncaring',
        'Can damage relationships with excessive directness',
        'Might struggle in collaborative environments',
        'May miss opportunities through distrust',
      ],
      moderate: [
        'May sometimes be unsure whether to assert or accommodate',
        'Could be seen as inconsistent by others',
        'Might struggle to find the right approach',
      ],
      high: [
        'May avoid necessary confrontation',
        'Can be taken advantage of by others',
        'Might suppress own needs for others',
        'May struggle to say no',
      ],
    },
  },
  {
    trait: 'neuroticism',
    interestingFacts: [
      'Lower emotional stability (high neuroticism) is associated with greater creativity in some studies.',
      'Emotional sensitivity can be an asset in roles requiring empathy and interpersonal awareness.',
      'Research shows that neuroticism tends to decrease with age, especially after major life changes.',
      'High emotional stability is associated with better physical health outcomes and longevity.',
      'People with high neuroticism may be more vigilant about threats, which can be protective in some contexts.',
      'This trait shows the strongest relationship with mental health outcomes among the Big Five.',
    ],
    careerEnvironments: {
      low: [
        'Creative and artistic fields (channeling sensitivity)',
        'Counseling and therapy (understanding emotions)',
        'Writing and content creation',
        'Research (attention to detail)',
        'Support roles with structured environments',
      ],
      moderate: [
        'Healthcare professions',
        'Education and training',
        'Customer service',
        'Administrative roles',
        'Technical support',
      ],
      high: [
        'High-pressure leadership',
        'Emergency services',
        'Air traffic control',
        'Surgical and medical procedures',
        'Crisis management',
      ],
    },
    relationshipInsights: {
      low: 'You may experience emotional ups and downs more intensely. Partners who are patient and supportive during difficult times will be most compatible. Open communication about your emotional needs is important.',
      moderate:
        'You likely experience a normal range of emotional fluctuations. You can support partners through difficulties while managing your own stress reasonably well.',
      high: 'Your emotional stability can be a calming presence for partners. Be mindful that others may experience emotions more intensely than you, and what seems minor to you might feel significant to them.',
    },
    growthTips: {
      low: [
        'Develop a toolkit of coping strategies (mindfulness, exercise, social support)',
        'Practice identifying triggers before they escalate',
        'Build routines that support emotional stability',
        'Consider working with a therapist or counselor',
      ],
      moderate: [
        'Maintain healthy habits that support emotional balance',
        'Practice stress management before it becomes overwhelming',
        'Build awareness of your emotional patterns',
        'Use your emotional awareness to connect with others',
      ],
      high: [
        'Practice acknowledging and expressing vulnerable emotions',
        'Develop empathy for those who struggle with emotional regulation',
        "Don't dismiss others' emotional experiences",
        'Recognize that some stress and worry can be adaptive',
      ],
    },
    famousFigures: {
      low: ['Sylvia Plath', 'Vincent van Gogh', 'Woody Allen', 'Kurt Cobain'],
      high: ['Barack Obama', 'Tom Hanks', 'Morgan Freeman', 'Dalai Lama'],
    },
    strengths: {
      low: [
        'High emotional awareness',
        "Deep empathy for others' struggles",
        'Motivation to address problems quickly',
        'Creative processing of emotions',
      ],
      moderate: [
        'Balanced emotional awareness and stability',
        'Appropriate responses to stress',
        'Can relate to various emotional experiences',
        'Healthy emotional range',
      ],
      high: [
        'Calm under pressure',
        'Quick recovery from setbacks',
        'Stable and predictable emotional responses',
        'Resilient in challenging situations',
      ],
    },
    challenges: {
      low: [
        'May struggle with persistent negative emotions',
        'Can be overwhelmed by stress',
        'Might have difficulty maintaining perspective',
        'May experience burnout more easily',
      ],
      moderate: [
        'May occasionally be caught off guard by stress',
        'Could underestimate emotional impact of events',
        'Might not always recognize building stress',
      ],
      high: [
        'May seem emotionally distant to others',
        "Might underestimate others' emotional experiences",
        'Could miss early warning signs of problems',
        'May not process difficult emotions fully',
      ],
    },
  },
];

// ============================================================================
// INSIGHT GENERATION FUNCTIONS
// ============================================================================

/**
 * Get personalized insights for a specific trait based on score
 */
export function getTraitInsights(
  trait: BigFiveTrait,
  percentScore: number,
): PersonalizedInsight {
  const insights = traitInsightsData.find((t) => t.trait === trait)!;
  const range = getScoreRange(percentScore);

  return {
    trait,
    score: percentScore,
    range,
    interestingFacts: insights.interestingFacts.slice(0, 3), // Return top 3 facts
    careerEnvironments: insights.careerEnvironments[range],
    relationshipInsight: insights.relationshipInsights[range],
    growthTips: insights.growthTips[range],
    famousFigures:
      range === 'moderate'
        ? [
            ...insights.famousFigures.low.slice(0, 1),
            ...insights.famousFigures.high.slice(0, 1),
          ]
        : insights.famousFigures[range === 'low' ? 'low' : 'high'],
    strengths: insights.strengths[range],
    challenges: insights.challenges[range],
  };
}

/**
 * Get all trait insights for a complete profile
 */
export function getAllTraitInsights(
  traitScores: { trait: BigFiveTrait; percentScore: number }[],
): PersonalizedInsight[] {
  return traitScores.map((ts) => getTraitInsights(ts.trait, ts.percentScore));
}

/**
 * Generate a comprehensive profile summary
 */
export function generateProfileSummary(
  traitScores: { trait: BigFiveTrait; percentScore: number }[],
): ProfileSummary {
  const sortedTraits = [...traitScores].sort(
    (a, b) => b.percentScore - a.percentScore,
  );

  // Find dominant traits (highest scores)
  const dominantTraits = sortedTraits
    .filter((t) => t.percentScore >= 60)
    .slice(0, 2)
    .map((t) => t.trait);

  // Generate personality pattern description
  const patterns: Record<string, string> = {
    'openness-conscientiousness':
      'Creative Achiever - You combine imagination with discipline',
    'openness-extraversion':
      'Social Innovator - You bring creative energy to social situations',
    'conscientiousness-extraversion':
      'Driven Leader - You combine organization with social influence',
    'conscientiousness-agreeableness':
      "Reliable Supporter - You're dependable and caring",
    'extraversion-agreeableness':
      'Social Connector - You bring people together with warmth',
    'openness-agreeableness':
      'Empathetic Explorer - You combine curiosity with compassion',
  };

  const patternKey =
    dominantTraits.length >= 2
      ? `${dominantTraits[0]}-${dominantTraits[1]}`
      : dominantTraits[0] || 'balanced';

  // Compile overall strengths and growth areas
  const insights = getAllTraitInsights(traitScores);
  const overallStrengths = insights.flatMap((i) => i.strengths.slice(0, 2));
  const areasForGrowth = insights.flatMap((i) => i.challenges.slice(0, 1));

  // Communication style based on extraversion and agreeableness
  const extraversion =
    traitScores.find((t) => t.trait === 'extraversion')?.percentScore || 50;
  const agreeableness =
    traitScores.find((t) => t.trait === 'agreeableness')?.percentScore || 50;

  let communicationStyle = '';
  if (extraversion >= 60 && agreeableness >= 60) {
    communicationStyle =
      'Warm and engaging - You naturally draw people in and make them feel valued.';
  } else if (extraversion >= 60 && agreeableness < 40) {
    communicationStyle =
      'Direct and assertive - You speak your mind and take charge in conversations.';
  } else if (extraversion < 40 && agreeableness >= 60) {
    communicationStyle =
      'Supportive and thoughtful - You listen carefully and offer gentle, considered responses.';
  } else if (extraversion < 40 && agreeableness < 40) {
    communicationStyle =
      'Reserved and analytical - You prefer focused discussions and value substance over small talk.';
  } else {
    communicationStyle =
      'Adaptable - You adjust your communication style to fit different situations and people.';
  }

  // Stress response based on neuroticism and conscientiousness
  const neuroticism =
    traitScores.find((t) => t.trait === 'neuroticism')?.percentScore || 50;
  const conscientiousness =
    traitScores.find((t) => t.trait === 'conscientiousness')?.percentScore ||
    50;

  let stressResponse = '';
  if (neuroticism >= 60) {
    stressResponse =
      'Under stress, you tend to remain calm and focused. You recover quickly from setbacks.';
  } else if (neuroticism < 40) {
    stressResponse =
      'Under stress, you may feel emotions intensely. Building coping strategies and support systems is important.';
  } else {
    stressResponse =
      'Under stress, you experience normal fluctuations. You benefit from maintaining healthy routines.';
  }

  // Motivation drivers based on profile
  const motivationDrivers: string[] = [];
  const openness =
    traitScores.find((t) => t.trait === 'openness')?.percentScore || 50;

  if (openness >= 60)
    motivationDrivers.push('Learning and intellectual growth');
  if (conscientiousness >= 60)
    motivationDrivers.push('Achievement and goal completion');
  if (extraversion >= 60)
    motivationDrivers.push('Social connection and recognition');
  if (agreeableness >= 60)
    motivationDrivers.push('Helping others and creating harmony');
  if (neuroticism >= 60) motivationDrivers.push('Security and stability');

  if (motivationDrivers.length === 0) {
    motivationDrivers.push('Balance and flexibility in various areas');
  }

  // Ideal environments
  const idealEnvironments = insights.flatMap((i) =>
    i.careerEnvironments.slice(0, 1),
  );

  return {
    dominantTraits,
    personalityPattern:
      patterns[patternKey] ||
      'Balanced Profile - You show flexibility across different traits',
    overallStrengths: [...new Set(overallStrengths)].slice(0, 6),
    areasForGrowth: [...new Set(areasForGrowth)].slice(0, 4),
    idealEnvironments: [...new Set(idealEnvironments)].slice(0, 5),
    communicationStyle,
    stressResponse,
    motivationDrivers,
  };
}

/**
 * Get a random interesting fact for a trait
 */
export function getRandomFact(trait: BigFiveTrait): string {
  const insights = traitInsightsData.find((t) => t.trait === trait)!;
  const facts = insights.interestingFacts;
  return facts[Math.floor(Math.random() * facts.length)];
}

/**
 * Get all interesting facts for a trait
 */
export function getAllFacts(trait: BigFiveTrait): string[] {
  const insights = traitInsightsData.find((t) => t.trait === trait)!;
  return insights.interestingFacts;
}
