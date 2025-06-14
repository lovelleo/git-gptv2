
import * as React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SynthSelectProps {
  label?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const SynthSelect = React.forwardRef<HTMLDivElement, SynthSelectProps>(
  ({ label, placeholder, options, value, onValueChange, className, disabled }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(value || "");

    const handleSelect = (optionValue: string) => {
      setSelectedValue(optionValue);
      onValueChange?.(optionValue);
      setIsOpen(false);
    };

    const selectedOption = options.find(option => option.value === selectedValue);

    return (
      <div className={cn("space-y-2", className)} ref={ref}>
        {label && (
          <label className="text-sm font-medium leading-none text-synth-text">
            {label}
          </label>
        )}
        <div className="relative">
          <motion.button
            type="button"
            className={cn(
              "flex h-12 w-full items-center justify-between rounded-xl bg-synth-surface px-3 py-2 text-sm ring-offset-background transition-all duration-200",
              "shadow-neumorphic-inset focus-visible:shadow-neumorphic-pressed",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synth-primary focus-visible:ring-offset-2",
              disabled && "cursor-not-allowed opacity-50"
            )}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            whileHover={!disabled ? { scale: 1.01 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <span className={cn(
              selectedOption ? "text-synth-text" : "text-synth-text-muted"
            )}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronDown 
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                isOpen && "rotate-180"
              )} 
            />
          </motion.button>

          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 z-50 mt-2 bg-synth-surface rounded-xl shadow-neumorphic border border-synth-text/10 max-h-60 overflow-y-auto"
            >
              {options.map((option) => (
                <motion.button
                  key={option.value}
                  type="button"
                  className="w-full px-3 py-2 text-left text-sm hover:bg-synth-text/5 first:rounded-t-xl last:rounded-b-xl transition-colors"
                  onClick={() => handleSelect(option.value)}
                  whileHover={{ backgroundColor: "rgba(var(--synth-text), 0.05)" }}
                >
                  {option.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    );
  }
);

SynthSelect.displayName = "SynthSelect";

export { SynthSelect };
