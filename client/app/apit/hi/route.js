import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request) {
  const result = await prisma.article.findMany({
    where: { userId: "mohammed.gharbi.dev@gmail.com" },
  })

  return NextResponse.json(result)
}
