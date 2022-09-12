import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  FormErrorMessage,
  useToast,
  Stack,
  Skeleton,
  Link as A
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
import { Field, Formik } from 'formik'
import useAuth from '../../store/useAuth'

interface PaymentPIX {
  date_of_expiration: string
  description: string
  qr_code: string
  qr_code_base64: string
  transaction_amount: number
}

const Perfil = () => {

  const { profile, fetchProfile } = useAuth()
  const toast = useToast()
  const [payment, setPayment] = useState<PaymentPIX | undefined>(undefined)

  const loading = profile === undefined

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

  const handleSubmitProfile = async (values: any) => {
    const session = supabase.auth.session()
    if (!session) return

    try {
      // setSubmitLoading(true)
      const response = await fetch('/api/createprofile', {
        method: 'POST',
        body: JSON.stringify({
          sessionToken: session.access_token,
          ...values
        })
      })

      const data = await response.json()

      if (data.message === "Success" && response.status === 200) {
        toast({
          status: 'success',
          title: 'Perfil criado com sucesso!',
          description: 'Aproveite o Rifoo grátis durante 30 dias!',
          duration: 5000,
        })

        setTimeout(() => {
          return fetchProfile()
        }, 2000)
      }
    } catch (error) {
      console.log(error)
    } finally {
      // setSubmitLoading(false)
    }
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

      {profile === null && (
        <Flex
          padding="15px"
        >
          <Formik
            initialValues={{
              fullName: "",
              birthdate: "",
              cpf: "",
              whatsapp: "",
              referred: ""
            }}
            onSubmit={(values) => {
              handleSubmitProfile(values)
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>

                <Text
                  lineHeight="20px"
                  textAlign="justify"
                  mb="20px"
                >
                  O Rifoo vai te dar controle sobre seu negócio.
                  Você pode controlar seus produtos e vendas, e também ter acesso a
                  relatórios e gráficos que vão te ajudar a melhorar seu negócio.
                </Text>

                <Text
                  lineHeight="20px"
                  fontWeight={700}
                  mb="20px"
                >
                  O primeiro mês é por nossa conta!
                </Text>

                <Text
                  lineHeight="20px"
                  textAlign="justify"
                  mb="20px"
                >
                  Utilize o Rifoo durante 30 dias, totalmente de graça!
                  Você não precisa cadastrar cartão de crédito.
                </Text>

                <Text
                  lineHeight="20px"
                  textAlign="justify"
                  mb="20px"
                >
                  Após esse período, você poderá renovar o Rifoo por apenas R$ 29.90/mês
                </Text>

                <Flex
                  direction="column"
                >
                  <FormControl
                    mb="25px"
                    isInvalid={!!errors.fullName && touched.fullName}
                  >
                    <FormLabel>Nome completo</FormLabel>
                    <Field
                      background="#fff"
                      as={Input}
                      id="fullName"
                      name="fullName"
                      validate={(value: string) => {
                        let error;

                        if (value === "") {
                          error = "Preencha seu nome completo";
                        }

                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.fullName}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    mb="25px"
                    isInvalid={!!errors.birthdate && touched.birthdate}
                  >
                    <FormLabel>Data de nascimento</FormLabel>
                    <Field
                      background="#fff"
                      as={Input}
                      id="birthdate"
                      name="birthdate"
                      type="date"
                      validate={(value: string) => {
                        let error;

                        if (value === "") {
                          error = "Preencha sua data de nascimento";
                        }

                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.birthdate}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    mb="25px"
                    isInvalid={!!errors.cpf && touched.cpf}
                  >
                    <FormLabel>CPF</FormLabel>
                    <Field
                      background="#fff"
                      as={Input}
                      id="cpf"
                      name="cpf"
                      validate={(value: string) => {
                        let error;

                        if (value === "") {
                          error = "Preencha seu CPF";
                        }

                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.cpf}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    mb="25px"
                    isInvalid={!!errors.whatsapp && touched.whatsapp}
                  >
                    <FormLabel>Whats app</FormLabel>
                    <Field
                      background="#fff"
                      as={Input}
                      id="whatsapp"
                      name="whatsapp"
                      validate={(value: string) => {
                        let error;

                        if (value === "") {
                          error = "Preencha seu whatsapp";
                        }

                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.whatsapp}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    mb="25px"
                  >
                    <FormLabel>Código de indicação</FormLabel>
                    <Field
                      background="#fff"
                      as={Input}
                      id="referred"
                      name="referred"
                    />
                  </FormControl>
                </Flex>

                <Button
                  type="submit"
                  background="brand.primary"
                  color="#fff"
                  width="100%"

                  // isLoading={submitLoading}

                  _hover={{
                    background: "brand.primary",
                    opacity: 0.8,
                  }}

                  marginBottom="15px"
                >
                  Salvar e continuar
                </Button>

              </form>
            )}
          </Formik>
        </Flex>
      )}
    </AuthProvider>
  )
}

export default Perfil