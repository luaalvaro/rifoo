import { Center, Flex, Text } from '@chakra-ui/react'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'

interface IStatsCard {
    variant: 'upper' | 'lower'
}
const StatsCard: React.FC<IStatsCard> = ({ variant }) => {
    return (
        <Flex
            width="100%"
            bg="#fff"
            borderRadius={8}
            boxShadow="0px 0px 10px rgba(0,0,0,0.1)"
            height="100px"
            padding="5px"
            direction="column"
        >
            <Flex
                width="100%"
                justify="space-between"
            >
                <Text

                    fontSize={14}
                    ml="3px"
                >
                    Faturamento
                </Text>

                {variant === 'upper' && (
                    <IoMdArrowDropup
                        fontSize={24}
                        color="green"
                    />
                )}

                {variant === 'lower' && (
                    <IoMdArrowDropdown
                        fontSize={24}
                        color="red"
                    />
                )}
            </Flex>

            <Center
                flex="1"
            >
                <Text
                    opacity={.8}
                    fontSize={20}
                    fontWeight={600}
                >
                    R$ 2.374,55
                </Text>
            </Center>
        </Flex>
    )
}

export default StatsCard