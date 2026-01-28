import {
  Shield,
  BookOpen,
  Scale,
  ExternalLink,
  CheckCircle,
  Leaf,
  Info,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <section className="bg-white/80 backdrop-blur-md border-b border-sage-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-100 rounded-full text-sage-700 text-sm font-medium mb-4">
            <Info className="w-4 h-4" />
            <span>Learn more</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-warm-800 mb-4">
            About This Assessment
          </h1>
          <p className="text-lg text-warm-500 max-w-2xl mx-auto">
            Learn about the science behind the Big Five personality model and
            how to interpret your results responsibly.
          </p>
        </div>
      </section>

      {/* Important Disclaimer */}
      <section className="py-8 bg-sage-50 border-b border-sage-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <Leaf className="w-6 h-6 text-sage-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-serif font-semibold text-sage-800 mb-2">
                A Thoughtful Reminder
              </h2>
              <div className="text-sage-700 space-y-2">
                <p>
                  <strong>This assessment is NOT:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>A clinical or diagnostic tool</li>
                  <li>
                    A substitute for professional psychological evaluation
                  </li>
                  <li>
                    Appropriate for making medical, employment, or legal
                    decisions
                  </li>
                  <li>A definitive measure of who you are as a person</li>
                </ul>
                <p className="mt-4">
                  <strong>This assessment IS:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>An educational tool for self-reflection</li>
                  <li>Based on well-researched psychological constructs</li>
                  <li>
                    A starting point for understanding personality tendencies
                  </li>
                  <li>Free and open-source, using public domain questions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Big Five Model */}
      <section className="py-12 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-sage-600" />
            <h2 className="text-2xl font-serif font-semibold text-warm-800">
              The Big Five Model
            </h2>
          </div>

          <div className="prose prose-warm max-w-none text-warm-600">
            <p>
              The Big Five personality model, also known as the Five-Factor
              Model (FFM) or OCEAN model, is one of the most widely researched
              and validated frameworks for understanding personality. It emerged
              from decades of research using factor analysis to identify the
              fundamental dimensions along which human personalities vary.
            </p>

            <h3 className="text-warm-800 font-serif">The Five Traits</h3>

            <div className="grid gap-4 not-prose my-6">
              {[
                {
                  trait: 'Openness to Experience',
                  color: 'bg-openness',
                  lightColor: 'bg-openness-light',
                  description:
                    'Reflects imagination, creativity, intellectual curiosity, and preference for novelty and variety. People high in openness tend to be more adventurous and open to unconventional ideas.',
                },
                {
                  trait: 'Conscientiousness',
                  color: 'bg-conscientiousness',
                  lightColor: 'bg-conscientiousness-light',
                  description:
                    'Reflects organization, dependability, self-discipline, and goal-oriented behavior. People high in conscientiousness tend to be reliable, hardworking, and achievement-oriented.',
                },
                {
                  trait: 'Extraversion',
                  color: 'bg-extraversion',
                  lightColor: 'bg-extraversion-light',
                  description:
                    'Reflects sociability, assertiveness, positive emotions, and energy derived from social interaction. People high in extraversion tend to be outgoing and thrive in social situations.',
                },
                {
                  trait: 'Agreeableness',
                  color: 'bg-agreeableness',
                  lightColor: 'bg-agreeableness-light',
                  description:
                    'Reflects cooperation, trust, empathy, and concern for social harmony. People high in agreeableness tend to be compassionate, trusting, and helpful.',
                },
                {
                  trait: 'Emotional Stability',
                  color: 'bg-neuroticism',
                  lightColor: 'bg-neuroticism-light',
                  description:
                    'Reflects emotional resilience and the ability to remain calm under stress. People high in emotional stability tend to be even-tempered and less reactive to negative events.',
                },
              ].map(({ trait, color, lightColor, description }) => (
                <div
                  key={trait}
                  className={`flex items-start gap-4 ${lightColor} rounded-xl p-4 border-l-4 border-current`}
                  style={{
                    borderColor: `var(--color-${trait.toLowerCase().split(' ')[0]})`,
                  }}
                >
                  <div
                    className={`w-3 h-3 ${color} rounded-full flex-shrink-0 mt-1.5`}
                  />
                  <div>
                    <h4 className="font-semibold text-warm-700">{trait}</h4>
                    <p className="text-sm text-warm-600 mt-1">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-warm-800 font-serif">The IPIP-NEO-120</h3>
            <p>
              This assessment uses the IPIP-NEO-120, a 120-item public domain
              measure that provides scores for the Big Five traits and their 30
              facets (6 facets per trait). The IPIP (International Personality
              Item Pool) is a scientific collaboratory for the development of
              personality measures.
            </p>
            <p>
              The items are representations of the NEO-PI-R™ developed by Costa
              and McCrae, adapted for public use. Research has shown strong
              correlations between the IPIP scales and the original proprietary
              measures.
            </p>
          </div>
        </div>
      </section>

      {/* Ethical Considerations */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-sage-600" />
            <h2 className="text-2xl font-serif font-semibold text-warm-800">
              Ethical Considerations
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="card-zen">
              <h3 className="font-semibold text-warm-700 mb-3">
                Privacy & Data
              </h3>
              <ul className="space-y-2 text-warm-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-sage-500 flex-shrink-0 mt-1" />
                  <span>All data is stored locally on your device</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-sage-500 flex-shrink-0 mt-1" />
                  <span>
                    No personal information is collected or transmitted
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-sage-500 flex-shrink-0 mt-1" />
                  <span>You can clear your data at any time</span>
                </li>
              </ul>
            </div>

            <div className="card-zen">
              <h3 className="font-semibold text-warm-700 mb-3">
                Responsible Use
              </h3>
              <ul className="space-y-2 text-warm-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-sage-500 flex-shrink-0 mt-1" />
                  <span>
                    Results should not be used for hiring or selection
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-sage-500 flex-shrink-0 mt-1" />
                  <span>Avoid using results to label or stereotype others</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-sage-500 flex-shrink-0 mt-1" />
                  <span>Personality is complex and context-dependent</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interpreting Results */}
      <section className="py-12 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Scale className="w-6 h-6 text-sage-600" />
            <h2 className="text-2xl font-serif font-semibold text-warm-800">
              How to Interpret Your Results
            </h2>
          </div>

          <div className="prose prose-warm max-w-none text-warm-600">
            <h3 className="text-warm-800 font-serif">
              Results Reflect Tendencies, Not Destiny
            </h3>
            <p>
              Your scores indicate general tendencies in how you typically
              think, feel, and behave. They are not fixed or deterministic.
              People can and do adapt their behavior based on context,
              motivation, and effort.
            </p>

            <h3 className="text-warm-800 font-serif">
              No Score is "Good" or "Bad"
            </h3>
            <p>
              Each trait represents a spectrum with potential strengths at both
              ends. For example, lower extraversion isn't worse than higher
              extraversion—it simply reflects a different style of engaging with
              the world, each with its own advantages.
            </p>

            <h3 className="text-warm-800 font-serif">Context Matters</h3>
            <p>
              The same trait can be advantageous in some situations and
              challenging in others. High conscientiousness might excel in
              structured environments but feel constraining in highly creative
              or spontaneous settings.
            </p>

            <h3 className="text-warm-800 font-serif">
              Self-Report Limitations
            </h3>
            <p>
              This assessment relies on your honest self-reflection. Results may
              be influenced by:
            </p>
            <ul>
              <li>Current mood or recent experiences</li>
              <li>How you want to see yourself vs. how you actually behave</li>
              <li>Cultural differences in interpreting questions</li>
              <li>The specific context you imagine when answering</li>
            </ul>
          </div>
        </div>
      </section>

      {/* References */}
      <section className="py-12 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif font-semibold text-warm-800 mb-6">
            References & Resources
          </h2>

          <div className="space-y-4">
            {[
              {
                title: 'International Personality Item Pool (IPIP)',
                description:
                  'Source of the public domain personality items used in this assessment.',
                url: 'https://ipip.ori.org/',
              },
              {
                title: 'Costa, P. T., & McCrae, R. R. (1992)',
                description:
                  'Revised NEO Personality Inventory (NEO-PI-R) and NEO Five-Factor Inventory (NEO-FFI) professional manual.',
                url: null,
              },
              {
                title: 'John, O. P., & Srivastava, S. (1999)',
                description:
                  'The Big Five trait taxonomy: History, measurement, and theoretical perspectives.',
                url: null,
              },
            ].map(({ title, description, url }) => (
              <div
                key={title}
                className="flex items-start gap-4 p-4 bg-sage-50 rounded-xl"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-warm-700">{title}</h3>
                  <p className="text-sm text-warm-500 mt-1">{description}</p>
                </div>
                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 p-2 text-sage-400 hover:text-sage-600 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
