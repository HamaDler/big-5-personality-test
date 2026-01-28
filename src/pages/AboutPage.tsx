import { 
  Shield, 
  BookOpen, 
  Scale, 
  Heart, 
  AlertTriangle,
  ExternalLink,
  CheckCircle
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            About This Assessment
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn about the science behind the Big Five personality model and 
            how to interpret your results responsibly.
          </p>
        </div>
      </section>

      {/* Important Disclaimer */}
      <section className="py-8 bg-amber-50 border-b border-amber-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-amber-900 mb-2">
                Important Disclaimer
              </h2>
              <div className="text-amber-800 space-y-2">
                <p>
                  <strong>This assessment is NOT:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>A clinical or diagnostic tool</li>
                  <li>A substitute for professional psychological evaluation</li>
                  <li>Appropriate for making medical, employment, or legal decisions</li>
                  <li>A definitive measure of who you are as a person</li>
                </ul>
                <p className="mt-4">
                  <strong>This assessment IS:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>An educational tool for self-reflection</li>
                  <li>Based on well-researched psychological constructs</li>
                  <li>A starting point for understanding personality tendencies</li>
                  <li>Free and open-source, using public domain questions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Big Five Model */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-gray-700" />
            <h2 className="text-2xl font-bold text-gray-900">
              The Big Five Model
            </h2>
          </div>
          
          <div className="prose prose-gray max-w-none">
            <p>
              The Big Five personality model, also known as the Five-Factor Model (FFM) or OCEAN model, 
              is one of the most widely researched and validated frameworks for understanding personality. 
              It emerged from decades of research using factor analysis to identify the fundamental 
              dimensions along which human personalities vary.
            </p>
            
            <h3>The Five Traits</h3>
            
            <div className="grid gap-4 not-prose my-6">
              {[
                {
                  trait: 'Openness to Experience',
                  color: 'bg-openness',
                  description: 'Reflects imagination, creativity, intellectual curiosity, and preference for novelty and variety. People high in openness tend to be more adventurous and open to unconventional ideas.'
                },
                {
                  trait: 'Conscientiousness',
                  color: 'bg-conscientiousness',
                  description: 'Reflects organization, dependability, self-discipline, and goal-oriented behavior. People high in conscientiousness tend to be reliable, hardworking, and achievement-oriented.'
                },
                {
                  trait: 'Extraversion',
                  color: 'bg-extraversion',
                  description: 'Reflects sociability, assertiveness, positive emotions, and energy derived from social interaction. People high in extraversion tend to be outgoing and thrive in social situations.'
                },
                {
                  trait: 'Agreeableness',
                  color: 'bg-agreeableness',
                  description: 'Reflects cooperation, trust, empathy, and concern for social harmony. People high in agreeableness tend to be compassionate, trusting, and helpful.'
                },
                {
                  trait: 'Emotional Stability',
                  color: 'bg-neuroticism',
                  description: 'Reflects emotional resilience and the ability to remain calm under stress. People high in emotional stability tend to be even-tempered and less reactive to negative events.'
                }
              ].map(({ trait, color, description }) => (
                <div key={trait} className="flex items-start gap-4 bg-gray-50 rounded-lg p-4">
                  <div className={`w-4 h-4 ${color} rounded-full flex-shrink-0 mt-1`} />
                  <div>
                    <h4 className="font-semibold text-gray-900">{trait}</h4>
                    <p className="text-sm text-gray-600 mt-1">{description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <h3>The IPIP-NEO-120</h3>
            <p>
              This assessment uses the IPIP-NEO-120, a 120-item public domain measure that provides 
              scores for the Big Five traits and their 30 facets (6 facets per trait). The IPIP 
              (International Personality Item Pool) is a scientific collaboratory for the development 
              of personality measures.
            </p>
            <p>
              The items are representations of the NEO-PI-R™ developed by Costa and McCrae, adapted 
              for public use. Research has shown strong correlations between the IPIP scales and 
              the original proprietary measures.
            </p>
          </div>
        </div>
      </section>

      {/* Ethical Considerations */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-gray-700" />
            <h2 className="text-2xl font-bold text-gray-900">
              Ethical Considerations
            </h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Privacy & Data</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-conscientiousness flex-shrink-0 mt-1" />
                  <span>All data is stored locally on your device</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-conscientiousness flex-shrink-0 mt-1" />
                  <span>No personal information is collected or transmitted</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-conscientiousness flex-shrink-0 mt-1" />
                  <span>You can clear your data at any time</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Responsible Use</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-conscientiousness flex-shrink-0 mt-1" />
                  <span>Results should not be used for hiring or selection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-conscientiousness flex-shrink-0 mt-1" />
                  <span>Avoid using results to label or stereotype others</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-conscientiousness flex-shrink-0 mt-1" />
                  <span>Personality is complex and context-dependent</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interpreting Results */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Scale className="w-6 h-6 text-gray-700" />
            <h2 className="text-2xl font-bold text-gray-900">
              How to Interpret Your Results
            </h2>
          </div>
          
          <div className="prose prose-gray max-w-none">
            <h3>Results Reflect Tendencies, Not Destiny</h3>
            <p>
              Your scores indicate general tendencies in how you typically think, feel, and behave. 
              They are not fixed or deterministic. People can and do adapt their behavior based on 
              context, motivation, and effort.
            </p>
            
            <h3>No Score is "Good" or "Bad"</h3>
            <p>
              Each trait represents a spectrum with potential strengths at both ends. For example, 
              lower extraversion isn't worse than higher extraversion—it simply reflects a different 
              style of engaging with the world, each with its own advantages.
            </p>
            
            <h3>Context Matters</h3>
            <p>
              The same trait can be advantageous in some situations and challenging in others. 
              High conscientiousness might excel in structured environments but feel constraining 
              in highly creative or spontaneous settings.
            </p>
            
            <h3>Self-Report Limitations</h3>
            <p>
              This assessment relies on your honest self-reflection. Results may be influenced by:
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

      {/* When to Seek Help */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-6 h-6 text-gray-700" />
            <h2 className="text-2xl font-bold text-gray-900">
              When to Seek Professional Help
            </h2>
          </div>
          
          <div className="bg-white rounded-xl p-6">
            <p className="text-gray-600 mb-4">
              If you're experiencing persistent distress, difficulty functioning in daily life, 
              or concerns about your mental health, please reach out to a qualified mental health 
              professional. This assessment cannot and should not replace professional evaluation.
            </p>
            <p className="text-gray-600 mb-4">
              Consider seeking help if you experience:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
              <li>Persistent feelings of sadness, anxiety, or hopelessness</li>
              <li>Difficulty managing emotions or relationships</li>
              <li>Thoughts of self-harm or suicide</li>
              <li>Significant changes in sleep, appetite, or energy</li>
              <li>Difficulty functioning at work, school, or in relationships</li>
            </ul>
            <p className="text-gray-600">
              <strong>Crisis Resources:</strong>
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>National Suicide Prevention Lifeline: 988 (US)</li>
              <li>Crisis Text Line: Text HOME to 741741</li>
              <li>International Association for Suicide Prevention: 
                <a 
                  href="https://www.iasp.info/resources/Crisis_Centres/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-agreeableness hover:underline ml-1"
                >
                  Find a crisis center
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* References */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            References & Resources
          </h2>
          
          <div className="space-y-4">
            {[
              {
                title: 'International Personality Item Pool (IPIP)',
                description: 'Source of the public domain personality items used in this assessment.',
                url: 'https://ipip.ori.org/'
              },
              {
                title: 'Costa, P. T., & McCrae, R. R. (1992)',
                description: 'Revised NEO Personality Inventory (NEO-PI-R) and NEO Five-Factor Inventory (NEO-FFI) professional manual.',
                url: null
              },
              {
                title: 'John, O. P., & Srivastava, S. (1999)',
                description: 'The Big Five trait taxonomy: History, measurement, and theoretical perspectives.',
                url: null
              }
            ].map(({ title, description, url }) => (
              <div key={title} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{description}</p>
                </div>
                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 transition-colors"
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
