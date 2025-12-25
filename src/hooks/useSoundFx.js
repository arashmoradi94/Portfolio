import { useState, useEffect } from 'react';
import useSound from 'use-sound';

// Note: You'll need to add sound files to public/sounds/ directory
// For now, the hook will work but sounds won't play until files are added
const useSoundFx = () => {
  const [isMuted, setIsMuted] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-sound-muted');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  // Try to load sounds, but handle gracefully if files don't exist
  // The hook will work even without sound files
  const [playHover] = useSound('/sounds/hover.mp3', {
    volume: 0.3,
    interrupt: true,
    soundEnabled: !isMuted,
  });
  
  const [playClick] = useSound('/sounds/click.mp3', {
    volume: 0.4,
    interrupt: true,
    soundEnabled: !isMuted,
  });

  useEffect(() => {
    try {
      localStorage.setItem('portfolio-sound-muted', isMuted.toString());
    } catch (error) {
      console.warn('Failed to save mute state:', error);
    }
  }, [isMuted]);

  const handleHover = () => {
    if (!isMuted) {
      try {
        playHover();
      } catch (error) {
        // Silently fail if sound can't play (e.g., file doesn't exist)
      }
    }
  };

  const handleClick = () => {
    if (!isMuted) {
      try {
        playClick();
      } catch (error) {
        // Silently fail if sound can't play (e.g., file doesn't exist)
      }
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return {
    isMuted,
    toggleMute,
    handleHover,
    handleClick,
  };
};

export default useSoundFx;

