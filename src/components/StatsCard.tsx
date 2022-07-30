import { Center, Flex, Text } from '@chakra-ui/react'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'

const StatsCard = () => {
    return (
        <Flex
            width="100%"
            bg="#fff"
            borderRadius={8}
            boxShadow="0px 0px 10px rgba(0,0,0,0.1)"
            height="80px"
            padding="5px 8px"
            direction="column"
        >
            <Flex
                width="100%"
                justify="space-between"
            >
                <Text
                    opacity={.7}
                    fontSize={14}

                >
                    Últimos 07 dias
                </Text>

                <IoMdArrowDropdown fontSize={24} color="red" />
            </Flex>

            <Center
                flex="1"
            >
                <Text
                    fontSize={24}
                    fontWeight={700}
                >
                    R$ 2.374,55
                </Text>
            </Center>
        </Flex>
    )
}

export default StatsCard