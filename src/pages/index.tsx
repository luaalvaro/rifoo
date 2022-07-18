import {
  Flex,
  Heading,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Center
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { style } from '../constants/globalTheme'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { IoIosStats } from 'react-icons/io'

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
        justify="space-between"
        align="center"
      >
        <Heading
          color={style.color.primary}
          fontSize={26}
        >
          Rifoo
        </Heading>

        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<GiHamburgerMenu />}
            variant='outline'
          />
          <MenuList>
            <MenuItem icon={<GiHamburgerMenu />} command='⌘T'>
              New Tab
            </MenuItem>
            <MenuItem icon={<GiHamburgerMenu />} command='⌘N'>
              New Window
            </MenuItem>
            <MenuItem icon={<GiHamburgerMenu />} command='⌘⇧N'>
              Open Closed Tab
            </MenuItem>
            <MenuItem icon={<GiHamburgerMenu />} command='⌘O'>
              Open File...
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Text
        fontSize={18}
        mt="15px"
        mx="15px"
      >
        Boas vendas, <b>Genilson Andrade</b>
      </Text>

      <Flex
        direction="column"
        gridGap="15px"
        px="15px"
        pt="15px"
      >

        <Center
          background="#fff"
          borderRadius="8px"
          height="80px"
          gridGap="10px"
          fontSize={24}
          color={style.color.primary}
          boxShadow="3px 5px 8px rgba(0,0,0,0.2)"
        >
          <AiOutlineShoppingCart
            fontSize={30}
          />
          <Text>Nova venda</Text>
        </Center>

        <Center
          background="#fff"
          borderRadius="8px"
          height="80px"
          gridGap="10px"
          fontSize={24}
          color={style.color.primary}
          boxShadow="3px 5px 8px rgba(0,0,0,0.2)"
        >
          <IoIosStats
            fontSize={30}
          />
          <Text>Minhas vendas</Text>
        </Center>

        <Center
          background="#fff"
          borderRadius="8px"
          height="80px"
          gridGap="10px"
          fontSize={24}
          color={style.color.primary}
          boxShadow="3px 5px 8px rgba(0,0,0,0.2)"
        >
          <AiOutlineShoppingCart
            fontSize={30}
          />
          <Text>Produtos</Text>
        </Center>

        <Center
          background="#fff"
          borderRadius="8px"
          height="80px"
          gridGap="10px"
          fontSize={24}
          color={style.color.primary}
          boxShadow="3px 5px 8px rgba(0,0,0,0.2)"
        >
          <AiOutlineShoppingCart
            fontSize={30}
          />
          <Text>Estoque</Text>
        </Center>

      </Flex>

    </Flex>
  )
}

export default Home