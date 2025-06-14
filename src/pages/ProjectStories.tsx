
import { useState } from "react";
import { SynthCard, SynthButton, SynthInput, SynthToggle, SynthBadge, SynthModal } from "@/components/synth";
import { Search, Plus, FileText, Code, Clock, CheckCircle } from "lucide-react";

const ProjectStories = () => {
  const [selectedStory, setSelectedStory] = useState<number | null>(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true);
  const [userRole] = useState<"BA" | "Developer">("BA"); // Mock role

  const stories = [
    {
      id: 1,
      title: "User Authentication System",
      description: "Implement secure login and registration functionality",
      status: "AI DEVELOPED",
      priority: "High",
      assignee: "John Doe",
      estimatedHours: 8,
      completed: false,
      tags: ["Security", "Backend"]
    },
    {
      id: 2,
      title: "Product Catalog Display",
      description: "Create responsive product grid with filtering",
      status: "IN REVIEW",
      priority: "Medium",
      assignee: "Jane Smith",
      estimatedHours: 12,
      completed: false,
      tags: ["Frontend", "UI/UX"]
    },
    {
      id: 3,
      title: "Shopping Cart Integration",
      description: "Add items to cart and manage quantities",
      status: "COMPLETED",
      priority: "High",
      assignee: "Mike Johnson",
      estimatedHours: 16,
      completed: true,
      tags: ["Frontend", "Backend"]
    },
    {
      id: 4,
      title: "Payment Processing",
      description: "Integrate Stripe payment gateway",
      status: "PLANNING",
      priority: "High",
      assignee: "Sarah Wilson",
      estimatedHours: 20,
      completed: false,
      tags: ["Payment", "Security"]
    }
  ];

  const getStatusBadgeVariant = (status: string) => {
    const variants: Record<string, any> = {
      "AI DEVELOPED": "primary",
      "IN REVIEW": "warning",
      "COMPLETED": "success",
      "PLANNING": "default"
    };
    return variants[status] || "default";
  };

  const filteredStories = stories.filter(story => 
    showCompleted ? true : !story.completed
  );

  const selectedStoryData = stories.find(s => s.id === selectedStory);

  return (
    <div className="min-h-screen bg-synth-bg">
      <div className="flex h-screen">
        {/* Left Panel */}
        <div className="w-1/3 border-r border-synth-text/10 bg-synth-surface p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-synth-text">User Stories</h1>
              {userRole === "BA" && (
                <SynthButton
                  variant="primary"
                  size="sm"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                  New
                </SynthButton>
              )}
            </div>

            {/* Filters */}
            <SynthCard variant="inset" padding="sm">
              <div className="space-y-4">
                <SynthInput
                  placeholder="Search stories..."
                  icon={<Search className="h-4 w-4" />}
                />
                <SynthToggle
                  label="Show Completed"
                  checked={showCompleted}
                  onCheckedChange={setShowCompleted}
                />
              </div>
            </SynthCard>

            {/* Stories List */}
            <div className="space-y-3">
              {filteredStories.map((story) => (
                <SynthCard
                  key={story.id}
                  variant={selectedStory === story.id ? "inset" : "elevated"}
                  padding="sm"
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedStory === story.id 
                      ? "ring-2 ring-synth-primary ring-offset-2 ring-offset-synth-bg" 
                      : "hover:shadow-neumorphic-hover"
                  }`}
                  onClick={() => setSelectedStory(story.id)}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="text-sm font-semibold text-synth-text line-clamp-2">
                        {story.title}
                      </h3>
                      <SynthBadge variant={getStatusBadgeVariant(story.status)} className="text-xs">
                        {story.status}
                      </SynthBadge>
                    </div>
                    <p className="text-xs text-synth-text-muted line-clamp-2">
                      {story.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-synth-text-muted">{story.assignee}</span>
                      <div className="flex items-center gap-1 text-synth-text-muted">
                        <Clock className="h-3 w-3" />
                        {story.estimatedHours}h
                      </div>
                    </div>
                  </div>
                </SynthCard>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 p-6 overflow-y-auto">
          {selectedStoryData ? (
            <div className="space-y-6">
              {/* Story Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-synth-text">
                      {selectedStoryData.title}
                    </h1>
                    <p className="text-synth-text-muted mt-1">
                      Story #{selectedStoryData.id}
                    </p>
                  </div>
                  <SynthBadge variant={getStatusBadgeVariant(selectedStoryData.status)}>
                    {selectedStoryData.status}
                  </SynthBadge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <SynthCard variant="inset" padding="sm">
                    <div className="text-center">
                      <p className="text-xs text-synth-text-muted">Priority</p>
                      <p className="text-sm font-semibold text-synth-text">{selectedStoryData.priority}</p>
                    </div>
                  </SynthCard>
                  <SynthCard variant="inset" padding="sm">
                    <div className="text-center">
                      <p className="text-xs text-synth-text-muted">Assignee</p>
                      <p className="text-sm font-semibold text-synth-text">{selectedStoryData.assignee}</p>
                    </div>
                  </SynthCard>
                  <SynthCard variant="inset" padding="sm">
                    <div className="text-center">
                      <p className="text-xs text-synth-text-muted">Estimated</p>
                      <p className="text-sm font-semibold text-synth-text">{selectedStoryData.estimatedHours}h</p>
                    </div>
                  </SynthCard>
                </div>
              </div>

              {/* Story Details */}
              <SynthCard>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-synth-text mb-3">Description</h3>
                    <p className="text-synth-text-muted leading-relaxed">
                      {selectedStoryData.description}
                    </p>
                  </div>

                  {/* BA Section */}
                  {userRole === "BA" && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-synth-text">Business Requirements</h3>
                      <SynthInput
                        label="Acceptance Criteria"
                        placeholder="Enter acceptance criteria..."
                      />
                      <SynthInput
                        label="Business Value"
                        placeholder="Describe the business value..."
                      />
                    </div>
                  )}

                  {/* Developer Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-synth-text">
                      Technical Details
                      {userRole === "BA" && <span className="text-sm text-synth-text-muted ml-2">(Read-only)</span>}
                    </h3>
                    <SynthInput
                      label="Components"
                      placeholder="List required components..."
                      disabled={userRole === "BA"}
                    />
                    <SynthInput
                      label="Naming Conventions"
                      placeholder="Specify naming conventions..."
                      disabled={userRole === "BA"}
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <h3 className="text-lg font-semibold text-synth-text mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedStoryData.tags.map((tag) => (
                        <SynthBadge key={tag} variant="default">
                          {tag}
                        </SynthBadge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-synth-text/10">
                    <SynthButton variant="primary" className="flex-1">
                      <Code className="h-4 w-4" />
                      Generate Code
                    </SynthButton>
                    {selectedStoryData.status === "COMPLETED" && (
                      <SynthButton variant="secondary">
                        <CheckCircle className="h-4 w-4" />
                        View Code
                      </SynthButton>
                    )}
                  </div>
                </div>
              </SynthCard>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <FileText className="h-12 w-12 text-synth-text-muted mx-auto mb-4" />
                <p className="text-synth-text-muted">Select a story to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Story Modal */}
      <SynthModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New User Story"
        className="max-w-2xl"
      >
        <div className="space-y-4">
          <SynthInput
            label="Title"
            placeholder="Enter story title..."
          />
          <SynthInput
            label="Description"
            placeholder="Describe the user story..."
          />
          <div className="grid grid-cols-2 gap-4">
            <SynthInput
              label="Priority"
              placeholder="High, Medium, Low"
            />
            <SynthInput
              label="Estimated Hours"
              type="number"
              placeholder="0"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <SynthButton variant="primary" className="flex-1">
              Create Story
            </SynthButton>
            <SynthButton 
              variant="ghost" 
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </SynthButton>
          </div>
        </div>
      </SynthModal>
    </div>
  );
};

export default ProjectStories;
