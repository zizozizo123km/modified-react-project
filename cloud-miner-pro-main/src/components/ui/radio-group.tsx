import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  // Adjusted gap for a slightly denser layout typical of web applications
  return <RadioGroupPrimitive.Root className={cn("grid gap-1", className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        // Facebook Style Adaptation: Slightly larger size, standard light gray border, white background.
        // Primary color replaced with standard blue (e.g., blue-600)
        "aspect-square h-5 w-5 rounded-full border border-gray-400 bg-white disabled:cursor-not-allowed disabled:opacity-50",
        // Simplified focus state (shadow outline instead of complex rings)
        "focus:outline-none focus-visible:shadow-inner focus-visible:shadow-blue-200",
        // Checked state uses primary blue border and text color
        "data-[state=checked]:border-blue-600 data-[state=checked]:text-blue-600",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        {/* Indicator filled with primary blue when checked */}
        <Circle className="h-3 w-3 fill-blue-600 text-blue-600" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };