
/**
 * Animation utility functions to enhance UI interactions
 */

/**
 * Gets a staggered animation delay for a collection of items
 * @param index The index of the current item
 * @param baseDelay The base delay in milliseconds
 * @returns A CSS delay string like "0.2s"
 */
export const getStaggeredDelay = (index: number, baseDelay = 50): string => {
  return `${(index * baseDelay) / 1000}s`;
};

/**
 * Applies a staggered animation delay to an array of items
 * @param items Array of items to animate
 * @param animationName The CSS animation name to apply
 * @param baseDelay Base delay between animations in milliseconds
 * @returns An array of objects with the original item and animation styles
 */
export const staggerAnimation = <T>(
  items: T[],
  animationName = 'fade-in',
  baseDelay = 100
): Array<{ item: T; style: React.CSSProperties }> => {
  return items.map((item, index) => ({
    item,
    style: {
      animation: `${animationName} 0.5s forwards`,
      animationDelay: `${(index * baseDelay) / 1000}s`,
      opacity: 0,
    },
  }));
};

/**
 * Animation class generator based on scroll position
 * @param scrollPosition Current scroll position
 * @param triggerPosition Position to trigger animation
 * @param animationClass CSS class to apply when triggered
 * @returns The animation class or empty string
 */
export const getScrollAnimation = (
  scrollPosition: number,
  triggerPosition: number,
  animationClass: string
): string => {
  return scrollPosition > triggerPosition ? animationClass : '';
};

/**
 * Generates a keyframe animation for items appearing from a direction
 * @param direction Direction from which the element appears ('up', 'down', 'left', 'right')
 * @returns CSS animation property
 */
export const appearFrom = (direction: 'up' | 'down' | 'left' | 'right'): string => {
  const transformMap = {
    up: 'translateY(20px)',
    down: 'translateY(-20px)',
    left: 'translateX(20px)',
    right: 'translateX(-20px)',
  };

  return `
    @keyframes appearFrom${direction.charAt(0).toUpperCase() + direction.slice(1)} {
      from {
        opacity: 0;
        transform: ${transformMap[direction]};
      }
      to {
        opacity: 1;
        transform: translateY(0) translateX(0);
      }
    }
  `;
};

/**
 * Banner animation variants
 */
export const bannerAnimations = {
  fadeIn: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  },
  slideIn: {
    initial: { opacity: 0, x: '100%' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '100%' },
    transition: { duration: 0.4 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.3 }
  }
};

/**
 * Hover animation effects for different elements
 */
export const hoverEffects = {
  lift: 'transition-transform duration-300 hover:-translate-y-1',
  scale: 'transition-transform duration-300 hover:scale-105',
  glow: 'transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/20',
  emphasize: 'transition-all duration-300 hover:font-medium',
  underline: 'relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full',
};
