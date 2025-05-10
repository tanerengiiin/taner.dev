import { TinyColor } from "@ctrl/tinycolor";
import FancyBorder from "./fancy-border";

interface UrlPreviewProps {
  url: string;
  title?: string;
  image?: string;
}

export default async function UrlPreview({
  url,
  title,
  image,
}: UrlPreviewProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const apiUrl = `${baseUrl}/api/og-image?url=${encodeURIComponent(url)}`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  let color = null;

  if (data.image || image) {
    try {
      const imageUrl = data.image || image;

      const response = await fetch(`${baseUrl}/api/analyze-color`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imagePath: imageUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const imageData = await response.json();
      color = imageData.color;
    } catch (error) {
      console.error("Color analysis error:", error);
      color = null;
    }
  }
  const shadowColor1 = color
    ? new TinyColor(color).darken(10).desaturate(10).setAlpha(0.2).toRgbString()
    : "#1b1c1d7a";
  const shadowColor2 = color
    ? new TinyColor(color).darken(40).toHexString()
    : "#242628";

  return (
    <FancyBorder
      className="aspect-video"
      style={
        {
          "--shadow-color-1": shadowColor1,
          "--shadow-color-2": shadowColor2,
        } as React.CSSProperties
      }
    >
      {data.image || image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={data?.image ?? image}
          alt={`Preview of ${url}`}
          className="w-full h-full object-cover object-top blur-ani"
        />
      ) : (
        <div className="bg-base-900 w-full h-full flex items-center justify-center">
          {title ? (
            <span className="!text-2xl text-white font-serif font-light">
              {title}
            </span>
          ) : (
            <span className="text-sm text-base-500">No preview available.</span>
          )}
        </div>
      )}
    </FancyBorder>
  );
}
