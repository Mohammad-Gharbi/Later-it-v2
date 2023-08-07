"use client"

import { useAddArticleMutation } from "@/redux/slices/apiSlice"
import { useRef } from "react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AddArticle() {
  const articleURL = useRef()
  const [addArticle] = useAddArticleMutation()

  return (
    <div className="hidden md:block">
      <Dialog>
        <DialogTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div>
                  <svg
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5 6.04163V22.9583"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.04167 14.5H22.9583"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add Article</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Article</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2.5">
            <fieldset className="flex flex-col items-center gap-5">
              <Input ref={articleURL} id="URL" placeholder="Article URL" />
            </fieldset>
          </div>
          <DialogFooter>
            <Button
              onClick={async () => {
                if (articleURL.current.value) {
                  await addArticle({
                    articleURL: articleURL?.current?.value,
                  })
                }
              }}
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Article</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col gap-2.5">
              <fieldset className="flex flex-col items-center gap-5">
                <input
                  className="inline-flex h-10 w-full flex-1 items-center justify-center rounded p-2 px-2.5 text-[13px] leading-none text-black shadow-[0_0_0_1px] shadow-slate-400 outline-none placeholder:text-slate-400 focus:shadow-[0_0_0_2px] focus:shadow-slate-600"
                  id="URL"
                  placeholder="Enter Article URL"
                  ref={articleURL}
                />
              </fieldset>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={async () => {
                if (articleURL.current.value) {
                  await addArticle({
                    articleURL: articleURL?.current?.value,
                  })
                  onClose()
                }
              }}
              colorScheme="purple"
            >
              Add
            </Button>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </div>
  )
}
