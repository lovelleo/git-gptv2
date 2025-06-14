
import { SynthCard, SynthButton, SynthInput, SynthToggle, SynthBadge } from "@/components/synth";
import { Search, Plus, Clock } from "lucide-react";

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

interface StoryListProps {
  stories: Story[];
  selectedStory: number | null;
  onStorySelect: (storyId: number) => void;
  showCompleted: boolean;
  onShowCompletedChange: (show: boolean) => void;
  userRole: "BA" | "Developer";
  onCreateStory: () => void;
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

export const StoryList = ({
  stories,
  selectedStory,
  onStorySelect,
  showCompleted,
  onShowCompletedChange,
  userRole,
  onCreateStory
}: StoryListProps) => {
  const filteredStories = stories.filter(story => 
    showCompleted ? true : !story.completed
  );

  return (
    <div className="w-1/3 border-r border-synth-text/10 bg-synth-surface p-6 overflow-y-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-synth-text">User Stories</h1>
          {userRole === "BA" && (
            <SynthButton
              variant="primary"
              size="sm"
              onClick={onCreateStory}
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
              onCheckedChange={onShowCompletedChange}
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
              onClick={() => onStorySelect(story.id)}
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
  );
};
