import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  const { eventId, count } = await req.json();

  if (!eventId) {
    return Response.json("Not founded eventId", {
      status: 400,
    });
  }

  if (!count) {
    return Response.json("Not founded count", {
      status: 400,
    });
  }

  try {
    const lotteryUsers = await prisma.user.findMany({
      where: {
        evnetId: Number(eventId),
      },
    });
    const lotteryWinners = lotteryUsers
      .sort(() => Math.random() - Math.random())
      .slice(0, count);
    return Response.json({ lotteryWinners }, { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return Response.json("イベントが存在しません", { status: 400 });
      } else {
        return Response.json(error.message, {
          status: 400,
        });
      }
    } else {
      return Response.json("Internal Server Error", {
        status: 500,
      });
    }
  } finally {
    await prisma.$disconnect();
  }
}
