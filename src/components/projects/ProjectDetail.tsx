import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetail = ({ project }: ProjectDetailProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20,
        mass: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Project Status */}
      <motion.div variants={itemVariants} className="flex items-center space-x-2">
        <motion.span
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.1 }}
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            project.status === 'Active' ? 'bg-green-600/20 text-green-400' :
            project.status === 'Completed' ? 'bg-blue-600/20 text-blue-400' :
            'bg-yellow-600/20 text-yellow-400'
          }`}
        >
          {project.status}
        </motion.span>
        <motion.span
          whileHover={{ x: 4 }}
          transition={{ duration: 0.1 }}
          className="text-[#888888] text-sm"
        >
          Updated: {project.lastUpdated}
        </motion.span>
      </motion.div>

      {/* Tech Stack */}
      <motion.div variants={itemVariants}>
        <h4 className="text-white font-medium mb-2">Technologies</h4>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: "rgba(0, 120, 212, 0.2)",
                boxShadow: "0 0 15px rgba(97, 218, 251, 0.5)"
              }}
              transition={{ 
                duration: 0.1,
                delay: index * 0.05
              }}
              className="px-3 py-1.5 bg-[#0078d4]/10 border border-[#0078d4]/30 rounded-full text-xs text-[#61dafb] hover:border-[#0078d4] transition-all duration-100"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Detailed Description */}
      <motion.div variants={itemVariants}>
        <h4 className="text-white font-medium mb-2">About this project</h4>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-[#cccccc] text-sm leading-relaxed"
        >
          {project.detailedDescription}
        </motion.p>
      </motion.div>

      {/* Features */}
      {project.features && (
        <motion.div variants={itemVariants}>
          <h4 className="text-white font-medium mb-2">Key Features</h4>
          <ul className="list-disc list-inside space-y-1">
            {project.features.map((feature, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ 
                  duration: 0.1,
                  delay: 0.2 + idx * 0.05
                }}
                className="text-[#cccccc] text-sm"
              >
                {feature}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Screenshots */}
      {project.screenshots && project.screenshots.length > 0 && (
        <motion.div variants={itemVariants}>
          <h4 className="text-white font-medium mb-3">Screenshots</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.screenshots.map((screenshot, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ 
                  duration: 0.1,
                  delay: 0.25 + idx * 0.05
                }}
                className="border border-[#2d2d30] rounded-md overflow-hidden group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.1 }}
                  className="relative overflow-hidden"
                >
                  <img 
                    src={screenshot} 
                    alt={`${project.name} screenshot ${idx + 1}`}
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.1 }}
                      className="text-white text-sm"
                    >
                      Click to enlarge
                    </motion.span>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Links */}
      <motion.div
        variants={itemVariants}
        className="flex space-x-4 pt-4"
      >
        <motion.a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.1 }}
          className="flex items-center space-x-2 bg-[#238636] hover:bg-[#2ea043] px-4 py-2 rounded transition-all duration-100 text-sm relative overflow-hidden group"
        >
          <motion.span
            className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100"
            initial={false}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ 
              duration: 0.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
          />
          <Github className="w-4 h-4" />
          <span>GitHub Repository</span>
        </motion.a>
        
        {project.demo !== "#" && (
          <motion.a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="flex items-center space-x-2 bg-[#0078d4] hover:bg-[#106ebe] px-4 py-2 rounded transition-all duration-100 text-sm relative overflow-hidden group"
          >
            <motion.span
              className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100"
              initial={false}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ 
                duration: 0.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear"
              }}
            />
            <ExternalLink className="w-4 h-4" />
            <span>Live Demo</span>
          </motion.a>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetail; 