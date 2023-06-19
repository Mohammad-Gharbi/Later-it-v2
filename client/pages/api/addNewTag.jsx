import Cors from "cors"
import prisma from "../../prisma/prisma"
import { getSession } from "@auth0/nextjs-auth0"

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

export default async function addNewTag(req, res) {
  await runMiddleware(req, res, cors)
  const session = await getSession(req, res)
  if (session) {
    const { tagName } = req.body

    const result = await prisma.tag.create({
      data: {
        tagName: tagName,
        userId: session.user.email,
      },
    })

    res.status(200).json(result)
  }
}
