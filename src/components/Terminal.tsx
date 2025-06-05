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
    '  matrix   - Watch a cool matrix animation',
    '  echo     - Echo back your input'
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
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [matrixLines, setMatrixLines] = useState<string[]>([]);
  const matrixIntervalRef = useRef<NodeJS.Timeout | null>(null);
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

  // Matrix animation effect
  useEffect(() => {
    if (isMatrixActive) {
      const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';
      const generateMatrixLine = () => {
        let line = '';
        for (let j = 0; j < 40; j++) {
          line += matrixChars[Math.floor(Math.random() * matrixChars.length)];
        }
        return line;
      };

      matrixIntervalRef.current = setInterval(() => {
        setMatrixLines(prev => {
          const newLines = [...prev, generateMatrixLine()];
          if (newLines.length > 10) {
            return newLines.slice(-10);
          }
          return newLines;
        });
      }, 100);

      return () => {
        if (matrixIntervalRef.current) {
          clearInterval(matrixIntervalRef.current);
        }
      };
    } else {
      setMatrixLines([]);
    }
  }, [isMatrixActive]);

  const handleClose = () => {
    setIsAnimating(true);
    if (onClose) {
      setTimeout(onClose, 300);
    }
  };

  const handleCommand = (cmd: string) => {
    const [command, ...args] = cmd.toLowerCase().trim().split(' ');
    const commandFn = COMMANDS[command as keyof typeof COMMANDS];
    
    if (command === 'matrix') {
      setIsMatrixActive(!isMatrixActive);
      if (!isMatrixActive) {
        setHistory(prev => [...prev, `$ ${cmd}`, 'Matrix animation started. Type "matrix" again to stop.']);
      } else {
        setHistory(prev => [...prev, `$ ${cmd}`, 'Matrix animation stopped.']);
      }
      return;
    }
    
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
        fixed bottom-0 left-[16rem] right-0
        bg-[#1e1e1e]
        border-t border-l border-[#2d2d30]
        transform
      `}
    >
      {!isMinimized && (
        <motion.div 
          onMouseDown={handleMouseDown}
          className="h-1.5 cursor-ns-resize bg-[#2d2d30] hover:bg-[#404040] transition-colors flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <GripVertical className="h-4 w-4 text-[#666] opacity-0 hover:opacity-100 transition-opacity" />
        </motion.div>
      )}
      <motion.div 
        ref={terminalRef}
        animate={{ height: isMinimized ? 32 : terminalHeight }}
        transition={{ 
          type: 'spring', 
          damping: 20, 
          stiffness: 300,
          // Disable animation during dragging
          duration: isDragging ? 0 : undefined 
        }}
        className={`
          bg-[#1e1e1e]
          min-h-[32px]
          max-h-[calc(100vh-96px)] 
          ${isDragging ? 'cursor-ns-resize select-none' : ''}
        `}
      >
        <motion.div 
          className="bg-[#2d2d30] px-3 py-1 flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <TerminalIcon className="w-4 h-4 text-[#cccccc]" />
            </motion.div>
            <span className="text-sm text-[#cccccc]">Terminal</span>
          </div>
          <div className="flex items-center space-x-1">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (!isMinimized) {
                  const currentHeight = terminalRef.current?.clientHeight || 250;
                  updateTerminalHeight(32);
                  if (terminalRef.current) {
                    terminalRef.current.style.height = '32px';
                  }
                  setTerminalHeight(currentHeight);
                } else {
                  updateTerminalHeight(terminalHeight);
                  if (terminalRef.current) {
                    terminalRef.current.style.height = `${terminalHeight}px`;
                  }
                }
                setIsMinimized(!isMinimized);
              }}
              className="hover:bg-[#404040] p-1 rounded transition-colors"
            >
              <Minimize2 className="w-4 h-4 text-[#cccccc]" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="hover:bg-[#404040] p-1 rounded transition-colors"
            >
              <X className="w-4 h-4 text-[#cccccc]" />
            </motion.button>
          </div>
        </motion.div>
        <AnimatePresence>
          {!isMinimized && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: isDragging ? 0 : 0.2 }}
              className="terminal-content p-3 h-[calc(100%-32px)] overflow-y-auto font-mono text-sm"
              ref={contentRef}
            >
              <div className="space-y-1">
                {history.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: isDragging ? 0 : 0.2, delay: isDragging ? 0 : index * 0.05 }}
                    className={line.startsWith('$') ? 'text-[#4ec9b0]' : 'text-[#cccccc]'}
                  >
                    {line}
                  </motion.div>
                ))}
                {isMatrixActive && matrixLines.map((line, index) => (
                  <motion.div
                    key={`matrix-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: isDragging ? 0 : 0.2 }}
                    className="text-[#00ff00]"
                  >
                    {line}
                  </motion.div>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-[#4ec9b0]">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-[#cccccc]"
                    autoFocus
                  />
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Terminal;
