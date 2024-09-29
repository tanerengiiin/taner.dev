import Link from "next/link";
import playgroundDocs from "@/lib/playground-docs";
import Cover from "@/components/Cover";
import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
export default function Home() {
  return (
    <div className="col-start-2">
      <h1 className="text-neutral-700 font-medium">Taner Engin</h1>
      <p className="mt-8 p-text">
        <em className="font-serif mr-0.5">Frontend developer</em> based in
        Ankara, Turkey.
      </p>
      <p className="mt-6 p-text">
        Currently building various projects at{" "}
        <Link
          href="https://primevue.org/"
          target="_blank"
          className="highlight"
        >
          PrimeTek
        </Link>
        . Additionally, I developed the sub-pages of{" "}
        <Link href="https://wope.com/" target="_blank" className="highlight">
          Wope
        </Link>
        &apos;s landing page. Previously, I designed and implemented the entire
        frontend for{" "}
        <Link href="https://stockimg.ai/" target="_blank" className="highlight">
          Stockimg.ai
        </Link>
        .
      </p>
      <h5 className="text-neutral-700 font-medium mt-12">Connect</h5>
      <p className="mt-6 p-text">
        Reach me at{" "}
        <Link
          href="https://twitter.com/tanerengiin"
          target="_blank"
          className="highlight"
        >
          @tanerengiin
        </Link>{" "}
        or{" "}
        <Link
          href="mailto:tanerengin44444@gmail.com"
          target="_blank"
          className="highlight"
        >
          tanerengin44444@gmail.com
        </Link>
        .
      </p>
      <div className="mt-12 text-neutral-700 flex items-end justify-between">
        <Link
          href={"/playground"}
          className=" hover:underline underline-offset-2 transition-all inline-flex items-center gap-1.5"
        >
          <h5 className="font-medium">Playground</h5>
          <span>
            <ArrowUpRight size={16} className="opacity-50" />
          </span>
        </Link>
        <span className="opacity-70 text-sm">Recently shared</span>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-10">
        {playgroundDocs
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .filter((a) => !a.hide)
          .slice(0, 2)
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
    </div>
  );
}
