import { Variants } from 'framer-motion';

export const ANIMATION_VARIANTS: Record<string, Variants> = {
  'slide-in': {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  },
  'fade-in': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  'scale-in': {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  },
  'slide-up': {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  },
  'slide-down': {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }
};

export const DEFAULT_TRANSITION = {
  duration: 0.6,
  ease: [0.43, 0.13, 0.23, 0.96] // Ease out cubic
};
