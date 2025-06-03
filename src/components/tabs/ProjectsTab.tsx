import React, { useState } from 'react';
import { ExternalLink, Github, Star, GitBranch, Clock, Code2, Database, Layout, Cloud } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

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

  // Using TanStack Query to fetch projects
  const { data: projects = [], isLoading, error } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });

  if (isLoading) return <div className="p-4">Loading projects...</div>;
  if (error) return <div className="p-4">Error loading projects</div>;

  return (
    <div className="p-4">
      <div className="flex h-full bg-[#1e1e1e] rounded-lg">
        {/* Line Numbers */}
        <div className="bg-[#1e1e1e] text-[#858585] text-sm font-mono p-4 select-none border-r border-[#2d2d30] min-w-12">
          {lineNumbers.map((num) => (
            <div key={num} className="h-6 leading-6 text-right pr-2">
              {num}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 space-y-6">
          {/* Skills Section */}
          <div className="font-mono text-sm">
            <div className="text-[#6a9955] mb-2">// Developer Skills Configuration</div>
            <div className="space-y-1">
              <span className="text-[#569cd6]">const</span>
              <span className="text-white"> skills = {`{`}</span>
              {skills.map((skill, skillIndex) => (
                <div key={skill.category} className="ml-4">
                  <span className="text-[#4ec9b0]">{skill.category}</span>
                  <span className="text-white">: [</span>
                  <span className="text-[#ce9178]">
                    {skill.items.map((item, index) => (
                      <span key={item}>"{item}"{index < skill.items.length - 1 ? ', ' : ''}</span>
                    ))}
                  </span>
                  <span className="text-white">]{skillIndex < skills.length - 1 ? ',' : '}'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div>
            <div className="text-[#6a9955] mb-4">// My Projects - Building the future, one commit at a time</div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`bg-[#252526] rounded-lg border border-[#2d2d30] p-6 cursor-pointer transition-all duration-300 hover:border-[#0078d4] hover:transform hover:scale-105 ${
                    selectedProject === index ? 'border-[#0078d4] scale-105' : ''
                  }`}
                  onClick={() => setSelectedProject(index)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      project.status === 'Active' ? 'bg-green-600/20 text-green-400' :
                      project.status === 'Completed' ? 'bg-blue-600/20 text-blue-400' :
                      'bg-yellow-600/20 text-yellow-400'
                    }`}>
                      {project.status}
                    </div>
                  </div>

                  <p className="text-[#cccccc] text-sm mb-4 line-clamp-2">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-[#0078d4]/10 border border-[#0078d4]/30 rounded text-xs text-[#61dafb] hover:bg-[#0078d4]/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-[#888888] mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{project.stars}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitBranch className="w-4 h-4" />
                        <span>{project.forks}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{project.lastUpdated}</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 bg-[#238636] hover:bg-[#2ea043] px-3 py-2 rounded transition-colors text-sm">
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-[#0078d4] hover:bg-[#106ebe] px-3 py-2 rounded transition-colors text-sm">
                      <ExternalLink className="w-4 h-4" />
                      <span>Demo</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Stats */}
          <div className="mt-8 bg-[#252526] rounded-lg border border-[#2d2d30] p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Project Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#0078d4]">12</div>
                <div className="text-sm text-[#888888]">Total Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#28a745]">8</div>
                <div className="text-sm text-[#888888]">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#ffc107]">3</div>
                <div className="text-sm text-[#888888]">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#17a2b8]">85</div>
                <div className="text-sm text-[#888888]">Total Stars</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsTab;