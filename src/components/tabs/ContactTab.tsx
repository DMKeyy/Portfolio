
import React, { useState } from 'react';
import { Mail, Github, Linkedin, Twitter, Send, MapPin, Phone, Calendar } from 'lucide-react';

const ContactTab = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "your.email@example.com",
      href: "mailto:your.email@example.com",
      color: "#ea4335"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@yourusername",
      href: "https://github.com/yourusername",
      color: "#333"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Your Name",
      href: "https://linkedin.com/in/yourname",
      color: "#0a66c2"
    },
    {
      icon: Twitter,
      label: "Twitter",
      value: "@yourusername",
      href: "https://twitter.com/yourusername",
      color: "#1da1f2"
    }
  ];

  const lineNumbers = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="flex h-full bg-[#1e1e1e]">
      {/* Line Numbers */}
      <div className="bg-[#1e1e1e] text-[#858585] text-sm font-mono p-4 select-none border-r border-[#2d2d30] min-w-12">
        {lineNumbers.map((num) => (
          <div key={num} className="h-6 leading-6 text-right pr-2">
            {num}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="font-mono text-sm mb-6">
          <div className="text-[#6a9955]"># Contact Me</div>
          <div className="text-[#6a9955]"># Let's build something amazing together!</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-[#252526] rounded-lg border border-[#2d2d30] p-6">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-[#0078d4]" />
                <span>Get In Touch</span>
              </h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-[#2a2d2e] transition-all duration-200 hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                         style={{ backgroundColor: `${info.color}20` }}>
                      <info.icon className="w-5 h-5" style={{ color: info.color }} />
                    </div>
                    <div>
                      <div className="text-[#cccccc] font-medium">{info.label}</div>
                      <div className="text-[#888888] text-sm group-hover:text-[#cccccc] transition-colors">
                        {info.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-[#252526] rounded-lg border border-[#2d2d30] p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-[#cccccc]">
                  <MapPin className="w-4 h-4 text-[#888888]" />
                  <span className="text-sm">Based in Your City, Country</span>
                </div>
                <div className="flex items-center space-x-3 text-[#cccccc]">
                  <Calendar className="w-4 h-4 text-[#888888]" />
                  <span className="text-sm">Available for freelance work</span>
                </div>
                <div className="flex items-center space-x-3 text-[#cccccc]">
                  <Phone className="w-4 h-4 text-[#888888]" />
                  <span className="text-sm">Response time: Usually within 24 hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#252526] rounded-lg border border-[#2d2d30] p-6">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center space-x-2">
              <Send className="w-5 h-5 text-[#0078d4]" />
              <span>Send Message</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#cccccc] text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#1e1e1e] border border-[#2d2d30] rounded px-3 py-2 text-[#cccccc] focus:border-[#0078d4] focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#cccccc] text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#1e1e1e] border border-[#2d2d30] rounded px-3 py-2 text-[#cccccc] focus:border-[#0078d4] focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#cccccc] text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-[#1e1e1e] border border-[#2d2d30] rounded px-3 py-2 text-[#cccccc] focus:border-[#0078d4] focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-[#cccccc] text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-[#1e1e1e] border border-[#2d2d30] rounded px-3 py-2 text-[#cccccc] focus:border-[#0078d4] focus:outline-none transition-colors resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0078d4] hover:bg-[#106ebe] text-white py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center space-x-2 hover:scale-105 transform"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactTab;