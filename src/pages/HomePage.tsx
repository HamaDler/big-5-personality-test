import { useNavigate } from 'react-router-dom';
import { useTest } from '../context/TestContext';
import {
  Play,
  RotateCcw,
  BarChart3,
  CheckCircle,
  Clock,
  Shield,
  Brain,
  FileText,
} from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const { startTest, resumeTest, hasExistingSession, hasExistingResults } =
    useTest();

  const handleStartNew = () => {
    startTest();
    navigate('/test');
  };

  const handleResume = () => {
    resumeTest();
    navigate('/test');
  };

  const handleViewResults = () => {
    navigate('/results');
  };

  const traits = [
    {
      name: 'Openness',
      color: 'bg-openness',
      description: 'Creativity and intellectual curiosity',
    },
    {
      name: 'Conscientiousness',
      color: 'bg-conscientiousness',
      description: 'Organization and dependability',
    },
    {
      name: 'Extraversion',
      color: 'bg-extraversion',
      description: 'Sociability and positive energy',
    },
    {
      name: 'Agreeableness',
      color: 'bg-agreeableness',
      description: 'Cooperation and compassion',
    },
    {
      name: 'Emotional Stability',
      color: 'bg-neuroticism',
      description: 'Calmness and resilience',
    },
  ];

  const features = [
    {
      icon: Clock,
      title: '15-20 minutes',
      description: '120 carefully designed questions',
    },
    {
      icon: Shield,
      title: 'Private & Secure',
      description: 'Your data stays on your device',
    },
    {
      icon: Brain,
      title: 'Scientifically Based',
      description: 'Based on the IPIP-NEO-120 inventory',
    },
    {
      icon: FileText,
      title: 'Detailed Report',
      description: 'Download your results as PDF',
    },
  ];

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Discover Your
            <span className="bg-gradient-to-r from-openness via-conscientiousness to-agreeableness bg-clip-text text-transparent">
              {' '}
              Personality Profile
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Take the scientifically-validated Big Five personality assessment to
            gain insights into your unique patterns of thinking, feeling, and
            behaving.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {hasExistingSession() && (
              <button
                onClick={handleResume}
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                Continue Test
              </button>
            )}
            <button
              onClick={handleStartNew}
              className="flex items-center gap-2 px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Play className="w-5 h-5" />
              {hasExistingSession() ? 'Start Over' : 'Start Assessment'}
            </button>
            {hasExistingResults() && (
              <button
                onClick={handleViewResults}
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                <BarChart3 className="w-5 h-5" />
                View Results
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Big Five Traits */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
            The Big Five Personality Traits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {traits.map((trait) => (
              <div
                key={trait.name}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 ${trait.color} rounded-full mx-auto mb-4 opacity-80`}
                />
                <h3 className="font-semibold text-gray-900 mb-2">
                  {trait.name}
                </h3>
                <p className="text-sm text-gray-600">{trait.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            What You'll Learn
          </h2>
          <div className="space-y-4">
            {[
              'Your scores across five major personality dimensions',
              'Detailed breakdown of 30 personality facets',
              'Personalized interpretations of your results',
              'How your tendencies may show up in different situations',
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-gray-50 rounded-lg p-4"
              >
                <CheckCircle className="w-5 h-5 text-conscientiousness flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-amber-50 border-y border-amber-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-amber-800 text-sm">
            <strong>Important:</strong> This assessment is for educational and
            self-reflection purposes only. It is not a clinical diagnosis tool
            and should not be used to make medical, psychological, or
            professional decisions. Results represent tendencies, not fixed
            traits.
          </p>
        </div>
      </section>
    </div>
  );
}
