"use client"
import * as React from "react";
import * as ToolbarPrimitive from "@radix-ui/react-toolbar";

import { cn } from "@/lib/utils";

const Toolbar = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root>
>(({ className, orientation='horizontal', ...props }, ref) => (
  <ToolbarPrimitive.Root
    ref={ref}
    orientation={orientation}
    className={cn(
      "absolute bottom-4 left-1/2 -translate-x-1/2  min-w-16 px-1.5 py-1.5 flex items-center rounded-full gap-1 dark shadow-shadow-popover dark:bg-neutral-800 border-black/50 bg-neutral-900 p-1 border-[0.5px] dark:shadow-[inset_0px_1px_0px_rgb(255_255_255_/_0.04),_inset_0px_0px_0px_1px_rgb(255_255_255_/_0.02),_0px_1px_2px_rgb(0_0_0_/_0.4),_0px_2px_4px_rgb(0_0_0_/_0.08),_0px_0px_0px_0.5px_rgb(0_0_0_/_0.24)]",
      className
    )}
    {...props}
  />
));

Toolbar.displayName = "Toolbar";

const ToolbarButton = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Button>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Button>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Button
    ref={ref}
    className={cn(
      "text-white hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-all",
      className
    )}
    {...props}
  />
));

ToolbarButton.displayName = "ToolbarButton";

const ToolbarSeparator = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Separator
    ref={ref}
    className={cn("h-5 w-px bg-white/20 mx-1", className)}
    {...props}
  />
));

ToolbarSeparator.displayName = "ToolbarSeparator";

export { Toolbar, ToolbarButton, ToolbarSeparator };
