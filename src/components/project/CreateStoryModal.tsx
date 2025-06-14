
import { SynthModal, SynthInput, SynthButton } from "@/components/synth";

interface CreateStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateStoryModal = ({ isOpen, onClose }: CreateStoryModalProps) => {
  return (
    <SynthModal
      isOpen={isOpen}
      onClose={onClose}
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
            onClick={onClose}
          >
            Cancel
          </SynthButton>
        </div>
      </div>
    </SynthModal>
  );
};
