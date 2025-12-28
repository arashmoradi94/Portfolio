import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { projects } from '../../data/portfolioData';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import SpotlightCard from '../common/SpotlightCard';
import TiltCard from '../common/TiltCard';
import useSoundFx from '../../hooks/useSoundFx';
import { useCursor } from '../../contexts/CursorContext';
import wpuImage from '../../assets/images/wpu.png';

const Projects = () => {
  const { t } = useTranslation();
  const { handleHover, handleClick } = useSoundFx();
  const { setVariant } = useCursor();

  // Image mapping for local images
  const imageMap = {
    '/images/wpu.png': wpuImage,
  };

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    // Check if it's a local image that we've imported
    if (imageMap[imagePath]) return imageMap[imagePath];
    // Fallback to public folder with BASE_URL
    const cleanPath = imagePath.replace(/^\//, '');
    return `${import.meta.env.BASE_URL}${cleanPath}`;
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 gradient-text"
        >
          {t('projects.title')}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <TiltCard
                className="glass-card-hover overflow-hidden rounded-lg group"
                onMouseEnter={handleHover}
              >
              {/* Project Image */}
              <div 
                className="relative h-48 overflow-hidden"
                data-project-image
              >
                <img
                  src={getImageUrl(project.image)}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    console.error('Image failed to load:', project.image, 'Resolved URL:', getImageUrl(project.image));
                    e.target.src = 'https://via.placeholder.com/800x400/1a1a2e/00d9ff?text=Image+Not+Found';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent" />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded bg-glass-medium text-neon-cyan border border-neon-cyan/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleClick}
                    onMouseEnter={() => {
                      handleHover();
                      setVariant('link');
                    }}
                    onMouseLeave={() => setVariant('default')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-glass-medium hover:bg-glass-light border border-neon-cyan/30 text-neon-cyan text-sm font-medium transition-all duration-300"
                  >
                    <FaExternalLinkAlt />
                    {t('projects.liveDemo')}
                  </motion.a>
                  
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleClick}
                    onMouseEnter={() => {
                      handleHover();
                      setVariant('link');
                    }}
                    onMouseLeave={() => setVariant('default')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-glass-medium hover:bg-glass-light border border-neon-purple/30 text-neon-purple text-sm font-medium transition-all duration-300"
                  >
                    <FaGithub />
                  </motion.a>
                </div>
              </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

