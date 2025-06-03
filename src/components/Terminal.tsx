import { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Minimize2, X, GripVertical } from 'lucide-react';

// Move commands object outside component for better performance
const COMMANDS = {
  help: () => [
    'Available commands:',
    '  about    - Learn more about me',
    '  skills   - View my technical skills', 
    '  projects - See my recent projects',
    '  contact  - Get my contact information',
    '  clear    - Clear the terminal',
    '  github   - Open my GitHub profile',
    '  resume   - Download my resume'
  ],
  about: () => [
    'Hello! I\'m a passionate full-stack developer',
    'with expertise in modern web technologies.',
    'I love creating innovative solutions and',
    'bringing ideas to life through code.'
  ],
  skills: () => [
    'Primary Skills:',
    '• Frontend: React, Javascript , Tailwind CSS',
    '• Backend: Node.js, Java, MySQL, PostgreSQL, C, C++',
    '• DevOps: Git',
    
  ],
  projects: () => [
    'Recent Projects:',
    '• E-Commerce Platform - Full-stack solution',
    '• Task Management App - Real-time collaboration',
    '• Weather Dashboard - Data visualization',
    'Visit the Projects tab for more details!'
  ],
  contact: () => [
    'Contact Information:',
    '📧 Email: haiouani.anis05@gmail.com',
    '💼 LinkedIn: linkedin.com/in/yourname',
    '🐙 GitHub: github.com/DMKeyy',
  ],
  clear: () => {
    return [];
  },
  github: () => {
    window.open('https://github.com/DMKeyy', '_blank');
    return ['Opening GitHub profile in a new tab...'];
  },
  resume: () => {
    // Replace with actual resume URL
    const resumeUrl = '/path/to/resume.pdf';
    const a = document.createElement('a');
    a.href = resumeUrl;
    a.download = 'resume.pdf';
    a.click();
    return ['Downloading resume...'];
  },
  ls: () => ['about.tsx  projects.ts  skills.json  contact.md  '],
  date: () => [new Date().toLocaleString()],
  echo: (args: string) => [args || '']
};

interface TerminalProps {
  onClose?: () => void;
}

interface TerminalProps {
  onClose?: () => void;
}

const updateTerminalHeight = (height: number) => {
  document.documentElement.style.setProperty('--terminal-height', `${height}px`);
};

const Terminal = ({ onClose }: TerminalProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [input, setInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(250);
  const [previousHeight, setPreviousHeight] = useState(250);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<string[]>([
    '$ Welcome to my portfolio terminal!',
    '$ Type "help" to see available commands',
    '$ Feel free to explore my work'
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    // Initialize terminal height CSS variable
    updateTerminalHeight(250);
    
    // Start animation after mount
    const timer = requestAnimationFrame(() => {
      setIsAnimating(false);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  const handleClose = () => {
    setIsAnimating(true);
    if (onClose) {
      setTimeout(onClose, 300);
    }
  };

  const handleCommand = (cmd: string) => {
    const [command, ...args] = cmd.toLowerCase().trim().split(' ');
    const commandFn = COMMANDS[command as keyof typeof COMMANDS];
    
    if (commandFn) {
      let result = commandFn(args.join(' '));
      setHistory(prev => [...prev, `$ ${cmd}`, ...(result || [])]);
    } else if (cmd.trim()) {
      setHistory(prev => [...prev, `$ ${cmd}`, `Command not found: ${command}. Type "help" for available commands.`]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  useEffect(() => {
    if (!isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMinimized]);  

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setStartHeight(terminalRef.current?.clientHeight || 250);
  };  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;      // Calculate total height from bottom to top menu bar (title bar + menu bar + top padding = 32+32+32 = 96px)
      const viewportHeight = window.innerHeight;
      const maxHeight = viewportHeight - 96;  // account for title bar (32px) + menu bar (32px) + top padding (32px)
      
      const delta = startY - e.clientY;
      const newHeight = Math.max(150, Math.min(maxHeight, startHeight + delta));
      
      if (terminalRef.current) {
        terminalRef.current.style.height = `${newHeight}px`;
        updateTerminalHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startY, startHeight]);

  return (
    <div 
      className={`
        fixed bottom-0 left-64 right-0
        border-t border-l border-[#2d2d30]
        transform
        ${isAnimating ? 'translate-y-full' : 'translate-y-0'}
      `}
    >      <div 
        onMouseDown={handleMouseDown}
        className="h-1.5 cursor-ns-resize bg-[#2d2d30] hover:bg-[#404040] transition-colors flex items-center justify-center"
      >
        <GripVertical className="h-4 w-4 text-[#666] opacity-0 hover:opacity-100 transition-opacity" />
      </div>        <div 
        ref={terminalRef}
        className={`          bg-[#1e1e1e]
          min-h-[32px]
          h-[250px]
          max-h-[calc(100vh-96px)] 
          ${isDragging ? 'cursor-ns-resize select-none' : ''}
        `}>
        {/* Terminal Header */}
        <div className="bg-[#2d2d30] px-3 py-1 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TerminalIcon className="w-4 h-4 text-[#cccccc]" />
            <span className="text-sm text-[#cccccc]">Terminal</span>
          </div>
          <div className="flex items-center space-x-1">            <button
              onClick={() => {
                if (!isMinimized) {
                  const currentHeight = terminalRef.current?.clientHeight || 250;
                  updateTerminalHeight(32); // Just enough for the header
                  if (terminalRef.current) {
                    terminalRef.current.style.height = '32px';
                  }
                  setStartHeight(currentHeight);
                } else {
                  updateTerminalHeight(startHeight);
                  if (terminalRef.current) {
                    terminalRef.current.style.height = `${startHeight}px`;
                  }
                }
                setIsMinimized(!isMinimized);
              }}
              className="hover:bg-[#404040] p-1 rounded transition-colors"
            >
              <Minimize2 className="w-4 h-4 text-[#cccccc]" />
            </button>
            <button
              onClick={handleClose}
              className="hover:bg-[#404040] p-1 rounded transition-colors"
            >
              <X className="w-4 h-4 text-[#cccccc]" />
            </button>
          </div>
        </div>        {/* Terminal Content */}
        {!isMinimized && (          <div className="terminal-content p-3 h-[calc(100%-32px)] overflow-y-auto font-mono text-sm">
            <div className="space-y-1">
              {history.map((line, index) => (
                <div
                  key={index}
                  className={line.startsWith('$') ? 'text-[#4ec9b0]' : 'text-[#cccccc]'}
                >
                  {line}
                </div>
              ))}
            </div>
            
            {/* Input Line */}
            <form onSubmit={handleSubmit} className="flex items-center mt-2">
              <span className="text-[#4ec9b0] mr-2">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-[#cccccc] outline-none"
                placeholder="Type a command..."
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
