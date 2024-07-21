"use client";
import React, { useState } from "react";
import {
  Step,
  Stepper,
  StepperBack,
  StepperContent,
  StepperControls,
  StepperNext,
} from "@/components/ui/stepper";

const StepperCover = () => {
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "horizontal"
  );
  const changeOrientation = () => {
    if (orientation === "horizontal") {
      setOrientation("vertical");
    } else {
      setOrientation("horizontal");
    }
  };

  return (
    <div className="relative cover-container flex items-center justify-center">
      <button
        onClick={changeOrientation}
        className="active:scale-90 transition-all capitalize absolute bottom-1.5 left-1/2 -translate-x-1/2 px-2 text-sm h-7 rounded-md bg-white hover:bg-neutral-100 flex items-center justify-center border"
      >
        {orientation}
      </button>
      <Stepper
        orientation={orientation}
        onChangeStep={(val)=>console.log(val)}
        className="w-3/4 mb-2 rounded-lg border border-neutral-200 bg-white"
      >
        <StepperContent>
          <Step>
            <div className="pt-3 w-full">
              <div className="px-3 font-semibold text-neutral-900">
                This is step one
              </div>
              <div className="flex flex-col gap-2 mt-3 px-3">
                <div className="w-3/4 h-4 rounded-full bg-neutral-200/75 animate-pulse"></div>
                <div className="w-2/4 h-4 rounded-full bg-neutral-200/75 animate-pulse delay-500"></div>
                <div className="w-1/4 h-4 rounded-full bg-neutral-200/75 animate-pulse delay-1000"></div>
              </div>
            </div>
          </Step>
          <Step>
            <div className="pt-3 w-full">
              <div className="px-3 font-semibold text-neutral-900">
                This is step two
              </div>
              <div className="flex flex-col gap-2 mt-3 px-3">
                <div className="w-3/4 h-4 rounded-full bg-neutral-200/75 animate-pulse"></div>
                <div className="w-2/4 h-4 rounded-full bg-neutral-200/75 animate-pulse delay-500"></div>
                <div className="w-1/4 h-4 rounded-full bg-neutral-200/75 animate-pulse delay-1000"></div>
                <div className="w-2/4 h-4 rounded-full bg-neutral-200/75 animate-pulse delay-[1.5s]"></div>
                <div className="w-2/3 h-4 rounded-full bg-neutral-200/75 animate-pulse delay-[2s]"></div>
              </div>
            </div>
          </Step>
          <Step>
            <div className="pt-3 w-full">
              <div className="px-3 font-semibold text-neutral-900">
                This is step three
              </div>
              <div className="flex flex-col gap-2 mt-3 px-3">
                <div className="w-2/4 h-4 rounded-full bg-neutral-200/75 animate-pulse"></div>
                <div className="w-3/4 h-4 rounded-full bg-neutral-200/75 animate-pulse delay-500"></div>
              </div>
            </div>
          </Step>
        </StepperContent>
        <StepperControls className="p-3 mt-3 border-t border-neutral-200 flex items-center justify-between gap-2 bg-white">
          <StepperBack />
          <StepperNext />
        </StepperControls>
      </Stepper>
    </div>
  );
};

export default StepperCover;
