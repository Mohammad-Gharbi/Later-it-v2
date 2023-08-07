"use client"

import {
  useDeleteArticleMutation,
  useGetTagQuery,
  useRemoveTagArticleMutation,
  useTagArticleMutation,
  useUpdateStatusMutation,
} from "@/redux/slices/apiSlice"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropDownMenu({
  position,
  articleId,
  articleURL,
  articleStatus,
  articleTag,
}) {
  const { data: tags, isLoadingTags, isSuccess } = useGetTagQuery()
  const [tagArticle] = useTagArticleMutation()

  const [deleteArticle, { isLoading }] = useDeleteArticleMutation()
  const [updateStatus] = useUpdateStatusMutation()
  const [removeTagArticle] = useRemoveTagArticleMutation()

  let listTags

  if (isLoadingTags) {
    listTags = <div className="text-white">Loading</div>
  } else if (isSuccess) {
    listTags = (
      <div className="flex flex-col items-start">
        {tags.map((tag) => (
          <>
            {articleTag === tag.tagName ? (
              <DropdownMenuItem
                className="w-full"
                key={tag.id}
                onClick={async () =>
                  await removeTagArticle({ articleId, tag: tag.tagName })
                }
              >
                Remove From {tag.tagName}
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                className="w-full"
                key={tag.id}
                onClick={async () =>
                  await tagArticle({ articleId, tag: tag.tagName })
                }
              >
                Add To {tag.tagName}
              </DropdownMenuItem>
            )}
          </>
        ))}
      </div>
    )
  }

  return (
    <div className={`${position} right-10  top-0 mt-4`}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-more-horizontal"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {articleStatus === "Later" ? (
            <DropdownMenuItem
              onClick={async () => updateStatus({ articleId, status: "Inbox" })}
            >
              Move To Inbox
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={async () => updateStatus({ articleId, status: "Later" })}
            >
              Read Later
            </DropdownMenuItem>
          )}
          {articleStatus === "Archive" ? (
            <DropdownMenuItem
              onClick={async () => updateStatus({ articleId, status: "Inbox" })}
            >
              Move To Inbox
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={async () =>
                updateStatus({ articleId, status: "Archive" })
              }
            >
              Archive
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />

          {listTags}
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <a href={articleURL} target={"_blank"}>
              Open Original
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(articleURL)
            }}
          >
            Copy Source URL
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => await deleteArticle({ articleId })}
            className="text-[#FF6363]"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
