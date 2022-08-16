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
import AuthProvider from '../../../components/AuthProvider'
import supabase from '../../../services/supabase'
import { useEffect, useState } from 'react'
import ProductCard from '../../../components/ProductCard'
import { FaBoxOpen } from 'react-icons/fa'
import useSWR from 'swr'

const fetcher = async (url: any) => await supabase
  .from<Product>(url)
  .select()

const Produtos = () => {

  const router = useRouter()
  const { data, error } = useSWR('products', fetcher)
  const products = data?.data
  const loading = !data

  return (
    <AuthProvider>
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
          color="#fff"
          background="brand.primary"

          _hover={{ bg: 'brand.primaryDark' }}


          onClick={() => router.push("/app/produtos/novo")}
        >
          Cadastrar novo produto
        </Button>

        {loading &&
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
            <Text textAlign="center">Ooppps... Você ainda não cadastrou nenhum produto</Text>
          </Flex>
        }

        {products && products.map((item, index) => (
          <ProductCard key={index} data={item} />
        ))}
      </Flex>
    </AuthProvider>
  )
}

export default Produtos