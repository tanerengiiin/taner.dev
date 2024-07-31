import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Profile";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({
  params,
}: {
  params: { document_id: string };
}) {
  // Font
  const geistMedium = fetch(
    new URL("/public/fonts/Geist-Medium.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{ display: "flex" }}
        tw="bg-white w-full h-full flex-col justify-between px-16 pb-24"
      >
        <div style={{ display: "flex" }}></div>
        <div style={{ display: "flex" }} tw="flex-col">
          <div style={{ display: "flex" }} tw="items-center">
            <div tw="w-20 h-20 rounded-full bg-[#266DF0]"></div>
            <div tw="ml-4 text-6xl text-neutral-800 font-medium">
              / Taner Engin
            </div>
          </div>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "Geist",
          data: await geistMedium,
          style: "normal",
          weight: 500,
        },
      ],
    }
  );
}
