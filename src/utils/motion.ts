import { Variants } from 'motion/react';

/**
 * MARGO Atelier Couture Motion System
 * Refined physics, subtle blur transitions, and delicate stagger delays
 * for a quiet luxury digital experience.
 */

export const coutureEase = [0.22, 1, 0.36, 1] as const;
export const coutureExitEase = [0.4, 0, 0.7, 1] as const;

// Transition for the entire step screen in App.tsx
export const stepTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.45,
      ease: coutureEase,
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    y: -14,
    filter: 'blur(2px)',
    transition: {
      duration: 0.22,
      ease: coutureExitEase,
    },
  },
};

// Container for staggered child micro-animations
export const staggerContainer = (staggerDelay = 0.055, initialDelay = 0.04): Variants => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
});

// Single element fade-in + slide-up micro-animation
export const microFadeUp: Variants = {
  initial: {
    opacity: 0,
    y: 16,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: coutureEase,
    },
  },
};

// Slightly lighter slide-up for subtle badges or secondary text
export const microFadeUpSubtle: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: coutureEase,
    },
  },
};

// Tactile interactive states for atelier selection cards
export const coutureCardHover = {
  hover: {
    y: -3,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  tap: {
    scale: 0.985,
    transition: { duration: 0.12, ease: 'easeOut' },
  },
};
