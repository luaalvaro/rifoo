import {
  Flex,
  Heading,
  Text
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { style } from '../constants/globalTheme'

const Home = () => {

  const [innerHeight, setInnerHeight] = useState(0)

  useEffect(() => {
    setInnerHeight(window.innerHeight)
  }, [])

  return (
    <Flex
      minHeight={innerHeight}
      background={style.color.background}
      flexDirection="column"
    >

      <Flex
        background="#fff"
        boxShadow="3px 5px 8px rgba(0,0,0,0.2)"
        p="15px"
      >
        <Heading
          color={style.color.primary}
          fontSize={26}
        >
          Rifoo
        </Heading>
      </Flex>



    </Flex>
  )
}

export default Home