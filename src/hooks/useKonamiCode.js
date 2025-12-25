import { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
];

const useKonamiCode = (callback) => {
  const [sequence, setSequence] = useState([]);
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    if (isActivated) {
      callback();
      setIsActivated(false);
      setSequence([]);
    }
  }, [isActivated, callback]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      setSequence((prev) => {
        const newSequence = [...prev, event.code];
        
        // Keep only the last 10 keys
        const trimmedSequence = newSequence.slice(-10);
        
        // Check if the sequence matches Konami code
        if (trimmedSequence.length === KONAMI_CODE.length) {
          const matches = trimmedSequence.every(
            (key, index) => key === KONAMI_CODE[index]
          );
          
          if (matches) {
            setIsActivated(true);
            return [];
          }
        }
        
        return trimmedSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return isActivated;
};

export default useKonamiCode;

