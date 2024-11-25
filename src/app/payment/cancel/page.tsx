import { clearCache } from "@/actions/commonActions";
import notFound from "@/app/not-found";
import prisma from "@/lib/db.config";
import Image from "next/image";

async function SuccessTxn({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {}
