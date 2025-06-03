import { useState, type FC } from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen, FileText, Code, Database, Mail } from 'lucide-react';

interface SidebarProps {
  onTabClick: (tabName: string) => void;
  activeTab: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onTabClick, activeTab }) => {
  const [isProjectOpen, setIsProjectOpen] = useState(true);

  const files = [
    { name: 'about.tsx', icon: Code, type: 'react' },
    { name: 'projects.ts', icon: FileText, type: 'typescript' },
    { name: 'contact.md', icon: Mail, type: 'markdown' },
  ];

  return (
    <div className="w-64 bg-[#252526] border-r border-[#2d2d30] flex flex-col">
      {/* Explorer Header */}
      <div className="p-2 border-b border-[#2d2d30]">
        <div className="text-xs text-[#cccccc] font-semibold uppercase tracking-wide mb-2">Explorer</div>
      </div>

      {/* File Tree */}
      <div className="flex-1 p-2">
        <div className="mb-2">
          <div 
            className="flex items-center space-x-1 hover:bg-[#2a2d2e] p-1 rounded cursor-pointer transition-colors"
            onClick={() => setIsProjectOpen(!isProjectOpen)}
          >
            {isProjectOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            {isProjectOpen ? <FolderOpen className="w-4 h-4 text-[#dcb67a]" /> : <Folder className="w-4 h-4 text-[#dcb67a]" />}
            <span className="text-sm text-[#cccccc] font-medium">PORTFOLIO</span>
          </div>
          
          {isProjectOpen && (
            <div className="ml-4 mt-1 space-y-1 animate-fade-in">
              {files.map((file) => (
                <div
                  key={file.name}
                  className={`flex items-center space-x-2 p-1 rounded cursor-pointer transition-all duration-200 hover:bg-[#2a2d2e] ${
                    activeTab === file.name ? 'bg-[#37373d] border-l-2 border-[#0078d4]' : ''
                  }`}
                  onClick={() => onTabClick(file.name)}
                >
                  <file.icon className={`w-4 h-4 ${getFileColor(file.type)}`} />
                  <span className="text-sm text-[#cccccc]">{file.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Additional folders */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center space-x-1 hover:bg-[#2a2d2e] p-1 rounded cursor-pointer transition-colors">
            <ChevronRight className="w-4 h-4" />
            <Folder className="w-4 h-4 text-[#dcb67a]" />
            <span className="text-sm text-[#888888]">node_modules</span>
          </div>
          <div className="flex items-center space-x-1 hover:bg-[#2a2d2e] p-1 rounded cursor-pointer transition-colors">
            <ChevronRight className="w-4 h-4" />
            <Folder className="w-4 h-4 text-[#dcb67a]" />
            <span className="text-sm text-[#888888]">assets</span>
          </div>
        </div>
      </div>

      {/* Bottom info */}
      <div className="p-2 border-t border-[#2d2d30] text-xs text-[#888888]">
        <div>4 files</div>
        <div className="mt-1">TypeScript React</div>
      </div>
    </div>
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
