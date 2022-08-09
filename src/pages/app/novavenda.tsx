import {
    Flex,
    Skeleton,
    Stack,
    Text,
} from '@chakra-ui/react'
import Header from '../../components/Header'
import AuthProvider from '../../components/AuthProvider'
import BottomMenuNewOrder from '../../components/BottomMenuNewOrder'
import { useEffect, useState } from 'react'
import supabase from '../../services/supabase'
import { FaBoxOpen } from 'react-icons/fa'
import ProductCard from '../../components/ProductCard'
import ResumeOrder from '../../components/ResumeOrder'
import useOrder from '../../store/useOrder'
import PaymentOrder from '../../components/PaymentOrder'
import { AiOutlineArrowLeft } from 'react-icons/ai'

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


            {products === null &&
                <Stack px="15px">
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
                    paddingBottom="150px"
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
        </AuthProvider>
    )
}

export default Home