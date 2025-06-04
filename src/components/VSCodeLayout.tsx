import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TabBar from './TabBar';
import AboutTab from './tabs/AboutTab';
import ProjectsTab from './tabs/ProjectsTab';
import ContactTab from './tabs/ContactTab';
import Terminal from './Terminal';
import { X, Minus, Square } from 'lucide-react';

const VSCodeLayout = () => {
  const [activeTab, setActiveTab] = useState('about.tsx');
  const [openTabs, setOpenTabs] = useState(['about.tsx', 'projects.ts', 'contact.md']);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    if (!openTabs.includes(tabName)) {
      setOpenTabs([...openTabs, tabName]);
    }
  };

  const handleTabClose = (tabName: string) => {
    const newTabs = openTabs.filter(tab => tab !== tabName);
    setOpenTabs(newTabs);
    if (activeTab === tabName && newTabs.length > 0) {
      setActiveTab(newTabs[newTabs.length - 1]);
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'about.tsx':
        return <AboutTab />;
      case 'projects.ts':
        return <ProjectsTab />;
      case 'contact.md':
        return <ContactTab />;
      default:
        return <AboutTab />;
    }
  };

  return (
    <div className={`h-screen bg-[#1e1e1e] text-white flex flex-col transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Title Bar */}
      <div className="bg-[#323233] h-8 flex items-center justify-between px-2 border-b border-[#2d2d30]">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff6b63] transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffc13a] transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-[#28ca42] hover:bg-[#34d058] transition-colors cursor-pointer"></div>
          </div>
        </div>
        <div className="text-sm text-[#cccccc] font-medium">Portfolio - Visual Studio Code</div>
        <div className="flex space-x-1">
          <Minus className="w-4 h-4 hover:bg-[#404040] p-0.5 rounded cursor-pointer transition-colors" />
          <Square className="w-4 h-4 hover:bg-[#404040] p-0.5 rounded cursor-pointer transition-colors" />
          <X className="w-4 h-4 hover:bg-[#e81123] p-0.5 rounded cursor-pointer transition-colors" />
        </div>
      </div>      {/* Menu Bar */}
      <div className="bg-[#2d2d30] h-8 flex items-center px-3 text-sm border-b border-[#2d2d30]">
        <div className="flex space-x-4">
          {['File', 'Edit', 'View', 'Go', 'Run', 'Help'].map((menu) => (
            <div key={menu} className="px-2 py-1 hover:bg-[#404040] rounded cursor-pointer transition-colors">
              {menu}
            </div>
          ))}
          <div 
            onClick={() => setShowTerminal(prev => !prev)} 
            className={`px-2 py-1 rounded cursor-pointer transition-colors ${
              showTerminal ? 'bg-[#404040]' : 'hover:bg-[#404040]'
            }`}
          >
            Terminal
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar onTabClick={handleTabClick} activeTab={activeTab} />
        
        {/* Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tab Bar */}
          <TabBar 
            openTabs={openTabs} 
            activeTab={activeTab} 
            onTabClick={setActiveTab}
            onTabClose={handleTabClose}
          />
          
          {/* Editor Content */}          <div className={`
            flex-1 overflow-auto
            ${showTerminal ? 'h-[calc(100vh-96px-var(--terminal-height,250px))]' : 'h-[calc(100vh-96px)]'}
            transition-all duration-300 ease-in-out
          `}>
            {renderActiveTab()}
          </div>
          
          {/* Terminal */}
          {showTerminal && (
            <Terminal onClose={() => setShowTerminal(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default VSCodeLayout;
