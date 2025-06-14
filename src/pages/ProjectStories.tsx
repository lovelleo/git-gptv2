
import { useState } from "react";
import { StoryList } from "@/components/project/StoryList";
import { StoryDetails } from "@/components/project/StoryDetails";
import { CreateStoryModal } from "@/components/project/CreateStoryModal";

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

  const selectedStoryData = stories.find(s => s.id === selectedStory);

  return (
    <div className="min-h-screen bg-synth-bg">
      <div className="flex h-screen">
        <StoryList
          stories={stories}
          selectedStory={selectedStory}
          onStorySelect={setSelectedStory}
          showCompleted={showCompleted}
          onShowCompletedChange={setShowCompleted}
          userRole={userRole}
          onCreateStory={() => setIsCreateModalOpen(true)}
        />
        
        <StoryDetails
          story={selectedStoryData || null}
          userRole={userRole}
        />
      </div>

      <CreateStoryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default ProjectStories;
