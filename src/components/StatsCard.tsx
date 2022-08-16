import { Center, Flex, Text } from '@chakra-ui/react'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import NumberFormat from 'react-number-format'

interface IStatsCard {
    variant: 'upper' | 'lower',
    title: string,
    value: number | string,
    type?: "int"
}
const StatsCard: React.FC<IStatsCard> = ({ variant, title, value, type }) => {

    const textColor = title === "Lucro total"
        ? "green"
        : "black"

    return (
        <Flex
            width="100%"
            bg="#fff"
            borderRadius="8px"
            boxShadow="0px 0px 10px rgba(0,0,0,0.1)"
            height="100px"
            padding="5px"
            direction="column"
            userSelect="none"

            _active={{
                bg: '#dddfe2',
                transform: 'scale(0.98)',
                borderColor: '#bec3c9',
            }}

            _focus={{
                boxShadow:
                    '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
            }}
        >
            <Flex
                width="100%"
                justify="space-between"
            >
                <Text

                    fontSize={14}
                    ml="3px"
                >
                    {title}
                </Text>

                {variant === 'upper' && (
                    <IoMdArrowDropup
                        fontSize={24}
                        color={textColor}
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
                <NumberFormat
                    displayType={'text'}
                    value={value}

                    thousandSeparator={type === "int" ? undefined : '.'}
                    decimalSeparator={type === "int" ? undefined : ','}
                    prefix={type === "int" ? undefined : "R$ "}

                    allowNegative={false}

                    decimalScale={type === "int" ? undefined : 2}
                    fixedDecimalScale={type === "int" ? false : true}

                    style={{
                        fontSize: '20px',
                        fontWeight: 600,
                        color: textColor
                    }}
                />
            </Center>
        </Flex>
    )
}

export default StatsCard