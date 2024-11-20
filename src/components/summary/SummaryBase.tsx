"use client";
import React, { useState } from "react";

export default function SummaryBase({ summary }: { summary: ChatType | null }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex items-center flex-col w-full">
      <h1 className="text-2xl font-bold my-4">{summary?.title}</h1>
      {loading && <div>Loading...</div>}
    </div>
  );
}
