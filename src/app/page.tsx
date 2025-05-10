import WorksSection from "@/components/works-section";
import ExperienceSection from "@/components/experience-section";
export default function Home() {
  return (
    <main className="grid grid-cols-[192px_1fr_192px] gap-x-5 items-start max-w-4xl mx-auto pt-40 pb-20">
      <article
        className="col-start-2 enter "
        style={{ animationDelay: "0.2s" }}
      >
        <h1 className="text-base font-semibold">Taner Engin</h1>
        <p className="mt-10 text-base/7">
          Frontend Developer. Computer Engineering graduate with a passion for
          design and blockchain technology. I create frontend applications and
          UI components with a focus on clean, functional interfaces.
        </p>
        <div className="mt-6 flex items-center gap-4">
          <a
            href="https://x.com/tanerengiin"
            target="_blank"
            className="px-3 py-1.5 flex items-center gap-1.5 rounded-full bg-base-50 dark:bg-base-900 hover:bg-base-100 dark:hover:bg-base-800 border border-base-200 dark:border-base-800 transition-all ease-in-out"
          >
            <svg
              className="size-3.5 fill-base-500"
              width="300"
              height="271"
              viewBox="0 0 300 271"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_125_978)">
                <path d="M236 0H282L181 115L299 271H206.4L133.9 176.2L50.9004 271H4.90039L111.9 148L-1.09961 0H93.8004L159.3 86.6L236 0ZM219.9 244H245.4L80.4004 26H53.0004L219.9 244Z" />
              </g>
              <defs>
                <clipPath id="clip0_125_978">
                  <rect width="300" height="271" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className="text-sm font-medium">Twitter</span>
          </a>
        </div>
      </article>
      <WorksSection />
      <ExperienceSection />
    </main>
  );
}
