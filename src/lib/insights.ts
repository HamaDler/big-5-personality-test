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

export interface FamousFigure {
  name: string;
  reason: string;
}

export interface RelationshipInsight {
  style: string;
  watchOut: string;
}

export interface TraitInsights {
  trait: BigFiveTrait;
  interestingFacts: string[];
  careerEnvironments: {
    low: string[];
    moderate: string[];
    high: string[];
  };
  relationshipInsights: {
    low: RelationshipInsight;
    moderate: RelationshipInsight;
    high: RelationshipInsight;
  };
  growthTips: {
    low: string[];
    moderate: string[];
    high: string[];
  };
  famousFigures: {
    low: FamousFigure[];
    high: FamousFigure[];
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
  relationshipInsight: RelationshipInsight;
  growthTips: string[];
  famousFigures: FamousFigure[];
  strengths: string[];
  challenges: string[];
}

export interface PersonalityBlend {
  name: string;
  traits: [BigFiveTrait, ScoreRange, BigFiveTrait, ScoreRange];
  description: string;
  strengths: string[];
  watchOuts: string[];
}

export interface ProfileSummary {
  dominantTraits: BigFiveTrait[];
  personalityPattern: string;
  personalityBlends: PersonalityBlend[];
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
        'Interdisciplinary roles (UX Researcher, Futurist, Design Strategist)',
        'Creative industries (art, design, writing)',
        'Research and academia',
        'Entrepreneurship and startups',
        'Innovation labs and emerging technology',
        'Strategic consulting with creative freedom',
      ],
    },
    relationshipInsights: {
      low: {
        style: 'Values routine, tradition, and clear expectations. Creates stable, predictable relationship patterns.',
        watchOut: 'May find spontaneous or unconventional partners challenging. Could resist change even when beneficial.',
      },
      moderate: {
        style: 'Adapts to partners with different levels of openness. Appreciates adventure while also valuing stability.',
        watchOut: 'May sometimes feel torn between novelty and comfort. Could struggle to communicate changing needs.',
      },
      high: {
        style: 'Values intellectual growth and variety. Seeks partners who enjoy exploring ideas and new experiences together.',
        watchOut: 'May get bored with "stable" routine partners. Could prioritize novelty over relationship maintenance.',
      },
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
      low: [
        { name: 'Warren Buffett', reason: 'Sticks to proven investment principles and avoids trends.' },
        { name: 'Angela Merkel', reason: 'Known for methodical, cautious decision-making.' },
        { name: 'Bill Belichick', reason: 'Relies on systematic preparation over flashy innovation.' },
      ],
      high: [
        { name: 'Leonardo da Vinci', reason: 'Consummate polymath who bridged art and science.' },
        { name: 'David Bowie', reason: 'Constantly reinvented his artistic identity.' },
        { name: 'Maya Angelou', reason: 'Explored diverse creative mediums and cultural perspectives.' },
        { name: 'Elon Musk', reason: 'High tolerance for risk and abstract future-building.' },
      ],
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
        'Dynamic environments where pivoting is a feature, not a bug',
        'Creative Director or Art Director roles',
        'Startup environments with rapid iteration',
        'Emergency response and crisis work',
        'Performing arts (improv, jazz, live performance)',
        'Freelance and consulting with variety',
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
      low: {
        style: 'Brings spontaneity and flexibility. Goes with the flow and adapts easily to changing plans.',
        watchOut: 'May frustrate highly organized partners. Could struggle with commitments that require sustained follow-through.',
      },
      moderate: {
        style: 'Balances planning with flexibility. Appreciates some structure without needing everything scheduled.',
        watchOut: 'May send mixed signals about reliability. Could over-promise when feeling flexible.',
      },
      high: {
        style: 'Highly reliable and values follow-through. Shared planning and goal-setting strengthens bonds.',
        watchOut: 'May become frustrated with spontaneous partners. Could prioritize tasks over quality time.',
      },
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
      low: [
        { name: 'Pablo Picasso', reason: 'Chaotic creative process with constant reinvention.' },
        { name: 'Richard Branson', reason: 'Embraces risk and pivots quickly between ventures.' },
        { name: 'Robin Williams', reason: 'Improvisational genius who thrived on spontaneity.' },
      ],
      high: [
        { name: 'Ruth Bader Ginsburg', reason: 'Meticulous legal mind with legendary work ethic.' },
        { name: 'Jeff Bezos', reason: 'Long-term strategic thinking with relentless execution.' },
        { name: 'Marie Curie', reason: 'Rigorous scientific methodology and persistence.' },
        { name: 'Kobe Bryant', reason: 'Famous "Mamba Mentality" of obsessive preparation.' },
      ],
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
      low: {
        style: 'Prefers deep, meaningful connections with a small circle. Values quality time and intimate conversations.',
        watchOut: 'May seem distant or unavailable to social partners. Could withdraw when overwhelmed rather than communicate.',
      },
      moderate: {
        style: 'Enjoys both social activities and quiet time. Adapts to partners with different social needs.',
        watchOut: 'May sometimes give mixed signals about social preferences. Could overextend when trying to please.',
      },
      high: {
        style: 'Thrives on social connection and shared activities. Brings energy and enthusiasm to the relationship.',
        watchOut: 'May feel neglected by introverted partners. Could fill silence with chatter rather than listening.',
      },
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
        { name: 'Albert Einstein', reason: 'Preferred solitary thought experiments over social engagement.' },
        { name: 'J.K. Rowling', reason: 'Created entire worlds in isolation before sharing them.' },
        { name: 'Bill Gates', reason: 'Known for deep focus and "Think Weeks" alone.' },
        { name: 'Eleanor Roosevelt', reason: 'Thoughtful leader who valued reflection over spotlight.' },
      ],
      high: [
        { name: 'Oprah Winfrey', reason: 'Built career on authentic connection with millions.' },
        { name: 'Tony Robbins', reason: 'Energizes massive audiences and feeds off crowd energy.' },
        { name: 'Muhammad Ali', reason: 'Charismatic showman who thrived in the spotlight.' },
        { name: 'Freddie Mercury', reason: 'Electrifying stage presence and natural entertainer.' },
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
      low: {
        style: 'Direct, honest, and values logic over diplomacy. Cuts through pretense to address issues head-on.',
        watchOut: 'Can accidentally hurt feelings during conflict. May prioritize being right over being kind.',
      },
      moderate: {
        style: 'Balances diplomacy with directness. Adapts approach based on the situation and relationship.',
        watchOut: 'May seem inconsistent in conflict style. Could struggle to find the right tone.',
      },
      high: {
        style: 'Prioritizes harmony and partner happiness. Creates warm, supportive relationship environment.',
        watchOut: 'May suppress own needs for peace. Could avoid necessary confrontations until issues escalate.',
      },
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
      low: [
        { name: 'Steve Jobs', reason: 'Famously demanding and uncompromising on vision.' },
        { name: 'Gordon Ramsay', reason: 'Brutally honest feedback in pursuit of excellence.' },
        { name: 'Simon Cowell', reason: 'Built brand on unflinching critical honesty.' },
        { name: 'Margaret Thatcher', reason: 'Conviction politics over consensus-building.' },
      ],
      high: [
        { name: 'Mister Rogers', reason: 'Epitome of gentle kindness and unconditional acceptance.' },
        { name: 'Dalai Lama', reason: 'Compassion as core philosophy and daily practice.' },
        { name: 'Mother Teresa', reason: 'Devoted life to caring for others.' },
        { name: 'Keanu Reeves', reason: 'Known for exceptional kindness and humility in Hollywood.' },
      ],
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
      low: {
        style: 'Deep emotional awareness and sensitivity. Can connect profoundly on an emotional level.',
        watchOut: 'May need extra reassurance during stress. Could interpret neutral situations negatively.',
      },
      moderate: {
        style: 'Balanced emotional responses. Can support partners while managing own stress reasonably.',
        watchOut: 'May occasionally be caught off guard by intense emotions. Could underestimate stress buildup.',
      },
      high: {
        style: 'Calm, steady emotional presence. Provides stability and groundedness in the relationship.',
        watchOut: 'May seem emotionally distant to sensitive partners. Could dismiss partner\'s worries as overreaction.',
      },
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
      low: [
        { name: 'Sylvia Plath', reason: 'Channeled emotional intensity into powerful literature.' },
        { name: 'Vincent van Gogh', reason: 'Emotional turbulence fueled artistic genius.' },
        { name: 'Woody Allen', reason: 'Built career exploring neurotic anxieties.' },
        { name: 'Kurt Cobain', reason: 'Raw emotional expression in music.' },
      ],
      high: [
        { name: 'Barack Obama', reason: 'Famous for "No Drama Obama" composure under pressure.' },
        { name: 'Tom Hanks', reason: 'Consistently calm and gracious public presence.' },
        { name: 'Morgan Freeman', reason: 'Radiates unflappable serenity.' },
        { name: 'Dalai Lama', reason: 'Decades of equanimity practice and teaching.' },
      ],
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

// ============================================================================
// PERSONALITY BLENDS DATA
// ============================================================================

const personalityBlends: PersonalityBlend[] = [
  // High + High combinations
  {
    name: 'The Effective Leader',
    traits: ['extraversion', 'high', 'conscientiousness', 'high'],
    description: 'You combine social influence with disciplined execution. You inspire others while delivering results.',
    strengths: ['Motivates teams toward goals', 'Balances vision with follow-through', 'Commands respect through competence'],
    watchOuts: ['May push others as hard as yourself', 'Could prioritize achievement over relationships'],
  },
  {
    name: 'The Creative Achiever',
    traits: ['openness', 'high', 'conscientiousness', 'high'],
    description: 'You blend imagination with discipline—dreaming big while actually shipping.',
    strengths: ['Turns creative visions into reality', 'Innovates within constraints', 'Balances exploration with execution'],
    watchOuts: ['May over-engineer creative projects', 'Could struggle when forced to choose between quality and novelty'],
  },
  {
    name: 'The Social Innovator',
    traits: ['openness', 'high', 'extraversion', 'high'],
    description: 'You bring creative energy to social situations and thrive on collaborative exploration.',
    strengths: ['Sparks innovation through conversation', 'Builds creative communities', 'Energizes brainstorming sessions'],
    watchOuts: ['May generate more ideas than you can execute', 'Could overwhelm quieter collaborators'],
  },
  {
    name: 'The Empathetic Explorer',
    traits: ['openness', 'high', 'agreeableness', 'high'],
    description: 'You combine curiosity with compassion, seeking to understand diverse perspectives.',
    strengths: ['Bridges different viewpoints', 'Creates inclusive environments', 'Explores with sensitivity'],
    watchOuts: ['May avoid intellectual conflict', 'Could prioritize harmony over honest critique'],
  },
  {
    name: 'The Reliable Supporter',
    traits: ['conscientiousness', 'high', 'agreeableness', 'high'],
    description: "You're the person everyone counts on - dependable, caring, and thorough.",
    strengths: ['Builds trust through consistency', 'Supports others with practical help', 'Creates stable foundations'],
    watchOuts: ['May take on too much for others', 'Could neglect own needs while helping'],
  },
  {
    name: 'The Social Connector',
    traits: ['extraversion', 'high', 'agreeableness', 'high'],
    description: 'You bring people together with warmth, creating harmony in groups.',
    strengths: ['Natural community builder', 'Makes everyone feel included', 'Smooths social friction'],
    watchOuts: ['May avoid necessary difficult conversations', 'Could spread yourself too thin socially'],
  },
  {
    name: 'The Calm Commander',
    traits: ['extraversion', 'high', 'neuroticism', 'high'],
    description: 'You lead with confidence and unshakeable composure, even in chaos.',
    strengths: ['Inspires confidence in crisis', 'Makes decisions under pressure', 'Radiates stability'],
    watchOuts: ['May seem emotionally distant', 'Could underestimate others\' stress levels'],
  },
  {
    name: 'The Steady Strategist',
    traits: ['conscientiousness', 'high', 'neuroticism', 'high'],
    description: 'You combine careful planning with emotional resilience—prepared and unflappable.',
    strengths: ['Executes under pressure', 'Maintains focus during setbacks', 'Plans for contingencies calmly'],
    watchOuts: ['May seem overly focused on execution', 'Could dismiss others\' anxieties'],
  },
  // High + Low combinations (often the most interesting "tension" blends)
  {
    name: 'The Creative Rebel',
    traits: ['openness', 'high', 'conscientiousness', 'low'],
    description: "You're a free-spirited innovator who resists structure in pursuit of creative vision.",
    strengths: ['Unbound creative thinking', 'Challenges conventions', 'Brings fresh perspectives'],
    watchOuts: ['May struggle to finish projects', 'Could frustrate more structured collaborators'],
  },
  {
    name: 'The Sensitive Caregiver',
    traits: ['agreeableness', 'high', 'neuroticism', 'low'],
    description: 'You combine deep empathy with emotional sensitivity—feeling others\' pain acutely.',
    strengths: ['Profound emotional understanding', 'Anticipates others\' needs', 'Creates safe spaces'],
    watchOuts: ['May absorb others\' stress', 'Could neglect self-care while caring for others'],
  },
  {
    name: 'The Analytical Challenger',
    traits: ['openness', 'high', 'agreeableness', 'low'],
    description: 'You combine intellectual curiosity with critical thinking—questioning everything.',
    strengths: ['Spots flaws in ideas quickly', 'Pushes for deeper understanding', 'Values truth over comfort'],
    watchOuts: ['May come across as contrarian', 'Could alienate with relentless questioning'],
  },
  {
    name: 'The Quiet Achiever',
    traits: ['conscientiousness', 'high', 'extraversion', 'low'],
    description: 'You accomplish great things without fanfare, preferring results over recognition.',
    strengths: ['Deep focus and persistence', 'Lets work speak for itself', 'Self-motivated'],
    watchOuts: ['May not get credit deserved', 'Could struggle with visibility and networking'],
  },
  {
    name: 'The Charismatic Free Spirit',
    traits: ['extraversion', 'high', 'conscientiousness', 'low'],
    description: 'You light up rooms with spontaneous energy, living in the moment.',
    strengths: ['Infectious enthusiasm', 'Adapts to any social situation', 'Makes experiences memorable'],
    watchOuts: ['May over-promise and under-deliver', 'Could leave loose ends'],
  },
  {
    name: 'The Tough Empath',
    traits: ['agreeableness', 'high', 'neuroticism', 'high'],
    description: 'You care deeply but remain emotionally steady—compassionate without being overwhelmed.',
    strengths: ['Supportive presence in crisis', 'Cares without catastrophizing', 'Balanced emotional support'],
    watchOuts: ['May seem less emotionally engaged', 'Could miss subtle emotional cues'],
  },
  {
    name: 'The Direct Stabilizer',
    traits: ['agreeableness', 'low', 'neuroticism', 'high'],
    description: 'You combine emotional stability with direct communication—honest and unflappable.',
    strengths: ['Gives feedback without drama', 'Stays calm in conflict', 'Cuts through emotional noise'],
    watchOuts: ['May seem cold or dismissive', 'Could undervalue emotional discussions'],
  },
];

/**
 * Detect personality blends based on trait scores
 */
export function detectPersonalityBlends(
  traitScores: { trait: BigFiveTrait; percentScore: number }[],
): PersonalityBlend[] {
  const getRange = (score: number): ScoreRange => getScoreRange(score);
  
  const scoreMap = new Map<BigFiveTrait, { score: number; range: ScoreRange }>();
  traitScores.forEach(ts => {
    scoreMap.set(ts.trait, { score: ts.percentScore, range: getRange(ts.percentScore) });
  });

  const matchedBlends: PersonalityBlend[] = [];

  for (const blend of personalityBlends) {
    const [trait1, range1, trait2, range2] = blend.traits;
    const score1 = scoreMap.get(trait1);
    const score2 = scoreMap.get(trait2);

    if (score1 && score2) {
      // Check if both traits match the required ranges
      const trait1Match = score1.range === range1;
      const trait2Match = score2.range === range2;

      if (trait1Match && trait2Match) {
        matchedBlends.push(blend);
      }
    }
  }

  // Return top 3 most relevant blends
  return matchedBlends.slice(0, 3);
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

  // Detect personality blends
  const personalityBlendsFound = detectPersonalityBlends(traitScores);

  return {
    dominantTraits,
    personalityPattern:
      patterns[patternKey] ||
      'Balanced Profile - You show flexibility across different traits',
    personalityBlends: personalityBlendsFound,
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
