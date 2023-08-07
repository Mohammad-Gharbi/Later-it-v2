"use client"

import { useAddNewTagMutation, useGetTagQuery } from "@/redux/slices/apiSlice"
import { useRef } from "react"
import { useDispatch } from "react-redux"
import { setSection, setCurrentTag } from "@/redux/slices/appSlice"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"

export function AddTag() {
  const dispatch = useDispatch()

  const { data: tags, isLoading, isSuccess } = useGetTagQuery()
  const [addNewTag] = useAddNewTagMutation()

  const tagName = useRef()

  let listTags

  if (isLoading) {
    listTags = <div className="text-white">Loading</div>
  } else if (isSuccess) {
    listTags = (
      <div className="flex flex-col items-center">
        {tags.map((tag) => (
          <Badge
            key={tag.id}
            onClick={() => {
              dispatch(setSection("Tag"))
              dispatch(
                setCurrentTag({ currentTag: tag.tagName, currentTagId: tag.id })
              )
            }}
          >
            {tag.tagName}
          </Badge>
        ))}
      </div>
    )
  }

  return (
    <div className="hidden flex-col items-center gap-2 md:flex">
      {listTags}

      <Dialog>
        <DialogTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="outline">Add a Tag</Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add Tag</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Tag</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-5">
            <Input id="URL" placeholder="Enter Tag Name" ref={tagName} />
          </div>
          <DialogFooter>
            <Button
              onClick={async () => {
                if (tagName.current.value) {
                  await addNewTag({
                    tagName: tagName?.current?.value,
                  })
                }
              }}
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
