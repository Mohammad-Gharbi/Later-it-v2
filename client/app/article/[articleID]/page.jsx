import { Article } from "../../(components)/Article"
import { ArticleOptions } from "../../(components)/ArticleOptions"

export default function ArticlePage({ params }) {
  return (
    <div className="flex flex-col items-center px-96 py-32">
      <ArticleOptions articleID={params.articleID} />
      <Article articleID={params.articleID} />
    </div>
  )
}
