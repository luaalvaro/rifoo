import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import HeaderConfig from '../components/HeaderConfig'
import moment from 'moment'
import 'moment/locale/pt-br'

moment.locale('pt-br')

function MyApp({ Component, pageProps }: AppProps) {

  const stage = `${process.env.NEXT_PUBLIC_STAGE_APP}`

  const theme = extendTheme({
    colors: {
      brand: {
        background: "#F1F1F1",
        primary: stage === "dev" ? "#FF4F4F" : "#405090",
        primaryDark: stage === "dev" ? "#BA3939" : "#2F3C8E",
        backgroundCupom: "#FFFFE5",
      },
    },
  })

  return (
    <ChakraProvider theme={theme}>
      <HeaderConfig />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
