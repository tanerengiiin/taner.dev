import { NextResponse } from "next/server";
import sharp from "sharp";
import path from "path";
import fs from "fs/promises";

export async function POST(request: Request) {
  try {
    const { imagePath } = await request.json();

    let imageBuffer: Buffer;

    if (imagePath.startsWith("http")) {
      const response = await fetch(imagePath);
      if (!response.ok) {
        throw new Error("Görsel indirilemedi");
      }
      imageBuffer = Buffer.from(await response.arrayBuffer());
    } else {
      const fullPath = path.join(process.cwd(), "public", imagePath);
      imageBuffer = await fs.readFile(fullPath);
    }

    const { data, info } = await sharp(imageBuffer)
      .raw()
      .toBuffer({ resolveWithObject: true });

    let r = 0,
      g = 0,
      b = 0;
    const pixelCount = info.width * info.height;

    for (let i = 0; i < data.length; i += info.channels) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }

    r = Math.round(r / pixelCount);
    g = Math.round(g / pixelCount);
    b = Math.round(b / pixelCount);

    const hexColor = `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

    return NextResponse.json({ color: hexColor });
  } catch (error) {
    console.error("Renk analizi hatası:", error);
    return NextResponse.json(
      { error: "Görsel analiz edilemedi" },
      { status: 500 }
    );
  }
}
