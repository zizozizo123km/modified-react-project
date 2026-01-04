import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    // Styling adjusted for a typical social media post (Facebook style: rounded, clean, elevated shadow)
    className={cn("rounded-xl bg-card text-card-foreground shadow-lg", className)} 
    {...props} 
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    // Adjusted padding for a tighter feed appearance, space-y-1 for common metadata spacing
    <div ref={ref} className={cn("flex flex-col space-y-1 p-4", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    // Adjusted size and weight to typically represent a username/primary title in a social post
    <h3 ref={ref} className={cn("text-base font-bold leading-tight tracking-normal", className)} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    // Smaller text for timestamp/metadata
    <p ref={ref} className={cn("text-xs text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => 
    // Adjusted padding to match header/footer spacing
    <div ref={ref} className={cn("px-4 py-2", className)} {...props} />,
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    // Styled as a common action bar (Like, Comment, Share) - border top for separation, space distribution
    <div ref={ref} className={cn("flex items-center justify-between p-4 pt-2 border-t border-muted/50", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };