import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { socialLinks } from '../../data/portfolioData';
import useSoundFx from '../../hooks/useSoundFx';
import TextSphere from '../common/TextSphere';
import MagneticWrapper from '../common/MagneticWrapper';

const Hero = () => {
  const { t } = useTranslation();
  const { handleHover, handleClick } = useSoundFx();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Side - Text Content */}
          <div className="text-center lg:text-left rtl:lg:text-right">
            <motion.p
              variants={itemVariants}
              className="text-neon-cyan text-lg mb-4 font-medium"
            >
              {t('hero.greeting')}
            </motion.p>
            
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
            >
              <span className="gradient-text">{t('hero.name')}</span>
            </motion.h1>
            
            <motion.div
              variants={itemVariants}
              className="text-xl md:text-2xl mb-8 min-h-[2.5rem] md:min-h-[3rem]"
            >
              <TypeAnimation
                sequence={[
                  'Frontend Developer',
                  2000,
                  'React Specialist',
                  2000,
                  'UI/UX Enthusiast',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="gradient-text font-medium"
              />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <MagneticWrapper>
                <motion.a
                  href="#contact"
                  onClick={handleClick}
                  onMouseEnter={handleHover}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline text-center"
                >
                  {t('hero.contactMe')}
                </motion.a>
              </MagneticWrapper>
              
              <MagneticWrapper>
                <motion.a
                  href="#projects"
                  onClick={handleClick}
                  onMouseEnter={handleHover}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-center"
                >
                  {t('hero.viewProjects')}
                </motion.a>
              </MagneticWrapper>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex gap-4 justify-center lg:justify-start"
            >
              <MagneticWrapper>
                <motion.a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClick}
                  onMouseEnter={handleHover}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-2xl text-gray-400 hover:text-neon-cyan transition-colors duration-300"
                >
                  <FaGithub />
                </motion.a>
              </MagneticWrapper>
              
              <MagneticWrapper>
                <motion.a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClick}
                  onMouseEnter={handleHover}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-2xl text-gray-400 hover:text-neon-cyan transition-colors duration-300"
                >
                  <FaLinkedin />
                </motion.a>
              </MagneticWrapper>
              
              <MagneticWrapper>
                <motion.a
                  href={socialLinks.email}
                  onClick={handleClick}
                  onMouseEnter={handleHover}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-2xl text-gray-400 hover:text-neon-cyan transition-colors duration-300"
                >
                  <FaEnvelope />
                </motion.a>
              </MagneticWrapper>
            </motion.div>
          </div>

          {/* Right Side - Profile Image & TextSphere (Desktop) / Profile Image (Mobile) */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center lg:justify-end gap-8"
          >
            {/* Profile Image - Desktop & Mobile */}
            <div className="relative group">
              {/* Animated Glow Border */}
              <motion.div
                className="absolute -inset-2 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(0, 245, 255, 0.4), 0 0 60px rgba(168, 85, 247, 0.2)',
                    '0 0 40px rgba(0, 245, 255, 0.6), 0 0 80px rgba(168, 85, 247, 0.4)',
                    '0 0 30px rgba(0, 245, 255, 0.4), 0 0 60px rgba(168, 85, 247, 0.2)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.3), rgba(168, 85, 247, 0.3))',
                  borderRadius: '1rem',
                }}
              />
              
              {/* Glassmorphism Container */}
              <motion.div
                className="relative rounded-2xl p-1 backdrop-blur-sm bg-gradient-to-br from-neon-cyan/20 via-neon-purple/20 to-neon-cyan/20 border border-white/10"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Image Container with Gradient Overlay */}
                <div className="relative overflow-hidden rounded-xl">
                  <motion.img
                    src={`${import.meta.env.BASE_URL}profile.jpg`}
                    alt="Profile"
                    className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover rounded-xl"
                    onError={(e) => {
                      // Fallback if image doesn't exist - show gradient avatar
                      e.target.style.display = 'none';
                      const fallback = e.target.nextElementSibling;
                      if (fallback) {
                        fallback.style.display = 'flex';
                      }
                    }}
                    animate={{
                      scale: [1, 1.03, 1],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  {/* Fallback Avatar if image doesn't exist */}
                  <div 
                    className="hidden w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 bg-gradient-to-br from-neon-cyan via-neon-purple to-neon-cyan flex items-center justify-center text-6xl md:text-8xl font-bold text-dark-bg rounded-xl"
                  >
                    A
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
              
              {/* Floating Particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-neon-cyan rounded-full"
                  style={{
                    top: `${15 + i * 10}%`,
                    left: `${10 + (i % 3) * 30}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, Math.sin(i) * 20, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 3 + i * 0.2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: 'easeInOut',
                  }}
                />
              ))}
              
              {/* Animated Border Ring */}
              <motion.div
                className="absolute -inset-4 rounded-2xl border-2 border-transparent"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.5), rgba(168, 85, 247, 0.5)) padding-box, linear-gradient(135deg, rgba(0, 245, 255, 0.8), rgba(168, 85, 247, 0.8)) border-box',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </div>
            
            {/* Desktop: Show TextSphere below image */}
            <div className="hidden lg:flex items-center justify-center w-full h-[300px]">
              <TextSphere />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
