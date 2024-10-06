import stepper_component from "./documents/stepper-component";
import charts from "./documents/charts";
import toolbar from "./documents/toolbar";

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
  cover: string;
  hide?: boolean;
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
    cover: "StepperCover",
  },
  {
    id: "charts",
    title: "Charts",
    description:
      "Explore simple and nice-looking charts made with Chart.js and React, featuring clean designs and smooth performance.",
    date: "2024-09-26",
    to: "/playground/charts",
    backTo: {
      title: "Playground",
      to: "/playground",
    },
    document: charts,
    cover: "ChartsCover",
  },
  {
    id: "toolbar",
    title: "Toolbar",
    description:
      "A toolbar similar to Vercel's, built with Radix UI. Fully customizable to fit your needs.",
    date: "2024-10-06",
    to: "/playground/toolbar",
    backTo: {
      title: "Playground",
      to: "/playground",
    },
    document: toolbar,
    cover: "ToolbarCover",
  },
];

export default playgroundDocs;
