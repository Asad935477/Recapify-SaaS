"use client";

import React, { Suspense, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { useRouter } from "next/navigation";
import { UserAvatar } from "./UserAvatar";
import dynamic from "next/dynamic";

const LogoutModal = dynamic(() => import("../auth/LogoutModal"));

export function ProfileDropdown({ user }: { user: CustomUser | null }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Suspense>
        <LogoutModal open={open} setOpen={setOpen} />
      </Suspense>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar image={user?.image ?? undefined} name={user?.name!} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/transactions")}>
            Transactions
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/coins-spend")}>
            Coins Spend
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
