import { motion } from 'framer-motion';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
} from 'react-icons/fa';
import { SiTypescript, SiTailwindcss } from 'react-icons/si';

const TechStack = () => {
  const techItems = [
    {
      id: 1,
      name: 'Tailwind CSS',
      icon: SiTailwindcss,
      color: '#06b6d4', // Cyan
    },
    {
      id: 2,
      name: 'TypeScript',
      icon: SiTypescript,
      color: '#3178c6', // Blue
    },
    {
      id: 3,
      name: 'React',
      icon: FaReact,
      color: '#61dafb', // Cyan
      spin: true,
    },
    {
      id: 4,
      name: 'JavaScript',
      icon: FaJs,
      color: '#f7df1e', // Yellow
    },
    {
      id: 5,
      name: 'CSS3',
      icon: FaCss3Alt,
      color: '#264de4', // Blue
    },
    {
      id: 6,
      name: 'HTML5',
      icon: FaHtml5,
      color: '#e34c26', // Orange
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text"
          >
            Tech Stack
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {techItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="group aspect-square bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 hover:border-neon-cyan hover:shadow-neon-cyan/20"
                >
                  <IconComponent
                    className={`text-4xl md:text-5xl mb-3 transition-transform duration-300 ${
                      item.spin ? 'animate-spin' : ''
                    }`}
                    style={{ 
                      color: item.color,
                      animationDuration: item.spin ? '3s' : 'inherit',
                    }}
                  />
                  <span className="text-xs md:text-sm font-medium text-gray-300 group-hover:text-neon-cyan transition-colors duration-300">
                    {item.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;

