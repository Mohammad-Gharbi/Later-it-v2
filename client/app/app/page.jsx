"use client"

import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { ArticlePreview } from "../(components)/ArticlePreview"
import { useGetArticlesQuery } from "../../redux/slices/apiSlice"
import { useToast } from "@chakra-ui/react"

export default function Inbox() {
  const toast = useToast()
  const state = useSelector((state) => state.app)

  const {
    data: articles,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetArticlesQuery()

  const [content, setContent] = useState()

  useEffect(() => {
    if (state.section === "Tag") {
      if (isLoading) {
        toast({
          title: "Loading...",
          status: "info",
          isClosable: true,
        })
      } else if (isSuccess) {
        setContent(
          articles
            ?.filter((article) => article.tag === state.currentTag)
            .map((article) => <ArticlePreview article={article} />)
        )
      } else if (isError) {
        toast({
          title: "Reload Page Please.",
          status: "error",
          isClosable: true,
        })
      }
    } else if (state.section === "Search") {
      if (isLoading) {
        toast({
          title: "Loading...",
          status: "info",
          isClosable: true,
        })
      } else if (isSuccess) {
        setContent(
          articles
            ?.filter((article) =>
              article.title
                .toLowerCase()
                .includes(state.searchQuery.toLowerCase())
            )
            .map((article) => (
              <ArticlePreview key={article.id} article={article} />
            ))
        )
      } else if (isError) {
        toast({
          title: "Reload Page Please.",
          status: "error",
          isClosable: true,
        })
      }
    } else {
      if (isLoading) {
        toast({
          title: "Loading...",
          status: "info",
          isClosable: true,
        })
      } else if (isSuccess) {
        setContent(
          articles
            ?.filter((article) => article.status == state.section)
            .map((article) => <ArticlePreview article={article} />)
        )
      } else if (isError) {
        toast({
          title: "Reload Page Please.",
          status: "error",
          isClosable: true,
        })
      }
    }
  }, [state, isLoading, isSuccess, isError])

  return (
    <div className="itemes-center relative flex h-screen w-full flex-col gap-5">
      {content}
    </div>
  )
}
