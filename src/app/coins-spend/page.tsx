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
  return <div></div>;
}
