import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Star, GitBranch, Clock, Code2, Database, Layout, Cloud } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';

interface Skill {
  category: string;
  icon: React.ReactNode;
  items: string[];
}

interface Project {
  id: number;
  name: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  stars: number;
  forks: number;
  status: string;
  lastUpdated: string;
}

const skills: Skill[] = [
  {
    category: "Frontend",
    icon: <Layout className="w-4 h-4" />,
    items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux"]
  },
  {
    category: "Backend",
    icon: <Code2 className="w-4 h-4" />,
    items: ["Node.js", "Express", "Python", "Django", "REST APIs"]
  },
  {
    category: "Database",
    icon: <Database className="w-4 h-4" />,
    items: ["PostgreSQL", "MongoDB", "MySQL", "Redis"]
  },
  {
    category: "DevOps",
    icon: <Cloud className="w-4 h-4" />,
    items: ["Docker", "AWS", "CI/CD", "Git", "Linux"]
  }
];

// Example fetch function
const fetchProjects = async (): Promise<Project[]> => {
  // This could be your actual API call
  return [
    {
      id: 1,
      name: "E-Commerce Platform",
      description: "Full-stack solution with modern architecture",
      tech: ["React", "Node.js", "PostgreSQL", "Docker"],
      github: "#",
      demo: "#",
      stars: 25,
      forks: 12,
      status: "Completed",
      lastUpdated: "2 days ago"
    },
    {
      id: 2,
      name: "Task Management App",
      description: "Collaborative task management with real-time updates using WebSocket",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Socket.io"],
      github: "#",
      demo: "#",
      stars: 28,
      forks: 8,
      status: "Completed",
      lastUpdated: "1 week ago"
    },
    {
      id: 3,
      name: "Weather Dashboard",
      description: "Beautiful weather dashboard with data visualization and forecasts",
      tech: ["Vue.js", "Chart.js", "OpenWeather API", "Tailwind CSS"],
      github: "#",
      demo: "#",
      stars: 15,
      forks: 4,
      status: "In Progress",
      lastUpdated: "3 days ago"
    }
  ];
};

const ProjectsTab = () => {
  const [selectedProject, setSelectedProject] = useState(0);
  const [lineNumbers] = useState(Array.from({ length: 25 }, (_, i) => i + 1));
  const [typedText, setTypedText] = useState('');
  const [skillsTyped, setSkillsTyped] = useState(false);

  const skillsText = `// Developer Skills Configuration
const skills = {
  Frontend: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux"],
  Backend: ["Node.js", "Express", "Python", "Django", "REST APIs"],
  Database: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
  DevOps: ["Docker", "AWS", "CI/CD", "Git", "Linux"]
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

  // Using TanStack Query to fetch projects
  const { data: projects = [], isLoading, error } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <div className="p-4">Loading projects...</div>;
  if (error) return <div className="p-4">Error loading projects</div>;

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
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4, transition: { duration: 0.1 } }}
                  className={`bg-[#252526] rounded-lg border border-[#2d2d30] p-6 cursor-pointer transition-all duration-300 hover:border-[#0078d4] ${
                    selectedProject === index ? 'border-[#0078d4]' : ''
                  }`}
                  onClick={() => setSelectedProject(index)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <motion.h3 
                      whileHover={{ x: 4, transition: { duration: 0.1 } }}
                      className="text-lg font-semibold text-white"
                    >
                      {project.name}
                    </motion.h3>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        project.status === 'Active' ? 'bg-green-600/20 text-green-400' :
                        project.status === 'Completed' ? 'bg-blue-600/20 text-blue-400' :
                        'bg-yellow-600/20 text-yellow-400'
                      }`}
                    >
                      {project.status}
                    </motion.div>
                  </div>

                  <p className="text-[#cccccc] text-sm mb-4 line-clamp-2">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: 0.8 + techIndex * 0.1 }}
                        whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
                        className="px-2 py-1 bg-[#0078d4]/10 border border-[#0078d4]/30 rounded text-xs text-[#61dafb] hover:bg-[#0078d4]/20 transition-colors"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-[#888888] mb-4">
                    <div className="flex items-center space-x-4">
                      <motion.div 
                        whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
                        className="flex items-center space-x-1"
                      >
                        <Star className="w-4 h-4" />
                        <span>{project.stars}</span>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
                        className="flex items-center space-x-1"
                      >
                        <GitBranch className="w-4 h-4" />
                        <span>{project.forks}</span>
                      </motion.div>
                    </div>
                    <motion.div 
                      whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
                      className="flex items-center space-x-1"
                    >
                      <Clock className="w-4 h-4" />
                      <span>{project.lastUpdated}</span>
                    </motion.div>
                  </div>

                  <div className="flex space-x-3">
                    <motion.button 
                      whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 bg-[#238636] hover:bg-[#2ea043] px-3 py-2 rounded transition-colors text-sm"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 bg-[#0078d4] hover:bg-[#106ebe] px-3 py-2 rounded transition-colors text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Demo</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Project Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
            className="mt-8 bg-[#252526] rounded-lg border border-[#2d2d30] p-6"
          >
            <motion.h3 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-lg font-semibold text-white mb-4"
            >
              Project Statistics
            </motion.h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: '12', label: 'Total Projects', color: '#0078d4' },
                { value: '8', label: 'Completed', color: '#28a745' },
                { value: '3', label: 'In Progress', color: '#ffc107' },
                { value: '85', label: 'Total Stars', color: '#17a2b8' }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-sm text-[#888888]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsTab;