import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { experience } from '../../data/portfolioData';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';

const Experience = () => {
  const { t, i18n } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const getItemVariants = () => ({
    hidden: { opacity: 0, x: i18n.language === 'fa' ? 50 : -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  });

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 gradient-text"
        >
          {t('experience.title')}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative"
        >
          {/* Timeline Line */}
          <div className={`absolute ${i18n.language === 'fa' ? 'right-8' : 'left-8'} top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-cyan via-neon-purple to-neon-cyan hidden md:block`} />

          <div className="space-y-8">
            {experience.map((item, index) => (
              <motion.div
                key={item.id}
                variants={getItemVariants()}
                className={`relative flex items-start gap-6 ${i18n.language === 'fa' ? 'flex-row' : ''}`}
              >
                {/* Timeline Dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center border-2 border-neon-cyan">
                    {item.type === 'work' ? (
                      <FaBriefcase className="text-neon-cyan text-xl" />
                    ) : (
                      <FaGraduationCap className="text-neon-purple text-xl" />
                    )}
                  </div>
                </div>

                {/* Content Card */}
                <motion.div
                  whileHover={{ scale: 1.02, x: i18n.language === 'fa' ? -10 : 10 }}
                  className="flex-1 glass-card p-6 rounded-lg"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-neon-cyan font-bold text-lg">
                      {item.year}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.type === 'work'
                          ? 'bg-neon-cyan/20 text-neon-cyan'
                          : 'bg-neon-purple/20 text-neon-purple'
                      }`}
                    >
                      {item.type === 'work' ? 'Work' : 'Learning'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-white">
                    {item.title}
                  </h3>
                  <p className="text-neon-purple mb-2 font-medium">
                    {item.company}
                  </p>
                  <p className="text-gray-300">{item.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;

