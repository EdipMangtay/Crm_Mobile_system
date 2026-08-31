'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const cursorRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for trailing outer ring
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only show on devices with fine pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Track interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, textarea, [data-cursor]');
      if (interactive) {
        setIsHovered(true);
        const text = interactive.getAttribute('data-cursor') || '';
        setHoverText(text);
      } else {
        setIsHovered(false);
        setHoverText('');
      }
    };

    window.addEventListener('mouseover', handleElementHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleElementHover);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300">
      {/* Outer Smooth Trailing Ring */}
      <motion.div
        ref={cursorRef}
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 2.2 : 1,
          borderColor: isHovered ? 'rgba(232, 199, 122, 0.9)' : 'rgba(201, 166, 107, 0.45)',
          backgroundColor: isHovered ? 'rgba(201, 166, 107, 0.12)' : 'rgba(201, 166, 107, 0.02)',
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 flex items-center justify-center rounded-full border border-gold-400/50 backdrop-blur-[1px] will-change-transform"
        style-width="42px"
        css-prop-fix=""
      >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isHovered ? 'w-16 h-16' : 'w-10 h-10'}`}>
          {hoverText && (
            <span className="text-[8px] font-sans font-semibold tracking-widest text-gold-300 uppercase select-none">
              {hoverText}
            </span>
          )}
        </div>
      </motion.div>

      {/* Center Precise Gold Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 0.4 : 1,
          opacity: isHovered ? 0.5 : 1,
        }}
        transition={{ duration: 0.1 }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-gold-400 shadow-[0_0_8px_rgba(232,199,122,0.8)] will-change-transform"
      />
    </div>
  );
}
