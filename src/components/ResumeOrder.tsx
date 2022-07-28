import { Flex, Text } from '@chakra-ui/react'
import useOrder from '../store/useOrder'

const ResumeOrder = () => {

    const order = useOrder(state => state)

    return (
        <Flex
            direction="column"
            px="15px"
            mb="80px"
        >
            <Text
                fontWeight={700}
                fontSize={18}
                mb="5px"
            >
                Resumo da venda
            </Text>

            {order && order.products.map(item => (
                <Flex
                    key={item.id.substring(0, 5)}
                    justify="space-between"
                >
                    <Text>{item.qtd_items}x {item.product_name}</Text>
                    <Text>R$ {item.product_sell_price}</Text>
                </Flex>
            ))}

        </Flex>
    )
}

export default ResumeOrder