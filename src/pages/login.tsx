import {
    Center,
    Flex,
    Text,
    FormControl,
    FormLabel,
    Input,
    Button,
    Heading,
    Link as A,
    FormErrorMessage,
    useToast
} from '@chakra-ui/react'
import { Field, Formik, useFormik } from 'formik'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import supabase from '../services/supabase'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Rifoo from '../assets/rifoo.svg'
import RifooDev from '../assets/rifoodev.svg'

const Login = () => {

    const stage = `${process.env.NEXT_PUBLIC_STAGE_APP}`
    const router = useRouter()
    const toast = useToast()
    const [loading, setLoading] = useState(false)

    const handleSubmitForm = async (values: {
        email: string,
        password: string,
    }) => {

        const { email, password } = values

        try {
            setLoading(true)

            const { user, session, error } = await supabase
                .auth
                .signIn({
                    email: email,
                    password: password
                })

            if (error)
                throw error

            router.push('/app')
        } catch (error: any) {

            let messageShow = "Erro ao fazer login";

            if (error.message === "Invalid login credentials") {
                messageShow = "As informações fornecidas estão erradas"
            }

            return toast({
                status: 'error',
                description: messageShow,
                duration: 3000,
            })
        } finally {
            setLoading(false)
        }
    }

    const checkIfLoggedUser = () => {
        const user = supabase.auth.user()

        if (!user)
            return

        toast({
            title: 'Bem vindo de volta',
            description: 'Tenha um excelente dia e ótimas vendas!',
            duration: 5000,
            status: 'success'
        })
        return router.push("/app")
    }

    useEffect(() => {
        checkIfLoggedUser()
    }, [])

    return (
        <Center
            minHeight="100vh"
            background="brand.background"
            flexDirection="column"
        >
            <Flex
                mt="-50px"
                mb="50px"
                direction="column"
                align="center"
            >
                <Image
                    src={stage === "dev" ? RifooDev : Rifoo}
                    alt="Rifoo"
                    width={208}
                    height={60}
                />

                <Text>
                    Seu negócio na palma da sua mão.
                </Text>
            </Flex>


            <Flex
                background="#fff"
                boxShadow="3px 5px 8px rgba(0,0,0,0.2)"
                borderRadius={8}
                padding={4}
                direction="column"
                gridGap="25px"
                minWidth={320}
            >

                <Heading
                    fontSize={20}
                >
                    Fazer Login
                </Heading>

                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    onSubmit={(values) => {
                        handleSubmitForm(values)
                    }}
                >
                    {({ handleSubmit, errors, touched }) => (
                        <form onSubmit={handleSubmit}>

                            <FormControl
                                mb="25px"
                                isInvalid={!!errors.email && touched.email}
                            >
                                <FormLabel>Email</FormLabel>
                                <Field
                                    as={Input}
                                    id="email"
                                    name="email"
                                    validate={(value: string) => {
                                        let error;

                                        if (value === "") {
                                            error = "Escreva seu melhor email";
                                        }

                                        if (value.indexOf("@") === -1) {
                                            error = "Escreva seu email corretamente";
                                        }

                                        if (value.indexOf(".") === -1) {
                                            error = "Escreva seu email corretamente";
                                        }

                                        return error;
                                    }}
                                />
                                <FormErrorMessage>{errors.email}</FormErrorMessage>
                            </FormControl>

                            <FormControl
                                isInvalid={!!errors.password && touched.password}
                                mb="25px"
                            >
                                <FormLabel>Senha</FormLabel>
                                <Field
                                    as={Input}
                                    type="password"
                                    id="password"
                                    name="password"
                                    validate={(value: string) => {
                                        let error;

                                        if (value.length < 8) {
                                            error = "Escreva uma senha com pelo menos 8 caracteres";
                                        }

                                        return error;
                                    }}
                                />
                                <FormErrorMessage>{errors.password}</FormErrorMessage>
                            </FormControl>

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
                            >
                                Entrar
                            </Button>

                        </form>
                    )}
                </Formik>

                <Flex>
                    <Text
                        mr="5px"
                    >
                        Ainda não tem uma conta?
                    </Text>

                    <Link href="/cadastro">
                        <A
                            fontWeight={700}
                        >
                            Cadastre-se
                        </A>
                    </Link>
                </Flex>
            </Flex>


        </Center>
    )
}

export default Login