import Cover from "@/components/Cover";
import CreateNavbar from "@/components/CreateNavbar";
import playgroundDocs from "@/lib/playground-docs";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Playground / Taner",
};

const PlaygroundPage = () => {
  return (
    <div className="col-start-2">
      <CreateNavbar backTo={undefined} navs={undefined} />
      <div className="text-neutral-700 flex items-end justify-between">
        <h5 className="font-medium">Playground</h5>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-10">
        {playgroundDocs.map(({ id, title, description, date, to, cover }) => {
          const CoverComponent = cover;
          const coverProps = {
            title,
            description,
            to,
            date,
          };

          return (
            <Cover key={id} {...coverProps}>
              <CoverComponent />
            </Cover>
          );
        })}
      </div>
    </div>
  );
};

export default PlaygroundPage;
