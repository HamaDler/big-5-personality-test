import React from 'react';

interface IllustrationProps {
  className?: string;
}

// Minimal leaf/nature illustration
export const LeafIllustration: React.FC<IllustrationProps> = ({
  className = '',
}) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M60 20C60 20 40 40 40 65C40 90 55 100 60 100C65 100 80 90 80 65C80 40 60 20 60 20Z"
      className="fill-sage-200 stroke-sage-400"
      strokeWidth="1.5"
    />
    <path
      d="M60 35V90"
      className="stroke-sage-400"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M60 50L48 62"
      className="stroke-sage-300"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M60 65L72 53"
      className="stroke-sage-300"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// Circular zen rings
export const ZenRingsIllustration: React.FC<IllustrationProps> = ({
  className = '',
}) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle
      cx="100"
      cy="100"
      r="80"
      className="stroke-sage-200"
      strokeWidth="1"
      strokeDasharray="4 4"
    />
    <circle
      cx="100"
      cy="100"
      r="60"
      className="stroke-sage-300"
      strokeWidth="1.5"
      strokeDasharray="6 6"
    />
    <circle
      cx="100"
      cy="100"
      r="40"
      className="stroke-sage-400"
      strokeWidth="2"
    />
    <circle cx="100" cy="100" r="8" className="fill-sage-500" />
  </svg>
);

// Mind/brain abstract illustration
export const MindIllustration: React.FC<IllustrationProps> = ({
  className = '',
}) => (
  <svg
    viewBox="0 0 140 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Outer glow */}
    <circle cx="70" cy="70" r="55" className="fill-sage-100" opacity="0.5" />

    {/* Main head shape */}
    <ellipse
      cx="70"
      cy="65"
      rx="35"
      ry="40"
      className="fill-sage-200 stroke-sage-400"
      strokeWidth="1.5"
    />

    {/* Mind patterns */}
    <path
      d="M50 55C55 50 65 48 70 50C75 52 80 58 78 65C76 72 68 75 60 73C52 71 48 65 50 58"
      className="stroke-sage-400"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M65 62C70 58 82 58 85 65C88 72 82 80 75 82"
      className="stroke-sage-300"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />

    {/* Dots representing thoughts */}
    <circle cx="58" cy="55" r="2.5" className="fill-sage-500" />
    <circle cx="72" cy="65" r="2" className="fill-sage-400" />
    <circle cx="80" cy="52" r="1.5" className="fill-sage-300" />
  </svg>
);

// Five dots representing the Big Five
export const FiveDotsIllustration: React.FC<IllustrationProps> = ({
  className = '',
}) => (
  <svg
    viewBox="0 0 180 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Connecting lines */}
    <path
      d="M25 50 L55 50 L90 30 L125 50 L155 50"
      className="stroke-sage-200"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M55 50 L90 70 L125 50"
      className="stroke-sage-200"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Five trait dots */}
    <circle
      cx="25"
      cy="50"
      r="12"
      className="fill-openness-light stroke-openness"
      strokeWidth="2"
    />
    <circle
      cx="55"
      cy="50"
      r="12"
      className="fill-conscientiousness-light stroke-conscientiousness"
      strokeWidth="2"
    />
    <circle
      cx="90"
      cy="30"
      r="12"
      className="fill-extraversion-light stroke-extraversion"
      strokeWidth="2"
    />
    <circle
      cx="125"
      cy="50"
      r="12"
      className="fill-agreeableness-light stroke-agreeableness"
      strokeWidth="2"
    />
    <circle
      cx="155"
      cy="50"
      r="12"
      className="fill-neuroticism-light stroke-neuroticism"
      strokeWidth="2"
    />

    {/* Bottom dot */}
    <circle
      cx="90"
      cy="70"
      r="8"
      className="fill-sage-200 stroke-sage-400"
      strokeWidth="1.5"
    />
  </svg>
);

