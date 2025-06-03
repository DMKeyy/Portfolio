import { useEffect, useState } from 'react';
import { User, MapPin, Calendar, Github, Linkedin, Mail, FileText } from 'lucide-react';

const AboutTab = () => {
  const [lineNumbers, setLineNumbers] = useState<number[]>([]);
  const [typedText, setTypedText] = useState('');
  
  const fullText = `// Welcome to my portfolio
// I'm a passionate developer who loves creating amazing experiences

const developer = {
  name: "Your Name",
  location: "Your City, Country",
  experience: "X+ years",
  passion: "Building innovative solutions",
  currentlyLearning: ["React", "TypeScript", "Next.js"],
  funFact: "I debug with console.log() 😄"
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
    }, 30);

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, [fullText, setLineNumbers]); // Add setLineNumbers to dependency array

  return (
    <div className="flex h-full bg-[#1e1e1e]">
      {/* Line Numbers */}
      <div className="bg-[#1e1e1e] text-[#858585] text-sm font-mono p-4 select-none border-r border-[#2d2d30] min-w-12">
        {lineNumbers.map((num) => (
          <div key={num} className="text-right pr-2" style={{ minHeight: '1.5rem', padding: '0.125rem 0' }}>
            {num}
          </div>
        ))}
      </div>

      {/* Code Content */}
      <div className="flex-1 p-4 font-mono text-sm overflow-auto">
        <pre className="whitespace-pre-wrap">
          <code className="text-[#d4d4d4]">
            {typedText.split('\n').map((line, index) => (
              <div key={index} style={{ minHeight: '1.5rem', padding: '0.125rem 0' }}>
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
              </div>
            ))}
            <span className="animate-pulse">|</span>
          </code>
        </pre>        {/* Profile Card */}
        <div className="mt-8 bg-[#252526] rounded-lg border border-[#2d2d30] p-6 w-full max-w-[600px] mx-auto animate-fade-in">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#0078d4] to-[#106ebe] rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Your Name</h3>
              <p className="text-[#cccccc]">Full Stack Developer</p>
            </div>
          </div>
            <div className="space-y-2 mb-6">
            <div className="flex items-center space-x-2 text-[#cccccc]">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Your City, Country</span>
            </div>
            <div className="flex items-center space-x-2 text-[#cccccc]">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">X+ years experience</span>
            </div>
          </div>          <div className="grid grid-cols-4 gap-4">
            <button className="flex items-center justify-center space-x-2 bg-[#0078d4] hover:bg-[#106ebe] px-4 py-2 rounded transition-colors">
              <Github className="w-4 h-4" />
              <span className="text-sm">GitHub</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-[#0a66c2] hover:bg-[#004182] px-4 py-2 rounded transition-colors">
              <Linkedin className="w-4 h-4" />
              <span className="text-sm">LinkedIn</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-[#ea4335] hover:bg-[#d23725] px-4 py-2 rounded transition-colors">
              <Mail className="w-4 h-4" />
              <span className="text-sm">Email</span>
            </button>
            <button 
              onClick={() => {
                const a = document.createElement('a');
                a.href = '/resume.pdf';  // Assuming resume.pdf is in the public folder
                a.download = 'resume.pdf';
                a.click();
              }}
              className="flex items-center justify-center space-x-2 bg-[#238636] hover:bg-[#2ea043] px-4 py-2 rounded transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span className="text-sm">Resume</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;