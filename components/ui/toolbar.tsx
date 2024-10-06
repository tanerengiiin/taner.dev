"use client";
import * as React from "react";
import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import * as PortalPrimitive from "@radix-ui/react-portal";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

const ToolbarPortal = React.forwardRef<
  React.ElementRef<typeof PortalPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof PortalPrimitive.Root>
>(({ className, container, ...props }) => {
  return <PortalPrimitive.Root container={container} asChild {...props} />;
});
ToolbarPortal.displayName = "ToolbarPortal";

const toolbarVariants = cva(
  "z-50 fixed group w-fit overflow-auto rounded-full flex max-w-[calc(100%-2rem)] sm:max-w-[532px] dark:bg-neutral-800 border-black/50 bg-neutral-900 p-1 border-[0.5px] shadow-[0px_0px_4px_rgba(0,0,0,.08),0px_0px_10px_rgba(0,0,0,.12),0px_0px_24px_rgba(0,0,0,.16),0px_0px_80px_rgba(0,0,0,.2)] dark:shadow-[inset_0px_1px_0px_rgb(255_255_255_/_0.04),_inset_0px_0px_0px_1px_rgb(255_255_255_/_0.02),_0px_1px_2px_rgb(0_0_0_/_0.4),_0px_2px_4px_rgb(0_0_0_/_0.08),_0px_0px_0px_0.5px_rgb(0_0_0_/_0.24)]",
  {
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
  }
);

export interface ToolbarProps extends VariantProps<typeof toolbarVariants> {}

const Toolbar = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root> & ToolbarProps
>(
  (
    {
      className,
      position = "bottom",
      orientation = "horizontal",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        initial="initial"
        animate="active"
        transition={{ duration: 0.4, type: "spring", bounce: 0.12 }}
        variants={framerVariants}
        custom={position}
        className={cn(toolbarVariants({ position, className }))}
        style={{ scrollbarWidth: "none" }}
      >
        <ToolbarPrimitive.Root
          ref={ref}
          style={{ scrollbarWidth: "none" }}
          orientation={orientation}
          className="group flex items-center gap-0.5 w-fit data-[orientation=vertical]:flex-col data-[orientation=horizontal]:flex-row"
          {...props}
        >
          {children}
        </ToolbarPrimitive.Root>
      </motion.div>
    );
  }
);

const directions = {
  bottom: "marginBottom",
  top: "marginTop",
  left: "marginLeft",
  right: "marginRight",
  topleft: "marginLeft",
  topright: "marginRight",
  bottomleft: "marginLeft",
  bottomright: "marginRight",
};

const framerVariants = {
  initial: (direction: keyof typeof directions) => {
    return { [directions[direction]]: "-100%", opacity: 0 };
  },
  active: (direction: keyof typeof directions) => {
    return { [directions[direction]]: "0%", opacity: 1 };
  },
};

Toolbar.displayName = "Toolbar";

const toolbarButtonVariants = cva(
  "group text-white rounded-full flex items-center justify-center transition-all hover:shadow-[inset_0px_1px_0px_hsla(0,0%,100%,.02),inset_0px_0px_0px_1px_hsla(0,0%,100%,.02),0px_1px_2px_rgba(0,0,0,.12),0px_2px_4px_rgba(0,0,0,.08),0px_0px_0px_0.5px_rgba(0,0,0,.24)]",
  {
    variants: {
      variant: {
        default: "hover:bg-white/15 dark:hover:bg-white/10",
        destructive: "hover:bg-rose-600/90",
      },
      size: {
        default: "h-8 w-8",
        text: "h-8 w-auto px-2 gap-1.5 text-sm font-medium data-[orientation=vertical]:max-w-8 data-[orientation=vertical]:justify-start",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
export interface ToolbarButtonProps
  extends VariantProps<typeof toolbarButtonVariants> {
  label?: string;
}

const ToolbarButton = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Button>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Button> &
    ToolbarButtonProps
>(({ className, size, asChild, variant, label, children, ...props }, ref) => {
  return (
    <ToolbarPrimitive.Button
      ref={ref}
      asChild={asChild}
      className={cn(toolbarButtonVariants({ size, variant, className }))}
      {...props}
    >
      {children}
      {label && !asChild ? (
        <span className="group-data-[orientation=vertical]:hidden">
          {label}
        </span>
      ) : null}
    </ToolbarPrimitive.Button>
  );
});

ToolbarButton.displayName = "ToolbarButton";

const ToolbarButtonLink = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & ToolbarButtonProps
>(({ className, size, href, variant, label, children, ...props }, ref) => {
  return (
    <Link
      href={href}
      ref={ref}
      className={cn(toolbarButtonVariants({ size, variant, className }))}
      {...props}
    >
      {children}
      {label ? (
        <span className="group-data-[orientation=vertical]:hidden">
          {label}
        </span>
      ) : null}
    </Link>
  );
});

ToolbarButtonLink.displayName = "ToolbarButtonLink";

const ToolbarSeparator = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Separator
    ref={ref}
    className={cn(
      "bg-white/15 data-[orientation=horizontal]:my-1 data-[orientation=vertical]:mx-1 dark:bg-neutral-950 dark:shadow-[0px_1px_0px_rgb(255_255_255_/_0.05)] data-[orientation=horizontal]:w-5 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-5 data-[orientation=vertical]:w-px",
      className
    )}
    {...props}
  />
));

ToolbarSeparator.displayName = "ToolbarSeparator";

const ToolbarToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.ToggleGroup>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleGroup>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.ToggleGroup
    ref={ref}
    className={cn(
      "flex rounded-full border border-white/15 overflow-hidden divide-neutral-700 data-[orientation=vertical]:w-8 data-[orientation=horizontal]:h-8 data-[orientation=vertical]:flex-col data-[orientation=vertical]:divide-y data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:divide-x",
      className
    )}
    {...props}
  />
));
ToolbarToggleGroup.displayName = "ToolbarToggleGroup";

const ToolbarToggleItem = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.ToggleItem>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleItem> & {
    label?: string;
  }
>(({ className, label, children, ...props }, ref) => (
  <ToolbarPrimitive.ToggleItem
    ref={ref}
    className={cn(
      "group min-w-[30px] min-h-[30px] flex items-center justify-center gap-0.5 text-white transition-all data-[orientation=vertical]:w-full data-[orientation=horizontal]:h-full data-[state=off]:hover:bg-neutral-800 data-[state=on]:bg-white/10",
      label ? "px-2" : "",
      className
    )}
    {...props}
  >
    {children}
    {label ? (
      <span className="flex-1 group-data-[orientation=vertical]:hidden text-sm font-medium">
        {label}
      </span>
    ) : null}
  </ToolbarPrimitive.ToggleItem>
));

ToolbarToggleItem.displayName = "ToolbarToggleItem";

const ToolbarLink = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Link>
>(({ className, children, ...props }, ref) => (
  <ToolbarPrimitive.Link
    ref={ref}
    className={cn(
      "group text-white/40 text-sm font-medium whitespace-nowrap data-[orientation=horizontal]:pl-0.5 data-[orientation=horizontal]:pr-1.5 data-[orientation=vertical]:py-2 hover:text-white cursor-pointer transition-colors",
      className
    )}
    {...props}
  >
    <span className="group-data-[orientation=vertical]:hidden">{children}</span>
    <svg
      className="group-data-[orientation=horizontal]:hidden"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  </ToolbarPrimitive.Link>
));

ToolbarLink.displayName = "ToolbarLink";

export {
  Toolbar,
  ToolbarPortal,
  ToolbarButton,
  ToolbarButtonLink,
  ToolbarLink,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
};
