import { cn, generateId } from "@/lib/utils";
import React from "react";
import parse, {
  domToReact,
  attributesToProps,
  Element,
  HTMLReactParserOptions,
  DOMNode,
} from "html-react-parser";

type ParagraphViewerProps = {
  text?: string;
  className?:string;
};

export const ParagraphViewer: React.FC<ParagraphViewerProps> = ({
  text = "",
  className,
}) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        if (domNode.name === "a") {
          const { attribs, children } = domNode;
          return (
            <a {...attributesToProps(attribs)} className="highlight">
              {children && domToReact(children as DOMNode[], options)}
            </a>
          );
        }

        if (domNode.name === "strong") {
          const { attribs, children } = domNode;
          return (
            <strong
              {...attributesToProps(attribs)}
              className="font-medium text-neutral-800"
            >
              {children && domToReact(children as DOMNode[], options)}
            </strong>
          );
        }

        if (domNode.name === "code") {
          const { attribs, children } = domNode;
          return (
            <code
              {...attributesToProps(attribs)}
              className="bg-neutral-50 px-1.5 py-0.5 border border-neutral-200 rounded-md text-neutral-800 text-sm leading-none"
            >
              {children && domToReact(children as DOMNode[], options)}
            </code>
          );
        }
      }
    },
  };

  return (
    <p className={cn("mt-8 col-start-2 text-neutral-700 leading-normal text-[15px]",className)}>
      {parse(text, options)}
    </p>
  );
};

type TitleViewer = {
  title?: string;
};

export const TitleViewer = ({ title }: TitleViewer) => {
  if (!title) return null;
  const id = generateId(title);
  return (
    <h1
      id={id} 
      className="relative mt-10 col-start-2 text-neutral-700 leading-normal font-medium text-[15px] underline underline-offset-4 decoration-wavy decoration-1 decoration-neutral-400/30"
      >
      {title}
    </h1>
  );
};
