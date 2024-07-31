import React from "react";
import { cn } from "@/lib/utils";

const ComponentViewer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "col-span-3 mt-10 relative z-30 bg-neutral-50 rounded-xl p-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

ComponentViewer.displayName = "ComponentViewer";
export default ComponentViewer;
