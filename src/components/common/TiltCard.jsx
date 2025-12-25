import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

const TiltCard = ({ children, className = '', onMouseEnter, ...props }) => {
  return (
    <Tilt
      className={className}
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      perspective={1000}
      transitionSpeed={1000}
      scale={1.02}
      glareEnable={true}
      glareMaxOpacity={0.3}
      glareColor="#00f5ff"
      glarePosition="all"
      glareBorderRadius="12px"
      onMouseEnter={onMouseEnter}
      {...props}
    >
      {children}
    </Tilt>
  );
};

export default TiltCard;

