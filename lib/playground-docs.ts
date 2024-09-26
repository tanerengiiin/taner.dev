import StepperCover from "@/components/covers/StepperCover";
import React from "react";
import stepper_component from "./documents/stepper-component";
import chart_making from "./documents/chart-making";
import ChartMakingCover from "@/components/covers/ChartMakingCover";

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
  {
    id: "chart-making",
    title: "Charts",
    description:
      "Explore simple and nice-looking charts made with Chart.js and React, featuring clean designs and smooth performance.",
    date: "2024-09-26",
    to: "/playground/chart-making",
    backTo: {
      title: "Playground",
      to: "/playground",
    },
    document: chart_making,
    cover: ChartMakingCover,
  },
];

export default playgroundDocs;
