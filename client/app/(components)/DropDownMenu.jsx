"use client"

import {
  useDeleteArticleMutation,
  useGetTagQuery,
  useRemoveTagArticleMutation,
  useTagArticleMutation,
  useUpdateStatusMutation,
} from "@/redux/slices/apiSlice"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react"

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
              <MenuItem
                onClick={async () =>
                  await removeTagArticle({ articleId, tag: tag.tagName })
                }
              >
                Remove From "{tag.tagName}"
              </MenuItem>
            ) : (
              <MenuItem
                onClick={async () =>
                  await tagArticle({ articleId, tag: tag.tagName })
                }
              >
                Add To "{tag.tagName}"
              </MenuItem>
            )}
          </>
        ))}
      </div>
    )
  }

  return (
    <div className={`${position} right-10  top-0 mt-4`}>
      <Menu>
        <MenuButton>
          <button className="h-5 w-5 text-white ">
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
          </button>
        </MenuButton>
        <MenuList>
          <MenuItem>
            {articleStatus === "Later" ? (
              <button
                onClick={async () =>
                  updateStatus({ articleId, status: "Inbox" })
                }
              >
                Move To Inbox
              </button>
            ) : (
              <button
                onClick={async () =>
                  updateStatus({ articleId, status: "Later" })
                }
              >
                Read Later
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {articleStatus === "Archive" ? (
              <button
                onClick={async () =>
                  updateStatus({ articleId, status: "Inbox" })
                }
              >
                Move To Inbox
              </button>
            ) : (
              <button
                onClick={async () =>
                  updateStatus({ articleId, status: "Archive" })
                }
              >
                Archive
              </button>
            )}
          </MenuItem>
          {listTags}
          <MenuItem>
            <a href={articleURL} target={"_blank"}>
              Open Original
            </a>
          </MenuItem>
          <MenuItem>
            <button
              onClick={() => {
                navigator.clipboard.writeText(articleURL)
              }}
            >
              Copy Source URL
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={async () => await deleteArticle({ articleId })}
              className="text-[#FF6363]"
            >
              Delete
            </button>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  )
}
