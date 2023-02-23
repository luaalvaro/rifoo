import {
    Button,
    Flex,
    Text,
} from '@chakra-ui/react'
import { termsSignature } from '../constants/defaultValues'
import useAuth from '../store/useAuth'
import moment from 'moment'
import usePayments from '../store/usePayments'

interface IProps {
    handleBuyRifoo: () => void,
    isLoading: boolean
}

const SignatureActions: React.FC<IProps> = ({ handleBuyRifoo, isLoading }) => {

    const { newPayment } = usePayments()
    const { profile } = useAuth()

    const signatureExpiresDate = moment(profile?.valid_until).format('DD/MM/YYYY')
    const timeToExpire = moment(profile?.valid_until, "YYYY-MM-DD").fromNow()
    const signatureStatusDate = timeToExpire.includes('há') ? 'pendente' : 'ativa'

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
            <Text fontSize={14}>{termsSignature.pr3}</Text>

            <Flex
                my="50px"
                direction="column"
            >
                <Text
                    textAlign="center"
                    fontSize={20}
                    fontWeight={700}
                    color={signatureStatusDate === "pendente" ? "red" : "brand.primary"}
                >
                    Assinatura {signatureStatusDate}
                </Text>

                <Text
                    textAlign="center"

                    fontSize={14}
                >
                    Data de expiração: {signatureExpiresDate}
                </Text>
            </Flex>

            <Button
                px="20px"
                height="50px"
                background="brand.primary"
                color="#fff"

                onClick={handleBuyRifoo}

                isLoading={isLoading}

                _hover={{ bg: 'brand.primaryDark' }}
            >
                Comprar 30 dias Rifoo Simples - R$ 17,90
            </Button>
        </Flex>
    )
}

export default SignatureActions