"use client";
import React from "react";

export default function UrlInput() {
  const handleSubmit = (event: React.FormEvent) => {};
  return (
    <div className="flex justify-center items-center mt-10 w-full">
      <form onSubmit={handleSubmit} className="relative w-full md:w-[500px]">
        <input
          className="w-full md:w-[500px] h-12 rounded-md bg-muted border border-slate-400 border-dashed p-3 outline-none"
          type="url"
          placeholder="Enter URL Of The Video You Want To Summarize..."
        />
      </form>
    </div>
  );
}
