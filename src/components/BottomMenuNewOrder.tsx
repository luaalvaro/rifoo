import { Flex, Text, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import useOrder from '../store/useOrder'

const BottomMenuNewOrder = () => {

    const order = useOrder(state => state)
    const [innerHeight, setInnerHeight] = useState(0)

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
                <Text
                    fontSize={35}
                    lineHeight="35px"
                >
                    R$ {order.total_price.toFixed(2)}
                </Text>
            </Flex>

            <Button
                width="180px"
                height="50px"
                colorScheme="green"

                onClick={order.nextStep}
            >
                Prosseguir
            </Button>
        </Flex>
    )
}

export default BottomMenuNewOrder