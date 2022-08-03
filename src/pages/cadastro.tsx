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
    useToast,
    FormErrorMessage
} from '@chakra-ui/react'
import { Formik, Field } from 'formik'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import supabase from '../services/supabase'
import { useRouter } from 'next/router'

const Cadastro = () => {

    const router = useRouter()
    const toast = useToast()
    const [innerHeight, setInnerHeight] = useState(0)
    const [loading, setLoading] = useState(false)

    const handleSubmitForm = async (values: {
        fullName: string,
        email: string,
        password: string,
        confirmPassword: string
    }) => {

        const { fullName, email, password, confirmPassword } = values

        if (password !== confirmPassword)
            return toast({
                status: 'error',
                description: 'As senhas não coincidem!',
                duration: 7000,
            })

        try {
            setLoading(true)

            const { user, session, error } = await supabase
                .auth
                .signUp({
                    email: email,
                    password: password,
                }, {
                    redirectTo: "/app"
                })

            if (error)
                throw error

            toast({
                status: 'error',
                description: 'Cadastro criado com sucesso!',
                duration: 5000,
            })

            setTimeout(() => {
                return router.push('/app')
            }, 3000)
        } catch (error: any) {

            let messageShow = "Erro na criação do usuário";

            if (error.message === "User already registered") {
                messageShow = "Cadastro já encontrado para este email"
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

    useEffect(() => {
        setInnerHeight(window.innerHeight)
    }, [])

    return (
        <Center
            minHeight={innerHeight}
            background="brand.background"
            flexDirection="column"
        >
            <Flex
                mt="-25px"
                mb="25px"
                direction="column"
                align="center"
            >
                <Heading
                    color="brand.primary"
                    fontSize={44}
                >
                    Rifoo
                </Heading>

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
                    Fazer Cadastro
                </Heading>

                <Formik
                    initialValues={{
                        fullName: "",
                        email: "",
                        password: "",
                        confirmPassword: ""
                    }}
                    onSubmit={(values) => {
                        handleSubmitForm(values)
                    }}
                >
                    {({ handleSubmit, errors, touched }) => (
                        <form onSubmit={handleSubmit}>

                            <Flex
                                direction="column"
                            >
                                <FormControl
                                    mb="25px"
                                    isInvalid={!!errors.fullName && touched.fullName}
                                >
                                    <FormLabel>Seu nome</FormLabel>
                                    <Field
                                        as={Input}
                                        id="fullName"
                                        name="fullName"
                                        validate={(value: any) => {
                                            let error;

                                            if (value.length < 5 || value === "") {
                                                error = "Escreva seu nome corretamente";
                                            }

                                            return error;
                                        }}
                                    />
                                    <FormErrorMessage>{errors.fullName}</FormErrorMessage>
                                </FormControl>
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
                            </Flex>

                            <Flex
                                direction="column"
                            >
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
                                <FormControl
                                    mb="25px"
                                    isInvalid={!!errors.confirmPassword && touched.confirmPassword}
                                >
                                    <FormLabel>Confirme sua senha</FormLabel>
                                    <Field
                                        as={Input}
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        validate={(value: string) => {
                                            let error;

                                            if (value.length < 8) {
                                                error = "Confirme a sua senha";
                                            }

                                            return error;
                                        }}
                                    />
                                    <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
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
                            >
                                Cadastrar
                            </Button>

                        </form>
                    )}
                </Formik>

                <Flex>
                    <Text
                        mr="5px"
                    >
                        Já tem uma conta?
                    </Text>

                    <Link href="/">
                        <A
                            fontWeight={700}
                        >
                            Fazer login
                        </A>
                    </Link>
                </Flex>
            </Flex>
        </Center>
    )
}

export default Cadastro