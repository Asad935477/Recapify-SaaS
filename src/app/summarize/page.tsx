import React from "react";
import { notFound } from "next/navigation";
import { getSummary } from "@/actions/fetchActions";

export default async function Summarize({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  if (!searchParams?.["id"]) {
    return notFound();
  }

  const summary: SummaryType | null = await getSummary(searchParams?.["id"]);
  if (!summary) {
    return notFound();
  }

  return (
    <div>
      <p>{searchParams?.["id"]}</p>
    </div>
  );
}
