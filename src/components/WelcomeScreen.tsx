import { motion } from 'framer-motion';
import { FileText, Code, Mail, Github, Linkedin, Folder } from 'lucide-react';

const WelcomeScreen = ({ onTabClick }: { onTabClick: (tabName: string) => void }) => {
  const files = [
    {
      name: 'about.tsx',
      icon: Code,
      color: 'text-[#61dafb]',
      description: 'Learn about my background and experience'
    },
    {
      name: 'projects.ts',
      icon: Folder,
      color: 'text-[#3178c6]',
      description: 'Explore my projects and work'
    },
    {
      name: 'contact.md',
      icon: Mail,
      color: 'text-[#519aba]',
      description: 'Get in touch with me'
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#1e1e1e] p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        {/* VS Code Logo-style Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto bg-[#0078d4] rounded-lg flex items-center justify-center mb-6">
            <Code className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        {/* Welcome Text */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-4xl font-bold text-white mb-4"
        >
          Welcome to my Portfolio
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl text-[#cccccc] mb-8"
        >
          Haiouani Anis - Full Stack Developer
        </motion.p>

        {/* Quick Start */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-white mb-6">Quick Start</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {files.map((file, index) => (
              <motion.button
                key={file.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(0, 120, 212, 0.2)",
                  transition: { scale: { duration: 0.2 }, boxShadow: { duration: 0.05 }, default: { duration: 0 } }
                }}
                transition={{ scale: { duration: 0.2 }, boxShadow: { duration: 0.05 }, default: { duration: 0 } }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onTabClick(file.name)}
                className="bg-[#252526] border border-[#3e3e42] rounded-lg p-4 text-left group cursor-pointer"
              >
                <file.icon className={`w-6 h-6 ${file.color} mb-2`} />
                <div className="text-white font-medium mb-1">{file.name}</div>
                <div className="text-[#cccccc] text-sm group-hover:text-white transition-colors">
                  {file.description}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex justify-center space-x-4"
        >
          <motion.a
            href="https://github.com/DMKeyy"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-[#252526] hover:bg-[#2d2d30] rounded-lg transition-colors duration-200"
          >
            <Github className="w-5 h-5 text-[#cccccc] hover:text-white transition-colors" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/haiouani-anis/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-[#252526] hover:bg-[#2d2d30] rounded-lg transition-colors duration-200"
          >
            <Linkedin className="w-5 h-5 text-[#cccccc] hover:text-white transition-colors" />
          </motion.a>
          <motion.a
            href="/my-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-[#252526] hover:bg-[#2d2d30] rounded-lg transition-colors duration-200 flex items-center"
            download
          >
            <FileText className="w-5 h-5 text-[#cccccc] hover:text-white transition-colors" />
          </motion.a>
        </motion.div>

        {/* Tip */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-[#858585] text-sm mt-8"
        >
          💡 Tip: Use the sidebar to explore files, click on the cards above to get started, or open the terminal from the menu bar.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
