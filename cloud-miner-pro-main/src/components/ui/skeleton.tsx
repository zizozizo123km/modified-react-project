import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  // Modification to resemble standard Facebook loading elements (lighter gray background, slightly larger radius)
  return <div className={cn("animate-pulse rounded-lg bg-gray-300 dark:bg-gray-700", className)} {...props} />;
}

export { Skeleton };