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
  TRAIT_LABELS,
  FACET_LABELS,
} from '../types';
import { getScoreRange } from './scoring';

// ============================================================================
// DETAILED TRAIT INTERPRETATIONS (Comprehensive Descriptions)
// ============================================================================

/**
 * Comprehensive interpretations for each trait that discuss both high and low
 * expressions, including the two main aspects/sub-traits for each dimension.
 */
export const detailedTraitInterpretations: Record<
  BigFiveTrait,
  { aspects: string[]; fullDescription: string }
> = {
  agreeableness: {
    aspects: ['Compassion', 'Politeness'],
    fullDescription: `Agreeableness is a very complex trait, with marked positive and negative elements all along its distribution. Because of this, higher scores and lower scores need to be explained at the same time.

**Understanding High Agreeableness (Compassion & Politeness)**

People high in agreeableness are nice: compliant, nurturing, kind, naively trusting and conciliatory. However, because of their tendency to avoid conflict, they often dissemble and hide what they think. They strongly value compassion—the tendency to care for others who are vulnerable—and politeness, which reflects respect for social conventions and authority.

People with high levels of agreeableness are seen by others as warm, empathetic, and cooperative. They are likely to look for the best in others and tend to be particularly tolerant. They are concerned about the emotional state of others, avoid conflict when possible, and will sacrifice making a point to maintain peace and harmony. People find them agreeable, diplomatic, and considerate. They strongly tend towards submission rather than dominance (particularly if also high in neuroticism).

People with high levels of agreeableness are forgiving, accepting, flexible, gentle and patient. They easily feel pity for those who are excluded, punished or defeated. However, it can be easier for them to be taken advantage of by disagreeable, manipulative or otherwise troublesome people. Their trust can sometimes interfere with their ability to stand up for themselves or others when the situation demands it. They can also be more likely to avoid confronting poor behavior or necessary conflicts.

**Understanding Low Agreeableness (Low Compassion & Politeness)**

People low in agreeableness are not so nice: stubborn, dominant, harsh, skeptical, competitive and, in the extreme, even predatory. However, they tend to be straightforward, even blunt, so you know where they stand. They are less moved by others' distress (low compassion) and less concerned with maintaining social harmony and following conventions (low politeness).

People with low levels of agreeableness are seen by others as competitive, colder, tougher and less empathic. They are less likely to look for the best in others, and are not particularly tolerant (an attitude that is much valued by agreeable people). They are less concerned about the emotional state of others, are willing to engage in conflict, and will sacrifice peace and harmony to make a point or (if conscientious) to get things done. People find them straightforward, even blunt. They strongly tend towards dominance rather than submission (particularly if also below average in neuroticism).

People with low levels of agreeableness are not forgiving, accepting, flexible, gentle or patient. They don't easily feel pity for those who are excluded, punished or defeated. It is also difficult for them to be taken advantage of by disagreeable, manipulative or otherwise troublesome people, or those with criminal or predatory intent. Their skepticism plays a protective role, although it can sometimes interfere with their ability to cooperate with or trust others whose intentions are genuinely good. They can also be less likely to reward good behavior or to give credit where it is due.

They can cooperate, when cooperation is in their interest, but very much appreciate competition, with its clear losers and winners. They will not easily lose arguments (or avoid discussions) with less agreeable people, and can enjoy the battle. They are generally good at bargaining for themselves, or at negotiating for more recognition or power and are likely to have higher salaries and to earn more money, in consequence. People low in agreeableness are therefore less likely to suffer from resentment or to harbour invisible anger. In addition, because of their tendency to engage in conflict, when necessary, people low in agreeableness tend not to sacrifice medium- to long-term stability and function for the sake of short-term peace.

**Gender Differences and Social Patterns**

Women are higher in agreeableness than men. The mean percentile for women in a general population (women and men) is 61.5. For men it is 38.5. The fact that men are lower in agreeableness than women helps explain their much higher rates of criminal incarceration (90% male). The primary difference between criminals and non-criminals is disagreeableness. This difference in agreeableness between men and women is largest in countries such as Norway and Sweden, where the most has been done to ensure equality of outcome between the sexes. This provides strong evidence that biological factors rather than environment and learning account for much of the dissimilarity.

**Political and Occupational Correlates**

Agreeableness, per se, is not strongly associated with political liberalism or conservatism, but this is because the aspects of agreeableness predict such political belief in opposite ways, and cancel each other out. Liberals are higher in aspect compassion, and conservatives in aspect politeness. However, alliance with the category of belief that has come to be known as politically correct is strongly predicted by agreeableness (particularly compassion).

There are large differences between men and women in terms of spontaneous interest, and these also appear associated with agreeableness. Agreeable people, caring as they do for others, are more likely to enter professions associated with people, such as teaching, nursing, and social work, which are dominated by women. This is true even in the Scandinavian countries, where attempts to produce gender-equal societies has reached a maximum. Disagreeable people, by contrast, appear to prefer systematizing over empathizing, and are more interested in things—machines and technology. In consequence, professions such as engineering and trades associated with construction and machinery tend to be dominated by relatively disagreeable men.`,
  },
  conscientiousness: {
    aspects: ['Industriousness', 'Orderliness'],
    fullDescription: `Conscientiousness is the trait most associated with achievement, productivity, and organizational success. It encompasses two major aspects: industriousness (the tendency to work hard and complete tasks) and orderliness (the tendency to organize, schedule, and systematize).

**Understanding High Conscientiousness (High Industriousness & Orderliness)**

People high in conscientiousness are organized, reliable, hard-working, and dutiful. They follow rules and schedules, plan ahead, and take their obligations seriously. High industriousness means they are motivated to work hard and complete tasks, even when difficult. High orderliness means they prefer structure, organization, and predictability in their environment.

People with high conscientiousness excel in structured environments where clear goals, deadlines, and standards exist. They are dependable, punctual, and detail-oriented. They finish what they start, meet deadlines consistently, and take pride in thorough work. Their organized approach helps them manage complexity and juggle multiple responsibilities effectively.

The industrious aspect makes them persistent, driven, and achievement-oriented. They set goals and work steadily toward them, showing discipline even when motivation wanes. The orderliness aspect makes them systematic, neat, and methodical. They like having things in their proper place and following established procedures.

However, very high conscientiousness can have downsides. Highly industrious people may become workaholics, struggling to relax or delegate. They may be perfectionistic, spending excessive time on details. Highly orderly people may be inflexible, struggling with ambiguity or last-minute changes. They may impose their need for structure on others, or become distressed in chaotic environments.

**Understanding Low Conscientiousness (Low Industriousness & Orderliness)**

People low in conscientiousness are more spontaneous, flexible, and informal. They tend to be less driven by achievement (low industriousness) and less concerned with organization and structure (low orderliness). They may leave tasks unfinished, miss deadlines occasionally, and prefer to handle things as they come rather than planning extensively.

Low industriousness means they may lack the drive to work through difficult or tedious tasks. They might procrastinate, have difficulty maintaining focus on long-term goals, or need external motivation to complete work. They may be satisfied with "good enough" rather than striving for excellence.

Low orderliness means they function comfortably in unstructured or messy environments. They may resist routines, dislike schedules, and prefer flexibility over planning. Their physical spaces may be cluttered, and they might forget details or misplace items.

However, low conscientiousness has advantages in certain contexts. These individuals tend to be more spontaneous, creative, and adaptable. They don't get bogged down in perfectionism and can move quickly when needed. They're comfortable with ambiguity and can thrive in dynamic, unpredictable environments where rigid planning would be counterproductive. They may be less stressed by disorder and more able to "go with the flow."

People low in conscientiousness may excel in creative fields, crisis management, or roles requiring rapid adaptation. They bring flexibility and can help balance overly rigid teams. However, they may struggle in traditional work environments with strict deadlines, detailed procedures, and high accountability.

**Life Outcomes and Success**

Conscientiousness is one of the best personality predictors of job performance across most occupations, particularly for jobs requiring sustained effort, attention to detail, and reliability. It predicts academic success, career achievement, and income. Highly conscientious people live longer, have better health outcomes, and are less likely to engage in risky behaviors.

The industriousness aspect is particularly predictive of career success and work performance, while orderliness is more predictive of political conservatism and traditional values. Both aspects contribute to success in structured environments, but industriousness is more universally valuable across contexts.

**Development and Change**

Conscientiousness tends to increase with age, as people take on more responsibilities and societal roles that require reliability and organization. Young people tend to be less conscientious on average, which may serve adaptive functions in allowing exploration and learning. Life experiences like entering the workforce, starting a family, or facing consequences of disorganization can increase conscientiousness over time.`,
  },
  extraversion: {
    aspects: ['Enthusiasm', 'Assertiveness'],
    fullDescription: `Extraversion reflects the tendency to be energized by external stimulation, particularly social interaction. It encompasses two major aspects: enthusiasm (sociability, positive emotion, and friendliness) and assertiveness (dominance, leadership, and tendency to speak up).

**Understanding High Extraversion (High Enthusiasm & Assertiveness)**

People high in extraversion are outgoing, talkative, energetic, and socially confident. High enthusiasm means they are friendly, warm, and experience positive emotions frequently. They enjoy social gatherings, make friends easily, and are energized by interaction with others. High assertiveness means they take charge, speak up, influence others, and are comfortable in leadership roles.

Highly extraverted people are often described as the "life of the party." They initiate conversations, enjoy being the center of attention, and create energy in social situations. They think out loud, process experiences by discussing them, and may struggle with prolonged solitude. They have wide social networks and maintain many relationships simultaneously.

The enthusiasm aspect makes them warm, cheerful, and approachable. People are drawn to their positive energy and friendliness. They build rapport quickly and put others at ease. The assertiveness aspect makes them natural leaders who organize groups, make decisions, and drive action. They're comfortable with power and influence.

High extraversion predicts success in sales, management, entertainment, politics, and other roles requiring social skill and leadership. Extraverts report higher subjective well-being on average and have extensive social support networks. They tend to be action-oriented and comfortable taking social risks.

However, high extraversion has potential downsides. Highly enthusiastic people may struggle with solitary work, need constant stimulation, or have difficulty sitting with difficult emotions. They may talk too much, dominate conversations, or fail to listen adequately. Highly assertive people may be domineering, interrupt others, or steamroll quieter voices. Very high extraversion can manifest as attention-seeking, impulsivity, or difficulty with introspection.

**Understanding Low Extraversion (Introversion)**

People low in extraversion—introverts—are reserved, quiet, and prefer less stimulating environments. Low enthusiasm means they are more formal in social interactions, less effusive with positive emotion, and may have fewer but deeper friendships. Low assertiveness means they prefer to follow rather than lead, listen more than speak, and avoid the spotlight.

Introverts are energized by solitude and drained by extensive social interaction. They think before speaking, process experiences internally, and need quiet time to recharge. They prefer one-on-one conversations to large groups and meaningful dialogue to small talk. They have smaller social circles but may form very deep relationships.

Low enthusiasm doesn't mean unfriendly—rather, introverts are more reserved, take longer to warm up, and show affection in quieter ways. Low assertiveness doesn't mean passive—rather, they may lead through expertise, support others' leadership, or influence through different channels than direct assertion.

Introverts excel in roles requiring sustained concentration, independent work, careful analysis, and deep expertise. They are often excellent listeners, thoughtful decision-makers, and detail-oriented workers. Many successful writers, scientists, programmers, and artists are introverted. They bring depth, careful consideration, and the ability to work independently without external validation.

However, introverts may be overlooked for leadership, struggle to promote themselves, or have their quietness misinterpreted as disinterest. In highly social or fast-paced environments, they may become overwhelmed or exhausted. They may need to consciously develop assertiveness skills or learn to navigate extraverted workplace cultures.

**Social and Cultural Context**

Western, particularly American, culture tends to value extraversion—the "extrovert ideal." Many workplace practices (open offices, brainstorming meetings, emphasis on networking) favor extraverts. However, roughly one-third to one-half of people are introverted, and many successful leaders, innovators, and professionals are introverts.

Research shows that moderate extraversion may be optimal for leadership—enough assertiveness to lead and enthusiasm to inspire, but not so much that it becomes domineering or superficial. The most effective teams often balance extraverts and introverts, combining action-orientation with thoughtful analysis.

**Flexibility and Context**

Extraversion is relatively stable but can be situational. Most people can act extraverted when needed (public speaking, networking events) but find it draining if it doesn't match their natural tendency. The key is understanding your natural energy patterns and creating life circumstances that honor them while developing flexibility for situations that require different behavior.`,
  },
  neuroticism: {
    aspects: ['Withdrawal', 'Volatility'],
    fullDescription: `Neuroticism reflects the tendency to experience negative emotions and emotional instability. Note: Many assessments present this trait inversely as "Emotional Stability" to frame it more positively. Neuroticism encompasses two major aspects: withdrawal (sadness, discouragement, anxiety, and social avoidance in response to threat) and volatility (irritability, anger, emotional reactivity, and mood swings).

**Understanding High Neuroticism (High Withdrawal & Volatility)**

People high in neuroticism experience negative emotions more frequently and intensely. High withdrawal means they tend toward sadness, anxiety, shame, and social withdrawal when stressed. High volatility means they experience anger, irritation, emotional ups and downs, and may have emotional outbursts.

Individuals high in neuroticism are emotionally sensitive and reactive. They worry more, ruminate over problems, and may catastrophize about potential negative outcomes. They feel things deeply—both the withdrawal-related emotions (anxiety, sadness, shame) and the volatility-related emotions (anger, frustration, irritation).

The withdrawal aspect manifests as anxiety disorders, social anxiety, depression, and avoidance when this trait is very high. People high in withdrawal are sensitive to threat and punishment, vigilant for potential problems, and may avoid situations where things could go wrong. They may be self-critical and doubt themselves.

The volatility aspect manifests as mood swings, irritability, angry outbursts, and emotional unpredictability when very high. People high in volatility are sensitive to frustration, may have a quick temper, and experience intense emotional reactions to provocations or obstacles. Their emotions can change rapidly.

High neuroticism is associated with increased risk for mental health challenges, including depression, anxiety disorders, and stress-related illnesses. It predicts lower life satisfaction, more difficult relationships, and poorer physical health outcomes. In work settings, high neuroticism can manifest as burnout, conflict sensitivity, and difficulty handling criticism or setbacks.

However, neuroticism has adaptive aspects. Emotional sensitivity provides important information about one's environment and relationships. Anxiety can motivate careful preparation and problem-prevention. People high in neuroticism may be more attuned to social cues, potential problems, and the emotional states of others. In moderate amounts, neuroticism can drive conscientiousness and careful decision-making.

**Understanding Low Neuroticism (High Emotional Stability)**

People low in neuroticism—emotionally stable individuals—remain calm, even-tempered, and resilient in the face of stress. Low withdrawal means they don't easily experience anxiety, sadness, or social withdrawal. Low volatility means they rarely get angry, maintain steady moods, and don't have emotional outbursts.

Emotionally stable people are described as calm, relaxed, and unflappable. They handle stress well, bounce back quickly from setbacks, and don't dwell on problems. They're difficult to upset, maintain composure in crises, and project an aura of confidence and stability.

Low withdrawal makes them fearless, socially confident, and optimistic. They approach rather than avoid challenges, don't worry excessively, and maintain positive expectations. Low volatility makes them patient, even-tempered, and emotionally predictable. They rarely lose their cool, stay calm during provocations, and provide emotional stability to others.

Emotional stability is highly valued in leadership roles, high-stress professions (military, emergency services, surgery), and positions requiring steady decision-making under pressure. Emotionally stable people report higher life satisfaction, have more stable relationships, and experience better mental and physical health.

However, very low neuroticism has potential downsides. People very low in withdrawal may not feel anxiety when they should, leading to poor risk assessment or lack of preparation for real dangers. They may seem insensitive to others' distress or fail to recognize when something is wrong. People very low in volatility may not get appropriately angry at injustice, may be too accepting of poor treatment, or may fail to advocate for themselves when needed.

**Gender Differences**

Women score higher in neuroticism than men on average, particularly on the withdrawal aspect (anxiety, sadness). This difference appears across cultures and may have both biological and social contributors. Women's higher neuroticism may relate to greater emotional awareness and expressiveness, as well as different social pressures and role demands.

The gender difference in volatility (anger, irritability) is smaller than in withdrawal. While men and women may experience similar levels of anger, they may express it differently due to social conditioning.

**Development and Intervention**

Neuroticism tends to decrease with age, particularly after young adulthood. Life experience, maturity, and development of coping skills contribute to increased emotional stability over time. Neuroticism is also one of the most responsive traits to psychological intervention.

Cognitive-behavioral therapy, mindfulness practices, and other evidence-based approaches can significantly reduce neuroticism and increase emotional regulation skills. Learning to identify triggers, challenge anxious thoughts, develop coping strategies, and build emotional resilience can help high-neuroticism individuals function better and experience improved well-being.`,
  },
  openness: {
    aspects: ['Intellect', 'Aesthetics'],
    fullDescription: `Openness to Experience is the trait associated with creativity, curiosity, and intellectual engagement. It encompasses two major aspects: intellect (interest in abstract ideas, philosophical thinking, and intellectual exploration) and aesthetics (or openness, the appreciation for beauty, art, imagination, and creative expression).

**Understanding High Openness (High Intellect & Aesthetics)**

People high in openness are curious, creative, imaginative, and intellectually engaged. High intellect means they enjoy abstract thinking, philosophical discussions, and complex ideas. High aesthetics means they deeply appreciate beauty, art, music, and creative expression, and often have active imaginations.

Individuals high in openness are drawn to novelty, complexity, and variety. They question assumptions, explore unconventional ideas, and enjoy intellectual challenges. They tend to be creative problem-solvers who make unexpected connections and think outside conventional boundaries. They value learning for its own sake and are often interested in diverse topics.

The intellect aspect makes them philosophical, analytical, and drawn to complex problems. They enjoy theoretical discussions, abstract reasoning, and intellectual debate. They may be voracious readers, lifelong learners, and drawn to academic or intellectual pursuits.

The aesthetic aspect makes them sensitive to beauty, artistically inclined, and imaginative. They notice aesthetic details others might miss, are moved by art and music, and may engage in creative expression themselves. They have rich inner lives and active imaginations.

High openness predicts creativity, artistic achievement, and unconventional career choices. Open individuals are more likely to be artists, writers, scientists, entrepreneurs, and innovators. They drive cultural and scientific progress through questioning the status quo and imagining new possibilities. They adapt well to change and enjoy travel, diverse experiences, and cross-cultural engagement.

However, very high openness has potential challenges. Highly intellectual people may get lost in abstract thinking, struggle with practical matters, or come across as impractical or "in their heads." Highly aesthetic people may be seen as dreamy, unrealistic, or overly focused on subjective experiences. Very open people may question everything to the point of cynicism, struggle with routine, or have difficulty completing practical tasks that bore them.

**Understanding Low Openness (Conventional or Closed)**

People low in openness prefer familiarity, tradition, and concrete thinking. Low intellect means they favor practical over abstract thinking and straightforward solutions over philosophical complexity. Low aesthetics means they're less moved by art or beauty and have more conventional tastes and less active imaginations.

Individuals low in openness are practical, down-to-earth, and conventional. They prefer proven methods over innovation, value tradition, and are skeptical of change for its own sake. They focus on concrete realities rather than abstract possibilities and prefer clear answers over philosophical ambiguity.

Low intellect doesn't mean unintelligent—rather, these individuals prefer hands-on, practical intelligence over abstract theorizing. They may be very skilled in practical domains, excel at concrete problem-solving, and value common sense. They prefer clear, straightforward communication over complex, nuanced discussion.

Low aesthetics means being less moved by art, beauty, or creative expression. These individuals may find arts and humanities less interesting, prefer functional over beautiful, and have more conventional aesthetic preferences. They may have less active fantasy lives and be more focused on present realities.

People low in openness excel in roles requiring attention to established procedures, practical problem-solving, and hands-on skills. They may be excellent technicians, operators, craftspeople, or specialists in concrete domains. They provide stability, maintain traditions, and ensure proven methods are followed. In teams, they balance highly open innovators by asking practical questions and ensuring ideas are workable.

However, very low openness can limit adaptability, creativity, and intellectual growth. These individuals may resist necessary changes, dismiss new ideas prematurely, or struggle when situations require novel solutions. They may have limited cultural awareness, rigid thinking, or difficulty appreciating perspectives very different from their own.

**Political and Value Correlates**

Openness is one of the strongest personality predictors of political orientation. High openness strongly predicts political liberalism and progressive values—supporting social change, environmental protection, multiculturalism, and individual freedom of expression. Low openness predicts political conservatism—supporting tradition, conventional values, established authority, and stability.

These associations appear across cultures and reflect the trait's fundamental dimension of embracing versus resisting change. Both orientations have value: progressives drive necessary social evolution, while conservatives maintain valuable traditions and prevent reckless change.

**Creativity and Achievement**

The intellect aspect particularly predicts academic achievement, especially in humanities and sciences. Aesthetic openness predicts artistic creativity and achievement. However, creativity requires both openness (to generate novel ideas) and conscientiousness (to develop them)—the combination predicts creative achievement better than either alone.

**Stability and Change**

Openness is relatively stable across adulthood, though life experiences like education, travel, and exposure to diverse ideas can increase it. It tends to decrease slightly in old age, though this varies by individual. Unlike some traits, openness doesn't show consistent gender differences across cultures.`,
  },
};

// ============================================================================
// TRAIT INTERPRETATIONS (Brief Summaries)
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
