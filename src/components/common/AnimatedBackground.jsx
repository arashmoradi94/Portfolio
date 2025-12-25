import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  // Define the gradient orbs with their properties
  // Using viewport units for responsive sizing
  const orbs = [
    {
      id: 1,
      color: 'rgba(0, 245, 255, 0.5)', // Neon Cyan
      size: '40vw',
      maxSize: 600,
      x: ['10vw', '30vw', '10vw', '15vw', '10vw'],
      y: ['20vh', '40vh', '20vh', '25vh', '20vh'],
      scale: [1, 1.2, 0.9, 1.1, 1],
      duration: 20,
    },
    {
      id: 2,
      color: 'rgba(168, 85, 247, 0.5)', // Neon Purple
      size: '35vw',
      maxSize: 500,
      x: ['70vw', '85vw', '70vw', '75vw', '70vw'],
      y: ['60vh', '75vh', '60vh', '65vh', '60vh'],
      scale: [1, 0.8, 1.3, 1, 1.1],
      duration: 25,
    },
    {
      id: 3,
      color: 'rgba(59, 130, 246, 0.4)', // Deep Blue
      size: '38vw',
      maxSize: 550,
      x: ['50vw', '65vw', '45vw', '50vw', '55vw'],
      y: ['80vh', '90vh', '70vh', '80vh', '85vh'],
      scale: [1, 1.1, 0.9, 1.2, 1],
      duration: 22,
    },
    {
      id: 4,
      color: 'rgba(0, 245, 255, 0.3)', // Lighter Cyan
      size: '30vw',
      maxSize: 450,
      x: ['20vw', '35vw', '15vw', '20vw', '25vw'],
      y: ['70vh', '85vh', '60vh', '70vh', '75vh'],
      scale: [1, 1.3, 0.8, 1.1, 1],
      duration: 18,
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full will-change-transform"
          style={{
            width: orb.size,
            height: orb.size,
            maxWidth: `${orb.maxSize}px`,
            maxHeight: `${orb.maxSize}px`,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: 'blur(120px)',
            opacity: 0.5,
          }}
          initial={{
            x: orb.x[0],
            y: orb.y[0],
            scale: 1,
          }}
          animate={{
            x: orb.x,
            y: orb.y,
            scale: orb.scale,
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {/* Additional subtle pulsing effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 245, 255, 0.1) 0%, transparent 70%)',
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
