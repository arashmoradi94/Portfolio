import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '../../contexts/CursorContext';

const CustomCursor = () => {
  const { cursorVariant, setVariant } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device is mobile/touch
    const checkMobile = () => {
      const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(isTouchDevice);
    };
    checkMobile();
    
    if (isMobile) return;

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Auto-detect links and buttons on mouseover
    const handleMouseOver = (e) => {
      const target = e.target;
      const isProjectImage = target.closest('[data-project-image]');
      const isLink = target.tagName === 'A' || target.closest('a');
      const isButton = target.tagName === 'BUTTON' || target.closest('button');
      
      if (isProjectImage) {
        setVariant('project');
      } else if (isLink || isButton) {
        setVariant('link');
      } else {
        setVariant('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('resize', checkMobile);
    };
  }, [cursorX, cursorY, isVisible, isMobile, setVariant]);

  if (isMobile || !isVisible) return null;

  const sizeMap = {
    default: 20,
    link: 40,
    project: 80,
  };

  const size = sizeMap[cursorVariant] || sizeMap.default;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: cursorXSpring,
        top: cursorYSpring,
        width: size,
        height: size,
        mixBlendMode: 'difference',
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        width: size,
        height: size,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
    >
      <div className="rounded-full bg-white flex items-center justify-center w-full h-full">
        {cursorVariant === 'project' && (
          <span
            className="text-xs font-bold text-white pointer-events-none"
            style={{
              textShadow: '0 0 2px rgba(0,0,0,0.5)',
            }}
          >
            VIEW
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default CustomCursor;
