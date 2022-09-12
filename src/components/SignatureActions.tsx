import {
    Flex,
    Text,
} from '@chakra-ui/react'
import { termsSignature } from '../constants/defaultValues'
import CardPricingSignature from './containers/CardPricingSignature'

const SignatureActions = () => {
    return (
        <Flex
            mt="25px"
            px="15px"
            userSelect="none"
            direction="column"
        >
            <Text
                fontWeight={600}
                mb="15px"
            >
                Assinatura e boletos
            </Text>

            <Text fontSize={14} mb="15px">{termsSignature.pr1}</Text>
            <Text fontSize={14} mb="15px">{termsSignature.pr2}</Text>

            <Text
                fontWeight={600}
                color="green"
            >
                Sua assinatura está ativa até 31/12/2021
            </Text>
            <Text
                color="green"
                fontSize={14}
                mb="30px"
            >
                51 dias restantes
            </Text>

            <CardPricingSignature
                title="Rifoo Premium 30 Dias"
                price="29,90"
            />
        </Flex>
    )
}

export default SignatureActions