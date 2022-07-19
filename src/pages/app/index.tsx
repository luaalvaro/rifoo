import {
  Flex,
  Text,
  Center,
  Link as A
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { style } from '../../constants/globalTheme'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { IoIosStats } from 'react-icons/io'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import Container from '../../components/Container'
import HomeButtom from '../../components/HomeButtom'

const Home = () => {

  const router = useRouter()

  return (
    <Container>
      <Header />

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

        <HomeButtom
          title="Nova venda"
          href="/app/novavenda"
        />

        <HomeButtom
          title="Minhas vendas"
          href="#"
        />

        <HomeButtom
          title="Produtos"
          href="/app/produtos"
        />

        <HomeButtom
          title="Estoque"
          href="#"
        />

      </Flex>
    </Container>
  )
}

export default Home