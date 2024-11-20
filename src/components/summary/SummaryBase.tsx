"use client";
import React, { useEffect, useState } from "react";
import SummarizeLoader from "./SummarizeLoader";

export default function SummaryBase({ summary }: { summary: ChatType | null }) {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (summary?.response) {
      setResponse(summary?.response!);
      setLoading(false);
    }
  }, [summary]);

  return (
    <div className="flex items-center flex-col w-full">
      <h1 className="text-2xl font-bold my-4">{summary?.title}</h1>
      {loading && <SummarizeLoader />}
      {response && (
        <div className="w-full md:w-[700px] rounded-lg bg-slate-100 shadow-md p-8">
          {response}
        </div>
      )}
    </div>
  );
}
