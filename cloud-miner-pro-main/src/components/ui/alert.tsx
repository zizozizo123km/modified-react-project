import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Modification: Converting the component visually to resemble a Facebook post/card container
const alertVariants = cva(
  // Base style: Facebook card aesthetic (rounded corners, subtle shadow, appropriate background colors for light/dark mode)
  "relative w-full rounded-xl p-4 shadow-sm bg-white dark:bg-[#242526] border border-gray-200 dark:border-gray-700",
  {
    variants: {
      variant: {
        // Default look: Standard post container
        default: "text-gray-900 dark:text-gray-100",
        // Destructive look: Stands out using red color palette
        destructive: "border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    // Style resembling a name or primary header in a Facebook post
    <h5 
      ref={ref} 
      className={cn("mb-1 text-base font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100", className)} 
      {...props} 
    />
  ),
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    // Style resembling the main body text of a Facebook post
    <div 
      ref={ref} 
      className={cn("text-sm text-gray-700 dark:text-gray-300 [&_p]:leading-normal mt-1", className)} 
      {...props} 
    />
  ),
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };