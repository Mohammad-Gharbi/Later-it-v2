import { SideBar } from "../(components)/SideBar"
import { TopBar } from "../(components)/Topbar"
import Providers from "../(components)/Providers"

export default function Layout({ children }) {
  return (
    <Providers>
      <div className="relative grid h-screen grid-cols-3 grid-rows-6 rounded-xl bg-black md:grid-cols-12 md:grid-rows-6">
        <SideBar />
        <TopBar />
        <div className="col-span-full row-start-2 row-end-7 grid pl-14 md:col-span-full md:col-start-2 md:row-start-2 md:row-end-6">
          {children}
        </div>
      </div>
    </Providers>
  )
}
