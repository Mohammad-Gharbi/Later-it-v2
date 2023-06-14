"use client"

import { useAddNewTagMutation, useGetTagQuery } from "@/redux/slices/apiSlice"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import { Button } from "@chakra-ui/react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { setSection, setCurrentTag } from "@/redux/slices/appSlice"

export function AddTag() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const state = useSelector((state) => state.section)
  const dispatch = useDispatch()

  const router = useRouter()

  const { data: tags, isLoading, isSuccess } = useGetTagQuery()
  const [addNewTag, { addTagLoading, addTagSuccess }] = useAddNewTagMutation()

  const tagName = useRef()

  let listTags

  if (isLoading) {
    listTags = <div className="text-white">Loading</div>
  } else if (isSuccess) {
    listTags = (
      <div className="flex flex-col items-center">
        {tags.map((tag) => (
          <button
            onClick={() => {
              dispatch(setSection("Tag"))
              dispatch(
                setCurrentTag({ currentTag: tag.tagName, currentTagId: tag.id })
              )
            }}
            className=" mt-5 h-fit w-16 rounded-sm bg-slate-600 py-1 text-center text-xs font-bold text-white "
          >
            {tag.tagName}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div>
      {listTags}
      <div onClick={onOpen}>
        <button className=" mt-5 text-xs font-bold text-white ">
          Add a Tag
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Tag</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <fieldset className="flex flex-col items-center gap-5">
              <input
                className="inline-flex h-10 w-full flex-1 items-center justify-center rounded p-2 px-2.5 text-[13px] leading-none text-black shadow-[0_0_0_1px] shadow-slate-400 outline-none placeholder:text-slate-400 focus:shadow-[0_0_0_2px] focus:shadow-slate-600"
                id="URL"
                placeholder="Enter Tag Name"
                ref={tagName}
              />
            </fieldset>
          </ModalBody>
          <ModalFooter>
            {addTagLoading ? (
              <Button colorScheme="purple" disabled onClick={onClose}>
                Add
              </Button>
            ) : (
              <Button
                colorScheme="purple"
                onClick={async () => {
                  if (tagName.current.value) {
                    await addNewTag({
                      tagName: tagName?.current?.value,
                    })
                  }
                  onClose()
                }}
              >
                Add
              </Button>
            )}
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
