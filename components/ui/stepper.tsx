"use client";

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
    return { x: `${110 * direction}%`, opacity: 0 };
  },
  active: { x: "0%", opacity: 1 },
  exit: (direction: number) => {
    return { x: `${-110 * direction}%`, opacity: 0 };
  },
};
const verticalVariants = {
  initial: (direction: number) => {
    return { y: `${100 * direction}%`, opacity: 0 };
  },
  active: { y: "0%", opacity: 1 },
  exit: (direction: number) => {
    return { y: `${-110 * direction}%`, opacity: 0 };
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
