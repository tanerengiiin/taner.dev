import StepperCover from "@/components/covers/StepperCover";
import React from "react";
import stepper_component from "./documents/stepper-component";

export type PlaygroundDoc = {
  id: string;
  title: string;
  description: string;
  date: string;
  to: string;
  backTo: {
    title: string;
    to: string;
  };
  document: any[];
  cover: React.ComponentType<any>;
};

const playgroundDocs: PlaygroundDoc[] = [
  {
    id: "stepper-component",
    title: "Stepper Component",
    description:
      "This is a copy-paste React component made with Framer Motion.",
    date: "2024-07-01",
    to: "/playground/stepper-component",
    backTo: {
      title: "Playground",
      to: "/playground",
    },
    document: stepper_component,
    cover: StepperCover,
  },
];

export default playgroundDocs;
