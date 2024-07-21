import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  `
  group flex items-center justify-center min-w-[105px] h-8 rounded-md p-0 border-0 cursor-pointer relative outline-1 outline outline-transparent outline-offset-2 transition-all duration-150 bg-gradient-to-b from-white/[0.16] to-white/0 bg-[var(--neutral-solid-700)] shadow-[0_0px_0px_1px_var(--neutral-solid-700),0_1px_2px_0px_rgba(13,13,18,0.4)] 
  before:content-[""] before:w-full before:h-full before:absolute before:rounded-md before:top-0 before:left-0 before:bg-[var(--form-button-stroke)] before:bg-gradient-to-b before:from-white/[0.16] before:to-white/0 
  after:content-[""] after:w-[calc(100%-2px)] after:h-[calc(100%-2px)] after:absolute after:top-[1px] after:left-[1px] after:rounded-[5px] after:bg-gradient-to-b after:from-white/[0.09] after:to-white/0 after:bg-[var(--neutral-solid-700)]
  focus:outline-1 focus:outline-[rgba(95,87,255,0.5)] focus:outline-offset-2 
  `,
  {
    variants: {
      variant: {
        default: "",
        white:
          "bg-[var(--background-white)] shadow-[0_0px_0px_1px_rgba(18,55,105,0.08),0_1px_2px_0px_rgba(164,172,185,0.24)] after:bg-transparent [&>span]:text-[var(--text-muted-600)] active:[&>span]:before:opacity-0 hover:[&>span]:before:bg-gradient-to-b hover:from-white/0 hover:to-[rgba(193,199,208,0.08)] hover:bg-white hover:shadow-[0_0px_0px_1px_rgba(18,55,105,0.08),0_1px_2px_0px_rgba(164,172,185,0.24),0_3px_6px_0px_rgba(164,172,185,0.24)] active:bg-gradient-to-b active:from-[rgba(193,199,208,0.08)] active:to-white/[0.08] active:bg-white",
        purple:
          "bg-gradient-to-b from-white/[0.12] to-white/0 bg-[var(--form-button-primary-normal)] shadow-[0_0px_0px_1px_#4F47EB,0_1px_2px_0px_rgba(26,19,161,0.5)] after:bg-gradient-to-b after:from-white/[0.12] after:to-white/0 after:bg-[var(--form-button-primary-normal)] active:after:bg-gradient-to-b active:after:from-white/0 active:after:to-white/[0.16] active:after:bg-[var(--form-button-primary-pressed)] active:bg-gradient-to-b active:from-white/0 active:to-white/[0.16] active:bg-[var(--form-button-primary-pressed)] active:[&>span]:before:bg-gradient-to-b active:[&>span]:before:from-white/0 active:[&>span]:before:to-white/[0.16] active:[&>span]:before:bg-[var(--form-button-primary-pressed)] active:[&>span]:before:opacity-[0.14]",
        red: "bg-gradient-to-b from-white/[0.12] to-white/0 bg-[var(--form-button-destructive-normal)] shadow-[0_0px_0px_1px_#B71836,0_1px_2px_0px_rgba(113,14,33,0.5)] after:bg-gradient-to-b after:from-white/[0.12] after:to-white/0 after:bg-[var(--form-button-destructive-normal)] active:after:bg-gradient-to-b active:after:from-white/0 active:after:to-white/[0.16] active:after:bg-[var(--form-button-destructive-pressed)] active:bg-gradient-to-b active:from-white/0 active:to-white/[0.16] active:bg-[var(--form-button-destructive-pressed)] active:[&>span]:before:bg-gradient-to-b active:[&>span]:before:from-white/0 active:[&>span]:before:to-white/[0.16] active:[&>span]:before:bg-[var(--form-button-destructive-pressed)] active:[&>span]:before:opacity-[0.14]",
      },
      size: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span
          className={`
                    flex justify-center items-center flex-1 z-[5] py-[6px] px-[8px] text-sm leading-8 font-medium text-white text-center rounded-md transition-all duration-150
                    before:content-[""] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-gradient-to-b before:from-white before:to-white/0 before:opacity-[0.07] before:rounded-md before:transition-all before:duration-150 group-hover:before:opacity-[0.14] 
                    group-active:before:bg-gradient-to-b group-active:before:from-white/0 group-active:before:to-white/0 group-active:before:opacity-[0.14]
                    [&>span]:px-1
                    `}
        >
          {children}
        </span>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };