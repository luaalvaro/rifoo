import {
  Flex,
  Text,
  useDisclosure,
  useToast,
  Stack,
  Skeleton,
  Button,
} from '@chakra-ui/react'
import Header from '../../components/Header'
import AuthProvider from '../../components/AuthProvider'
import supabase from '../../services/supabase'
import { useEffect, useState } from 'react'
import { yyyyMMdd_to_ddMMyyyy } from '../../utils/dataHacks'
import moment from 'moment'
import useSWR from 'swr'
import Image from 'next/image'

const fetcher = async (url: any) => await supabase
  .from(url)
  .select("*")
  .single()

const Perfil = () => {

  const [qrCode, setQrCode] = useState<string | undefined>(undefined)
  const { data, error } = useSWR('profiles', fetcher)

  const profile = data?.data
  const loading = !data
  const signatureDate = moment(profile?.valid_until, "YYYY-MM-DD").fromNow()
  const signatureStatusDate = signatureDate.includes('há') ? 'atrasada' : 'ativa'
  const signatureTextUntil = signatureDate.includes('há') ? 'Expirou' : 'Expira'

  const handleCreatePayment = async () => {
    const response = await fetch('/api/payments/create')
    const data = await response.json()

    console.log(data.qr_code_base64)
    setQrCode(`data:image/jpeg;base64, ${data.qr_code_base64}`)
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

            {qrCode && (
              <Flex
                justify="center"
              >
                <Image
                  src={qrCode}
                  width={250}
                  height={250}
                  alt="QR Code"
                />
              </Flex>
            )}

            {signatureStatusDate === 'atrasada' && (
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