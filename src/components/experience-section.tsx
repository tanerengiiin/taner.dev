import { experience } from "@/data/experience";
import { Brain } from "lucide-react";
import React from "react";

const ExperienceSection = () => {
  return (
    <div className="mt-24 space-y-6 col-start-2 enter" style={{animationDelay:'0.7s'}}>
      <h2 className="text-sm text-base-500 flex items-center gap-2">
        <Brain strokeWidth={1.5} className="size-4 " />
        <span>Experience</span>
      </h2>
      <div className="space-y-4">
        {experience.map((item) => (
          <div key={item.id} className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-sm/6 font-medium">{item.title}</h3>
              <p className="text-sm/6 text-base-500">{item.company}</p>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-base-500">
                {item.startDate} - {item.endDate==='Present'?<span className="text-main font-medium px-1.75 py-0.75 rounded-full bg-main/10 border border-dashed border-main/75">Present</span>:item.endDate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
