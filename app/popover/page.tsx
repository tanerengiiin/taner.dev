"use client";
import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useMeasure from "react-use-measure";
const PopoverPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<number>();
  const [ref, bounds] = useMeasure({ offsetSize: true });
  const [animationLoading, setAnimationLoading] = useState(false);
  const content = useMemo(() => {
    switch (currentStep) {
      case 0:
        return (
          <div className="pt-3 w-full">
            <div className="px-3 font-semibold text-zinc-950">
              Create a Team
            </div>
            <div className="flex flex-col mt-3 px-3 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-violet-500 rounded-full"></div>
                <button className="min-w-14 px-2 py-1 hover:bg-zinc-100 transition-all rounded-full border text-xs font-medium shadow-sm">
                  Upload team logo
                </button>
              </div>
              <div className="">
                <label className="text-sm font-medium">
                  Your team&apos;s name
                </label>
                <input
                  placeholder="Enter team's name"
                  className="mt-1 w-full text-sm border rounded-md outline-none px-2 py-1 text-zinc-950 placeholder:text-zinc-500"
                />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="pt-3 w-full">
            <div className="px-3 font-semibold text-zinc-950">
              Invite Members
            </div>
            <div className="flex flex-col mt-3">
              <div className="px-3 flex items-center mb-3 gap-2">
                <div className="flex-1">
                  <input
                    placeholder="Enter email address"
                    className="w-full text-sm border rounded-md outline-none px-2 py-1 text-zinc-950 placeholder:text-zinc-500"
                  />
                </div>
                <button className="min-w-14 px-3 py-1 hover:bg-zinc-100 transition-all rounded-md border text-sm font-medium shadow-sm">
                  Invite
                </button>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-zinc-100 transition-all cursor-pointer">
                <div className="w-6 h-6 rounded-full bg-[#266DF0]"></div>
                <div className="text-sm font-medium flex-1">Ethan Carter</div>
                <div className="text-xs px-1.5 py-0.5 rounded-md bg-zinc-200 text-zinc-800">
                  Invited
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-zinc-100 transition-all cursor-pointer">
                <div className="w-6 h-6 rounded-full bg-[#f53c64]"></div>
                <div className="text-sm font-medium flex-1">Sophia Bennett</div>
                <div className="text-xs px-1.5 py-0.5 rounded-md bg-zinc-200 text-zinc-800">
                  Invited
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="pt-3 w-full">
            <div className="px-3 font-semibold text-zinc-950">
              Create a Project
            </div>
            <div className="flex flex-col mt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-zinc-100 transition-all cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                <div className="text-sm font-medium flex-1">Luminate</div>
                <div className="text-xs font-medium text-zinc-950">Edit</div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-zinc-100 transition-all cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-pink-600"></div>
                <div className="text-sm font-medium flex-1">Velox</div>
                <div className="text-xs font-medium text-zinc-950">Edit</div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-zinc-100 transition-all cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-sky-600"></div>
                <div className="text-sm font-medium flex-1">Aether</div>
                <div className="text-xs font-medium text-zinc-950">Edit</div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-zinc-100 transition-all cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="text-sm font-medium flex-1">Solstice</div>
                <div className="text-xs font-medium text-zinc-950">Edit</div>
              </div>
              <div className="mt-2 px-3">
                <button className="w-fit min-w-14 px-2 py-1 hover:bg-zinc-100 transition-all rounded-full border text-xs font-medium shadow-sm">
                  Create
                </button>
              </div>
            </div>
          </div>
        );
    }
  }, [currentStep]);
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <button className="-translate-y-40 translate-x-28 lg:translate-x-16 min-w-14 px-4 py-1 hover:bg-zinc-100 transition-all rounded-md border text-sm font-medium shadow-sm">
            Open
          </button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="end"
          sideOffset={12}
          className="shadow-sm p-0 rounded-xl w-[18rem]"
        >
          <MotionConfig
            transition={{ duration: 0.4, type: "spring", bounce: 0 }}
          >
            <motion.div animate={{ height: bounds.height }}>
              <div ref={ref} className="overflow-hidden relative">
                <AnimatePresence
                  mode="popLayout"
                  initial={false}
                  custom={direction}
                >
                  <motion.div
                    key={currentStep}
                    variants={variants}
                    initial="initial"
                    animate="active"
                    exit="exit"
                    onAnimationComplete={() => setAnimationLoading(false)}
                    custom={direction}
                  >
                    {content}
                  </motion.div>
                </AnimatePresence>
                <motion.div
                  layout
                  className="relative z-10 p-3 mt-3 border-t flex items-center justify-between gap-2"
                >
                  <div className="flex-1 text-sm text-zinc-700">
                    Step {currentStep + 1} of 3
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={currentStep === 0}
                      onClick={() => {
                        if (currentStep === 0) {
                          return;
                        }
                        setAnimationLoading(true);
                        setDirection(-1);
                        setCurrentStep((prev) => prev - 1);
                      }}
                      className={`${
                        animationLoading ? "pointer-events-none" : ""
                      } disabled:pointer-events-none disabled:opacity-50 flex-1 min-w-14 px-3 py-1 hover:bg-zinc-100 transition-all rounded-md border text-sm font-medium shadow-sm`}
                    >
                      Back
                    </button>
                    <button
                      disabled={currentStep === 2}
                      onClick={() => {
                        if (currentStep === 2) {
                          setCurrentStep(0);
                          return;
                        }
                        setAnimationLoading(true);
                        setDirection(1);
                        setCurrentStep((prev) => prev + 1);
                      }}
                      className={`${
                        animationLoading ? "pointer-events-none" : ""
                      } disabled:pointer-events-none disabled:opacity-50 flex-1 min-w-14 px-3 py-1 bg-[#266DF0] text-white hover:bg-[#266DF0]/80 transition-all rounded-md text-sm font-medium shadow-sm`}
                    >
                      Next
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </MotionConfig>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PopoverPage;

const variants = {
  initial: (direction: number) => {
    return { x: `${110 * direction}%`, opacity: 0 };
  },
  active: { x: "0%", opacity: 1 },
  exit: (direction: number) => {
    return { x: `${-110 * direction}%`, opacity: 0 };
  },
};
