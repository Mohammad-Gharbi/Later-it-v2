"use client"

import { useRouter } from "next/navigation"
import { DropDownMenu } from "./DropDownMenu"
import Image from "next/image"
import Link from "next/link"

export function ArticlePreview({ article }) {
  return (
    <div className="relative h-32 w-[95%]">
      <DropDownMenu
        position={"absolute"}
        articleId={article.id}
        articleURL={article.url}
        articleStatus={article.status}
        articleTag={article.tag}
      />

      <Link
        href={`/article/${article.id}`}
        className="flex h-32 cursor-pointer flex-row items-center rounded-lg bg-[#282828] p-4 transition-all ease-in-out hover:bg-[#414141] md:w-full"
      >
        <div className="mr-10 h-24 w-32 rounded-md bg-black">
          <Image
            width="100"
            height="100"
            alt="Article Lead"
            className="h-24 w-32 rounded-md object-cover"
            src={article.lead_image_url}
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full flex-row items-center justify-between">
            <div className="text-lg font-bold text-white md:text-3xl">
              {article.title}
            </div>
          </div>
          <div className="hidden text-xs font-medium text-[#C0C0C0] md:block md:text-sm ">
            {article.excerpt}
          </div>
          <div className="hidden w-full flex-row items-center justify-between text-xs font-medium text-[#8B8B8B] md:flex md:text-sm">
            <div>
              {`${article.domain} ${
                article.author ? `• ${article.domain}` : ""
              } • ${Math.round(article.word_count / 200)}mins `}
            </div>
            {article.tags?.map((tag) => (
              <button
                key={tag.id}
                className=" h-fit w-16 rounded-md bg-slate-600 py-1 text-center text-xs font-bold text-white "
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </Link>
    </div>
  )
}
