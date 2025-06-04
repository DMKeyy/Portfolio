import { type FC } from 'react';
import { X, Code, FileText, Database, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TabBarProps {
  openTabs: string[];
  activeTab: string;
  onTabClick: (tabName: string) => void;
  onTabClose: (tabName: string) => void;
}

const TabBar: FC<TabBarProps> = ({ openTabs, activeTab, onTabClick, onTabClose }) => {
  const getTabIcon = (fileName: string) => {
    if (fileName.endsWith('.tsx')) return Code;
    if (fileName.endsWith('.ts')) return FileText;
    if (fileName.endsWith('.json')) return Database;
    if (fileName.endsWith('.md')) return Mail;
    return FileText;
  };

  const getTabColor = (fileName: string): string => {
    if (fileName.endsWith('.tsx')) return 'text-[#61dafb]';
    if (fileName.endsWith('.ts')) return 'text-[#3178c6]';
    if (fileName.endsWith('.json')) return 'text-[#cbcb41]';
    if (fileName.endsWith('.md')) return 'text-[#519aba]';
    return 'text-[#cccccc]';
  };

  return (
    <div className="flex bg-[#2d2d30] border-b border-[#2d2d30] overflow-x-auto">
      <AnimatePresence mode="popLayout">
        {openTabs.map((tab) => {
          const Icon = getTabIcon(tab);
          const isActive = activeTab === tab;
          
          return (
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className={`group flex items-center space-x-2 px-3 py-2 cursor-pointer transition-all duration-200 border-r border-[#2d2d30] min-w-0 ${
                isActive 
                  ? 'bg-[#1e1e1e] border-t-2 border-t-[#0078d4] text-white' 
                  : 'bg-[#2d2d30] hover:bg-[#37373d] text-[#cccccc]'
              }`}
              onClick={() => onTabClick(tab)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${getTabColor(tab)}`} />
              </motion.div>
              <span className="text-sm truncate max-w-32">{tab}</span>
              <motion.button
                className="opacity-0 group-hover:opacity-100 hover:bg-[#404040] rounded p-0.5 transition-all duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  onTabClose(tab);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-3 h-3" />
              </motion.button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default TabBar;
