"use client";
import React, { useState } from "react";
import ComponentViewer from "@/components/ComponentViewer";
import { Button } from "@/components/ui/button";
import { InboxIcon } from "@heroicons/react/20/solid";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Step,
  Stepper,
  StepperBack,
  StepperContent,
  StepperControls,
  StepperNext,
} from "@/components/ui/stepper";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { ChatBubbleLeftIcon } from "@heroicons/react/20/solid";
import { Textarea } from "@/components/ui/textarea"
const StepperExample = () => {
  const [step, setStep] = useState(0);
  return (
    <ComponentViewer
      className="h-96 flex items-center justify-center"
      alt={`This component is inspired by a component created by <a href='https://twitter.com/mrncst/status/1801250951518412864' target='_blank'>Mariana Castilho</a>.`}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button size={"icon"} variant={"outline"} className="rounded-lg">
            <InboxIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          sideOffset={20}
          side="top"
          className="p-0 overflow-hidden rounded-xl"
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
                            fill-rule="evenodd"
                            clip-rule="evenodd"
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
                    <Button className="flex-1 rounded-lg h-8">Approve</Button>
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
                  <Textarea className="!resize-none border-0 shadow-none " />
                  <div className="flex w-full gap-2 text-[13px] text-[#171717]">
                    <Button
                      onClick={() => setStep(0)}
                      className="flex-1 rounded-lg h-8"
                      variant={"outline"}
                    >
                      Back
                    </Button>
                    <Button className="flex-1 rounded-lg h-8">Submit</Button>
                  </div>
                </div>
              </Step>
            </StepperContent>
          </Stepper>
        </PopoverContent>
      </Popover>
    </ComponentViewer>
  );
};

export default StepperExample;
