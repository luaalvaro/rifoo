import { Flex, Text, Button, useToast, Input } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
import supabase from '../services/supabase'
import useOrder from '../store/useOrder'

const BottomMenuNewOrder = () => {

    const router = useRouter()
    const toast = useToast()
    const order = useOrder(state => state)
    const [innerHeight, setInnerHeight] = useState(0)
    const [loading, setLoading] = useState(false)

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
                    total_price: order.total_price,
                    total_cost_price: order.total_cost_price,
                    paymentMethod: order.paymentMethod,
                    user_id: id,
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

    const totalWeightPrice = order.total_price_weight
        .reduce((acc, item) => acc + item.total_price, 0)

    const totalWeightPriceCost = order.total_price_weight
        .reduce((acc, item) => acc + item.total_cost_price, 0)

    const totalPriceShow = totalWeightPrice + order.total_price

    useEffect(() => {
        setInnerHeight(window.innerHeight)
    }, [])

    return (
        <Flex
            borderTop="1px solid rgba(0,0,0,0.2)"
            position="fixed"
            bg="#fff"
            top={innerHeight - 120}
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
                        fontSize: '35px',
                    }}
                />
            </Flex>

            <Button
                width="160px"
                height="50px"
                colorScheme="green"

                isLoading={loading}

                onClick={order.stepProgress === 0 ? order.nextStep : handleSubmitNewSell}
            >
                {order.stepProgress === 0 ? 'Prosseguir' : 'Finalizar'}
            </Button>
        </Flex>
    )
}

export default BottomMenuNewOrder