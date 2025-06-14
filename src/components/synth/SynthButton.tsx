
import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const synthButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synth-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-synth-surface text-synth-text shadow-neumorphic hover:shadow-neumorphic-hover active:shadow-neumorphic-pressed",
        primary: "bg-synth-primary text-white shadow-neumorphic hover:shadow-neumorphic-hover active:shadow-neumorphic-pressed hover:bg-synth-primary/90",
        secondary: "bg-synth-secondary text-white shadow-neumorphic hover:shadow-neumorphic-hover active:shadow-neumorphic-pressed hover:bg-synth-secondary/90",
        ghost: "hover:bg-synth-surface/50 hover:text-synth-text",
        flat: "bg-synth-surface text-synth-text border border-synth-text/20 hover:bg-synth-text/5",
        circular: "rounded-full bg-synth-surface text-synth-text shadow-neumorphic hover:shadow-neumorphic-hover active:shadow-neumorphic-pressed aspect-square",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-11 rounded-lg px-8",
        icon: "h-10 w-10",
        circular: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface SynthButtonProps
  extends Omit<HTMLMotionProps<"button">, "children">,
    VariantProps<typeof synthButtonVariants> {
  asChild?: boolean;
  children?: React.ReactNode;
}

const SynthButton = React.forwardRef<HTMLButtonElement, SynthButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : motion.button;
    
    return (
      <Comp
        className={cn(synthButtonVariants({ variant, size, className }))}
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

SynthButton.displayName = "SynthButton";

export { SynthButton, synthButtonVariants };
