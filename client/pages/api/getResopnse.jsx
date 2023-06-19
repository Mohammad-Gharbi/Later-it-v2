import Cors from "cors"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
})

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function getTag(req, res) {
  await runMiddleware(req, res, cors)
  const result = await prisma.article.findMany({
    where: { userId: "mohammed.gharbi.dev@gmail.com" },
  })

  res.status(200).json(result)
}
