"use client"
import React, { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import {
  transformerNotationHighlight,
  transformerNotationDiff,
} from "@shikijs/transformers";
import type { BundledLanguage } from "shiki";
import { cn } from "@/lib/utils";

type Props = {
  code: string;
  lang?: BundledLanguage;
  filename?: string;
  className?: string;
};

export default function CodeViewer({
  code,
  lang = "jsx",
  className,
}: Props) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    async function highlightCode() {
      const htmlContent = await codeToHtml(code, {
        lang,
        theme: "github-light",
        transformers: [transformerNotationHighlight(), transformerNotationDiff()],
      });
      setHtml(htmlContent);
    }

    highlightCode();
  }, [code, lang]);

  return (
    <div
      className={cn(
        "col-start-2 mt-10 border border-neutral-200/80 rounded-lg overflow-hidden",
        className
      )}
    >
      <div
        className="[&>pre]:rounded-lg [&_pre]:max-h-[640px] [&_pre]:outline-main [&_pre]:overflow-auto text-sm [&>pre]:!bg-neutral-50/5 [&>pre]:pb-4 [&>pre]:pt-5 [&>pre]:pl-4 [&>pre]:pr-4 [&>pre]:leading-normal [&_code]:whitespace-pre-wrap [&_code]:block [&_code]:w-fit [&_code]:min-w-full"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </div>
  );
}