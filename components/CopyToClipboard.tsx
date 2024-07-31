"use client";

import { CheckIcon, Square2StackIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useState } from "react";

export default function CopyToClipboard({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch (error) {
      console.error("Error copying to clipboard", error);
    } finally {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <Button
      aria-label="Copy code snippet"
      className="absolute top-1 right-1 w-7 h-7 rounded-md text-neutral-700"
      size={"icon"}
      variant={"outline"}
      onClick={copyToClipboard}
    >
      <MotionConfig
        transition={{ duration: 0.25, type: "spring", bounce: 0.15 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="checkmark"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <CheckIcon className="w-4 h-4" />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Square2StackIcon className="w-4 h-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </MotionConfig>
    </Button>
  );
}

const variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};
