import {
  Flex,
  Text,
  useDisclosure,
  useToast,
  Stack,
  Skeleton,
} from '@chakra-ui/react'
import Header from '../../components/Header'
import AuthProvider from '../../components/AuthProvider'
import supabase from '../../services/supabase'
import { useEffect, useState } from 'react'
import { yyyyMMdd_to_ddMMyyyy } from '../../utils/dataHacks'
import moment from 'moment'

const Perfil = () => {
  const toast = useToast()
  const [profile, setProfile] = useState<any>(null)
  const { isOpen, onToggle } = useDisclosure()
  const [loading, setLoading] = useState(false)

  const userSignatureActive = typeof profile?.valid_until === 'string'
    && new Date(profile.valid_until) >= new Date()

  const signatureDate = moment(profile?.valid_until, "YYYY-MM-DD").fromNow()
  const signatureStatusDate = signatureDate.includes('há') ? 'atrasada' : 'atual'

  const getUserProfile = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select("*")
        .single()

      if (error) throw error

      setProfile(data)
    } catch (error) {
      console.log(error)
      if (!isOpen) {
        onToggle()
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserProfile()
  }, [])

  console.log(profile?.valid_until)

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
          >
            <Text>
              Sua fatura está {signatureStatusDate} <b>{signatureDate}</b>
              <br /> clique aqui para renovar.
            </Text>
          </Flex>
        </>
      )}
    </AuthProvider>
  )
}

export default Perfil