import {
  Flex,
  Text,
  Link as A,
  Button
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import Container from '../../components/Container'

const Produtos = () => {

  const router = useRouter()

  return (
    <Container>
      <Header />

      <Text
        fontSize={18}
        mt="15px"
        mx="15px"
      >
        Produtos
      </Text>

      <Flex
        direction="column"
        gridGap="15px"
        px="15px"
        pt="15px"
      >

        <Text>Você ainda não tem produtos cadastrados.</Text>

        <Button
          colorScheme="green"

          onClick={() => router.push("/app/novoproduto")}
        >
          Cadastrar novo produto
        </Button>
      </Flex>
    </Container>
  )
}

export default Produtos