import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AboutTab = () => {
  const [lineNumbers, setLineNumbers] = useState<number[]>([]);
  const [typedEducationExp, setTypedEducationExp] = useState('');

  const educationExpText = `// Education & Experience
const education = {
  // Current Education
  institution: "USTHB - University of Science and Technology Houari Boumediene",
  degree: "Artificial Intelligence Engineer",
  period: "2023 - Present"
};

const experience = [
  {
    // Current Internship
    title: "Cyber Security Intern",
    company: "Arcan Networks",
    type: "Internship",
    period: "2025 - Present",
  },
  {
    // Freelance Work
    title: "Web Developer", 
    type: "Freelance",
    period: "2024 - Present",
  }
];`;

  const aboutText = `// About Me\nconst about = "Hi, I'm Haiouani Anis, a passionate Full Stack Developer and AI Engineering student at USTHB. I love building modern web applications, exploring new technologies, and solving real-world problems with code. Welcome to my portfolio!";`;
  const [typedAbout, setTypedAbout] = useState('');
  const [aboutDone, setAboutDone] = useState(false);

  useEffect(() => {
    let aboutIndex = 0;
    const aboutTimer = setInterval(() => {
      if (aboutIndex <= aboutText.length) {
        setTypedAbout(aboutText.slice(0, aboutIndex));
        aboutIndex++;
      } else {
        clearInterval(aboutTimer);
        setAboutDone(true);
      }
    }, 8);
    return () => clearInterval(aboutTimer);
  }, [aboutText]);

  useEffect(() => {
    // Calculate total lines including about section height
    const aboutLines = aboutText.split('\n').length;
    const codeLines = educationExpText.split('\n').length;
    const totalLines = aboutLines + codeLines;
    setLineNumbers(Array.from({ length: totalLines }, (_, i) => i + 1));

    if (!aboutDone) {
      setTypedEducationExp('');
      return;
    }

    // Typing animation for education and experience
    let eduExpIndex = 0;
    const eduExpTimer = setInterval(() => {
      if (eduExpIndex <= educationExpText.length) {
        setTypedEducationExp(educationExpText.slice(0, eduExpIndex));
        eduExpIndex++;
      } else {
        clearInterval(eduExpTimer);
      }
    }, 8);

    // Cleanup on unmount
    return () => {
      clearInterval(eduExpTimer);
    };
  }, [educationExpText, aboutDone, aboutText]);

  return (
    <div className="flex h-full bg-[#1e1e1e] overflow-hidden">
      {/* Content Container with Scroll */}
      <div className="flex flex-1 overflow-y-auto">
        {/* Line Numbers */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#1e1e1e] text-[#858585] text-sm font-mono p-4 select-none border-r border-[#2d2d30] min-w-12 sticky left-0"
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
        <div className="flex-1 p-4 font-mono text-sm">
          {/* About Section Code Block */}
          <div className="font-mono text-sm mb-6">
            <pre className="whitespace-pre-wrap">
              <code className="text-[#d4d4d4]">
                {typedAbout.split('\n').map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    style={{ minHeight: '1.5rem', padding: '0.125rem 0' }}
                  >
                    {line.includes('//') ? (
                      <span className="text-[#6a9955]">{line}</span>
                    ) : line.includes('const') ? (
                      <>
                        <span className="text-[#569cd6]">{line.match(/^(\s*const\s+)/)?.[0]}</span>
                        <span className="text-[#9cdcfe]">{line.replace(/^(\s*const\s+)/, '').split('=')[0]}</span>
                        <span className="text-[#d4d4d4]">{line.includes('=') ? '=' : ''}</span>
                        <span className="text-[#ce9178]">{line.split('=')[1] || ''}</span>
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
                {typedAbout.length === aboutText.length && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block"
                  >
                    |
                  </motion.span>
                )}
              </code>
            </pre>
          </div>
          {/* Education & Experience Section */}
          <div className="font-mono text-sm">
            <pre className="whitespace-pre-wrap">
              <code className="text-[#d4d4d4]">
                {typedEducationExp.split('\n').map((line, index) => (
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
                    ) : line.includes('const') ? (
                      <>
                        <span className="text-[#569cd6]">{line.match(/^(\s*const\s+)/)?.[0]}</span>
                        <span className="text-[#9cdcfe]">{line.replace(/^(\s*const\s+)/, '').split(':')[0]}</span>
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
                {typedEducationExp.length === educationExpText.length && (
                  <motion.span 
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block"
                  >
                    |
                  </motion.span>
                )}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;
