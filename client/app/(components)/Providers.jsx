"use client"

import { Provider } from "react-redux"
import { store } from "../../redux/store/store"
import { ChakraProvider } from "@chakra-ui/react"

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <ChakraProvider>{children}</ChakraProvider>
    </Provider>
  )
}
