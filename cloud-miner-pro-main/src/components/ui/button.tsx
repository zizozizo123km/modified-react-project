import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles adjusted for Facebook look: rounded-lg, standard font weight, softer transition/scale, blue focus ring.
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          // Facebook Primary Blue (#1877f2)
          "bg-[#1877f2] text-white shadow-sm hover:bg-[#166fe5]",
        destructive:
          // Standard Red
          "bg-red-600 text-white hover:bg-red-700",
        outline:
          // Facebook Outline/Secondary Blue (White background, Blue text/border)
          "border border-[#1877f2] text-[#1877f2] bg-white hover:bg-blue-50",
        secondary:
          // Facebook Light Gray background for utility buttons
          "bg-gray-200 text-gray-800 hover:bg-gray-300",
        ghost: 
          // Transparent, hover light gray
          "hover:bg-gray-100 text-gray-800",
        link: 
          // Facebook Link style (Blue)
          "text-[#1877f2] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4", // Standard medium size
        sm: "h-8 px-3",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };