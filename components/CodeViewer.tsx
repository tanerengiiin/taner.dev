import { codeToHtml } from "shiki/bundle/web";
import {
  transformerNotationHighlight,
  transformerNotationDiff,
  transformerNotationFocus
} from "@shikijs/transformers";
import type { BundledLanguage } from "shiki/bundle/web";
import { cn } from "@/lib/utils";
import CopyToClipboard from "./CopyToClipboard";

type Props = {
  code: string;
  lang?: BundledLanguage;
  filename?: string;
  className?: string;
};
export default async function CodeViewer({
  code,
  lang = "jsx",
  className,
}: Props) {
  const html = await codeToHtml(code, {
    lang,
    theme: "github-light",
    transformers: [transformerNotationHighlight(), transformerNotationDiff(), transformerNotationFocus()],
  });

  return (
    <div
      className={cn(
        "col-start-2 relative mt-10 border border-neutral-200/80 rounded-lg overflow-hidden",
        className
      )}
    >
       <CopyToClipboard code={code} />
      <div
        className="[&>pre]:rounded-lg [&_pre]:max-h-[640px] [&_pre]:outline-main [&_pre]:overflow-auto text-sm [&>pre]:!bg-neutral-50/5 [&>pre]:pb-4 [&>pre]:pt-5 [&>pre]:pl-4 [&>pre]:pr-4 [&>pre]:leading-normal [&_code]:whitespace-pre-wrap [&_code]:block [&_code]:w-fit [&_code]:min-w-full"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </div>
  );
}
