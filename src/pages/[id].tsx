import {
  Flex,
  Text,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
  Button
} from '@chakra-ui/react'
import { FaBars } from 'react-icons/fa'
import Image from 'next/image'

const Rifoo = () => {

  const qtdTotalNumbers = 50

  const data = {
    rifoo_title: "Título da rifa",
    rifoo_value: 10,
    rifoo_qtd_numbers: 50,
  }

  return (
    <Flex
      minHeight="100vh"
      background="#405090"
      flexDirection="column"
    >

      <Flex
        bg="#fff"
        height="60px"
        align="center"
        px="30px"
        justify="space-between"
        mb="20px"
      >
        <Text
          color="#405090"
          fontSize={32}
        >
          Rifoo
        </Text>

        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<FaBars color="#405090" />}
            variant='outline'
            borderColor="#40509080"
          />
          <MenuList

          >
            <MenuItem>
              Meu perfil
            </MenuItem>

            <MenuItem>
              Meus pedidos
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Flex
        mx="25px"
        borderRadius={15}
        overflow="hidden"
      >
        <Image
          src="/dev/iphone11-64gbs.png"
          width={945}
          height={945}
        />
      </Flex>

      <Heading
        mt="20px"
        mx="auto"
        fontSize={26}
        color="#fff"
      >
        Iphone 11 - 64 GB
      </Heading>

      <Text
        textAlign="center"
        color="#fff"
        opacity={.8}
        fontSize={18}
        mb="30px"
      >
        Valor do bilhete: R$ 10,00
      </Text>

      <Flex
        mx="25px"
        flexWrap="wrap"
        gridGap="20px"
        justify="space-between"
      >
        <Button>0001</Button>
        <Button>0002</Button>
        <Button>0003</Button>
        <Button>0004</Button>
        <Button>0005</Button>
        <Button>0006</Button>
      </Flex>

    </Flex>
  )
}

export default Rifoo