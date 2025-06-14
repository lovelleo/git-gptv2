
import React, { useState } from "react";
import { motion } from "framer-motion";
import { File, Download, Upload, Search, Filter, Cloud } from "lucide-react";
import { SynthCard, SynthInput, SynthButton, SynthToggle, SynthSelect, SynthModal } from "@/components/synth";

interface Artifact {
  id: string;
  name: string;
  type: string;
  project: string;
  sprint: string;
  lastModified: string;
  size: string;
  icon: string;
}

const mockArtifacts: Artifact[] = [
  {
    id: "1",
    name: "User Requirements Document.pdf",
    type: "PDF",
    project: "E-Commerce Platform",
    sprint: "Sprint 1",
    lastModified: "2 hours ago",
    size: "2.4 MB",
    icon: "📄"
  },
  {
    id: "2", 
    name: "API Documentation.docx",
    type: "DOCX",
    project: "Mobile App",
    sprint: "Sprint 2",
    lastModified: "1 day ago",
    size: "1.8 MB",
    icon: "📝"
  },
  {
    id: "3",
    name: "Database Schema.sql",
    type: "SQL",
    project: "E-Commerce Platform",
    sprint: "Sprint 1",
    lastModified: "3 days ago",
    size: "156 KB",
    icon: "🗄️"
  },
  {
    id: "4",
    name: "UI Mockups.figma",
    type: "FIGMA",
    project: "Web Portal",
    sprint: "Sprint 3",
    lastModified: "1 week ago",
    size: "5.2 MB",
    icon: "🎨"
  }
];

const projectOptions = [
  { value: "all", label: "All Projects" },
  { value: "ecommerce", label: "E-Commerce Platform" },
  { value: "mobile", label: "Mobile App" },
  { value: "portal", label: "Web Portal" }
];

const sprintOptions = [
  { value: "all", label: "All Sprints" },
  { value: "sprint1", label: "Sprint 1" },
  { value: "sprint2", label: "Sprint 2" },
  { value: "sprint3", label: "Sprint 3" }
];

const typeOptions = [
  { value: "all", label: "All Types" },
  { value: "pdf", label: "PDF" },
  { value: "docx", label: "DOCX" },
  { value: "sql", label: "SQL" },
  { value: "figma", label: "Figma" }
];

const Artifacts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState("all");
  const [selectedSprint, setSelectedSprint] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [isCloudSyncModalOpen, setIsCloudSyncModalOpen] = useState(false);

  const filteredArtifacts = mockArtifacts.filter(artifact => {
    const matchesSearch = artifact.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = selectedProject === "all" || artifact.project.toLowerCase().includes(selectedProject);
    const matchesSprint = selectedSprint === "all" || artifact.sprint.toLowerCase().includes(selectedSprint);
    const matchesType = selectedType === "all" || artifact.type.toLowerCase() === selectedType;
    
    return matchesSearch && matchesProject && matchesSprint && matchesType;
  });

  return (
    <div className="min-h-screen bg-synth-bg p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-synth-text mb-2">Artifacts</h1>
            <p className="text-synth-text-muted">Manage and organize your project documents</p>
          </div>
          
          <div className="flex gap-3">
            <SynthButton
              variant="secondary"
              onClick={() => setIsCloudSyncModalOpen(true)}
            >
              <Cloud className="h-4 w-4" />
              Sync with Cloud
            </SynthButton>
            <SynthButton variant="primary">
              <Upload className="h-4 w-4" />
              Upload Artifact
            </SynthButton>
          </div>
        </div>

        {/* Filters */}
        <SynthCard padding="md">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <SynthInput
                placeholder="Search artifacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="h-4 w-4" />}
              />
            </div>
            
            <div className="flex items-center gap-4">
              <SynthToggle
                checked={showFilters}
                onCheckedChange={setShowFilters}
                label="Show Filters"
              />
              
              {showFilters && (
                <motion.div 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  className="flex gap-3"
                >
                  <SynthSelect
                    placeholder="Project"
                    options={projectOptions}
                    value={selectedProject}
                    onValueChange={setSelectedProject}
                    className="w-40"
                  />
                  <SynthSelect
                    placeholder="Sprint"
                    options={sprintOptions}
                    value={selectedSprint}
                    onValueChange={setSelectedSprint}
                    className="w-40"
                  />
                  <SynthSelect
                    placeholder="Type"
                    options={typeOptions}
                    value={selectedType}
                    onValueChange={setSelectedType}
                    className="w-40"
                  />
                </motion.div>
              )}
            </div>
          </div>
        </SynthCard>

        {/* Artifacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtifacts.map((artifact, index) => (
            <motion.div
              key={artifact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <SynthCard className="h-full hover:shadow-neumorphic-hover transition-shadow cursor-pointer">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{artifact.icon}</span>
                    <SynthButton variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </SynthButton>
                  </div>
                  
                  <h3 className="font-medium text-synth-text mb-2 line-clamp-2">
                    {artifact.name}
                  </h3>
                  
                  <div className="space-y-1 text-sm text-synth-text-muted mb-4">
                    <p>{artifact.project}</p>
                    <p>{artifact.sprint}</p>
                    <p>{artifact.size}</p>
                  </div>
                  
                  <div className="mt-auto pt-3 border-t border-synth-text/10">
                    <p className="text-xs text-synth-text-muted">
                      Modified {artifact.lastModified}
                    </p>
                  </div>
                </div>
              </SynthCard>
            </motion.div>
          ))}
        </div>

        {/* Cloud Sync Modal */}
        <SynthModal
          isOpen={isCloudSyncModalOpen}
          onClose={() => setIsCloudSyncModalOpen(false)}
          title="Cloud Sync Settings"
          className="max-w-md"
        >
          <div className="space-y-4">
            <p className="text-synth-text-muted">
              Connect your cloud storage services to automatically sync artifacts.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-synth-surface rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-sm font-bold">
                    GD
                  </div>
                  <span className="text-synth-text">Google Drive</span>
                </div>
                <SynthToggle />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-synth-surface rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-sm font-bold">
                    OD
                  </div>
                  <span className="text-synth-text">OneDrive</span>
                </div>
                <SynthToggle />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-synth-surface rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white text-sm font-bold">
                    DB
                  </div>
                  <span className="text-synth-text">Dropbox</span>
                </div>
                <SynthToggle />
              </div>
            </div>
            
            <div className="flex gap-3 pt-4">
              <SynthButton variant="primary" className="flex-1">
                Save Settings
              </SynthButton>
              <SynthButton 
                variant="ghost" 
                onClick={() => setIsCloudSyncModalOpen(false)}
              >
                Cancel
              </SynthButton>
            </div>
          </div>
        </SynthModal>
      </div>
    </div>
  );
};

export default Artifacts;
