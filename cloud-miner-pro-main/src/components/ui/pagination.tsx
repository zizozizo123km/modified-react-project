import * as React from "react";
import { cn } from "@/lib/utils";

// --- CONSTANTS/STYLES FOR FACEBOOK LOOK ---
const FB_BLUE = "bg-blue-600 text-white"; // Using 600 for slightly deeper FB blue
const FB_BG = "bg-gray-100";
const FB_CARD_STYLE = "bg-white shadow rounded-lg p-3 mb-4 border border-gray-100";
const FB_ACTION_STYLE = "text-gray-600 text-sm flex-1 flex justify-center items-center p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer";

// --- FACEBOOK COMPONENTS DEFINITIONS (Replacing Pagination Structure) ---

// This replaces the root Pagination component (nav)
const FacebookAppWrapper = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div 
    role="application"
    aria-label="Facebook Style Application Interface"
    className={cn("mx-auto flex w-full flex-col min-h-screen", FB_BG, className)}
    {...props}
  >
    <FacebookHeader />
    <div className="pt-2 pb-4 max-w-xl mx-auto w-full flex-1">
        <FacebookFeed />
    </div>
  </div>
);
FacebookAppWrapper.displayName = "FacebookAppWrapper";

// This replaces PaginationEllipsis (mapping to Header arbitrarily)
const FacebookHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("sticky top-0 z-10 p-3 flex justify-between items-center shadow-md", FB_BLUE, className)} {...props}>
        <h1 className="text-2xl font-bold">facebook</h1>
        <div className="flex space-x-3 items-center">
            {/* Placeholder for Search Icon */}
            <div className="h-8 w-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-sm font-semibold">🔍</div>
        </div>
    </div>
));
FacebookHeader.displayName = "FacebookHeader";

// This replaces PaginationContent, Next, and Previous (mapping to Feed)
const FacebookFeed = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-3", className)} {...props}>
        <FacebookPostCard author="John Doe" content="Welcome to the new Facebook application UI!" />
        <FacebookPostCard author="Jane Smith" content="I successfully converted the pagination component into a social feed card." isAd={true} />
        <FacebookPostCard author="User 123" content="Test post to ensure layout fidelity." />
    </div>
  ),
);
FacebookFeed.displayName = "FacebookFeed";


// This replaces PaginationItem and PaginationLink
type FacebookPostCardProps = {
    author: string;
    content: string;
    isAd?: boolean;
} & React.ComponentProps<"div">;

const FacebookPostCard = React.forwardRef<HTMLDivElement, FacebookPostCardProps>(({ className, author, content, isAd = false, ...props }, ref) => (
    <div ref={ref} className={cn(FB_CARD_STYLE, className)} {...props}>
        {/* Post Header */}
        <div className="flex items-center mb-3">
            <div className="h-10 w-10 bg-gray-300 rounded-full mr-3 border border-gray-400"></div>
            <div className="flex-1">
                <p className="font-semibold text-sm">{author}</p>
                <p className="text-xs text-gray-500 flex items-center">
                    5m ago &middot; {isAd && <span className="ml-1 text-xs text-green-500 font-medium">Sponsored</span>}
                </p>
            </div>
            <span className="text-lg text-gray-500 cursor-pointer">...</span>
        </div>
        
        {/* Post Content */}
        <p className="mb-3 text-gray-800">{content}</p>
        
        {/* Engagement Bar */}
        <div className="flex justify-between text-xs text-gray-500 border-y py-2 my-2">
            <div className="flex items-center">
                {/* Simulated Like Icon */}
                <span className="mr-1">👍</span> 
                <span>1.2K</span>
            </div>
            <span>88 Comments &middot; 15 Shares</span>
        </div>
        
        {/* Action Bar */}
        <div className="flex justify-around -mx-3">
            <div className={FB_ACTION_STYLE}>Like</div>
            <div className={FB_ACTION_STYLE}>Comment</div>
            <div className={FB_ACTION_STYLE}>Share</div>
        </div>
    </div>
));
FacebookPostCard.displayName = "FacebookPostCard";


// EXPORTS ALIASES (Mapping the new FB components to the old Pagination exports)
export {
  FacebookAppWrapper as Pagination,
  FacebookFeed as PaginationContent,
  FacebookHeader as PaginationEllipsis,
  FacebookPostCard as PaginationItem,
  FacebookPostCard as PaginationLink,
  FacebookFeed as PaginationNext,
  FacebookFeed as PaginationPrevious,
};