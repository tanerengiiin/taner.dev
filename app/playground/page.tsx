import Cover from "@/components/Cover";
import CreateNavbar from "@/components/CreateNavbar";
import playgroundDocs from "@/lib/playground-docs";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import React from "react";

export const metadata: Metadata = {
  title: "Playground / Taner",
};

const PlaygroundPage = () => {
  return (
    <>
      <CreateNavbar backTo={undefined} navs={undefined} />
      <div className="text-neutral-700 flex items-end justify-between col-start-2">
        <h5 className="font-medium">Playground</h5>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-10  col-start-2">
        {playgroundDocs
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .filter((a) => !a.hide)
          .map(({ id, title, description, date, to, cover }) => {
            const coverProps = {
              title,
              description,
              to,
              date,
            };
            const Component = dynamic(
              () => import("@/components/covers/" + cover),
              {
                ssr: false,
              }
            );
            return (
              <Cover key={id} {...coverProps}>
                <Component />
              </Cover>
            );
          })}
      </div>
    </>
  );
};

export default PlaygroundPage;
