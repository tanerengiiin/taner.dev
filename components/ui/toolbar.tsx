"use client";
import * as React from "react";
import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import * as PortalPrimitive from "@radix-ui/react-portal";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toolbarPortalVariants = cva("z-50", {
  variants: {
    position: {
      center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
      bottom: "bottom-4 left-1/2 -translate-x-1/2",
      top: "top-4 left-1/2 -translate-x-1/2",
      left: "left-4 top-1/2 -translate-y-1/2",
      right: "right-4 top-1/2 -translate-y-1/2",
      bottomleft: "bottom-4 left-4",
      bottomright: "bottom-4 right-4",
      topleft: "top-4 left-4",
      topright: "top-4 right-4",
    },
  },
  defaultVariants: {
    position: "bottom",
  },
});
export interface ToolbarPortalProps
  extends VariantProps<typeof toolbarPortalVariants> {}
const ToolbarPortal = React.forwardRef<
  React.ElementRef<typeof PortalPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof PortalPrimitive.Root> &
    ToolbarPortalProps
>(({ children, className, position, container, ...props }) => {
  return (
    <PortalPrimitive.Root
      container={container}
      className={cn(
        container ? "absolute" : "fixed",
        toolbarPortalVariants({ position, className })
      )}
      {...props}
    >
      {children}
    </PortalPrimitive.Root>
  );
});
ToolbarPortal.displayName = "ToolbarPortal";

const toolbarVariants = cva(
  "w-fit p-1.5 flex items-center rounded-full gap-1 dark dark:bg-neutral-800 border-black/50 bg-neutral-900 p-1 border-[0.5px] shadow-[0px_0px_4px_rgba(0,0,0,.08),0px_0px_10px_rgba(0,0,0,.12),0px_0px_24px_rgba(0,0,0,.16),0px_0px_80px_rgba(0,0,0,.2)] dark:shadow-[inset_0px_1px_0px_rgb(255_255_255_/_0.04),_inset_0px_0px_0px_1px_rgb(255_255_255_/_0.02),_0px_1px_2px_rgb(0_0_0_/_0.4),_0px_2px_4px_rgb(0_0_0_/_0.08),_0px_0px_0px_0.5px_rgb(0_0_0_/_0.24)]",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);
export interface ToolbarProps extends VariantProps<typeof toolbarVariants> {}

const Toolbar = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root> & ToolbarProps
>(({ className, orientation, ...props }, ref) => {
  return (
    <ToolbarPrimitive.Root
      ref={ref}
      orientation={orientation}
      className={cn(toolbarVariants({ orientation, className }))}
      {...props}
    />
  );
});

Toolbar.displayName = "Toolbar";

const ToolbarButton = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Button>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Button>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Button
    ref={ref}
    className={cn(
      "text-white hover:bg-black/5 dark:hover:bg-white/10 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:shadow-[inset_0px_1px_0px_hsla(0,0%,100%,.02),inset_0px_0px_0px_1px_hsla(0,0%,100%,.02),0px_1px_2px_rgba(0,0,0,.12),0px_2px_4px_rgba(0,0,0,.08),0px_0px_0px_0.5px_rgba(0,0,0,.24)]",
      className
    )}
    {...props}
  />
));

ToolbarButton.displayName = "ToolbarButton";

const ToolbarSeparator = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator>
>(({ className, orientation = "horizontal", ...props }, ref) => (
  <ToolbarPrimitive.Separator
    ref={ref}
    className={cn(
      "bg-white/15 mx-1 data-[orientation=horizontal]:w-5 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-5 data-[orientation=vertical]:w-px",
      className
    )}
    {...props}
  />
));

ToolbarSeparator.displayName = "ToolbarSeparator";

export { Toolbar, ToolbarPortal, ToolbarButton, ToolbarSeparator };
