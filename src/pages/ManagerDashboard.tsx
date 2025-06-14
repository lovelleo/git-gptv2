
import { useState } from "react";
import { SynthCard, SynthButton, SynthInput, SynthProgress, SynthBadge, SynthModal } from "@/components/synth";
import { Calendar, Filter, BarChart3, Users, Code2, Target } from "lucide-react";

const ManagerDashboard = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data for projects
  const projects = [
    {
      id: 1,
      name: "E-commerce Platform",
      progress: 75,
      aiContribution: 60,
      humanContribution: 40,
      codeQuality: "A",
      status: "In Progress",
      developers: 5,
      completedStories: 23,
      totalStories: 30
    },
    {
      id: 2,
      name: "Mobile Banking App",
      progress: 45,
      aiContribution: 40,
      humanContribution: 60,
      codeQuality: "B",
      status: "Development",
      developers: 3,
      completedStories: 12,
      totalStories: 27
    },
    {
      id: 3,
      name: "Analytics Dashboard",
      progress: 90,
      aiContribution: 80,
      humanContribution: 20,
      codeQuality: "A",
      status: "Testing",
      developers: 2,
      completedStories: 18,
      totalStories: 20
    },
    {
      id: 4,
      name: "CRM Integration",
      progress: 30,
      aiContribution: 25,
      humanContribution: 75,
      codeQuality: "C",
      status: "Planning",
      developers: 4,
      completedStories: 6,
      totalStories: 20
    }
  ];

  const handleProjectClick = (projectId: number) => {
    setSelectedProject(projectId);
    setIsModalOpen(true);
  };

  const getQualityBadgeVariant = (quality: string) => {
    const variants: Record<string, any> = {
      A: "success",
      B: "primary", 
      C: "warning",
      D: "warning",
      E: "error"
    };
    return variants[quality] || "default";
  };

  return (
    <div className="min-h-screen bg-synth-bg p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-synth-text">
              Manager Dashboard
            </h1>
            <p className="text-synth-text-muted mt-1">
              Overview of all projects and team performance
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <SynthInput
              placeholder="Filter projects..."
              icon={<Filter className="h-4 w-4" />}
              className="w-64"
            />
            <SynthButton variant="default">
              <Calendar className="h-4 w-4" />
              Date Range
            </SynthButton>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <SynthCard
              key={project.id}
              className="cursor-pointer hover:shadow-neumorphic-hover transition-all duration-200"
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="space-y-4">
                {/* Project Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-synth-text">
                      {project.name}
                    </h3>
                    <p className="text-sm text-synth-text-muted">
                      {project.completedStories}/{project.totalStories} stories
                    </p>
                  </div>
                  <SynthBadge variant={getQualityBadgeVariant(project.codeQuality)}>
                    {project.codeQuality}
                  </SynthBadge>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-synth-text">Progress</span>
                    <span className="text-synth-text-muted">{project.progress}%</span>
                  </div>
                  <SynthProgress value={project.progress} />
                </div>

                {/* AI vs Human Contribution */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-synth-text">Contribution</h4>
                  <div className="flex rounded-lg overflow-hidden shadow-neumorphic-inset">
                    <div 
                      className="bg-synth-primary h-2 shadow-neumorphic"
                      style={{ width: `${project.aiContribution}%` }}
                    />
                    <div 
                      className="bg-synth-secondary h-2 shadow-neumorphic"
                      style={{ width: `${project.humanContribution}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-synth-text-muted">AI: {project.aiContribution}%</span>
                    <span className="text-synth-text-muted">Human: {project.humanContribution}%</span>
                  </div>
                </div>

                {/* Team Info */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-synth-text-muted">
                    <Users className="h-4 w-4" />
                    {project.developers} developers
                  </div>
                  <SynthBadge variant="default">
                    {project.status}
                  </SynthBadge>
                </div>
              </div>
            </SynthCard>
          ))}
        </div>

        {/* Modal for Project Details */}
        <SynthModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedProject ? projects.find(p => p.id === selectedProject)?.name : ""}
          className="max-w-4xl"
        >
          {selectedProject && (
            <div className="space-y-6">
              {/* Tabs would go here */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SynthCard variant="inset" className="text-center">
                  <BarChart3 className="h-8 w-8 text-synth-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-synth-text">Developer Productivity</h3>
                  <p className="text-2xl font-bold text-synth-text mt-2">85%</p>
                </SynthCard>
                
                <SynthCard variant="inset" className="text-center">
                  <Target className="h-8 w-8 text-synth-secondary mx-auto mb-2" />
                  <h3 className="font-semibold text-synth-text">BA Contributions</h3>
                  <p className="text-2xl font-bold text-synth-text mt-2">92%</p>
                </SynthCard>
                
                <SynthCard variant="inset" className="text-center">
                  <Code2 className="h-8 w-8 text-synth-accent mx-auto mb-2" />
                  <h3 className="font-semibold text-synth-text">AI Effectiveness</h3>
                  <p className="text-2xl font-bold text-synth-text mt-2">78%</p>
                </SynthCard>
              </div>
            </div>
          )}
        </SynthModal>
      </div>
    </div>
  );
};

export default ManagerDashboard;
