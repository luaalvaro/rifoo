import { Box, Flex, FormControl, FormLabel, Icon, Input, Radio, RadioGroup, Text } from '@chakra-ui/react'
import useOrder from '../store/useOrder'
import { FaMoneyBillWave, FaRegCreditCard, FaCreditCard } from 'react-icons/fa'
import { BsXDiamondFill } from 'react-icons/bs'
import NumberFormat from 'react-number-format'
import { useState } from 'react'

const paymentMethods = [
    { id: 1, name: 'Chave PIX', icon: BsXDiamondFill },
    { id: 2, name: 'Dinheiro', icon: FaMoneyBillWave },
    { id: 3, name: 'Máquina de cartão - Débito', icon: FaCreditCard },
    { id: 4, name: 'Máquina de cartão - Crédito', icon: FaRegCreditCard },
]

const PaymentOrder = () => {

    const total_price = useOrder(state => state.total_price)
    const total_price_weight = useOrder(state => state.total_price_weight)
    const paymentMethod = useOrder(state => state.paymentMethod)

    const setPaymentMethod = useOrder(state => state.setPaymentMethod)
    const [money, setMoney] = useState<number | undefined>()

    const change = money && money - (total_price + total_price_weight)

    return (
        <Flex
            direction="column"
            px="15px"
            mb="80px"
        >
            <Text
                fontWeight={700}
                fontSize={18}
                mb="10px"
            >
                Forma de pagamento
            </Text>

            <RadioGroup
                display="flex"
                flexDirection="column"
                gridGap='15px'

                onChange={value => setPaymentMethod(Number(value))}
                value={paymentMethod}
            >
                {paymentMethods.map(item => (
                    <Flex
                        key={item.id}
                        width="100%"
                        height="45px"
                        bg="#fff"
                        borderRadius="8px"
                        px="15px"

                        align="center"
                        gridGap="15px"
                        cursor="pointer"

                        onClick={() => setPaymentMethod(item.id)}
                    >

                        <Icon
                            as={item.icon}
                            fontSize="25px"
                            opacity={0.9}
                        />

                        <Radio value={item.id}>{item.name}</Radio>
                    </Flex>
                ))}
            </RadioGroup>

            {paymentMethod === 2 &&
                <FormControl
                    marginBottom="60px"
                >
                    <FormLabel
                        fontWeight={700}
                        fontSize={18}
                        mt="20px"
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
                        height="60px"
                        fontSize="30px"

                        value={money}
                        onValueChange={(value) => setMoney(value.floatValue)}
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
            }
        </Flex>
    )
}

export default PaymentOrder