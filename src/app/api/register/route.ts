import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  const { eventId, walletAddress, nickname } = await req.json();

  if (!eventId) {
    return Response.json("Not founded eventId", {
      status: 400,
    });
  }

  if (!walletAddress) {
    return Response.json("Not founded walletAddress", {
      status: 400,
    });
  }

  if (!nickname) {
    return Response.json("Not founded nickname", {
      status: 400,
    });
  }

  try {
    const user = await prisma.user.create({
      data: {
        evnetId: Number(eventId),
        walletAddress: walletAddress,
        nickname: nickname,
      },
    });
    return Response.json({ user }, { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return Response.json("登録済みです", {
          status: 400,
        });
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
