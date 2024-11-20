import React from "react";
import { notFound } from "next/navigation";
import { getSummary, getUserCoins } from "@/actions/fetchActions";
import DashNav from "@/components/dashboard/DashNav";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

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
  const session: CustomSession | null = await getServerSession(authOptions);

  return (
    <div className="container">
      <DashNav user={session?.user} />
    </div>
  );
