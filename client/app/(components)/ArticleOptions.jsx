"use client"

import { useGetArticlesQuery } from "@/redux/slices/apiSlice"
import { DropDownMenu } from "../(components)/DropDownMenu"
import { useEffect } from "react"

export function ArticleOptions({ articleID }) {
  const {
    data: articles,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetArticlesQuery()

  function onKeyDown(event) {
    if (event.key === "b") {
      history.back()
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  let article

  if (isLoading) {
  } else if (isSuccess) {
    article = articles.filter((instance) => instance.id === articleID)
  }
  return (
    <div className="mb-32 flex h-10 w-80 flex-row items-center justify-between rounded-xl bg-[#282828] px-5 text-white transition-all ease-in-out hover:bg-[#3e3e3e]">
      <div className="flex h-5 w-5 flex-row items-center justify-center">
        <button onClick={() => history.back()}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12H5"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 19L5 12L12 5"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="mb-2 flex h-5 w-5 flex-row items-center justify-center">
        {article ? (
          <DropDownMenu
            position={""}
            articleId={article[0]?.id}
            articleURL={article[0]?.url}
            articleStatus={article[0]?.status}
            articleTag={article[0]?.tag}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  )
}
