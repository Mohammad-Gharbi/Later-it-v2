import { SideBar } from "../(components)/SideBar"
import { TopBar } from "../(components)/Topbar"
import Providers from "../(components)/Providers"

export default function Layout({ children }) {
  return (
    <Providers>
      <div className="relative grid h-screen grid-cols-12 grid-rows-6 rounded-xl bg-black">
        <SideBar />
        <TopBar />
        <div className="col-span-full col-start-2 row-start-2 row-end-6 px-14">
          {children}
        </div>
      </div>
    </Providers>
  )
}
