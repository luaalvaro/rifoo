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
import HomeButtom from '../../components/HomeButtom'
import { services } from '../../constants/defaultValues'
import supabase from '../../services/supabase'
import { useEffect, useState } from 'react'
import { Field, Formik } from 'formik'
import HistoryCard from '../../components/HistoryCard'
import { RiAdminFill } from 'react-icons/ri'
import moment from 'moment'
import Link from 'next/link'
const Home = () => {

  const toast = useToast()
  const [profile, setProfile] = useState<any>(null)
  const { isOpen, onToggle } = useDisclosure()
  const [loading, setLoading] = useState(false)
  const [lastSale, setLastSale] = useState<Sale | null>(null)
  const [stepProgress, setStepProgress] = useState(0)

  const userSignatureActive = typeof profile?.valid_until === 'string'
    && new Date(profile.valid_until) >= new Date()

  const handleSubmitProfile = async (values: any) => {
    const session = supabase.auth.session()
    if (!session) return

    try {
      setLoading(true)
      const response = await fetch('/api/createprofile', {
        method: 'POST',
        body: JSON.stringify({
          sessionToken: session.access_token,
          ...values
        })
      })

      const data = await response.json()

      if (data.message === "Success" && response.status === 200) {
        getUserProfile()
        toast({
          status: 'success',
          title: 'Perfil criado com sucesso!',
          description: 'Aproveite o Rifoo grátis durante 30 dias!',
          duration: 5000,
        })
        onToggle()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchLastSales = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('sales')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (error) throw error

      setLastSale(data)
    } catch (error) {

    } finally {
      setLoading(false)
    }
  }

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

  const signatureDate = moment(profile?.valid_until, "YYYY-MM-DD").fromNow()
  const signatureStatusDate = signatureDate.includes('há') ? 'atrasada' : 'atual'

  useEffect(() => {
    getUserProfile()
    fetchLastSales()
  }, [])

  return (
    <AuthProvider>
      <Header />
      {!userSignatureActive && !loading && profile &&
        <Flex
          width="100%"
          px="15px"
          py="15px"
        >
          <Link href="/app/perfil">
            <A
              width="100%"
              textAlign="center"
              color="red"
              fontSize="14px"
              lineHeight="16px"
            >
              Sua fatura está {signatureStatusDate} <b>{signatureDate}</b>
              <br /> clique aqui para renovar.
            </A>
          </Link>
        </Flex>
      }
      {
        loading &&
        <Stack padding="15px">
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      }

      {
        !loading && profile && (
          <>
            <Text
              fontSize={18}
              mt="15px"
              mx="15px"
              userSelect="none"
            >
              Boas vendas, <b>{profile?.fullName}</b>
            </Text>

            <Flex
              direction="column"
              gridGap="15px"
              px="15px"
              pt="15px"
            >
              {services.map(service => (
                <HomeButtom
                  key={service.title}
                  title={service.title}
                  icon={service.icon}
                  href={service.href}
                />
              ))}

              {profile?.member_type === "admin" &&
                <HomeButtom
                  title="Administração"
                  icon={RiAdminFill}
                  href="/app/admin"
                />
              }

              {lastSale &&
                <HistoryCard sale={lastSale} cardTitle="Última venda" />
              }
            </Flex>
          </>
        )
      }

      <Modal isOpen={isOpen} onClose={() => { }}>
        <ModalOverlay />
        <ModalContent
          mx="15px"
        >
          <ModalHeader>Bem vindo ao Rifoo</ModalHeader>

          <ModalBody
            display="flex"
            flexDirection="column"
            gridGap="15px"
          >
            {stepProgress === 0 &&
              <Flex
                marginBottom="20px"
                direction="column"
                gridGap="20px"
              >
                <Text
                  lineHeight="20px"
                  textAlign="justify"
                >
                  O Rifoo vai te dar controle sobre seu negócio.
                  Você pode controlar seus produtos e vendas, e também ter acesso a
                  relatórios e gráficos que vão te ajudar a melhorar seu negócio.
                </Text>

                <Text
                  lineHeight="20px"
                  fontWeight={700}
                >
                  O primeiro mês é por nossa conta!
                </Text>

                <Text
                  lineHeight="20px"
                  textAlign="justify"
                >
                  Utilize o Rifoo durante 30 dias, totalmente de graça!
                  Você não precisa cadastrar cartão de crédito.
                </Text>

                <Text
                  lineHeight="20px"
                  textAlign="justify"
                >
                  Após esse período, você poderá renovar o Rifoo por apenas R$ 29.90/mês
                </Text>

                <Button
                  background="brand.primary"
                  color="#fff"
                  width="100%"

                  isLoading={loading}

                  onClick={() => setStepProgress(1)}

                  _hover={{
                    background: "brand.primary",
                    opacity: 0.8,
                  }}
                >
                  Começar 30 dias grátis
                </Button>
              </Flex>
            }

            {stepProgress === 1 &&
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
                      Complete o seu cadastro com algumas informações
                      para começar com o seu período de 30 dias grátis.
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

                      isLoading={loading}

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
            }
          </ModalBody>
        </ModalContent>
      </Modal>
    </AuthProvider >
  )
}

export default Home