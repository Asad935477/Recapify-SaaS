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
