import React from "react";

// This file is converted from a generic AspectRatio component
// into a wrapper suitable for embedding Facebook application content or widgets.

interface FacebookWidgetContainerProps extends React.ComponentPropsWithoutRef<"div"> {
  /** The specific Facebook widget type being loaded (e.g., 'like', 'comments', 'page') */
  widgetType?: string;
  /** Optional ID for tracking or specific content loading */
  dataHref?: string;
}

const FacebookWidgetContainer = React.forwardRef<
  HTMLDivElement,
  FacebookWidgetContainerProps
>(({ className, children, widgetType = "custom", dataHref, ...props }, ref) => (
  <div
    ref={ref}
    className={className}
    // Standard data attributes often used by the Facebook SDK to initialize widgets
    data-component-name="FacebookAppWidgetContainer"
    data-widget-type={widgetType}
    data-href={dataHref}
    {...props}
  >
    {/* 
      In a real application, the Facebook SDK would typically load content here 
      based on the data attributes provided. 
    */}
    {children}
  </div>
));

FacebookWidgetContainer.displayName = "FacebookWidgetContainer";

// Exporting the new component representing the Facebook application container
export { FacebookWidgetContainer as FacebookAppWidget };