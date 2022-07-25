import {
  Flex,
  Text,
  Link as A,
  Button,
  Stack,
  Skeleton
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import Container from '../../components/Container'
import supabase from '../../services/supabase'
import { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'

const Produtos = () => {

  const router = useRouter()
  const [products, setProducts] = useState<Product[] | null>(null)

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from<Product>("products")
        .select()

      if (error)
        throw error

      setProducts(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

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

        {products === null &&
          <Stack>
            <Skeleton h="20px" />
            <Skeleton h="20px" />
            <Skeleton h="20px" />
          </Stack>
        }

        {products && products.map((item, index) => (
          <ProductCard key={index} data={item} />
        ))}

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