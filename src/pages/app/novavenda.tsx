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
import { useState } from 'react'
import supabase from '../../services/supabase'
import { FaBoxOpen, FaSearch } from 'react-icons/fa'
import ProductCard from '../../components/ProductCard'
import ResumeOrder from '../../components/ResumeOrder'
import useOrder from '../../store/useOrder'
import PaymentOrder from '../../components/PaymentOrder'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import useSWR from 'swr'
import ChangeMoney from '../../components/ChangeMoney'
import Discount from '../../components/Discount'
import PIX from "react-qrcode-pix";
import useAuth from '../../store/useAuth'
import { formatCpf } from '../../utils/functions'

const fetcher = async (url: any) => await await supabase
    .from<Product>(url)
    .select()

const Home = () => {

    const [search, setSearch] = useState('')

    const { profile } = useAuth()
    const order = useOrder(state => state)
    const { data, error } = useSWR('products', fetcher)
    const loading = !data
    const products = data?.data

    const hasSearch = search.length > 2
    const productsToRender = hasSearch ? products?.filter(product => product.product_name
        .toLowerCase()
        .includes(search.toLowerCase())) : products

    const discount = useOrder(state => state.discount)
    const total_price = order.total_price_weight + order.total_price

    const subTotal = discount ? total_price - discount : total_price

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
                {order.stepProgress <= 2 &&
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
                        <InputLeftElement
                            color="brand.primary"
                            opacity={.7}
                        >
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

            {order.stepProgress === 2 &&
                <>
                    {order.paymentMethod === 2 && <ChangeMoney />}
                    <Discount />

                    {order.paymentMethod === 1 &&
                        <Flex
                            px="15px"
                            direction="column"
                            background="#fff"
                            borderRadius="8px"
                            align="center"
                            mx="20px"
                            py="20px"
                            mb="150px"
                        >
                            <Text
                                fontSize={16}
                                fontWeight={500}
                                mb="20px"
                            >
                                PAGAMENTO COM QR CODE PIX
                            </Text>

                            <PIX
                                pixkey={formatCpf(`${profile?.cpf}`)}
                                merchant={`${profile?.fullName}`}
                                city="Sao Paulo"
                                code={`RIFOO`}
                                amount={subTotal}
                                size={180}
                            />

                            <Text
                                mt="25px"
                                fontSize="16px"
                            >
                                Valor total <b>R$ {subTotal}</b>
                            </Text>

                            <Text fontSize="14px">
                                Nome do beneficiário: <b>{`${profile?.fullName}`}</b>
                            </Text>
                            <Text fontSize="14px">
                                Chave pix: <b>{formatCpf(`${profile?.cpf}`)}</b>
                            </Text>

                            <Text
                                mt="30px"
                                fontSize="13px"
                                color="red"
                                textAlign="justify"
                            >
                                <b>Atenção:</b> SEMPRE peça para seu cliente confirmar o destinatário do pagamento. O Rifoo não se responsabiliza por pagamentos feitos para terceiros.
                            </Text>
                        </Flex>
                    }
                </>
            }

            <BottomMenuNewOrder />
        </AuthProvider>
    )
}

export default Home