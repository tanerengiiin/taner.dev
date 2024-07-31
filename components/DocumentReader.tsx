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
      <CreateNavbar
        backTo={doc?.backTo}
        navs={doc?.document.filter(
          (item) => item.type === "title" && item.content
        )}
      />
      <div className="mb-4 col-start-2" style={{gridColumn:2}}>
        <h1 className="text-neutral-700 font-medium mb-0.5">{doc?.title}</h1>
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
            return (
              <ParagraphViewer
                key={index}
                text={item.content}
                alt={item.type === "alt"}
              />
            );
          case "alt":
            return <ParagraphViewer key={index} text={item.content} alt />;
          case "title":
            return <TitleViewer key={index} title={item.content} />;
          case "code":
            return (
              <CodeViewer key={index} code={item.content} lang={item?.lang} />
            );
          case "component":
            const Component = item.content;
            return <Component key={index} />;
        }
      })}
    </>
  );
};

export default DocumentReader;
