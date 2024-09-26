"use client";
import ComponentViewer from "@/components/ComponentViewer";
import React, { useState } from "react";
import LineChart from "./LineChart";

const colors = ["#2563eb", "#e11d48", "#059669"];
const LineChartComponent = () => {
  const [color, setColor] = useState<string>("#2563eb");
  return (
    <ComponentViewer className="py-20 lg:py-40 px-0">
      <div className="mx-auto flex items-center gap-3 mb-8 w-fit">
        {colors.map((item) => (
          <button
            key={item}
            onClick={() => setColor(item)}
            className={`${
              item === color ? "ring-2" : "ring-0 hover:opacity-80"
            } w-5 h-5 overflow-hidden rounded-md shadow-[inset_0px_0px_0px_1.2px_rgba(0,0,0,0.18)]  focus:ring-2 ring-offset-1 transition-all`}
            style={{ backgroundColor: item }}
          ></button>
        ))}
      </div>
      <LineChart selectedColor={color} />
    </ComponentViewer>
  );
};

export default LineChartComponent;
