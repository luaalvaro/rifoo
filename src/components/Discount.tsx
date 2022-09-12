import { Flex, FormControl, FormLabel, Input, Text, useToast } from '@chakra-ui/react'
import useOrder from '../store/useOrder'
import NumberFormat from 'react-number-format'
import { useState } from 'react'

const Discount = () => {

    const toast = useToast()
    const total_price = useOrder(state => state.total_price)
    const total_price_weight = useOrder(state => state.total_price_weight)
    const discount = useOrder(state => state.discount)
    const setDiscount = useOrder(state => state.setDiscount)
    const total_price_order = total_price + total_price_weight
    const [money, setMoney] = useState<number | undefined>()

    const change = money && money - total_price_order

    const handleSetDiscount = (value: any) => {
        console.log(value)
        if (value > total_price_order) {
            toast({
                title: "Desconto inválido",
            })
            return setDiscount(0)
        }
        setDiscount(value)
    }
    return (
        <Flex
            direction="column"
            px="15px"
        >
            <FormControl
                marginBottom="50px"
            >
                <FormLabel
                    fontWeight={700}
                    fontSize={18}
                    mb="10px"
                >
                    Aplicar desconto?
                </FormLabel>
                <NumberFormat
                    customInput={Input}
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    prefix={"R$ "}
                    allowNegative={false}
                    decimalScale={2}
                    fixedDecimalScale={true}

                    background="#fff"

                    value={discount}
                    onValueChange={(value) => handleSetDiscount(value.floatValue)}
                />

                {change && change > 0 &&
                    <Flex
                        fontWeight={700}
                        fontSize="30px"
                        align="center"
                        color="rgba(0,0,0,0.7)"
                        gridGap="15px"
                        marginTop="20px"
                    >
                        <Text
                            fontWeight={700}
                            fontSize="30px"
                        >
                            Troco:
                        </Text>

                        <NumberFormat
                            displayType={'text'}
                            value={change}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            prefix={"R$ "}
                            allowNegative={false}
                            decimalScale={2}
                            fixedDecimalScale={true}
                        />
                    </Flex>
                }
            </FormControl>
        </Flex>
    )
}

export default Discount