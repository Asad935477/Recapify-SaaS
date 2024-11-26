import { clearCache } from "@/actions/commonActions";
import notFound from "@/app/not-found";
import prisma from "@/lib/db.config";
import Image from "next/image";

async function CancelTxn({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const transaction = await prisma.transactions.findUnique({
    where: { id: searchParams?.["txnId"], status: 2 },
  });
  if (!transaction) {
    return notFound();
  }
  await prisma.transactions.update({
    data: { status: 0 },
    where: { id: searchParams?.["txnId"] },
  });
  clearCache("transactions");
  return (
    <div className="h-screen flex justify-center items-center flex-col">
      {" "}
      <Image
        src="/images/cancel.png"
        width={512}
        height={512}
        alt="success"
      />{" "}
      <h1 className="text-3xl font-bold text-green-400">
        {" "}
        Payment Cancelled By The User!{" "}
      </h1>{" "}
    </div>
  );
}
export default CancelTxn;
