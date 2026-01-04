import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { ThumbsUp } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    // Converted styling to simulate a Facebook Like/Toggle button appearance
    className={cn(
      "peer h-5 w-5 shrink-0 rounded-md border border-gray-400 bg-white ring-offset-background transition-colors",
      // Facebook Blue: #1877F2
      "data-[state=checked]:bg-[#1877F2] data-[state=checked]:text-white",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
      {/* Using ThumbsUp icon for 'Like' visual */}
      <ThumbsUp className="h-4 w-4" fill="white" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };