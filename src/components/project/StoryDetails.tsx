
import { SynthCard, SynthButton, SynthInput, SynthBadge } from "@/components/synth";
import { Code, CheckCircle, FileText } from "lucide-react";

interface Story {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: string;
  estimatedHours: number;
  completed: boolean;
  tags: string[];
}

interface StoryDetailsProps {
  story: Story | null;
  userRole: "BA" | "Developer";
}

const getStatusBadgeVariant = (status: string) => {
  const variants: Record<string, any> = {
    "AI DEVELOPED": "primary",
    "IN REVIEW": "warning",
    "COMPLETED": "success",
    "PLANNING": "default"
  };
  return variants[status] || "default";
};

export const StoryDetails = ({ story, userRole }: StoryDetailsProps) => {
  if (!story) {
    return (
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <FileText className="h-12 w-12 text-synth-text-muted mx-auto mb-4" />
            <p className="text-synth-text-muted">Select a story to view details</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="space-y-6">
        {/* Story Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-synth-text">
                {story.title}
              </h1>
              <p className="text-synth-text-muted mt-1">
                Story #{story.id}
              </p>
            </div>
            <SynthBadge variant={getStatusBadgeVariant(story.status)}>
              {story.status}
            </SynthBadge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SynthCard variant="inset" padding="sm">
              <div className="text-center">
                <p className="text-xs text-synth-text-muted">Priority</p>
                <p className="text-sm font-semibold text-synth-text">{story.priority}</p>
              </div>
            </SynthCard>
            <SynthCard variant="inset" padding="sm">
              <div className="text-center">
                <p className="text-xs text-synth-text-muted">Assignee</p>
                <p className="text-sm font-semibold text-synth-text">{story.assignee}</p>
              </div>
            </SynthCard>
            <SynthCard variant="inset" padding="sm">
              <div className="text-center">
                <p className="text-xs text-synth-text-muted">Estimated</p>
                <p className="text-sm font-semibold text-synth-text">{story.estimatedHours}h</p>
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
                {story.description}
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
                {story.tags.map((tag) => (
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
              {story.status === "COMPLETED" && (
                <SynthButton variant="secondary">
                  <CheckCircle className="h-4 w-4" />
                  View Code
                </SynthButton>
              )}
            </div>
          </div>
        </SynthCard>
      </div>
    </div>
  );
};
