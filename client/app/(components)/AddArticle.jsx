"use client"

import { useAddArticleMutation } from "@/redux/slices/apiSlice"
import { useRef } from "react"
import { Button, useDisclosure } from "@chakra-ui/react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"

export default function AddArticle() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const articleURL = useRef()
  const [addArticle] = useAddArticleMutation()

  return (
    <>
      <div onClick={onOpen}>
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

      <Modal isOpen={isOpen} onClose={onClose}>
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
      </Modal>
    </>
  )
}
