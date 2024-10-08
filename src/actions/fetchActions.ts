import { prisma } from "@/lib/db.config";

export const getUserCoins = async (user_id: number | string) => {
  const coins = await prisma.user.findUnique({
    select: {
      coins: true,
    },
    where: {
      id: Number(user_id),
    },
  });

  return coins;
};
