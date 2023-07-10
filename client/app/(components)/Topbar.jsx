"use client"

import { useDispatch, useSelector } from "react-redux"
import { Search } from "./Search"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react"
import { useDeleteTagMutation } from "@/redux/slices/apiSlice"
import { setSection } from "@/redux/slices/appSlice"

export function TopBar() {
  const state = useSelector((state) => state.app)
  const dispatch = useDispatch()

  const [deleteTag, { isLoadingDelete, isSuccessDelete, isErrorDelete }] =
    useDeleteTagMutation()

  return (
    <div className="col-span-full col-start-1 row-span-1 hidden md:col-start-2 md:block ">
      <div className="fixed right-0 top-0 z-10 flex w-full flex-row items-center justify-between bg-black p-6 backdrop-blur-xl">
        <div className="w-40 text-2xl font-bold text-white">
          {state.section === "Tag" ? state.currentTag : state.section}
        </div>
        <Search />
        {state.section === "Tag" ? (
          <div className="mr-2">
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
                  <button
                    onClick={async () => {
                      await deleteTag({ tagId: state.currentTagId })
                      dispatch(setSection("Inbox"))
                    }}
                    className="text-[#FF6363]"
                  >
                    Delete This Tag
                  </button>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        ) : (
          <div className="mr-2 h-5 w-5"></div>
        )}
      </div>
    </div>
  )
}
