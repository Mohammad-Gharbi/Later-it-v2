"use client"

import { AddTag } from "./AddTag"
import AddArticle from "./AddArticle"
import { useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useDispatch, useSelector } from "react-redux"
import { setSection } from "@/redux/slices/appSlice"
import Image from "next/image"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

export function SideBar() {
  const { user, error, isLoading } = useUser()
  const router = useRouter()

  const state = useSelector((state) => state.section)
  const dispatch = useDispatch()

  const onKeyDown = useCallback((event) => {
    if (event.key === "i") {
      dispatch(setSection("Inbox"))
    } else if (event.key === "l") {
      dispatch(setSection("Later"))
    } else if (event.key === "a") {
      dispatch(setSection("Archive"))
    }
  }, [])

  // function onKeyDown(event) {
  //   if (event.key === "i") {
  //     dispatch(setSection("Inbox"))
  //   } else if (event.key === "l") {
  //     dispatch(setSection("Later"))
  //   } else if (event.key === "a") {
  //     dispatch(setSection("Archive"))
  //   }
  // }

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/")
    }
  }, [user, isLoading, router, onKeyDown])

  return (
    <div className="col-span-full row-span-1 row-start-5 md:col-span-1 md:row-span-6 md:block md:h-screen md:py-2">
      <div className="fixed bottom-0 flex w-full flex-row rounded-xl bg-black py-8 md:top-0 md:h-full md:w-24 md:flex-col md:items-center md:justify-between">
        <div className="flex w-full flex-row items-center justify-center md:flex-col">
          <div className="mb-10 mt-[0.3rem] hidden md:block">
            <svg
              width="57"
              height="15"
              viewBox="0 0 57 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.0745739 14V1.63636H2.68857V11.8448H7.98899V14H0.0745739ZM12.316 14.1751C11.7243 14.1751 11.1971 14.0724 10.7343 13.8672C10.2715 13.6579 9.90521 13.35 9.63556 12.9435C9.36994 12.533 9.23713 12.0219 9.23713 11.4102C9.23713 10.895 9.33171 10.4624 9.52086 10.1122C9.71002 9.76207 9.9676 9.48035 10.2936 9.26705C10.6196 9.05374 10.9898 8.89276 11.4044 8.78409C11.8229 8.67543 12.2616 8.59896 12.7204 8.55469C13.2597 8.49834 13.6944 8.44602 14.0244 8.39773C14.3544 8.34541 14.5939 8.26894 14.7428 8.16832C14.8917 8.06771 14.9662 7.9188 14.9662 7.72159V7.68537C14.9662 7.30303 14.8454 7.00722 14.604 6.79794C14.3665 6.58866 14.0284 6.48402 13.5898 6.48402C13.1269 6.48402 12.7587 6.58665 12.485 6.7919C12.2113 6.99313 12.0302 7.24669 11.9417 7.55256L9.56312 7.35938C9.68386 6.79593 9.92131 6.30895 10.2755 5.89844C10.6296 5.4839 11.0864 5.16596 11.6459 4.9446C12.2093 4.71922 12.8613 4.60653 13.6018 4.60653C14.117 4.60653 14.61 4.6669 15.0809 4.78764C15.5558 4.90838 15.9764 5.09553 16.3426 5.34908C16.7129 5.60263 17.0046 5.92862 17.218 6.32706C17.4313 6.72147 17.5379 7.19437 17.5379 7.74574V14H15.099V12.7141H15.0265C14.8776 13.0039 14.6784 13.2595 14.4289 13.4808C14.1794 13.6982 13.8795 13.8692 13.5294 13.994C13.1792 14.1147 12.7748 14.1751 12.316 14.1751ZM13.0525 12.4002C13.4308 12.4002 13.7648 12.3258 14.0546 12.1768C14.3444 12.0239 14.5718 11.8187 14.7368 11.5611C14.9018 11.3035 14.9843 11.0117 14.9843 10.6857V9.7017C14.9038 9.75402 14.7931 9.80232 14.6523 9.84659C14.5154 9.88684 14.3605 9.92507 14.1874 9.96129C14.0144 9.99349 13.8413 10.0237 13.6682 10.0518C13.4952 10.076 13.3382 10.0981 13.1974 10.1183C12.8955 10.1625 12.6319 10.233 12.4065 10.3295C12.1811 10.4261 12.0061 10.5569 11.8813 10.7219C11.7565 10.8829 11.6942 11.0842 11.6942 11.3256C11.6942 11.6758 11.8209 11.9434 12.0745 12.1286C12.3321 12.3097 12.6581 12.4002 13.0525 12.4002ZM24.4653 4.72727V6.65909H18.8811V4.72727H24.4653ZM20.1489 2.50568H22.7206V11.1506C22.7206 11.388 22.7568 11.5732 22.8293 11.706C22.9017 11.8348 23.0023 11.9253 23.1311 11.9776C23.2639 12.0299 23.4169 12.0561 23.5899 12.0561C23.7107 12.0561 23.8314 12.046 23.9521 12.0259C24.0729 12.0018 24.1655 11.9837 24.2298 11.9716L24.6343 13.8853C24.5055 13.9255 24.3244 13.9718 24.091 14.0241C23.8576 14.0805 23.5738 14.1147 23.2398 14.1268C22.62 14.1509 22.0767 14.0684 21.6098 13.8793C21.147 13.6901 20.7868 13.3963 20.5292 12.9979C20.2716 12.5994 20.1449 12.0964 20.1489 11.4886V2.50568ZM30.2668 14.1811C29.3129 14.1811 28.4919 13.9879 27.8037 13.6016C27.1195 13.2112 26.5923 12.6598 26.222 11.9474C25.8518 11.2311 25.6666 10.3839 25.6666 9.40589C25.6666 8.45206 25.8518 7.61494 26.222 6.89453C26.5923 6.17412 27.1135 5.61269 27.7856 5.21023C28.4617 4.80776 29.2546 4.60653 30.1642 4.60653C30.7759 4.60653 31.3454 4.70514 31.8726 4.90234C32.4039 5.09553 32.8667 5.38731 33.2611 5.7777C33.6595 6.16809 33.9694 6.65909 34.1908 7.25071C34.4121 7.8383 34.5228 8.52651 34.5228 9.31534V10.0217H26.6929V8.42791H32.102C32.102 8.05765 32.0215 7.72964 31.8605 7.44389C31.6995 7.15814 31.4762 6.93478 31.1904 6.77379C30.9087 6.60878 30.5807 6.52628 30.2064 6.52628C29.816 6.52628 29.4699 6.61683 29.1681 6.79794C28.8702 6.97502 28.6368 7.21449 28.4678 7.51633C28.2987 7.81416 28.2122 8.14619 28.2082 8.51243V10.0277C28.2082 10.4865 28.2927 10.8829 28.4617 11.217C28.6348 11.551 28.8783 11.8086 29.1922 11.9897C29.5061 12.1708 29.8784 12.2614 30.309 12.2614C30.5948 12.2614 30.8564 12.2211 31.0938 12.1406C31.3313 12.0601 31.5345 11.9394 31.7036 11.7784C31.8726 11.6174 32.0014 11.4202 32.0899 11.1868L34.4685 11.3438C34.3477 11.9152 34.1002 12.4143 33.7259 12.8409C33.3557 13.2635 32.8767 13.5935 32.2892 13.831C31.7056 14.0644 31.0315 14.1811 30.2668 14.1811ZM36.2011 14V4.72727H38.6943V6.34517H38.7909C38.96 5.76965 39.2437 5.33499 39.6421 5.04119C40.0406 4.74337 40.4994 4.59446 41.0186 4.59446C41.1473 4.59446 41.2862 4.60251 41.4351 4.61861C41.584 4.63471 41.7148 4.65684 41.8275 4.68501V6.96697C41.7068 6.93075 41.5397 6.89856 41.3264 6.87038C41.1131 6.84221 40.9179 6.82812 40.7409 6.82812C40.3625 6.82812 40.0245 6.91063 39.7267 7.07564C39.4329 7.23662 39.1994 7.462 39.0264 7.75178C38.8573 8.04155 38.7728 8.37559 38.7728 8.75391V14H36.2011Z"
                fill="white"
              />
              <path
                d="M47.0917 14V4.72727H49.6634V14H47.0917ZM48.3836 3.53196C48.0013 3.53196 47.6733 3.40518 47.3996 3.15163C47.1299 2.89406 46.9951 2.58617 46.9951 2.22798C46.9951 1.87382 47.1299 1.56996 47.3996 1.31641C47.6733 1.05883 48.0013 0.930042 48.3836 0.930042C48.766 0.930042 49.0919 1.05883 49.3616 1.31641C49.6353 1.56996 49.7721 1.87382 49.7721 2.22798C49.7721 2.58617 49.6353 2.89406 49.3616 3.15163C49.0919 3.40518 48.766 3.53196 48.3836 3.53196ZM56.6557 4.72727V6.65909H51.0716V4.72727H56.6557ZM52.3393 2.50568H54.911V11.1506C54.911 11.388 54.9473 11.5732 55.0197 11.706C55.0922 11.8348 55.1928 11.9253 55.3216 11.9776C55.4544 12.0299 55.6073 12.0561 55.7804 12.0561C55.9011 12.0561 56.0218 12.046 56.1426 12.0259C56.2633 12.0018 56.3559 11.9837 56.4203 11.9716L56.8248 13.8853C56.696 13.9255 56.5149 13.9718 56.2814 14.0241C56.048 14.0805 55.7643 14.1147 55.4302 14.1268C54.8104 14.1509 54.2671 14.0684 53.8002 13.8793C53.3374 13.6901 52.9772 13.3963 52.7196 12.9979C52.4621 12.5994 52.3353 12.0964 52.3393 11.4886V2.50568Z"
                fill="#7E2EFF"
              />
            </svg>
          </div>

          <div className="mb-10 mt-10 flex h-fit flex-row items-center justify-between gap-2 md:flex-col">
            {/* Inbox */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      dispatch(setSection("Inbox"))
                    }}
                  >
                    <svg
                      width="28"
                      height="26"
                      viewBox="0 0 28 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_d_103_12)">
                        <path
                          d="M22.3333 10H17.3333L15.6667 12.5H12.3333L10.6667 10H5.66667"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8.54167 4.25837L5.66667 10V15C5.66667 15.4421 5.84226 15.866 6.15482 16.1785C6.46738 16.4911 6.8913 16.6667 7.33333 16.6667H20.6667C21.1087 16.6667 21.5326 16.4911 21.8452 16.1785C22.1577 15.866 22.3333 15.4421 22.3333 15V10L19.4583 4.25837C19.3203 3.9807 19.1076 3.74702 18.8441 3.58361C18.5806 3.4202 18.2767 3.33354 17.9667 3.33337H10.0333C9.72326 3.33354 9.41939 3.4202 9.15587 3.58361C8.89235 3.74702 8.67965 3.9807 8.54167 4.25837Z"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_103_12"
                          x="0"
                          y="0"
                          width="28"
                          height="28"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="2" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_103_12"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_103_12"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Inbox</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* Later */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      dispatch(setSection("Later"))
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.16667 18.3334H15.8333"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.16667 1.66663H15.8333"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.1667 18.3333V14.8567C14.1666 14.4147 13.9909 13.9908 13.6783 13.6783L10 10L6.32167 13.6783C6.00908 13.9908 5.83343 14.4147 5.83333 14.8567V18.3333"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5.83333 1.66663V5.14329C5.83343 5.58528 6.00908 6.00914 6.32167 6.32162L10 9.99996L13.6783 6.32162C13.9909 6.00914 14.1666 5.58528 14.1667 5.14329V1.66663"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Later</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* Archive */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      dispatch(setSection("Archive"))
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.6667 3.33337H3.33333C2.41286 3.33337 1.66667 4.07957 1.66667 5.00004V5.83337C1.66667 6.75385 2.41286 7.50004 3.33333 7.50004H16.6667C17.5871 7.50004 18.3333 6.75385 18.3333 5.83337V5.00004C18.3333 4.07957 17.5871 3.33337 16.6667 3.33337Z"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M3.33333 7.5V15C3.33333 15.442 3.50893 15.866 3.82149 16.1785C4.13405 16.4911 4.55797 16.6667 5 16.6667H15C15.442 16.6667 15.8659 16.4911 16.1785 16.1785C16.4911 15.866 16.6667 15.442 16.6667 15V7.5"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.33333 10.8334H11.6667"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Archive</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <AddTag tagName="Learning" />
        </div>

        <div className="flex flex-col items-center">
          <AddArticle />
          {/* Profile */}
          <a href="/api/auth/logout" className="hidden md:block">
            {user ? (
              <Image
                width="100"
                height="100"
                className="mt-2 h-11 w-11 rounded-full"
                src={user.picture}
                alt="Profile Picture"
              />
            ) : (
              ""
            )}
          </a>
        </div>
      </div>
    </div>
  )
}
