"use client"

import { useGetArticlesQuery } from "@/redux/slices/apiSlice"
import parse from "html-react-parser"
import "../article/[articleID]/article.css"

export function Article({ articleID }) {
  const {
    data: articles,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetArticlesQuery()

  let content

  if (isLoading) {
    content = <div className="animate-pulse text-white">Loading</div>
  } else if (isSuccess) {
    const thisArticle = articles.filter((article) => article.id === articleID)

    content = thisArticle.map((instance) => {
      return (
        <div
          key={instance.id}
          className="flex h-fit w-full flex-col items-center"
        >
          <div className="mb-6 text-center text-4xl font-bold text-white">
            {instance.title}
          </div>
          <div className="mb-12 flex flex-row items-center justify-between text-sm font-medium text-[#8B8B8B]">
            {`${instance.domain} • ${instance.author} • ${Math.round(
              instance.word_count / 200
            )}mins `}
          </div>
          <div className="mb-20 h-72 w-96 rounded-xl bg-black">
            <img
              className="h-72 w-96 rounded-xl object-cover"
              src={instance.lead_image_url}
            />
          </div>
          <div className="content text-[#C0C0C0]">
            {parse(instance.content)}
          </div>
        </div>
      )
    })
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return <>{content}</>
}
