import prisma from "@/lib/db.config";

export async function minusCoins(user_id: number | string): Promise<void> {
  await prisma.user.update({
    where: {
      id: Number(user_id),
    },
    data: {
      coins: {
        decrement: 10,
      },
    },
  });
}

export async function addCoins(
  user_id: number | string,
  coins: number
): Promise<void> {
  await prisma.user.update({
    where: { id: Number(user_id) },
    data: { coins: { increment: coins } },
  });
}

export async function coinSpend(
  user_id: number | string,
  summary_id: string
): Promise<void> {
  await prisma.coinSpend.create({
    data: { user_id: Number(user_id), summary_id: summary_id },
  });
}
