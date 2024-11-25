import { addCoins, clearCache } from "@/actions/commonActions";
import notFound from "@/app/not-found";
import prisma from "@/lib/db.config";
import { getCoinsFromAmount } from "@/lib/utils";
import Image from "next/image";

async function SuccessTxn({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const transaction = await prisma.transactions.findUnique({
    where: {
      id: searchParams?.["txnId"],
      status: 2,
    },
  });
  if (!transaction) {
    return notFound();
  }
  await prisma.transaction.update({
    data: {
      status: 1,
    },
    where: {
      id: searchParams?.["txnId"],
    },
  });

  //*UPDATE COINS
  await addCoins(transaction.user_id, getCoinsFromAmount(transaction.amount));
  clearCache("userCoins");
  clearCache("transactions");

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <Image src="/images/check.png" width={512} height={512} alt="success" />
      <h1 className="text-3xl font-bold text-green-400">
        Payment Processed Successfully
      </h1>
    </div>
  );
}
