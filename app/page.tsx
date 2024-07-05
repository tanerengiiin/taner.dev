import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-2">
          <div className="font-semibold">taner.dev</div>
          <Link href={'/buttons'} className="font-medium text-[#266DF0]">Buttons</Link>
          <Link href={'/popover'} className="font-medium text-[#266DF0]">Popover</Link>
        </div>
    </main>
  );
}

