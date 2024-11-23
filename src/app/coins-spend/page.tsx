import React from "react";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import {
  getCoinsSpend,
  getTransactions,
  getUserCoins,
} from "@/actions/fetchActions";
import DashNav from "@/components/dashboard/DashNav";
import Link from "next/link";

export default async function CoinsSpend() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const userCoins = await getUserCoins(session?.user?.id!);
  const coinsSpends = await getCoinsSpend(session?.user?.id!);
  return <div></div>;
}
