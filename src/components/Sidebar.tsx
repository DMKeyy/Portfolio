import { useState, type FC } from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen, FileText, Code, Database, Mail, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  onTabClick: (tabName: string) => void;
  activeTab: string;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onTabClick, activeTab, onClose }) => {
  const [isProjectOpen, setIsProjectOpen] = useState(true);

  const files = [
    { name: 'about.tsx', icon: Code, type: 'react' },
    { name: 'projects.ts', icon: FileText, type: 'typescript' },
    { name: 'contact.md', icon: Mail, type: 'markdown' },
  ];

  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-64 md:w-64 bg-[#252526] border-r border-[#2d2d30] flex flex-col h-full"
    >
      {/* Explorer Header */}
      <motion.div 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="p-2 border-b border-[#2d2d30] flex justify-between items-center"
      >
        <div className="text-xs text-[#cccccc] font-semibold uppercase tracking-wide">Explorer</div>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1 hover:bg-[#2a2d2e] rounded transition-colors"
          >
            <X className="w-4 h-4 text-[#cccccc]" />
          </button>
        )}
      </motion.div>

      {/* File Tree */}
      <div className="flex-1 p-2 overflow-y-auto">
        <div className="mb-2">
          <motion.div 
            className="flex items-center space-x-1 hover:bg-[#2a2d2e] p-1 rounded cursor-pointer transition-colors"
            onClick={() => setIsProjectOpen(!isProjectOpen)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              animate={{ rotate: isProjectOpen ? 0 : -90 }}
              transition={{ duration: 0.2 }}
            >
              {isProjectOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </motion.div>
            <motion.div
              animate={{ rotate: isProjectOpen ? 0 : -90 }}
              transition={{ duration: 0.2 }}
            >
              {isProjectOpen ? <FolderOpen className="w-4 h-4 text-[#dcb67a]" /> : <Folder className="w-4 h-4 text-[#dcb67a]" />}
            </motion.div>
            <span className="text-sm text-[#cccccc] font-medium">PORTFOLIO</span>
          </motion.div>
          
          <AnimatePresence>
            {isProjectOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="ml-4 mt-1 space-y-1 overflow-hidden"
              >
                {files.map((file, index) => (
                  <motion.div
                    key={file.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center space-x-2 p-1 rounded cursor-pointer transition-all duration-200 hover:bg-[#2a2d2e] ${
                      activeTab === file.name ? 'bg-[#37373d] border-l-2 border-[#0078d4]' : ''
                    }`}
                    onClick={() => onTabClick(file.name)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <file.icon className={`w-4 h-4 ${getFileColor(file.type)}`} />
                    </motion.div>
                    <span className="text-sm text-[#cccccc]">{file.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Additional folders */}
        <div className="mt-4 space-y-2">
          <motion.div 
            className="flex items-center space-x-1 hover:bg-[#2a2d2e] p-1 rounded cursor-pointer transition-colors"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <ChevronRight className="w-4 h-4" />
            <Folder className="w-4 h-4 text-[#dcb67a]" />
            <span className="text-sm text-[#888888]">node_modules</span>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-1 hover:bg-[#2a2d2e] p-1 rounded cursor-pointer transition-colors"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <ChevronRight className="w-4 h-4" />
            <Folder className="w-4 h-4 text-[#dcb67a]" />
            <span className="text-sm text-[#888888]">assets</span>
          </motion.div>
        </div>
      </div>

      {/* Bottom info */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="p-2 border-t border-[#2d2d30] text-xs text-[#888888]"
      >
        <div>4 files</div>
        <div className="mt-1">TypeScript React</div>
      </motion.div>
    </motion.div>
  );
};

const getFileColor = (type: string): string => {
  switch (type) {
    case 'react':
      return 'text-[#61dafb]';
    case 'typescript':
      return 'text-[#3178c6]';
    case 'json':
      return 'text-[#cbcb41]';
    case 'markdown':
      return 'text-[#519aba]';
    default:
      return 'text-[#cccccc]';
  }
};

export default Sidebar;
