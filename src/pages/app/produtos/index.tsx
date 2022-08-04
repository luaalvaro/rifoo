import {
  Flex,
  Text,
  Link as A,
  Button,
  Stack,
  Skeleton
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Header from '../../../components/Header'
import Container from '../../../components/Container'
import supabase from '../../../services/supabase'
import { useEffect, useState } from 'react'
import ProductCard from '../../../components/ProductCard'
import { FaBoxOpen } from 'react-icons/fa'
import useSWR from 'swr'

const fetcher = async () => {
  const { data, error } = await supabase
    .from<Product>("products")
    .select()

  if (error) throw error

  return data
}

const Produtos = () => {

  const router = useRouter()
  const { data: products, error } = useSWR('produtos', fetcher)

  return (
    <Container>
      <Header />

      <Text
        fontSize={18}
        mt="15px"
        mx="15px"
        userSelect="none"
      >
        Produtos
      </Text>

      <Flex
        direction="column"
        gridGap="15px"
        px="15px"
        pt="15px"
        pb="30px"
      >

        <Button
          colorScheme="green"

          onClick={() => router.push("/app/produtos/novo")}
        >
          Cadastrar novo produto
        </Button>

        {!products &&
          <Stack>
            <Skeleton h="20px" />
            <Skeleton h="20px" />
            <Skeleton h="20px" />
          </Stack>
        }

        {products && !products.length &&
          <Flex
            mt="80px"
            direction="column"
            align="center"
          >
            <FaBoxOpen
              fontSize={70}
              opacity={.5}
            />
            <Text>Ooppps... Não encontramos nada por aqui</Text>
          </Flex>
        }

        {products && products.map((item, index) => (
          <ProductCard key={index} data={item} />
        ))}
      </Flex>
    </Container >
  )
}

export default Produtos