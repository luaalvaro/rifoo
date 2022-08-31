import { Flex, Text, Button, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import NumberFormat from 'react-number-format'
import supabase from '../services/supabase'
import useOrder from '../store/useOrder'

const BottomMenuNewOrder = () => {

    const router = useRouter()
    const toast = useToast()
    const order = useOrder(state => state)
    const [loading, setLoading] = useState(false)
    const discount = useOrder(state => state.discount)

    const handleSubmitNewSell = async () => {

        const user = supabase.auth.user()

        if (!user) return

        const { id } = user;

        try {
            setLoading(true)
            const { data, error } = await supabase
                .from<Order>("sales")
                .insert({
                    qtd_items: order.qtd_items,
                    discount: order.discount,
                    products: JSON.stringify(order.products),
                    products_weight: JSON.stringify(order.products_weight),
                    total_price: order.total_price,
                    total_cost_price: order.total_cost_price,
                    paymentMethod: order.paymentMethod,
                    user_id: id,
                    total_price_weight: order.total_price_weight,
                    total_cost_price_weight: order.total_cost_price_weight
                })

            if (error)
                throw error

            toast({
                title: 'Venda realizada com sucesso!',
                description: 'Visite o menu Minhas vendas para ver os detalhes da venda.',
                status: 'success',
                duration: 6000,
            })
            order.resetState()
            return router.push('/app')
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const totalPriceShow = order.total_price_weight + order.total_price
    const totalPriceWithDiscountShow = discount ? (totalPriceShow - discount) : ""

    console.log({
        totalPriceShow,
        totalPriceWithDiscountShow
    })
    return (
        <Flex
            borderTop="1px solid rgba(0,0,0,0.2)"
            position="fixed"
            bg="#fff"
            height="120px"
            bottom="0"
            left="0"
            right="0"

            px="15px"
            align="center"
            justify="space-between"
        >
            <Flex
                direction="column"
            >
                <Flex
                    direction={discount ? "row" : "column"}
                    align={discount ? "center" : "initial"}
                    gridGap={discount ? "10px" : "0"}
                >
                    <Text
                        color="grey"
                        lineHeight="16px"
                        mb="2px"
                    >
                        sub total
                    </Text>

                    <NumberFormat
                        displayType={'text'}
                        value={totalPriceShow}
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        prefix={"R$ "}
                        allowNegative={false}
                        decimalScale={2}
                        fixedDecimalScale={true}

                        style={{
                            fontSize: discount ? '16px' : '35px',

                            textDecoration: discount ? 'line-through' : 'none',
                        }}
                    />
                </Flex>

                {totalPriceWithDiscountShow &&
                    <NumberFormat
                        displayType={'text'}
                        value={totalPriceWithDiscountShow}
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        prefix={"R$ "}
                        allowNegative={false}
                        decimalScale={2}
                        fixedDecimalScale={true}

                        style={{
                            fontSize: '26px',
                        }}
                    />
                }

            </Flex>

            <Flex align="center" gridGap="10px">
                {order.stepProgress <= 2 &&
                    <Button
                        variant="ghost"
                        onClick={order.prevStep}
                    >
                        Voltar
                    </Button>
                }
                <Button
                    px="20px"
                    height="50px"
                    background="brand.primary"
                    color="#fff"
                    isLoading={loading}

                    _hover={{ bg: 'brand.primaryDark' }}

                    onClick={order.stepProgress < 2 ? order.nextStep : handleSubmitNewSell}
                >
                    {order.stepProgress < 2 ? 'Próximo' : 'Finalizar'}
                </Button>
            </Flex>

        </Flex>
    )
}

export default BottomMenuNewOrder