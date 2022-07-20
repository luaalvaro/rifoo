import {
  Flex,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import Container from '../../components/Container'
import HomeButtom from '../../components/HomeButtom'
import { FaMoneyBillWave } from 'react-icons/fa'

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

      </Flex>
    </Container>
  )
}

export default Home