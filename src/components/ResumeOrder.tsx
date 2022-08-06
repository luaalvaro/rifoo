import { Flex, Text } from '@chakra-ui/react'
import NumberFormat from 'react-number-format'
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
                    <Text>
                        {item.product_sell_type === "unidade" ?
                            `${item.qtd_items}x ${item.product_name}`
                            : `${item.weight}kg ${item.product_name}`
                        }
                    </Text>
                    <NumberFormat
                        displayType={'text'}
                        value={
                            item.product_sell_type === "unidade"
                                ? item.product_sell_price
                                : !!item.weight ? item.product_sell_price * item.weight : 0
                        }
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        prefix={"R$ "}
                        suffix={item.product_sell_type === "unidade" ? " /und" : ""}
                        allowNegative={false}
                        decimalScale={2}
                        fixedDecimalScale={true}
                    />
                </Flex>
            ))}

        </Flex>
    )
}

export default ResumeOrder