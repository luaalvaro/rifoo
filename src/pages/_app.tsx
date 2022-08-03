import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
function MyApp({ Component, pageProps }: AppProps) {

  const theme = extendTheme({
    colors: {
      brand: {
        background: "#F1F1F1",
        primary: "green",
      },
    },
  })

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
