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
import LabelValue from '../../components/atoms/LabelValue'
import SignatureActions from '../../components/SignatureActions'

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
          <LabelValue
            label="este é seu perfil!"
            value={profile.fullName}
            px="15px"
            py="15px"
            variant="title"
            transform='reverse'
          />

          <LabelValue
            label="Data de nascimento"
            value={yyyyMMdd_to_ddMMyyyy(profile?.birthdate)}
            px="15px"
          />

          <LabelValue
            label="CPF"
            value={profile?.cpf}
            px="15px"
          />

          <LabelValue
            label="Whats app"
            value={profile?.whatsapp}
            px="15px"
          />

          <SignatureActions />
        </>
      )}
    </AuthProvider>
  )
}

export default Perfil