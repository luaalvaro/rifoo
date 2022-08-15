import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import HeaderConfig from '../components/HeaderConfig'
import moment from 'moment'
import 'moment/locale/pt-br'

moment.locale('pt-br')

function MyApp({ Component, pageProps }: AppProps) {

  const theme = extendTheme({
    colors: {
      brand: {
        background: "#F1F1F1",
        primary: "#405090",
        primaryDark: "#2F3C8E",
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
