import {
    Flex,
    Skeleton,
    Stack,
    Text,
} from '@chakra-ui/react'
import Header from '../../components/Header'
import Container from '../../components/Container'
import BottomMenuNewOrder from '../../components/BottomMenuNewOrder'
import { useEffect, useState } from 'react'
import supabase from '../../services/supabase'
import { FaBoxOpen } from 'react-icons/fa'
import ProductCard from '../../components/ProductCard'
import ResumeOrder from '../../components/ResumeOrder'
import useOrder from '../../store/useOrder'
import PaymentOrder from '../../components/PaymentOrder'

const Home = () => {

    const order = useOrder(state => state)
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

    console.log(order.total_price_weight)

    return (
        <Container>
            <Header />

            <Text
                fontSize={18}
                margin="15px"
                fontWeight={400}
                userSelect="none"
            >
                Realizar nova venda
            </Text>


            {products === null &&
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

            {order.stepProgress === 0 && products &&
                <Flex
                    direction="column"
                    px="15px"
                    gridGap="15px"
                >
                    {products.map((item, index) => (
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
        </Container>
    )
}

export default Home