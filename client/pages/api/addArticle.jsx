import Cors from "cors"
import Parser from "@postlight/parser"
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

export default async function addArticle(req, res) {
  await runMiddleware(req, res, cors)
  const session = await getSession(req, res)
  if (session) {
    const { articleURL } = req.body

    const article = await Parser.parse(articleURL)

    const result = await prisma.article.create({
      data: {
        title: article.title,
        content: article.content,
        author: article.author,
        date_published: article.date_published,
        lead_image_url: article.lead_image_url,
        dek: article.dek,
        denext_page_url: article.denext_page_url,
        url: article.url,
        domain: article.domain,
        excerpt: article.excerpt,
        word_count: article.word_count,
        direction: article.direction,
        total_pages: article.total_pages,
        rendered_pages: article.rendered_pages,
        tag: "",
        userId: session.user.email,
      },
    })

    res.status(200).json(result)
  }
}
