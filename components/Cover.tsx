import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  description?: string;
  to: string;
  date: string;
};

const Cover = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & Props
>(
  (
    {
      description = "",
      title = "",
      to = "",
      date = null,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
        <div className="mt-3">
          <div className="text-neutral-700 space-x-2">
            <Link
              href={to ?? "/"}
              scroll={true}
              className="underline underline-offset-2 decoration-neutral-300 hover:decoration-neutral-700 transition-all"
            >
              {title ?? "Index"}
            </Link>
            {!!date && (
              <time className="opacity-70 text-sm">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                }).format(new Date(date ?? "2024"))}
              </time>
            )}
          </div>
          {!!description && (
            <p className="mt-1.5 text-sm text-neutral-500">{description}</p>
          )}
        </div>
      </div>
    );
  }
);

Cover.displayName = "Cover";
export default Cover;
