import { useState, useEffect } from 'react';
import { Github, Star, GitBranch, Clock, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import Modal from '@/components/ui/Modal';
import ProjectDetail from '@/components/projects/ProjectDetail';
import { Project } from '@/types/project';

const projects: Project[] = [
  {
    id: 3,
    name: "Eureka",
    description: "An educational Quiz game to make learning fun",
    tech: ["Java", "JavaFX", "MySQL"],
    github: "https://github.com/DMKeyy/eureka",
    demo: "#",
    stars: 2,
    forks: 0,
    status: "Completed",
    lastUpdated: "2025",
    screenshots: ["/projects/eureka-1.png", "/projects/eureka-2.png"],
    detailedDescription: "Eureka is an educational quiz game designed to make learning interactive and fun. It challenges players with questions across various subjects while providing an engaging user experience with JavaFX animations and responsive design.",
    features: ["Multiple choice questions", "Score tracking", "Time-limited challenges", "Learning statistics", "Custom quiz creation"]
  },
  {
    id: 4,
    name: "Teacher Preference Form",
    description: "An application for managing teachers teaching preferences and requests",
    tech: ["React", "TypeScript", "Spring Boot", "PostgreSQL"],
    github: "https://github.com/DMKeyy/Gestion-des-Fiches-de-voeux-des-enseignants",
    demo: "#",
    stars: 0,
    forks: 0,
    status: "Completed",
    lastUpdated: "2025",
    screenshots: ["/projects/teacher-form-1.png", "/projects/teacher-form-2.png"],
    detailedDescription: "This application streamlines the process of collecting and managing teaching preferences from faculty members. It provides an intuitive interface for teachers to submit their course preferences and for administrators to organize teaching assignments efficiently.",
    features: ["User authentication", "Form submission and tracking", "Admin dashboard", "Notification system", "Preference analysis tools"]
  },
  {
    id: 5,
    name: "Medical Office Management System",
    description: "A comprehensive medical office management system",
    tech: ["Java"],
    github: "https://github.com/DMKeyy/Gestion-Cabinet-Medical",
    demo: "#",
    stars: 1,
    forks: 0,
    status: "In Progress",
    lastUpdated: "2024",
    screenshots: ["/projects/medical-1.png", "/projects/medical-2.png"],
    detailedDescription: "A Java-based medical office management system that handles patient records, appointment scheduling, billing, and inventory management for healthcare providers. The system aims to improve office efficiency and patient care coordination.",
    features: ["Patient records management", "Appointment scheduling", "Billing and invoicing", "Inventory tracking", "Reporting and analytics"]
  },
  {
    id: 1,
    name: "Gaming Store Web Design",
    description: "A modern and responsive web design for a gaming store",
    tech: ["HTML", "Tailwind CSS", "React"],
    github: "https://github.com/DMKeyy/Gaming-Store-Web-Design",
    demo: "#",
    stars: 0,
    forks: 0,
    status: "Completed",
    lastUpdated: "2024",
    screenshots: ["/projects/gaming-store-1.png", "/projects/gaming-store-2.png"],
    detailedDescription: "A sleek and modern web design for a gaming store featuring responsive layout, interactive elements, and modern UI/UX principles. The design focuses on showcasing gaming products with an engaging and user-friendly interface.",
    features: ["Responsive design", "Modern UI/UX", "Product showcase", "Interactive elements", "Gaming-themed aesthetics"]
  },
  {
    id: 2,
    name: "House Furniture Store Design",
    description: "Elegant web design for a furniture store showcasing home decor",
    tech: ["HTML", "Tailwind CSS", "React"],
    github: "https://github.com/DMKeyy/House-Furniture-store-design",
    demo: "#",
    stars: 0,
    forks: 0,
    status: "Completed",
    lastUpdated: "2024",
    screenshots: ["/projects/furniture-store-1.png", "/projects/furniture-store-2.png"],
    detailedDescription: "An elegant and sophisticated web design for a furniture store that emphasizes clean layouts and beautiful product presentation. The design creates a premium shopping experience for home furniture and decor items.",
    features: ["Clean and elegant design", "Product galleries", "Category navigation", "Responsive layout", "Premium aesthetics"]
  }
];

const ProjectsTab = () => {
  const [lineNumbers] = useState(Array.from({ length: 25 }, (_, i) => i + 1));
  const [typedText, setTypedText] = useState('');
  const [skillsTyped, setSkillsTyped] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const skillsText = `const skills = {
  Frontend: ["React", "JavaScript", "CSS", "HTML", "Tailwind CSS"],
  Backend: ["Java", "Spring Boot", "C#", "C"],
  Tools: ["Unity", "Sophos Firewall", "VMware", "VSCode"],
  Database: ["PostgreSQL", "MySQL"],
  DevOps: ["Git", "GitHub"]
};`;

  const projectsText = `// My Projects - Building the future, one commit at a time`;

  useEffect(() => {
    // Typing animation for skills
    let index = 0;
    const timer = setInterval(() => {
      if (index <= skillsText.length) {
        setTypedText(skillsText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setSkillsTyped(true);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-4"
    >
      <div className="flex h-full bg-[#1e1e1e] rounded-lg">
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
        <div className="flex-1 p-4 space-y-6">
          {/* Skills Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="font-mono text-sm"
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
                {!skillsTyped && (
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

          {/* Projects Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-[#6a9955] mb-4"
            >
              {projectsText}
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
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
                  className="bg-[#1e1e1e] rounded-lg border border-[#2d2d30] p-6 cursor-pointer transition-all duration-300 hover:border-[#0078d4] relative overflow-hidden group"
                >
                  {/* Gradient Overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-[#0078d4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />

                  <div className="flex justify-between items-start mb-4">
                    <motion.h3 
                      whileHover={{ x: 4, transition: { duration: 0.1 } }}
                      className="text-xl font-semibold text-white group-hover:text-[#0078d4] transition-colors duration-300"
                    >
                      {project.name}
                    </motion.h3>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                        project.status === 'Active' ? 'bg-green-600/20 text-green-400' :
                        project.status === 'Completed' ? 'bg-blue-600/20 text-blue-400' :
                        'bg-yellow-600/20 text-yellow-400'
                      }`}
                    >
                      {project.status}
                    </motion.div>
                  </div>

                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-[#cccccc] text-sm mb-6 line-clamp-2 group-hover:text-white transition-colors duration-300"
                  >
                    {project.description}
                  </motion.p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ 
                          scale: 1.1,
                          backgroundColor: "rgba(0, 120, 212, 0.2)",
                          boxShadow: "0 0 15px rgba(97, 218, 251, 0.5)"
                        }}
                        transition={{ 
                          default: { duration: 0.05 },
                          scale: { duration: 0.05 },
                          backgroundColor: { duration: 0.05 },
                          boxShadow: { duration: 0.05 },
                          opacity: { duration: 0.2, delay: 0.8 + techIndex * 0.1 }
                        }}
                        className="px-3 py-1.5 bg-[#0078d4]/10 border border-[#0078d4]/30 rounded-full text-xs text-[#61dafb] hover:border-[#0078d4] transition-all duration-300 relative overflow-hidden group"
                      >
                        <motion.span
                          className="absolute inset-0 bg-[#61dafb]/20 opacity-0 group-hover:opacity-100"
                          initial={false}
                          animate={{ 
                            boxShadow: ["0 0 5px rgba(97, 218, 251, 0.5)", "0 0 20px rgba(97, 218, 251, 0.8)", "0 0 5px rgba(97, 218, 251, 0.5)"],
                          }}
                          transition={{ 
                            duration: 0.5,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        />
                        <span className="relative z-10">{tech}</span>
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-[#888888] mb-6">
                    <div className="flex items-center space-x-4">
                      <motion.div 
                        whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
                        className="flex items-center space-x-1 group-hover:text-white transition-colors duration-300"
                      >
                        <Star className="w-4 h-4" />
                        <span>{project.stars}</span>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
                        className="flex items-center space-x-1 group-hover:text-white transition-colors duration-300"
                      >
                        <GitBranch className="w-4 h-4" />
                        <span>{project.forks}</span>
                      </motion.div>
                    </div>
                    <motion.div 
                      whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
                      className="flex items-center space-x-1 group-hover:text-white transition-colors duration-300"
                    >
                      <Clock className="w-4 h-4" />
                      <span>{project.lastUpdated}</span>
                    </motion.div>
                  </div>

                  <div className="flex space-x-3">
                    <motion.a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
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
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.3,
                        delay: 0.8 + index * 0.1,
                        scale: { duration: 0.05 },
                        backgroundColor: { duration: 0.05 }
                      }}
                      className="flex items-center space-x-2 bg-[#238636] hover:bg-[#2ea043] px-4 py-2 rounded transition-all duration-300 text-sm cursor-pointer relative overflow-hidden group"
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
                      <span>View Code</span>
                    </motion.a>
                    
                    {/* See Details Button */}
                    <motion.button 
                      onClick={() => setSelectedProject(project)}
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "#0078d4",
                        transition: { duration: 0.05 }
                      }}
                      whileTap={{ 
                        scale: 0.95,
                        backgroundColor: "#106ebe",
                        transition: { duration: 0.05 }
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.3,
                        delay: 0.9 + index * 0.1,
                        scale: { duration: 0.05 },
                        backgroundColor: { duration: 0.05 }
                      }}
                      className="flex items-center space-x-2 bg-[#0078d4] hover:bg-[#106ebe] px-4 py-2 rounded transition-all duration-300 text-sm cursor-pointer relative overflow-hidden group"
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
                      <Eye className="w-4 h-4" />
                      <span>See Details</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.name || ''}
      >
        {selectedProject && <ProjectDetail project={selectedProject} />}
      </Modal>
    </motion.div>
  );
};

export default ProjectsTab;