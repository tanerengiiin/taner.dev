import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
interface ComponentViewerProps {
  children: ReactNode;
  className?: string;
}
const ComponentViewer: React.FC<ComponentViewerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "h-[480px] col-span-3 mt-10 relative z-50 bg-neutral-50 rounded-xl p-8",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ComponentViewer;
