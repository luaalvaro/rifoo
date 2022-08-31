import {
  Flex,
  Text,
  useDisclosure,
  useToast,
  Stack,
  Skeleton,
  Button,
  Heading,
  Input,
} from '@chakra-ui/react'
import Header from '../../components/Header'
import AuthProvider from '../../components/AuthProvider'
import supabase from '../../services/supabase'
import { useEffect, useState } from 'react'
import { yyyyMMdd_to_ddMMyyyy } from '../../utils/dataHacks'
import moment from 'moment'
import useSWR from 'swr'
import Image from 'next/image'
import { MdOutlineContentCopy } from 'react-icons/md'

const fetcher = async (url: any) => await supabase
  .from(url)
  .select("*")
  .single()

interface PaymentPIX {
  date_of_expiration: string
  description: string
  qr_code: string
  qr_code_base64: string
  transaction_amount: number
}

const Perfil = () => {

  const [payment, setPayment] = useState<PaymentPIX | undefined>(undefined)
  const { data, error } = useSWR('profiles', fetcher)

  const profile = data?.data
  const loading = !data
  const signatureDate = moment(profile?.valid_until, "YYYY-MM-DD").fromNow()
  const signatureStatusDate = signatureDate.includes('há') ? 'atrasada' : 'ativa'
  const signatureTextUntil = signatureDate.includes('há') ? 'Expirou' : 'Expira'

  const handleCreatePayment = async () => {

    const session = supabase.auth.session()

    const response = await fetch('/api/payments/create', {
      method: 'POST',
      body: JSON.stringify({
        sessionToken: session?.access_token,
      })
    })
    const { data } = await response.json()

    console.log(data)
    setPayment(data)
  }

  return (
    <AuthProvider>
      <Header />

      {loading &&
        <Stack padding="15px">
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      }

      {!loading && profile && (
        <>
          <Text
            fontSize={18}
            mt="15px"
            mx="15px"
            userSelect="none"
          >
            <b>{profile?.fullName}</b> este é seu perfil!
          </Text>

          <Text
            fontSize={14}
            mt="15px"
            mx="15px"
            userSelect="none"
          >
            Seu nome: <b>{profile?.fullName}</b>
          </Text>

          <Text
            fontSize={14}
            mx="15px"
            userSelect="none"
          >
            Data de nascimento: <b>{yyyyMMdd_to_ddMMyyyy(profile?.birthdate)}</b>
          </Text>

          <Text
            fontSize={14}
            mx="15px"
            userSelect="none"
          >
            CPF: <b>{profile?.cpf}</b>
          </Text>

          <Text
            fontSize={14}
            mx="15px"
            userSelect="none"
          >
            Whats app: <b>{profile?.whatsapp}</b>
          </Text>

          <Flex
            mt="25px"
            px="15px"
            userSelect="none"
            direction="column"
            gridGap="25px"
          >
            <Text>
              Sua assinatura está {signatureStatusDate}.<br />
              <b>{`${signatureTextUntil} ${signatureDate}`}</b>
            </Text>

            {payment && (
              <Flex
                bg="#fff"
                justify="center"
                direction="column"
                p="15px"
                borderRadius="4px"
              >
                <Heading
                  fontSize="18px"
                >
                  Rifoo 30 dias - R$ 29,90 via Pix
                </Heading>

                <Text
                  color="rgba(0,0,0,0.6)"
                >
                  Vencimento: {moment(payment?.date_of_expiration).fromNow()}
                </Text>

                <Text mt="15px">Código QR</Text>
                <Flex
                  pb="15px"
                  justify="center"
                >
                  <Image
                    src={payment.qr_code_base64}
                    width={200}
                    height={200}
                    alt="QR Code"
                  />
                </Flex>

                <Text mb="10px">Código de pagamento</Text>
                <Input
                  readOnly
                  value={payment.qr_code}
                />

                <Button
                  mt="20px"
                  background="brand.primary"
                  color="#fff"

                  leftIcon={<MdOutlineContentCopy />}

                  _hover={{
                    background: "brand.primaryDark",
                  }}
                >
                  Copiar código de pagamento
                </Button>
              </Flex>
            )}

            {signatureStatusDate === 'atrasada' && !payment && (
              <Button
                background="brand.primary"
                color="#fff"

                onClick={handleCreatePayment}

                _hover={{
                  background: "brand.primaryDark",
                }}
              >
                Renovar assinatura
              </Button>
            )}
          </Flex>
        </>
      )}
    </AuthProvider>
  )
}

export default Perfil