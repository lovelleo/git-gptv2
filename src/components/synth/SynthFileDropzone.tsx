
import * as React from "react";
import { motion } from "framer-motion";
import { Upload, File, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SynthFileDropzoneProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  onFilesChange?: (files: File[]) => void;
  className?: string;
  maxFiles?: number;
}

const SynthFileDropzone = React.forwardRef<HTMLDivElement, SynthFileDropzoneProps>(
  ({ label, accept, multiple = false, onFilesChange, className, maxFiles }, ref) => {
    const [isDragOver, setIsDragOver] = React.useState(false);
    const [files, setFiles] = React.useState<File[]>([]);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      
      const droppedFiles = Array.from(e.dataTransfer.files);
      handleFiles(droppedFiles);
    };

    const handleFiles = (newFiles: File[]) => {
      let updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
      
      if (maxFiles && updatedFiles.length > maxFiles) {
        updatedFiles = updatedFiles.slice(0, maxFiles);
      }
      
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        handleFiles(Array.from(e.target.files));
      }
    };

    const removeFile = (index: number) => {
      const updatedFiles = files.filter((_, i) => i !== index);
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
    };

    const handleClick = () => {
      fileInputRef.current?.click();
    };

    return (
      <div className={cn("space-y-2", className)} ref={ref}>
        {label && (
          <label className="text-sm font-medium leading-none text-synth-text">
            {label}
          </label>
        )}
        
        <motion.div
          className={cn(
            "relative rounded-xl border-2 border-dashed border-synth-text/20 bg-synth-surface p-6 transition-all duration-200 cursor-pointer",
            "shadow-neumorphic-inset hover:shadow-neumorphic-pressed",
            isDragOver && "border-synth-primary bg-synth-primary/5"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileInputChange}
            className="hidden"
          />
          
          <div className="flex flex-col items-center justify-center space-y-2">
            <Upload className="h-8 w-8 text-synth-text-muted" />
            <div className="text-center">
              <p className="text-sm text-synth-text">
                Drop files here or <span className="text-synth-primary">browse</span>
              </p>
              <p className="text-xs text-synth-text-muted mt-1">
                {accept && `Accepts: ${accept}`}
                {maxFiles && ` • Max ${maxFiles} files`}
              </p>
            </div>
          </div>
        </motion.div>

        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, index) => (
              <motion.div
                key={`${file.name}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-3 bg-synth-surface rounded-lg shadow-neumorphic-inset"
              >
                <div className="flex items-center space-x-2">
                  <File className="h-4 w-4 text-synth-text-muted" />
                  <span className="text-sm text-synth-text">{file.name}</span>
                  <span className="text-xs text-synth-text-muted">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="p-1 hover:bg-synth-text/10 rounded"
                >
                  <X className="h-4 w-4 text-synth-text-muted" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

SynthFileDropzone.displayName = "SynthFileDropzone";

export { SynthFileDropzone };
