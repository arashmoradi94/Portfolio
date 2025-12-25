import { useEffect, useRef } from 'react';
import TagCloud from 'TagCloud';

const TextSphere = () => {
  const containerRef = useRef(null);
  const tagCloudRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const texts = [
      'React',
      'TypeScript',
      'Next.js',
      'Tailwind',
      'Git',
      'Three.js',
      'Redux',
      'Vite',
      'Figma',
    ];

    const radius = window.innerWidth <= 768 ? 100 : 150;

    const options = {
      radius: radius,
      maxSpeed: 'fast',
      initSpeed: 'fast',
      direction: 135,
      keep: true,
    };

    // Initialize TagCloud
    tagCloudRef.current = TagCloud(containerRef.current, texts, options);

    // Update color
    const tags = containerRef.current.querySelectorAll('.tagcloud > span');
    tags.forEach((tag) => {
      tag.style.color = '#00f3ff';
      tag.style.fontSize = '14px';
      tag.style.fontWeight = '600';
    });

    // Handle resize
    const handleResize = () => {
      if (tagCloudRef.current && containerRef.current) {
        // TagCloud doesn't have a direct destroy method, so we'll recreate it
        containerRef.current.innerHTML = '';
        const newRadius = window.innerWidth <= 768 ? 100 : 150;
        tagCloudRef.current = TagCloud(containerRef.current, texts, {
          ...options,
          radius: newRadius,
        });
        const newTags = containerRef.current.querySelectorAll('.tagcloud > span');
        newTags.forEach((tag) => {
          tag.style.color = '#00f3ff';
          tag.style.fontSize = '14px';
          tag.style.fontWeight = '600';
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div
        ref={containerRef}
        className="tagcloud"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    </div>
  );
};

export default TextSphere;


