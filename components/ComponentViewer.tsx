import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { ParagraphViewer } from "./TextViewer";
interface ComponentViewerProps {
  children: ReactNode;
  className?: string;
  alt?: any;
}
const ComponentViewer: React.FC<ComponentViewerProps> = ({
  children,
  className,
  alt,
}) => {
  return (
    <div className="col-span-3 mt-10">
      <div
        className={cn(
          "bg-neutral-100/75 rounded-xl p-8",
          className
        )}
      >
        {children}
      </div>
      {alt && (
        <ParagraphViewer
          text={alt}
          className="text-neutral-500 text-xs mt-4 w-fit mx-auto [&_a]:text-neutral-600"
        />
      )}
    </div>
  );
};

export default ComponentViewer;
