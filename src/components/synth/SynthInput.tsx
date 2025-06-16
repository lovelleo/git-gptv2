
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SynthInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onDrag'> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const SynthInput = React.forwardRef<HTMLInputElement, SynthInputProps>(
  ({ className, type, label, error, icon, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none text-synth-text">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-synth-text-muted">
              {icon}
            </div>
          )}
          <motion.input
            type={type}
            className={cn(
              "flex h-12 w-full rounded-xl bg-synth-surface px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-synth-text-muted focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
              "shadow-neumorphic-inset focus-visible:shadow-neumorphic-pressed",
              "focus-visible:ring-2 focus-visible:ring-synth-primary focus-visible:ring-offset-2",
              icon && "pl-10",
              error && "ring-2 ring-red-500",
              className
            )}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            animate={{
              scale: isFocused ? 1.01 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            {...(props as any)}
          />
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-500"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

SynthInput.displayName = "SynthInput";

export { SynthInput };
