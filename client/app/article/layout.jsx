import Providers from "../(components)/Providers"

export default function ArticleLayout({ children }) {
  return (
    <>
      <Providers>{children}</Providers>
    </>
  )
}
