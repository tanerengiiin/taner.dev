import { ArrowUpRight, Package } from "lucide-react";
import React, { Suspense } from "react";
import UrlPreview from "./url-preview";
import { works } from "@/data/works";

const WorksSection = () => {
  return (
    <div
      className="mt-24 col-start-1 col-span-3 max-w-2xl mx-auto w-full enter"
      style={{ animationDelay: "0.5s" }}
    >
      <div className="space-y-6">
        <h2 className="text-sm text-base-500 flex items-center gap-2">
          <Package strokeWidth={1.5} className="size-4 " />
          <span>Works</span>
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {works.map((work, index) => (
            <div
              key={work.id}
              className="enter"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <Suspense
                fallback={
                  <div className="bg-secondary animate-pulse aspect-video w-full"></div>
                }
              >
                <UrlPreview
                  url={work.link}
                  title={work.title}
                  image={work.image}
                />
              </Suspense>
              <a href={work.link} target="_blank" className="mt-1.5 block">
                <h3 className="group inline-flex items-center gap-0.5 text-sm font-medium">
                  <span>{work.title}</span>
                  <ArrowUpRight
                    className="size-4 opacity-50 group-hover:opacity-100 transition-all duration-150"
                    strokeWidth={1.5}
                  />
                </h3>
              </a>
              <p className="mt-0.5 text-sm text-base-500">{work.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorksSection;
