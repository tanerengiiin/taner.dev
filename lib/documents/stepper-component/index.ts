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
    content: "Here is the overall structure of the components:",
  },
  {
    type:'p',
    content:'Firstly, create a <code>stepper.tsx</code> file and paste the code.'
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
      setCurrentStep(step);
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
          "bg-[#266DF0] hover:bg-[#1C62E3] text-white text-sm py-1.5 px-4 rounded-md transition-all disabled:opacity-50 disabled:pointer-events-none shadow-[inset_0px_0px_0px_1px_rgba(35,37,41,0.1),0px_2px_4px_-2px_rgba(38,109,240,0.12),0px_3px_6px_-2px_rgba(38,109,240,0.08)]",
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
};`,
  },
  {
    type: "p",
    content: `In this setup, the Stepper component manages all the steps and controls, while StepperContent renders each step with animations. The Step component defines the steps, and StepperControls keeps the control buttons static. StepperNext and StepperBack components allow you to navigate the steps forward and backward.`,
  },
  {
    type: "p",
    content: `This example component structure enables you to easily create and customize multi-step components. Using this setup in your projects, you can develop dynamic and user-friendly components with Framer Motion and React.`,
  },
];
export default stepper_component;
