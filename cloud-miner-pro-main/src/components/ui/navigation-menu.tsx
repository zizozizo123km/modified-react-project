import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react"; // Keeping ChevronDown import even if unused, maintaining dependency structure

import { cn } from "@/lib/utils";

// 1. NavigationMenu (FacebookHeader) - Fixed white header bar with shadow
const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    // Facebook Header Style: Fixed, white background, shadow, specific height (h-14)
    className={cn("fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between bg-white px-2 shadow-md md:px-4", className)}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

// 2. NavigationMenuList (HeaderTabs) - Centered Tabs container
const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    // Main navigation area: centered tabs, often hidden or adapted on mobile
    className={cn("group hidden h-full flex-1 list-none items-center justify-center space-x-1 md:flex max-w-xl mx-auto", className)}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

// 3. NavigationMenuItem 
const NavigationMenuItem = NavigationMenuPrimitive.Item;

// 4. navigationMenuTriggerStyle (Facebook Tab Styling)
const navigationMenuTriggerStyle = cva(
  // Base Tab Style: Large clickable area, default icon gray, rounded corners
  "inline-flex h-12 w-28 items-center justify-center text-2xl text-gray-500 transition-colors relative hover:bg-gray-100 rounded-lg",
  // Active State Styling: Blue icon, blue indicator bar at the bottom
  "data-[active]:text-blue-600 data-[active]:after:absolute data-[active]:after:bottom-0 data-[active]:after:left-0 data-[active]:after:right-0 data-[active]:after:h-1 data-[active]:after:rounded-t-lg data-[active]:after:bg-blue-600",
  // Open State Styling (for dropdowns): Blue icon
  "data-[state=open]:text-blue-600 data-[state=open]:bg-gray-100",
);

// 5. NavigationMenuTrigger (HeaderTabTrigger) - Designed for primary icon tabs (no chevron)
const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), className)}
    {...props}
  >
    {children}
    {/* Removed ChevronDown for Facebook tab look */}
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

// 6. NavigationMenuContent (Dropdown Content) - Styled for FB popups (notifications/profile menu)
const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "absolute top-14 right-0 w-full max-w-sm rounded-xl bg-white p-2 shadow-xl border border-gray-100 md:absolute md:w-auto",
      "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-top-2 data-[motion=to-end]:slide-out-to-top-2",
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

// 7. NavigationMenuViewport (Dropdown Viewport) - Positions the dropdown to the right
const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  // Wrapper div ensures the viewport aligns to the right edge of the header
  <div className={cn("absolute right-4 top-full flex justify-end w-full")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        // Styling for notification/profile dropdowns (white background, shadow, fixed width)
        "origin-top-right relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-xl bg-white text-gray-900 shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-96 border border-gray-100",
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

// 8. NavigationMenuIndicator (Dropdown Arrow) - Arrow pointing up to the trigger icon
const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      // Positions the arrow near the top edge of the dropdown
      "top-0 z-[1] flex h-2 items-start justify-end overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className,
    )}
    {...props}
  >
    {/* Styling the small triangular arrow (white background, minor shadow/border) */}
    <div className="relative top-1 right-2 h-3 w-3 rotate-45 rounded-tl-sm bg-white shadow-md border-t border-l border-gray-200" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};