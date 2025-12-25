import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
} from 'react-icons/fa';
import { SiTypescript, SiTailwindcss } from 'react-icons/si';
import { techStack } from '../../data/portfolioData';

const About = () => {
  const { t } = useTranslation();

  const iconMap = {
    FaHtml5: FaHtml5,
    FaCss3Alt: FaCss3Alt,
    FaJs: FaJs,
    FaReact: FaReact,
    SiTypescript: SiTypescript,
    SiTailwindcss: SiTailwindcss,
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          {/* About Card */}
          <motion.div variants={itemVariants} className="glass-card p-8 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
              {t('about.title')}
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {t('about.bio')}
            </p>
          </motion.div>

          {/* Tech Stack */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-6 text-center gradient-text">
              {t('about.techStack')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {techStack.map((tech, index) => {
                const IconComponent = iconMap[tech.icon];
                return (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -4 }}
                    className="glass-card aspect-square p-6 rounded-lg flex flex-col items-center justify-center"
                  >
                    {IconComponent && (
                      <IconComponent
                        className="text-5xl mb-3"
                        style={{ color: tech.color }}
                      />
                    )}
                    <span className="text-sm font-medium text-gray-300">
                      {tech.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
