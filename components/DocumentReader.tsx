import { PlaygroundDoc } from "@/lib/playground-docs";
import React from "react";
import CreateNavbar from "./CreateNavbar";
import CodeViewer from "./CodeViewer";
import { ParagraphViewer, TitleViewer } from "@/components/TextViewer";

type Props = {
  doc: PlaygroundDoc | null | undefined;
};

const DocumentReader = ({ doc }: Props) => {
  return (
    <>
      <CreateNavbar backTo={doc?.backTo} navs={doc?.document.map((item)=> item.type==='title' && item.content)} />
      <div className="col-start-2 mb-4">
        <h1 className=" text-neutral-700 font-medium mb-0.5">{doc?.title}</h1>
        {!!doc?.date && (
          <time className="opacity-75 text-sm">
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
            }).format(new Date(doc?.date ?? "2024"))}
          </time>
        )}
      </div>
      {doc?.document.map((item, index) => {
        switch (item.type) {
          case "p":
            return <ParagraphViewer text={item.content} />;
          case "title":
            return <TitleViewer title={item.content} />;
          case "code":
            return <CodeViewer code={item.content} />;
        }
      })}
    </>
  );
};

export default DocumentReader;
