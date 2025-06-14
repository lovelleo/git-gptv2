
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SynthProgressProps {
  value?: number;
  max?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const SynthProgress = React.forwardRef<HTMLDivElement, SynthProgressProps>(
  ({ value = 0, max = 100, className, size = "md" }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return "h-2";
        case "md":
          return "h-3";
        case "lg":
          return "h-4";
        default:
          return "h-3";
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full rounded-full bg-synth-surface overflow-hidden",
          "shadow-neumorphic-inset",
          getSizeClasses(),
          className
        )}
      >
        <motion.div
          className="h-full bg-synth-primary rounded-full shadow-neumorphic"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    );
  }
);

SynthProgress.displayName = "SynthProgress";

export { SynthProgress };
