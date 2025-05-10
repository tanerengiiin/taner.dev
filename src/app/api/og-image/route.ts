// pages/api/fetch-og-image.ts
import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(request: NextRequest) {
  // URL parametresini al
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "URL parametresi gerekli" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "İstek başarısız oldu", status: response.status },
        { status: response.status }
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // OG görselini bul
    let ogImage = $('meta[property="og:image"]').attr("content");

    // OG görsel bulunamazsa alternatif meta tag'leri kontrol et
    if (!ogImage) {
      ogImage = $('meta[property="og:image:url"]').attr("content");
    }

    if (!ogImage) {
      ogImage = $('meta[name="twitter:image"]').attr("content");
    }

    if (!ogImage) {
      ogImage = $('link[rel="apple-touch-icon"]').attr("href");
    }

    // Göreceli URL'yi mutlak URL'ye çevir
    if (ogImage && !ogImage.startsWith("http")) {
      try {
        const urlObj = new URL(url);
        
        if (ogImage.startsWith("/")) {
          // Mutlak yol - başında / var
          ogImage = `${urlObj.protocol}//${urlObj.hostname}${ogImage}`;
        } else {
          // Göreceli yol - başında / yok
          // URL'nin base path'ini bul
          const pathParts = urlObj.pathname.split("/");
          pathParts.pop(); // Son kısmı çıkar
          const basePath = pathParts.join("/");
          
          ogImage = `${urlObj.protocol}//${urlObj.hostname}${basePath}/${ogImage}`;
        }
      } catch (err) {
        console.error("URL dönüştürme hatası:", err);
      }
    }

    if (!ogImage) {
      return NextResponse.json(
        { error: "OG görseli bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json({ image: ogImage });
  } catch (error) {
    console.error("Görsel çekme hatası:", error);
    return NextResponse.json(
      { error: "Sunucu hatası", detail: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}