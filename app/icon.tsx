import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#266DF0",
          width: "100%",
          height: "100%",
          minWidth:"16px",
          minHeight:"16px",
          borderRadius:'999px'
        }}
      >
      </div>
    ),
    {
      ...size,
    }
  );
}
