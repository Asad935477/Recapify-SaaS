"use client";
import React, { useActionState, useState } from "react";
import Loading from "../common/Loading";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export default function UrlInput() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<addUrlErrorType>({});

  const handleSubmit = (event: React.FormEvent) => {
    try {
      event.preventDefault();
      setLoading(true);
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          setErrors(error?.response?.data?.errors);
        } else {
          toast.error(error?.response?.data?.message);
        }
      }
    }
  };

  return (
    <div className="flex justify-center items-center mt-10 w-full">
      <form onSubmit={handleSubmit} className="relative w-full md:w-[500px]">
        <input
          className="w-full md:w-[500px] h-12 rounded-md bg-muted border border-slate-400 border-dashed p-3 outline-none"
          type="url"
          placeholder="Enter URL Of The Video You Want To Summarize..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />
        <div className=" absolute right-3 top-3">
          <Loading />
        </div>
      </form>
    </div>
  );
}
