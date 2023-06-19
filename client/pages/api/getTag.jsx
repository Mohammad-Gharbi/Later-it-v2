import Cors from "cors"
import { PrismaClient } from "@prisma/client"
import { getSession } from "@auth0/nextjs-auth0"

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

  const session = await getSession(req, res)
  if (session) {
    const result = await prisma.tag.findMany({
      where: { userId: session.user.email },
    })
    res.status(200).json(result)
  }
}
