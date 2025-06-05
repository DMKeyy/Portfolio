import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactTab = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [typedText, setTypedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [lineNumbers, setLineNumbers] = useState<number[]>([]);

  const fullText = `// Contact Me
// Let's build something amazing together!

const Contact = {
  Email: "haiouani.anis05@gmail.com",
  Github: "github.com/DMKeyy",
  Linkedin: "linkedin.com/in/yourname"
};`;

  useEffect(() => {
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
        setIsTypingComplete(true);
        // Ensure final line numbers are correct after typing finishes
        const finalLines = fullText.split('\n').length;
        setLineNumbers(Array.from({ length: finalLines }, (_, i) => i + 1));
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex h-full bg-[#1e1e1e]"
    >
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
            className="h-6 leading-6 text-right pr-2"
          >
            {num}
          </motion.div>
        ))}
      </motion.div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="font-mono text-sm mb-6"
        >
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
              {!isTypingComplete && (
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
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-[#252526] rounded-lg border border-[#2d2d30] p-6"
          >
            <motion.h3 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg font-semibold text-white mb-6 flex items-center space-x-2"
            >
              <Send className="w-5 h-5 text-[#0078d4]" />
              <span>Send Message</span>
            </motion.h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'name', label: 'Name', type: 'text' },
                  { name: 'email', label: 'Email', type: 'email' }
                ].map((field, index) => (
                  <motion.div 
                    key={field.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  >
                    <label className="block text-[#cccccc] text-sm font-medium mb-2">
                      {field.label}
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.02, transition: { duration: 0.1 } }}
                      type={field.type}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      className="w-full bg-[#1e1e1e] border border-[#2d2d30] rounded px-3 py-2 text-[#cccccc] focus:border-[#0078d4] focus:outline-none transition-colors"
                      required
                    />
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 }}
              >
                <label className="block text-[#cccccc] text-sm font-medium mb-2">
                  Subject
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02, transition: { duration: 0.1 } }}
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-[#1e1e1e] border border-[#2d2d30] rounded px-3 py-2 text-[#cccccc] focus:border-[#0078d4] focus:outline-none transition-colors"
                  required
                />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.9 }}
              >
                <label className="block text-[#cccccc] text-sm font-medium mb-2">
                  Message
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.02, transition: { duration: 0.1 } }}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-[#1e1e1e] border border-[#2d2d30] rounded px-3 py-2 text-[#cccccc] focus:border-[#0078d4] focus:outline-none transition-colors resize-none"
                  required
                />
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 1 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-[#0078d4] hover:bg-[#106ebe] text-white py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactTab;