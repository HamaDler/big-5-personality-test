import { useNavigate } from 'react-router-dom';
import { useTest } from '../context/TestContext';
import {
  Play,
  RotateCcw,
  BarChart3,
  Clock,
  Shield,
  Sparkles,
  FileText,
  ArrowRight,
  Leaf,
} from 'lucide-react';
import {
  MindIllustration,
  JourneyIllustration,
  MeditationIllustration,
  GrowthIllustration,
  WavesIllustration,
} from '../components/ZenIllustrations';

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
      description: 'Creativity and intellectual curiosity',
      color: 'bg-openness-light border-openness',
    },
    {
      name: 'Conscientiousness',
      description: 'Organization and dependability',
      color: 'bg-conscientiousness-light border-conscientiousness',
    },
    {
      name: 'Extraversion',
      description: 'Sociability and positive energy',
      color: 'bg-extraversion-light border-extraversion',
    },
    {
      name: 'Agreeableness',
      description: 'Cooperation and compassion',
      color: 'bg-agreeableness-light border-agreeableness',
    },
    {
      name: 'Emotional Stability',
      description: 'Calmness and resilience',
      color: 'bg-neuroticism-light border-neuroticism',
    },
  ];

  const features = [
    {
      icon: Clock,
      title: '15-20 minutes',
      description: '120 thoughtfully crafted questions',
    },
    {
      icon: Shield,
      title: 'Private & Secure',
      description: 'Your data stays on your device',
    },
    {
      icon: Sparkles,
      title: 'Science-Based',
      description: 'Based on IPIP-NEO-120 research',
    },
    {
      icon: FileText,
      title: 'Detailed Report',
      description: 'Download your personal PDF',
    },
  ];

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-64 h-64 opacity-30">
            <MindIllustration className="w-full h-full animate-float" />
          </div>
          <div className="absolute bottom-0 left-0 w-full">
            <WavesIllustration className="w-full h-auto opacity-10" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Decorative leaf */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-100 rounded-full text-sage-700 text-sm font-medium mb-6">
            <Leaf className="w-4 h-4" />
            <span>Discover yourself</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-warm-800 mb-6 leading-tight">
            Understand Your
            <span className="text-sage-600 block sm:inline">
              {' '}
              Unique Personality
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-warm-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Take a peaceful journey of self-discovery with this
            scientifically-validated assessment. Gain meaningful insights into
            your patterns of thinking, feeling, and connecting with the world.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {hasExistingSession() && (
              <button
                onClick={handleResume}
                className="btn-zen-outline w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Continue Journey
              </button>
            )}
            <button
              onClick={handleStartNew}
              className="btn-zen w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              {hasExistingSession() ? 'Begin Again' : 'Begin Assessment'}
              <ArrowRight className="w-4 h-4" />
            </button>
            {hasExistingResults() && (
              <button
                onClick={handleViewResults}
                className="btn-zen-outline w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <BarChart3 className="w-5 h-5" />
                View Results
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Big Five Traits */}
      <section className="py-16 bg-white/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-warm-800 mb-3">
              The Five Dimensions
            </h2>
            <p className="text-warm-500 max-w-xl mx-auto">
              Explore the core aspects of personality that shape how we
              experience life
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {traits.map((trait, index) => (
              <div
                key={trait.name}
                className={`card-zen text-center border-l-4 ${trait.color} animate-fadeIn`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className="w-3 h-3 rounded-full mx-auto mb-4 bg-current opacity-60"
                  style={{
                    color: `var(--color-${trait.name.toLowerCase().replace(' ', '-')})`,
                  }}
                />
                <h3 className="font-medium text-warm-700 mb-2">{trait.name}</h3>
                <p className="text-sm text-warm-500">{trait.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map(({ icon: Icon, title, description }, index) => (
              <div
                key={title}
                className="flex items-start gap-4 animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-sage-600" />
                </div>
                <div>
                  <h3 className="font-medium text-warm-700">{title}</h3>
                  <p className="text-sm text-warm-500">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section with Illustration */}
      <section className="py-16 bg-sage-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-warm-800 mb-6">
                Your Journey of Self-Discovery
              </h2>
              <div className="space-y-4">
                {[
                  'Understand your scores across five major personality dimensions',
                  'Explore detailed insights into 30 personality facets',
                  'Receive personalized interpretations of your results',
                  'Discover how your tendencies shape your daily life',
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 animate-fadeIn"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-sage-200 flex items-center justify-center mt-0.5">
                      <Leaf className="w-3 h-3 text-sage-600" />
                    </div>
                    <span className="text-warm-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <JourneyIllustration className="w-64 sm:w-80 h-auto animate-float" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24">
                  <GrowthIllustration className="w-full h-full animate-breathe" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meditation/Mindful Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MeditationIllustration className="w-32 h-32 mx-auto mb-8 animate-gentlePulse" />
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-warm-800 mb-4">
            Take Your Time
          </h2>
          <p className="text-warm-500 max-w-xl mx-auto mb-8">
            This assessment is designed to be completed at your own pace. Your
            progress is automatically saved, so you can return anytime to
            continue your journey.
          </p>
          <button
            onClick={handleStartNew}
            className="btn-zen inline-flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            Start Your Journey
          </button>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-10 bg-sage-50 border-y border-sage-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sage-700 text-sm leading-relaxed">
            <strong>A gentle reminder:</strong> This assessment is for
            educational and self-reflection purposes only. It is not a clinical
            diagnosis tool and should not be used to make medical,
            psychological, or professional decisions. Your results represent
            tendencies, not fixed traits—we're all constantly growing and
            evolving.
          </p>
        </div>
      </section>
    </div>
  );
}
