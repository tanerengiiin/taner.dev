import { cn } from "@/lib/utils";
import React from "react";

const FancyBorder: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  style,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative rounded-sm overflow-hidden",
        "group outline-none shadow-[0_1px_2px_0_var(--shadow-color-1),0_0_0_1px_var(--shadow-color-2)]",
        "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit]",
        "before:bg-gradient-to-b before:p-px",
        "before:from-white/[.24] before:to-transparent",
        "before:[mask-clip:content-box,border-box] before:[mask-composite:exclude] before:[mask-image:linear-gradient(#fff_0_0),linear-gradient(#fff_0_0)]",
        "after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-white after:to-transparent",
        "after:pointer-events-none after:opacity-[.12] after:transition after:duration-200 after:ease-out",
        "hover:after:opacity-[.20]",
        className
      )}
      style={
        {
          "--shadow-color-1": "#1b1c1d7a",
          "--shadow-color-2": "#242628",
          ...style,
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export default FancyBorder;
