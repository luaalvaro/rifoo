import {
    Flex,
    Text,
} from '@chakra-ui/react'
import { termsSignature } from '../constants/defaultValues'
import useAuth from '../store/useAuth'
import CardPricingSignature from './containers/CardPricingSignature'
import moment from 'moment'
const SignatureActions = () => {

    const { profile } = useAuth()

    const signatureExpiresDate = moment(profile?.valid_until).format('DD/MM/YYYY')
    const timeToExpire = moment(profile?.valid_until, "YYYY-MM-DD").fromNow()
    const signatureStatusDate = timeToExpire.includes('há') ? 'atrasada' : 'ativa'
    const signatureTextUntil = timeToExpire.includes('há') ? 'Expirou' : 'Expira'
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
                mb="15px"
            >
                Sua assinatura está {signatureStatusDate} até {signatureExpiresDate}
            </Text>

            <CardPricingSignature
                title="Rifoo Premium 30 Dias"
                price="29,90"
            />
        </Flex>
    )
}

export default SignatureActions