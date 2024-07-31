import StepperExample from "@/components/documents/stepper-component/StepperExample";

const stepper_component = [
  {
    type: "p",
    content: `In this article, I will explain how I created a multi-step component using Framer Motion and React. I designed a simple and easily customizable Stepper component. Below, I will walk you through the steps of how I coded it.`,
  },
  {
    type: "title",
    content: "Stepper",
  },
  {
    type: "p",
    content: `The Stepper component is the main component that encapsulates the entire multi-step content. Using the Context API, we facilitate communication between the Stepper components. With Framer Motion, we can manage all transitions by sending the transition animations to the MotionConfig component.`,
  },
  {
    type: "p",
    content: `When the height of the Stepper changes, we use the <code>useMeasure</code> hook to detect this change and animate it smoothly. Instead of defining an initial value, simply providing the height to the animation is sufficient. We need to conditionally render the children components sent to the <code>Stepper</code> because there is a fixed <code>StepperController</code> component that remains static outside the sliding frame. I will explain this component in detail later.`,
  },
  {
    type: "title",
    content: "StepperContent",
  },
  {
    type: "p",
    content: `StepperContent defines the slide animations for moving left-right or up-down. Each step sent to it will move in an animated manner. We achieve this with Framer Motion. Using features like custom and variants here is more beneficial and performant.`,
  },
  {
    type: "p",
    content: `Variants define how the component should behave in a certain state. Since our animation changes dynamically (e.g., moving x position from right to left when sliding left or from left to right when sliding right), we use the custom prop to send dynamic values to Framer Motion. The values given to the custom prop can be passed to the variants we defined. One important thing to note here is that we need to send the custom value to AnimatePresence as well as the motion component.`,
  },
  {
    type: "p",
    content: `Another crucial point is the key value given to the motion component. The key value detects the change in the component and performs unmount and mount operations. This way, only the component with the given key value gets mounted, which improves the animation's performance.`,
  },
  {
    type: "title",
    content: "Step",
  },
  {
    type: "p",
    content: `The Step component allows us to filter the steps sent to the Stepper within the StepperContent.`,
  },
  {
    type: "title",
    content: "StepperControls",
  },
  {
    type: "p",
    content: `StepperControls keeps the parts that remain static outside the sliding section. We need to keep the parts outside the sliding section in this component because we can filter this within the motion component in the Stepper component.`,
  },
  {
    type: "title",
    content: "StepperNext and StepperBack",
  },
  {
    type: "p",
    content: `StepperNext and StepperBack are components made up of buttons. You can customize these components according to your needs, but make sure to use the functions I used.`,
  },
  {
    type: "title",
    content: "Overall structure of the components:",
  },
  {
    type: "p",
    content:
      "Firstly, install the following dependencies and create <code>/lib/utils.ts</code> file, paste the code below.",
  },
  {
    type: "code",
    lang: "text",
    content: `npm install react-use-measure framer-motion tailwind-merge clsx `,
  },
  {
    type: "code",
    content: `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}   `,
  },
  {
    type: "p",
    content: "Then, create a <code>stepper.tsx</code> file and paste the code.",
  },
  {
    type: "code",
    content: `"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import useMeasure from "react-use-measure";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  Transition,
} from "framer-motion";

type StepperProps = {
  step?: number;
  transition?: Transition;
  orientation?: "horizontal" | "vertical";
  onChangeStep?: (value: number) => void;
};

type StepperContextProps = {
  totalStep: number;
  currentStep: number;
  direction?: number;
  animationExecute?: boolean;
  handleCurrentStepNext: () => void;
  handleCurrentStepBack: () => void;
  handleAnimationStart: () => void;
  handleAnimationStop: () => void;
  handleSetTotalStep: (stepCount: number) => void;
} & StepperProps;

const StepperContext = React.createContext<StepperContextProps | null>(null);

function useStepper() {
  const context = React.useContext(StepperContext);

  if (!context) {
    throw new Error("useStepper must be used within a <Stepper />");
  }

  return context;
}

const Stepper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & StepperProps
>(
  (
    {
      step = 0,
      transition = { duration: 0.5, type: "spring", bounce: 0 },
      orientation = "horizontal",
      onChangeStep,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [currentStep, setCurrentStep] = React.useState(step);
    const [direction, setDirection] = React.useState(1);
    const [animationExecute, setAnimationExecute] = React.useState(false);
    const [heightRef, bounds] = useMeasure({ offsetSize: true });
    const [totalStep, setTotalStep] = React.useState(0);

    const handleAnimationStart = () => setAnimationExecute(true);
    const handleAnimationStop = () => setAnimationExecute(false);
    const handleSetTotalStep = (stepCount: number) => {
      setTotalStep(stepCount);
    };
    const handleCurrentStepNext = () => {
      if (currentStep + 1 === totalStep) return;
      setAnimationExecute(true);
      setDirection(1);
      setCurrentStep((prev) => {
        const step = prev + 1;
        handleChangeStep(step);
        return step;
      });
    };

    const handleCurrentStepBack = () => {
      if (currentStep === 0) return;
      setAnimationExecute(true);
      setDirection(-1);
      setCurrentStep((prev) => {
        const step = prev - 1;
        handleChangeStep(step);
        return step;
      });
    };

    const handleChangeStep = (step: number) => {
      if (!onChangeStep) return;
      onChangeStep(step);
    };

    React.useEffect(() => {
      if(step==undefined) return;
      setCurrentStep((prev) => {
        if (prev < step) {
          setDirection(1);
        }else{
          setDirection(-1)
        }
        return step;
      });
    }, [step]);

    return (
      <StepperContext.Provider
        value={{
          totalStep,
          currentStep,
          orientation,
          direction,
          animationExecute,
          handleCurrentStepNext,
          handleCurrentStepBack,
          handleAnimationStart,
          handleAnimationStop,
          handleSetTotalStep,
        }}
      >
        <div ref={ref} className={cn("relative overflow-hidden", className)}>
          <MotionConfig transition={transition}>
            <motion.div animate={{ height: bounds.height }}>
              <div
                ref={heightRef}
                className="relative"
                aria-roledescription="stepper"
                {...props}
              >
                {React.Children.map(children, (child) =>
                  React.isValidElement(child) &&
                  child.type === StepperControls ? (
                    <motion.div layout>{child}</motion.div>
                  ) : (
                    child
                  )
                )}
              </div>
            </motion.div>
          </MotionConfig>
        </div>
      </StepperContext.Provider>
    );
  }
);

Stepper.displayName = "Stepper";

const StepperContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const {
    currentStep,
    orientation,
    direction,
    handleAnimationStop,
    handleSetTotalStep,
  } = useStepper();
  const steps = React.useMemo(() => {
    return React.Children.toArray(children).filter(
      (child) => React.isValidElement(child) && child.type === Step
    );
  }, [children]);

  React.useEffect(() => {
    if (!handleSetTotalStep || steps.length <= 0) return;
    handleSetTotalStep(steps.length);
  }, [steps, handleSetTotalStep]);
  return (
    <AnimatePresence mode="popLayout" initial={false} custom={direction}>
      <motion.div
        ref={ref}
        key={currentStep}
        variants={
          orientation === "vertical" ? verticalVariants : horizontalVariants
        }
        initial="initial"
        animate="active"
        exit="exit"
        onAnimationComplete={handleAnimationStop}
        custom={direction}
      >
        <div className={cn(className)} {...props}>
          {steps[currentStep]}
        </div>
      </motion.div>
    </AnimatePresence>
  );
});
const horizontalVariants = {
  initial: (direction: number) => {
    return { x: \`\${110 * direction}%\`, opacity: 0 };
  },
  active: { x: "0%", opacity: 1 },
  exit: (direction: number) => {
    return { x: \`\${-110 * direction}%\`, opacity: 0 };
  },
};
const verticalVariants = {
  initial: (direction: number) => {
    return { y: \`\${100 * direction}%\`, opacity: 0 };
  },
  active: { y: "0%", opacity: 1 },
  exit: (direction: number) => {
    return { y: \`\${-110 * direction}%\`, opacity: 0 };
  },
};
StepperContent.displayName = "StepperContent";

const StepperControls = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn(className, "relative z-10")} {...props}>
      {children}
    </div>
  );
});
StepperControls.displayName = "StepperControls";

const Step = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn(className)} {...props} />;
});
Step.displayName = "Step";

interface StepperButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const StepperNext = React.forwardRef<HTMLButtonElement, StepperButtonProps>(
  ({ className, ...props }, ref) => {
    const { currentStep, animationExecute, totalStep, handleCurrentStepNext } =
      useStepper();
    return (
      <button
        ref={ref}
        className={cn(
          "bg-[#266DF0] hover:bg-[#1C62E3] text-white text-sm py-1.5 px-4 rounded-md shadow-[inset_0px_0px_0px_1px_rgba(35,37,41,0.1),0px_2px_4px_-2px_rgba(38,109,240,0.12),0px_3px_6px_-2px_rgba(38,109,240,0.08)] transition-all disabled:opacity-50 disabled:pointer-events-none",
          {
            "pointer-events-none": animationExecute,
          },
          className
        )}
        disabled={currentStep === totalStep - 1}
        onClick={handleCurrentStepNext}
        {...props}
      >
        Next
      </button>
    );
  }
);
StepperNext.displayName = "StepperNext";

const StepperBack = React.forwardRef<HTMLButtonElement, StepperButtonProps>(
  ({ className, ...props }, ref) => {
    const { currentStep, animationExecute, handleCurrentStepBack } =
      useStepper();
    return (
      <button
        ref={ref}
        className={cn(
          "bg-transparent border border-neutral-200 text-neutral-950 hover:bg-neutral-100 transition-all text-sm py-1.5 px-4 rounded-md disabled:opacity-50 disabled:pointer-events-none",
          {
            "pointer-events-none": animationExecute,
          },
          className
        )}
        disabled={currentStep === 0}
        onClick={handleCurrentStepBack}
        {...props}
      >
        Back
      </button>
    );
  }
);
StepperBack.displayName = "StepperBack";

export {
  Stepper,
  StepperContent,
  StepperControls,
  Step,
  StepperNext,
  StepperBack,
};
`,
  },
  {
    type: "p",
    content: `In this setup, the Stepper component manages all the steps and controls, while StepperContent renders each step with animations. The Step component defines the steps, and StepperControls keeps the control buttons static. StepperNext and StepperBack components allow you to navigate the steps forward and backward.`,
  },
  {
    type: "p",
    content: "Then, you can use it like this:",
  },
  {
    type: "code",
    content: `"use client"
    
import {
  Step,
  Stepper,
  StepperBack,
  StepperContent,
  StepperControls,
  StepperNext,
} from "@/components/ui/stepper";

export function StepperDemo(){
  return (
    <Stepper
      className="w-5/6 lg:w-3/4 mb-2 rounded-lg border border-neutral-200 bg-white">
      <StepperContent>
        <Step>
          <div className="pt-3 w-full">
            <div className="px-3 font-semibold text-neutral-900">This is step one</div>
          </div>
        </Step>
        <Step>
          <div className="pt-3 w-full">
            <div className="px-3 font-semibold text-neutral-900">This is step two</div>
          </div>
        </Step>
        <Step>
          <div className="pt-3 w-full">
            <div className="px-3 font-semibold text-neutral-900">This is step three</div>
          </div>
        </Step>
      </StepperContent>
      <StepperControls className="p-3 mt-3 border-t border-neutral-200 flex items-center justify-between gap-2 bg-white">
        <StepperBack />
        <StepperNext />
      </StepperControls>
    </Stepper>
  )
}
    `,
  },
  {
    type: "p",
    content: `This example component structure enables you to easily create and customize multi-step components. Using this setup in your projects, you can develop dynamic and user-friendly components with <strong>Framer Motion</strong> and <strong>React</strong>.`,
  },
  {
    type: "title",
    content: "Example with Shadcn",
  },
  {
    type: "component",
    content: StepperExample,
  },
  {
    type: "alt",
    content: `This component is inspired by a component created by <a href='https://twitter.com/mrncst/status/1801250951518412864' target='_blank'>Mariana Castilho</a>.`,
  },
  {
    type: "code",
    content: `"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { InboxIcon } from "@heroicons/react/20/solid";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Step, Stepper, StepperContent } from "@/components/ui/stepper";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { ChatBubbleLeftIcon } from "@heroicons/react/20/solid";
import { Textarea } from "@/components/ui/textarea";
const StepperExample = () => {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={(val) => setOpen(val)}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          size={"icon"}
          variant={"outline"}
          className="rounded-lg"
        >
          <InboxIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={20}
        side="top"
        className="p-0 overflow-hidden rounded-xl shadow-sm"
      >
        <Stepper step={step} className="w-full">
          <StepperContent>
            <Step className="p-2 w-full flex flex-col">
              <div
                onClick={() => setStep(1)}
                className="group flex h-8 w-full cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-2 text-[13px] hover:bg-[#F9F9F9] dark:hover:bg-white/5"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[#999999] transition-colors ease-out group-hover:text-[#171717] dark:text-white/40 group-hover:dark:text-white">
                    <CheckCircleIcon className="w-4 h-4" />
                  </span>
                  <button className="font-medium text-[#3B3B3B] group-hover:text-[#171717] dark:text-white/90 group-hover:dark:text-white">
                    Approve Changes
                  </button>
                </div>
                <div className="text-xs text-[#898989] opacity-100 transition-opacity ease-out group-hover:opacity-100 ">
                  Send Review
                </div>
              </div>
              <div
                onClick={() => setStep(2)}
                className="group flex h-8 w-full cursor-pointer items-center justify-between gap-2 rounded-md px-2 text-[13px] hover:bg-[#F9F9F9] dark:hover:bg-white/5"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[#999999] transition-colors ease-out group-hover:text-[#171717] dark:text-white/40 group-hover:dark:text-white">
                    <ChatBubbleLeftIcon className="w-4 h-4" />
                  </span>
                  <button className="font-medium text-[#3B3B3B] group-hover:text-[#171717] dark:text-white/90 group-hover:dark:text-white">
                    Add Comment
                  </button>
                </div>
                <div className="text-xs text-[#898989] opacity-100 transition-opacity ease-out group-hover:opacity-100 ">
                  Reply Thread
                </div>
              </div>
            </Step>
            <Step>
              <div className="p-2 flex flex-col gap-3 text-[13px]">
                <div className="group flex w-full items-center justify-between rounded-md px-[2px] text-[13px]">
                  <div className="select-none text-nowrap text-sm font-semibold text-[#171717] dark:text-white">
                    Approve Changes
                  </div>
                  <span className="text-nowrap rounded-full bg-[#00F3F3]/10 px-2 py-[2px] text-xs text-[#00AFAF] opacity-100 transition-opacity ease-out dark:bg-[#00F3F3]/5 font-medium">
                    by @emil
                  </span>
                </div>
                <div className="flex flex-col gap-1 rounded-md bg-[#F7F7F7] p-2 dark:bg-dark-bgSuperlight">
                  <div className="flex items-center gap-2">
                    <span className="-translate-y-px text-[#616161] dark:text-white">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2.003 2.666c.368 0 .666.299.666.667v4h5.334v-4a.667.667 0 011.333 0v9.333a.667.667 0 11-1.333 0v-4H2.669v4a.667.667 0 11-1.333 0V3.333c0-.369.298-.667.667-.667zm12.282 4.063c.235.11.384.345.384.604v5.333a.667.667 0 01-1.333 0v-3.91l-.907.755a.667.667 0 11-.853-1.024l2-1.666a.667.667 0 01.71-.092z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                    <h2 className="select-none font-medium text-[#616161] dark:text-white">
                      New Title Added
                    </h2>
                  </div>
                  <p className="select-none text-[#616161] dark:text-[#c4c4c4]">
                    &quot;Mariana Castilho is a product designer&quot;
                  </p>
                </div>
                <div className="flex w-full gap-2 text-[13px] text-[#171717]">
                  <Button
                    onClick={() => setStep(0)}
                    className="flex-1 rounded-lg h-8"
                    variant={"outline"}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      setOpen(false);
                      setStep(0);
                    }}
                    className="flex-1 rounded-lg h-8"
                  >
                    Approve
                  </Button>
                </div>
              </div>
            </Step>
            <Step>
              <div className="p-2 flex flex-col gap-3 text-[13px]">
                <div className="group flex w-full items-center justify-between rounded-md px-[2px] text-[13px]">
                  <div className="select-none text-nowrap text-sm font-semibold text-[#171717] dark:text-white">
                    Add Comment
                  </div>
                  <span className="text-nowrap rounded-full bg-[#00F3F3]/10 px-2 py-[2px] text-xs text-[#00AFAF] opacity-100 transition-opacity ease-out dark:bg-[#00F3F3]/5 font-medium">
                    Create Thread
                  </span>
                </div>
                <Textarea className="!resize-none border-0 shadow-none bg-neutral-100" />
                <div className="flex w-full gap-2 text-[13px] text-[#171717]">
                  <Button
                    onClick={() => setStep(0)}
                    className="flex-1 rounded-lg h-8"
                    variant={"outline"}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      setOpen(false);
                      setStep(0);
                    }}
                    className="flex-1 rounded-lg h-8"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Step>
          </StepperContent>
        </Stepper>
      </PopoverContent>
    </Popover>
  );
};

export default StepperExample;
`,
  },
];
export default stepper_component;
