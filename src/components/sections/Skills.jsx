import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { skills } from '../../data/portfolioData';
import TiltCard from '../common/TiltCard';
import useSoundFx from '../../hooks/useSoundFx';

const Skills = () => {
  const { t } = useTranslation();
  const { handleHover } = useSoundFx();

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

  const SkillCategory = ({ title, skillList }) => (
    <motion.div variants={itemVariants}>
      <TiltCard
        className="glass-card p-6 rounded-lg min-h-[414px]"
        onMouseEnter={handleHover}
      >
        <h3 className="text-xl font-bold mb-4 gradient-text">{title}</h3>
        <div className="space-y-4">
          {skillList.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 font-medium">{skill.name}</span>
                <span className="text-neon-cyan text-sm">{skill.level}%</span>
              </div>
              <div className="w-full bg-glass-dark rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-gradient-neon rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </TiltCard>
    </motion.div>
  );

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-12 gradient-text"
          >
            {t('skills.title')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkillCategory
              title={t('skills.frontend')}
              skillList={skills.frontend}
            />
            <SkillCategory title={t('skills.tools')} skillList={skills.tools} />
            <SkillCategory
              title={t('skills.basics')}
              skillList={skills.basics}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

