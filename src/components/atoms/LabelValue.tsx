import { Text, Flex } from '@chakra-ui/react'

interface IProps {
    label: string,
    value: string,
    variant?: 'title'
    px?: string,
    py?: string,
    transform?: 'reverse'
}

const LabelValue: React.FC<IProps> = ({ label, value, variant, px, py, transform }) => {
    return (
        <Flex
            px={px}
            py={py}
            fontSize={variant === 'title' ? 18 : 14}
            userSelect="none"
            gridGap="5px"
            direction={transform === 'reverse' ? 'row-reverse' : 'row'}
            justify={transform === 'reverse' ? 'flex-end' : 'flex-start'}
        >
            <Text
                width="max-content"
            >
                {label}
                {!transform && ':'}
            </Text>
            <Text
                fontWeight={600}
                width="max-content"
            >
                {value}
            </Text>
        </Flex>
    )
}

export default LabelValue