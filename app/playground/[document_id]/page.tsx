import React from "react";
import playgroundDocs from "@/lib/playground-docs";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import DocumentReader from "@/components/DocumentReader";

type Props = {
  params: { document_id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const doc = playgroundDocs.find((x) => x.id === params.document_id);

  return {
    title: doc?.title + " / Taner",
    description: doc?.description,
  };
}

const DocumentPage = async ({ params }: Props) => {
  const doc = playgroundDocs.find((x) => x.id === params.document_id);
  if (!doc || !doc?.document || doc?.hide) {
    notFound();
  }

  return <DocumentReader doc={doc} />;
};

export default DocumentPage;
