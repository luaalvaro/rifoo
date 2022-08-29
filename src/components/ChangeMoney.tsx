import { Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import useOrder from '../store/useOrder'
import NumberFormat from 'react-number-format'
import { useState } from 'react'

const ChangeMoney = () => {

    const total_price = useOrder(state => state.total_price)
    const total_price_weight = useOrder(state => state.total_price_weight)

    const [money, setMoney] = useState<number | undefined>()

    const change = money && money - (total_price + total_price_weight)

    return (
        <Flex
            direction="column"
            px="15px"
        >
            <FormControl
                marginBottom="60px"
            >
                <FormLabel
                    fontWeight={700}
                    fontSize={18}
                    mb="10px"
                >
                    Valor em espécie recebido?
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
                    height="40px"


                    value={money}
                    onValueChange={(value) => setMoney(value.floatValue)}
                />

                {change && change > 0 &&
                    <Flex
                        fontWeight={700}
                        fontSize="25px"
                        align="center"
                        color="rgba(0,0,0,0.7)"
                        gridGap="15px"
                        marginTop="20px"
                    >
                        <Text
                            fontWeight={700}
                            fontSize="25px"
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

export default ChangeMoney