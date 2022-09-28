import {
  Flex,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
  Stack,
  Skeleton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputRightAddon,
  Center,
} from '@chakra-ui/react'
import Header from '../../components/Header'
import AuthProvider from '../../components/AuthProvider'
import supabase from '../../services/supabase'
import { yyyyMMdd_to_ddMMyyyy } from '../../utils/dataHacks'
import LabelValue from '../../components/atoms/LabelValue'
import SignatureActions from '../../components/SignatureActions'
import { Field, Formik } from 'formik'
import useAuth from '../../store/useAuth'
import { useEffect } from 'react'
import { MdContentCopy } from 'react-icons/md'
import ModalBuyRifoo from '../../components/containers/ModalBuyRifoo'
import usePayments from '../../store/usePayments'
import NumberFormat from 'react-number-format'

const Perfil = () => {
  const { profile, fetchProfile } = useAuth()
  const toast = useToast()
  const { payment, clearPayment, newPayment } = usePayments()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const loading = profile === undefined
  const newPaymentLoading = isOpen && payment === undefined

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

  const handleCheckUpdatePayment = (payload: any) => {
    const newStatus = `${payload?.new?.transaction_status}`

    if (newStatus === 'approved') {
      toast({
        status: 'success',
        title: 'Pagamento aprovado!',
        duration: 15000,
      })
      toast({
        status: 'success',
        title: 'Aproveite o Rifoo Premium por 30 dias!',
        duration: 15000,
      })

      onClose()
      fetchProfile()
      return clearPayment()
    }
  }

  useEffect(() => {
    console.log('Criando inscrição')
    const profiles = supabase
      .from('payments')
      .on('UPDATE', handleCheckUpdatePayment)
      .subscribe()

    return () => {
      console.log('Removendo inscrição')
      supabase.removeSubscription(profiles)
    }
  }, [])
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

          <SignatureActions
            isLoading={newPaymentLoading}
            handleBuyRifoo={() => {
              newPayment(profile.fullName, profile.cpf),
                onOpen()
            }}
          />
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
                  fontWeight={700}
                  fontSize="24px"
                  lineHeight="24px"
                  mb="20px"
                >
                  Finalize o seu cadastro para continuar
                </Text>

                <Text
                  lineHeight="20px"
                  fontSize="14px"
                  textAlign="justify"
                  mb="10px"
                >
                  O Rifoo vai te dar controle sobre seu negócio.
                  Você pode controlar seus produtos, vendas e também ter acesso a
                  relatórios estatísticos que irão te ajudar a tomar as melhores decisões
                  a respeito do seu negócio.
                </Text>

                <Text
                  lineHeight="20px"
                  fontSize="14px"
                  fontWeight={700}
                  mb="10px"
                  color="brand.primary"
                >
                  O primeiro mês é por nossa conta!
                </Text>

                <Text
                  lineHeight="20px"
                  fontSize="14px"
                  textAlign="justify"
                  mb="20px"
                >
                  Utilize o Rifoo durante 30 dias, totalmente de graça!
                  Você não precisa cadastrar cartão de crédito. Após esse período, você poderá renovar o Rifoo por apenas R$ 29.90/mês
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
                      as={NumberFormat}
                      customInput={Input}
                      format="##/##/####"
                      id="birthdate"
                      name="birthdate"
                      validate={(value: string) => {
                        let error;

                        const birthDateRegex = new RegExp(/^\d{2}\/\d{2}\/\d{4}$/)

                        if (value === "") {
                          error = "Preencha sua data de nascimento";
                        }

                        if (!birthDateRegex.test(value)) {
                          error = "Data de nascimento inválida";
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
                      as={NumberFormat}
                      customInput={Input}
                      format="###.###.###-##"
                      id="cpf"
                      name="cpf"
                      validate={(value: string) => {
                        let error;

                        const cpfRegex = new RegExp(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)

                        if (value === "") {
                          error = "Preencha seu CPF";
                        }

                        if (!cpfRegex.test(value)) {
                          error = "CPF inválido";
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
                      as={NumberFormat}
                      customInput={Input}
                      format="(##) #####-####"
                      id="whatsapp"
                      name="whatsapp"
                      validate={(value: string) => {
                        let error;

                        const whatsappRegex = new RegExp(/^\(\d{2}\)\s\d{5}\-\d{4}$/)

                        if (value === "") {
                          error = "Preencha seu whatsapp";
                        }

                        if (!whatsappRegex.test(value)) {
                          error = "Whatsapp inválido";
                        }
                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.whatsapp}</FormErrorMessage>
                  </FormControl>

                  {/* <FormControl
                    mb="25px"
                  >
                    <FormLabel>Código de indicação</FormLabel>
                    <Field
                      background="#fff"
                      as={Input}
                      id="referred"
                      name="referred"
                    />
                  </FormControl> */}
                </Flex>

                <Button
                  type="submit"
                  background="brand.primary"
                  color="#fff"
                  width="100%"

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

      {payment && isOpen &&
        <ModalBuyRifoo
          payment={payment}
          onClose={onClose}
        />
      }
    </AuthProvider>
  )
}

export default Perfil