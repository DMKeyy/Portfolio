
import { type FC } from 'react';
import { X, Code, FileText, Database, Mail } from 'lucide-react';

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
      {openTabs.map((tab) => {
        const Icon = getTabIcon(tab);
        const isActive = activeTab === tab;
        
        return (
          <div
            key={tab}
            className={`group flex items-center space-x-2 px-3 py-2 cursor-pointer transition-all duration-200 border-r border-[#2d2d30] min-w-0 ${
              isActive 
                ? 'bg-[#1e1e1e] border-t-2 border-t-[#0078d4] text-white' 
                : 'bg-[#2d2d30] hover:bg-[#37373d] text-[#cccccc]'
            }`}
            onClick={() => onTabClick(tab)}
          >
            <Icon className={`w-4 h-4 flex-shrink-0 ${getTabColor(tab)}`} />
            <span className="text-sm truncate max-w-32">{tab}</span>
            <button
              className="opacity-0 group-hover:opacity-100 hover:bg-[#404040] rounded p-0.5 transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tab);
              }}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default TabBar;
