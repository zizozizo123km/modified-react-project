import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils";

const FBPanelGroup = ({ className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className)}
    {...props}
  />
);

const FBPanel = ResizablePrimitive.Panel;

const FBHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    // Modified styling to simulate a Facebook primary color (blue) interaction focus
    className={cn(
      "relative flex w-px items-center justify-center bg-blue-200/50 hover:bg-blue-300 after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-1 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className,
    )}
    {...props}
  >
    {withHandle && (
      // Styling the handle indicator to use Facebook brand colors
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border border-blue-400 bg-blue-50">
        <GripVertical className="h-2.5 w-2.5 text-blue-700" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { FBPanelGroup, FBPanel, FBHandle };