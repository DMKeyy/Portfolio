import { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Minimize2, X, GripVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    '  resume   - Download my resume',
    '  echo     - Echo back your input'
  ],
  about: () => [
    'Hello! I\'m Haiouani Anis, a passionate Full Stack Developer',
    'and AI Engineering student at USTHB. I love building modern',
    'web applications, exploring new technologies, and solving',
    'real-world problems with code. Welcome to my portfolio!'
  ],
  skills: () => [
    'Primary Skills:',
    '• Frontend: React, JavaScript, CSS, HTML, Tailwind CSS',
    '• Backend: Java, Spring Boot, C#, C',
    '• Tools: Unity, Sophos Firewall, VMware, VSCode',
    '• Database: PostgreSQL, MySQL',
    '• DevOps: Git, GitHub'
  ],
  projects: () => [
    'Recent Projects:',
    '• Eureka - Educational quiz game (Java, JavaFX, MySQL)',
    '• Teacher Preference Form - Faculty management system (React, TypeScript, Spring Boot)',
    '• Medical Office Management - Healthcare system (Java)',
    '• Gaming Store Web Design - Modern gaming store (HTML, Tailwind CSS, React)',
    '• Furniture Store Design - Elegant furniture showcase (HTML, Tailwind CSS, React)',
    'Visit the Projects tab for more details!'
  ],
  contact: () => [
    'Contact Information:',
    '📧 Email: haiouani.anis05@gmail.com',
    '💼 LinkedIn: linkedin.com/in/haiouani-anis',
    '🐙 GitHub: github.com/DMKeyy',
  ],
  clear: () => {
    return 'CLEAR'; // Special flag to indicate clearing the terminal
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

const updateTerminalHeight = (height: number) => {
  document.documentElement.style.setProperty('--terminal-height', `${height}px`);
};

const Terminal = ({ onClose }: TerminalProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [input, setInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [terminalHeight, setTerminalHeight] = useState(250);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<string[]>([
    '$ Welcome to my portfolio terminal!',
    '$ Type "help" to see available commands',
    '$ Feel free to explore my work'
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize terminal height CSS variable
    updateTerminalHeight(terminalHeight);
    
    // Start animation after mount
    const timer = requestAnimationFrame(() => {
      setIsAnimating(false);
    });
    return () => cancelAnimationFrame(timer);
  }, [terminalHeight]);

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
      if (result === 'CLEAR') {
        setHistory([
          '$ Welcome to my portfolio terminal!',
          '$ Type "help" to see available commands',
          '$ Feel free to explore my work'
        ]);
      } else {
        setHistory(prev => [...prev, `$ ${cmd}`, ...(result || [])]);
      }
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
    if (isMinimized) return;
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || isMinimized) return;
      
      const viewportHeight = window.innerHeight;
      const maxHeight = viewportHeight - 96; // Account for title bar and menu bar
      const minHeight = 150;
      
      // Calculate height based on cursor position from bottom of viewport
      const heightFromBottom = viewportHeight - e.clientY;
      const newHeight = Math.max(minHeight, Math.min(maxHeight, heightFromBottom));
      
      setTerminalHeight(newHeight);
      updateTerminalHeight(newHeight);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || isMinimized) return;
      
      const viewportHeight = window.innerHeight;
      const maxHeight = viewportHeight - 96;
      const minHeight = 150;
      
      const heightFromBottom = viewportHeight - e.touches[0].clientY;
      const newHeight = Math.max(minHeight, Math.min(maxHeight, heightFromBottom));
      
      setTerminalHeight(newHeight);
      updateTerminalHeight(newHeight);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, isMinimized]);

  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: contentRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [history]);

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className={`
        fixed bottom-0 left-0 md:left-[16rem] right-0
        bg-[#1e1e1e]
        border-t border-l border-[#2d2d30]
        transform
      `}
    >
      {!isMinimized && (
        <motion.div 
          onMouseDown={handleMouseDown}
          onTouchStart={(e) => {
            setIsDragging(true);
            setStartY(e.touches[0].clientY);
          }}
          className="h-1.5 cursor-ns-resize bg-[#2d2d30] hover:bg-[#404040] transition-colors flex items-center justify-center"
        >
          <GripVertical className="w-4 h-4 text-[#666666]" />
        </motion.div>
      )}
      <div className="flex items-center justify-between px-2 py-1 bg-[#2d2d30]">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="w-4 h-4 text-[#cccccc]" />
          <span className="text-sm text-[#cccccc]">Terminal</span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-[#404040] rounded transition-colors"
          >
            <Minimize2 className="w-4 h-4 text-[#cccccc]" />
          </button>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-[#e81123] rounded transition-colors"
          >
            <X className="w-4 h-4 text-[#cccccc]" />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: terminalHeight }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div
              ref={contentRef}
              className="h-full overflow-y-auto p-2 font-mono text-sm text-[#cccccc] terminal-content"
            >
              {history.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap break-words">
                  {line}
                </div>
              ))}
              <form onSubmit={handleSubmit} className="flex items-center mt-2">
                <span className="text-green-500 mr-2">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-[#cccccc] font-mono"
                  autoFocus
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Terminal;
