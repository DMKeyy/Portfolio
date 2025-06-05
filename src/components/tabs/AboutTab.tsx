import { useEffect, useState } from 'react';
import { User, MapPin, Calendar, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutTab = () => {
  const [lineNumbers, setLineNumbers] = useState<number[]>([]);
  const [typedText, setTypedText] = useState('');
  
  const fullText = `// Welcome to my portfolio
// I'm a passionate developer who loves creating amazing experiences

const developer = {
  name: "Haiouani Anis",
  location: "Algiers, Algeria",
  passion: "Building innovative solutions",
  education: "Artificial Intelligence Engineer at USTHB"
};

export default developer;`;

  useEffect(() => {
    // Set initial line numbers (optional, can be done in interval too)
    // const lines = Array.from({ length: fullText.split('\n').length }, (_, i) => i + 1);
    // setLineNumbers(lines);

    // Typing animation
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        const nextTypedText = fullText.slice(0, index);
        setTypedText(nextTypedText);
        // Update line numbers based on the current typed text
        const lines = nextTypedText.split('\n').length;
        setLineNumbers(Array.from({ length: lines }, (_, i) => i + 1));
        index++;
      } else {
        clearInterval(timer);
        // Ensure final line numbers are correct after typing finishes
        const finalLines = fullText.split('\n').length;
        setLineNumbers(Array.from({ length: finalLines }, (_, i) => i + 1));
      }
    }, 20);

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, [fullText, setLineNumbers]); // Add setLineNumbers to dependency array

  return (
    <div className="flex h-full bg-[#1e1e1e]">
      {/* Line Numbers */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[#1e1e1e] text-[#858585] text-sm font-mono p-4 select-none border-r border-[#2d2d30] min-w-12"
      >
        {lineNumbers.map((num) => (
          <motion.div 
            key={num} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: num * 0.05 }}
            className="text-right pr-2" 
            style={{ minHeight: '1.5rem', padding: '0.125rem 0' }}
          >
            {num}
          </motion.div>
        ))}
      </motion.div>

      {/* Code Content */}
      <div className="flex-1 p-4 font-mono text-sm overflow-auto">
        <pre className="whitespace-pre-wrap">
          <code className="text-[#d4d4d4]">
            {typedText.split('\n').map((line, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                whileHover={{ x: 4, transition: { duration: 0.1 } }}
                style={{ minHeight: '1.5rem', padding: '0.125rem 0' }}
              >
                {line.includes('//') ? (
                  <span className="text-[#6a9955]">{line}</span>
                ) : line.includes('const') || line.includes('export') ? (
                  <>
                    <span className="text-[#569cd6]">{line.match(/^(\s*(?:const|export)\s+)/)?.[0]}</span>
                    <span className="text-[#9cdcfe]">{line.replace(/^(\s*(?:const|export)\s+)/, '').split(':')[0]}</span>
                    <span className="text-[#d4d4d4]">{line.includes(':') ? ':' : ''}</span>
                    <span className="text-[#ce9178]">{line.split(':')[1] || ''}</span>
                  </>
                ) : line.includes('"') ? (
                  line.split('"').map((part, i) => 
                    i % 2 === 0 ? 
                      <span key={i} className="text-[#d4d4d4]">{part}</span> : 
                      <span key={i} className="text-[#ce9178]">"{part}"</span>
                  )
                ) : (
                  <span className="text-[#d4d4d4]">{line}</span>
                )}
              </motion.div>
            ))}
            <motion.span 
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block"
            >
              |
            </motion.span>
          </code>
        </pre>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 0 20px rgba(0, 120, 212, 0.2)"
          }}
          transition={{ 
            scale: { duration: 0.05 },
            boxShadow: { duration: 0.05 },
            default: { duration: 0 },
            opacity: { duration: 0.3 },
            y: { duration: 0.3, delay: 0.6 }
          }}
          className="mt-8 bg-[#1e1e1e] rounded-lg border border-[#2d2d30] p-6 w-full max-w-[600px] mx-auto cursor-pointer transition-all duration-300 hover:border-[#0078d4] relative overflow-hidden group"
        >
          {/* Gradient Overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-[#0078d4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />
          {/* Color Gradient */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-[#0078d4]/10 via-[#0078d4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />

          <div className="flex items-center space-x-4 mb-6">
            <motion.div 
              whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
              className="w-16 h-16 bg-gradient-to-br from-[#0078d4] to-[#106ebe] rounded-full flex items-center justify-center"
            >
              <User className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg font-semibold text-white group-hover:text-[#0078d4] transition-colors duration-300"
              >
                Haiouani Anis
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[#cccccc] group-hover:text-white transition-colors duration-300"
              >
                Full Stack Developer
              </motion.p>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-2 mb-6"
          >
            <motion.div 
              whileHover={{ x: 4, transition: { duration: 0.1 } }}
              className="flex items-center space-x-2 text-[#cccccc] group-hover:text-white transition-colors duration-300"
            >
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Algiers, Algeria</span>
            </motion.div>
            <motion.div 
              whileHover={{ x: 4, transition: { duration: 0.1 } }}
              className="flex items-center space-x-2 text-[#cccccc] group-hover:text-white transition-colors duration-300"
            >
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Student at USTHB</span>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-4 gap-4"
          >
            <motion.button 
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "#2ea043",
                transition: { duration: 0.05 }
              }}
              whileTap={{ 
                scale: 0.95,
                backgroundColor: "#238636",
                transition: { duration: 0.05 }
              }}
              onClick={() => window.open('https://github.com/DMKeyy', '_blank')}
              className="flex items-center justify-center space-x-2 bg-[#238636] hover:bg-[#2ea043] px-4 py-2 rounded transition-all duration-300 text-sm relative overflow-hidden group"
            >
              <motion.span
                className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100"
                initial={false}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear"
                }}
              />
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </motion.button>
            <motion.button 
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "#0a66c2",
                transition: { duration: 0.05 }
              }}
              whileTap={{ 
                scale: 0.95,
                backgroundColor: "#004182",
                transition: { duration: 0.05 }
              }}
              onClick={() => window.open('https://www.linkedin.com/in/haiouani-anis/', '_blank')}
              className="flex items-center justify-center space-x-2 bg-[#0a66c2] hover:bg-[#004182] px-4 py-2 rounded transition-all duration-300 text-sm relative overflow-hidden group"
            >
              <motion.span
                className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100"
                initial={false}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear"
                }}
              />
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </motion.button>
            <motion.button 
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "#ea4335",
                transition: { duration: 0.05 }
              }}
              whileTap={{ 
                scale: 0.95,
                backgroundColor: "#d23725",
                transition: { duration: 0.05 }
              }}
              onClick={() => window.open('mailto:haiouani.anis05@gmail.com', '_blank')}
              className="flex items-center justify-center space-x-2 bg-[#ea4335] hover:bg-[#d23725] px-4 py-2 rounded transition-all duration-300 text-sm relative overflow-hidden group"
            >
              <motion.span
                className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100"
                initial={false}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear"
                }}
              />
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </motion.button>
            <motion.button 
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "#238636",
                transition: { duration: 0.05 }
              }}
              whileTap={{ 
                scale: 0.95,
                backgroundColor: "#2ea043",
                transition: { duration: 0.05 }
              }}
              onClick={() => {
                const a = document.createElement('a');
                a.href = '/my-resume.pdf';
                a.download = 'my-resume.pdf';
                a.click();
              }}
              className="flex items-center justify-center space-x-2 bg-[#238636] hover:bg-[#2ea043] px-4 py-2 rounded transition-all duration-300 text-sm relative overflow-hidden group"
            >
              <motion.span
                className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100"
                initial={false}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear"
                }}
              />
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutTab;