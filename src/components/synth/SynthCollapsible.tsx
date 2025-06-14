
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SynthCard } from "./SynthCard";
import { SynthButton } from "./SynthButton";

export interface SynthCollapsibleProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

const SynthCollapsible = React.forwardRef<HTMLDivElement, SynthCollapsibleProps>(
  ({ title, children, defaultOpen = false, className }, ref) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    return (
      <SynthCard ref={ref} className={cn("overflow-hidden", className)}>
        <SynthButton
          variant="ghost"
          className="w-full justify-between p-0 h-auto"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-left font-medium">{title}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </SynthButton>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-4">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SynthCard>
    );
  }
);

SynthCollapsible.displayName = "SynthCollapsible";

export { SynthCollapsible };
