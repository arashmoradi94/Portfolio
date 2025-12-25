import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter } from 'react-icons/fa';
import { socialLinks } from '../../data/portfolioData';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 1500);
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
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text"
          >
            {t('contact.title')}
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-center text-gray-300 mb-12 text-lg"
          >
            {t('contact.subtitle')}
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="glass-card p-8 rounded-lg"
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-glass-dark border border-glass-medium text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan transition-all duration-300"
                    placeholder={t('contact.name')}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-glass-dark border border-glass-medium text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan transition-all duration-300"
                    placeholder={t('contact.email')}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    {t('contact.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg bg-glass-dark border border-glass-medium text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan transition-all duration-300 resize-none"
                    placeholder={t('contact.message')}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t('contact.sending') : t('contact.submit')}
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-neon-cyan/20 border border-neon-cyan text-neon-cyan text-center"
                  >
                    {t('contact.success')}
                  </motion.div>
                )}
              </div>
            </motion.form>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="glass-card p-8 rounded-lg flex flex-col justify-center"
            >
              <h3 className="text-2xl font-bold mb-6 gradient-text text-center lg:text-left rtl:lg:text-right">
                Connect With Me
              </h3>
              
              <div className="space-y-4">
                <motion.a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center gap-4 rtl:flex-row-reverse p-4 rounded-lg glass-card-hover group"
                >
                  <FaGithub className="text-3xl text-gray-400 group-hover:text-neon-cyan transition-colors duration-300" />
                  <span className="text-gray-300 group-hover:text-neon-cyan transition-colors duration-300">
                  GitHub
                </span>
                </motion.a>

                <motion.a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center gap-4 rtl:flex-row-reverse p-4 rounded-lg glass-card-hover group"
                >
                  <FaLinkedin className="text-3xl text-gray-400 group-hover:text-neon-cyan transition-colors duration-300" />
                  <span className="text-gray-300 group-hover:text-neon-cyan transition-colors duration-300">
                  LinkedIn
                </span>
                </motion.a>

                <motion.a
                  href={socialLinks.email}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center gap-4 rtl:flex-row-reverse p-4 rounded-lg glass-card-hover group"
                >
                  <FaEnvelope className="text-3xl text-gray-400 group-hover:text-neon-cyan transition-colors duration-300" />
                  <span className="text-gray-300 group-hover:text-neon-cyan transition-colors duration-300">
                  Email
                </span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

