import {
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Skeleton,
    Stack,
    Text,
} from '@chakra-ui/react'
import Header from '../../components/Header'
import AuthProvider from '../../components/AuthProvider'
import BottomMenuNewOrder from '../../components/BottomMenuNewOrder'
import { useEffect, useState } from 'react'
import supabase from '../../services/supabase'
import { FaBoxOpen, FaSearch } from 'react-icons/fa'
import ProductCard from '../../components/ProductCard'
import ResumeOrder from '../../components/ResumeOrder'
import useOrder from '../../store/useOrder'
import PaymentOrder from '../../components/PaymentOrder'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import useSWR from 'swr'

const fetcher = async (url: any) => await await supabase
    .from<Product>(url)
    .select()

const Home = () => {

    const [search, setSearch] = useState('')

    const order = useOrder(state => state)
    const { data, error } = useSWR('products', fetcher)
    const loading = !data
    const products = data?.data

    const hasSearch = search.length > 2
    const productsToRender = hasSearch ? products?.filter(product => product.product_name
        .toLowerCase()
        .includes(search.toLowerCase())) : products

    return (
        <AuthProvider>
            <Header />

            <Flex
                fontSize={18}
                margin="15px"
                fontWeight={400}
                userSelect="none"

                align="center"
                gridGap="15px"

                onClick={() => order.prevStep()}
            >
                {order.stepProgress === 1 &&
                    <AiOutlineArrowLeft />}
                <Text>
                    {
                        order.stepProgress === 0
                            ? "Realizar nova venda"
                            : "Venda em andamento"
                    }
                </Text>
            </Flex>


            {products === null || loading &&
                <Stack px="15px">
                    <Skeleton h="20px" />
                    <Skeleton h="20px" />
                    <Skeleton h="20px" />
                </Stack>
            }

            {products && !products.length && !loading &&
                <Flex
                    mt="80px"
                    direction="column"
                    align="center"
                    px="15px"
                >
                    <FaBoxOpen
                        fontSize={70}
                        opacity={.5}
                    />
                    <Text
                        textAlign="center"
                    >
                        Ooppps... Você precisa cadastrar um produto para começar a vender
                    </Text>
                </Flex>
            }

            {order.stepProgress === 0 && products && !loading &&
                <Flex
                    direction="column"
                    px="15px"
                    gridGap="15px"
                    paddingBottom="150px"
                >

                    <InputGroup>
                        <InputLeftElement>
                            <FaSearch />
                        </InputLeftElement>
                        <Input
                            background="#fff"
                            placeholder='Pesquisar produto...'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </InputGroup>

                    {productsToRender?.map((item, index) => (
                        <ProductCard
                            type="sell"
                            key={index}
                            data={item}
                        />
                    ))}
                </Flex>
            }

            {order.stepProgress === 1 &&
                <>
                    <ResumeOrder />
                    <PaymentOrder />
                </>
            }

            <BottomMenuNewOrder />
        </AuthProvider>
    )
}

export default Home