// Mountain/path journey illustration
export const JourneyIllustration: React.FC<IllustrationProps> = ({
  className = '',
}) => (
  <svg
    viewBox="0 0 200 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Sun */}
    <circle cx="160" cy="30" r="15" className="fill-sage-200" />
    <circle cx="160" cy="30" r="10" className="fill-sage-300" />

    {/* Mountains */}
    <path
      d="M0 120 L50 50 L80 80 L120 35 L160 70 L200 45 L200 120 Z"
      className="fill-sage-100"
    />
    <path
      d="M0 120 L30 70 L60 95 L100 55 L140 85 L180 60 L200 80 L200 120 Z"
      className="fill-sage-200"
    />

    {/* Path */}
    <path
      d="M20 110 Q50 100 70 105 T120 95 T170 100"
      className="stroke-sage-400"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="4 4"
      fill="none"
    />

    {/* Trees */}
    <path d="M30 100 L35 85 L40 100" className="fill-sage-400" />
    <path d="M145 95 L150 80 L155 95" className="fill-sage-400" />
  </svg>
);

// Meditation person silhouette
export const MeditationIllustration: React.FC<IllustrationProps> = ({
  className = '',
}) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Background circle */}
    <circle cx="60" cy="60" r="50" className="fill-sage-100" opacity="0.5" />

    {/* Person */}
    {/* Head */}
    <circle cx="60" cy="40" r="12" className="fill-sage-400" />

    {/* Body */}
    <ellipse cx="60" cy="75" rx="25" ry="20" className="fill-sage-300" />

    {/* Arms */}
    <path
      d="M35 70 Q40 80 60 78 Q80 80 85 70"
      className="stroke-sage-400"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />

    {/* Subtle aura rings */}
    <circle
      cx="60"
      cy="55"
      r="35"
      className="stroke-sage-200"
      strokeWidth="1"
      fill="none"
      opacity="0.6"
    />
    <circle
      cx="60"
      cy="55"
      r="42"
      className="stroke-sage-200"
      strokeWidth="1"
      fill="none"
      opacity="0.3"
    />
  </svg>
);

// Growing plant illustration
export const GrowthIllustration: React.FC<IllustrationProps> = ({
  className = '',
}) => (
  <svg
    viewBox="0 0 100 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Pot */}
    <path
      d="M30 110 L35 130 L65 130 L70 110 Z"
      className="fill-sage-300 stroke-sage-400"
      strokeWidth="1.5"
    />
    <rect
      x="28"
      y="105"
      width="44"
      height="8"
      rx="2"
      className="fill-sage-400"
    />

    {/* Stem */}
    <path
      d="M50 105 Q50 85 48 70 Q46 55 50 40"
      className="stroke-sage-500"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />

    {/* Leaves */}
    <path
      d="M48 80 Q35 75 30 60 Q40 65 48 75"
      className="fill-sage-300 stroke-sage-400"
      strokeWidth="1"
    />
    <path
      d="M50 65 Q65 55 75 50 Q65 62 52 68"
      className="fill-sage-300 stroke-sage-400"
      strokeWidth="1"
    />
    <path
      d="M50 50 Q40 40 35 25 Q45 38 50 48"
      className="fill-sage-200 stroke-sage-400"
      strokeWidth="1"
    />

    {/* Flower bud */}
    <circle
      cx="50"
      cy="35"
      r="8"
      className="fill-sage-200 stroke-sage-400"
      strokeWidth="1.5"
    />
    <circle cx="50" cy="35" r="4" className="fill-sage-400" />
  </svg>
);

// Abstract waves for calm
export const WavesIllustration: React.FC<IllustrationProps> = ({
  className = '',
}) => (
  <svg
    viewBox="0 0 200 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M0 40 Q25 20 50 40 T100 40 T150 40 T200 40"
      className="stroke-sage-200"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M0 50 Q25 30 50 50 T100 50 T150 50 T200 50"
      className="stroke-sage-300"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M0 60 Q25 40 50 60 T100 60 T150 60 T200 60"
      className="stroke-sage-400"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);
