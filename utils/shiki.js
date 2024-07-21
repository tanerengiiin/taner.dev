"use client"
import { createHighlighter, loadWasm } from "shiki/core";
import github_dark from "shiki/themes/github-dark.mjs";
import github_light from "shiki/themes/github-light.mjs";
import js from "shiki/langs/javascript.mjs";

export const codeToHtml = async ({ code }) => {
  const highlighter = await createHighlighter({
    themes: ["github-light"],
    langs: ["javascript"],
  });

  return new Response(
    highlighter.codeToHtml(code, {
      theme: "github-light",
      lang: "javascript",
    })
  );
};
