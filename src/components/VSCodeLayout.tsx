import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TabBar from './TabBar';
import AboutTab from './tabs/AboutTab';
import ProjectsTab from './tabs/ProjectsTab';
import ContactTab from './tabs/ContactTab';
import WelcomeScreen from './WelcomeScreen';
import Terminal from './Terminal';
import { X, Minus, Square, Menu } from 'lucide-react';

const VSCodeLayout = () => {
  const [activeTab, setActiveTab] = useState('');
  const [openTabs, setOpenTabs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    setIsLoaded(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setShowSidebar(window.innerWidth >= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    if (!openTabs.includes(tabName)) {
      setOpenTabs([...openTabs, tabName]);
    }
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const handleTabClose = (tabName: string) => {
    const newTabs = openTabs.filter(tab => tab !== tabName);
    setOpenTabs(newTabs);
    if (activeTab === tabName && newTabs.length > 0) {
      setActiveTab(newTabs[newTabs.length - 1]);
    } else if (activeTab === tabName && newTabs.length === 0) {
      setActiveTab(''); // Clear active tab when no tabs are open
    }
  };

  const renderActiveTab = () => {
    // Show welcome screen when no tabs are open
    if (openTabs.length === 0) {
      return <WelcomeScreen onTabClick={handleTabClick} />;
    }
    
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
        <div className="text-sm text-[#cccccc] font-medium hidden md:block">Portfolio - Visual Studio Code</div>
        <div className="flex space-x-1">
          <Minus className="w-4 h-4 hover:bg-[#404040] p-0.5 rounded cursor-pointer transition-colors" />
          <Square className="w-4 h-4 hover:bg-[#404040] p-0.5 rounded cursor-pointer transition-colors" />
          <X className="w-4 h-4 hover:bg-[#e81123] p-0.5 rounded cursor-pointer transition-colors" />
        </div>
      </div>

      {/* Menu Bar */}
      <div className="bg-[#2d2d30] h-8 flex items-center px-3 text-sm border-b border-[#2d2d30]">
        <div className="flex items-center space-x-4">
          {isMobile ? (
            <Menu 
              className="w-5 h-5 cursor-pointer hover:text-gray-300"
              onClick={() => setShowSidebar(!showSidebar)}
            />
          ) : (
            <>
              {['File', 'Edit', 'View', 'Go', 'Run', 'Help'].map((menu) => (
                <div key={menu} className="px-2 py-1 hover:bg-[#404040] rounded cursor-pointer transition-colors">
                  {menu}
                </div>
              ))}
            </>
          )}
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
        <div className={`
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
          ${isMobile ? 'absolute z-50 h-full' : 'relative'}
          transition-transform duration-300 ease-in-out
        `}>
          <Sidebar 
            onTabClick={handleTabClick} 
            activeTab={activeTab} 
            onClose={isMobile ? () => setShowSidebar(false) : undefined}
          />
        </div>
        
        {/* Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tab Bar */}
          <TabBar 
            openTabs={openTabs} 
            activeTab={activeTab} 
            onTabClick={setActiveTab}
            onTabClose={handleTabClose}
          />
          
          {/* Editor Content */}
          <div className={`
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
