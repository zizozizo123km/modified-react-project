import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Modified to resemble Facebook UI aesthetics, prioritizing blue for active states
const toggleVariants = cva(
  // Base styling: rounded corners (lg), font-semibold, neutral colors for base state, custom blue focus ring
  "inline-flex items-center justify-center rounded-lg text-sm font-semibold ring-offset-white transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1877f2] focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        // Facebook Primary Toggle Style: Neutral off state, Blue active state
        default: 
          "bg-gray-100 text-gray-700 hover:bg-gray-200 " + 
          // Active state: Facebook Blue and White text
          "data-[state=on]:bg-[#1877f2] data-[state=on]:text-white hover:data-[state=on]:bg-[#166fe5]",
        
        // Outline variant adapted for Facebook (simple gray border, subtle hover)
        outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 data-[state=on]:bg-gray-100 data-[state=on]:text-gray-900",
      },
      size: {
        // Standard FB Button height
        default: "h-9 px-3",
        sm: "h-8 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root ref={ref} className={cn(toggleVariants({ variant, size, className }))} {...props} />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };