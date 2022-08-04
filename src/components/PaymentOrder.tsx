import { Box, Flex, Icon, Radio, RadioGroup, Text } from '@chakra-ui/react'
import useOrder from '../store/useOrder'
import { FaMoneyBillWave, FaRegCreditCard, FaCreditCard } from 'react-icons/fa'
import { BsXDiamondFill } from 'react-icons/bs'

const paymentMethods = [
    { id: 1, name: 'Chave PIX', icon: BsXDiamondFill },
    { id: 2, name: 'Dinheiro', icon: FaMoneyBillWave },
    { id: 3, name: 'Máquina de cartão - Débito', icon: FaCreditCard },
    { id: 4, name: 'Máquina de cartão - Crédito', icon: FaRegCreditCard },
]

const PaymentOrder = () => {

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
                Forma de pagamento
            </Text>

            <RadioGroup
                display="flex"
                flexDirection="column"
                gridGap='15px'

                onChange={value => order.setPaymentMethod(Number(value))}
                value={order.paymentMethod}
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

                        onClick={() => order.setPaymentMethod(item.id)}
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
        </Flex>
    )
}

export default PaymentOrder