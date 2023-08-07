"use client"

import { useRouter } from "next/navigation"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSearchQuery, setSection } from "@/redux/slices/appSlice"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Search() {
  const searchQuery = useRef()

  const dispatch = useDispatch()

  function onSearch(e) {
    e.preventDefault()
    dispatch(setSection("Search"))
    dispatch(setSearchQuery(searchQuery.current.value))
  }
  return (
    <form
      onSubmit={onSearch}
      className="flex flex-row items-center justify-start gap-2"
    >
      <Input ref={searchQuery} type="text" placeholder="Search..."></Input>
      <Button variant="outline" type="submit">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M17.5 17.5L13.875 13.875"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Button>
    </form>
  )
}
