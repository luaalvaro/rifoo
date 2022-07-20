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
import { style } from '../constants/globalTheme'
import { useState, useEffect } from 'react'
import supabase from '../services/supabase'
import { useRouter } from 'next/router'

const Login = () => {

    const router = useRouter()
    const toast = useToast()
    const [innerHeight, setInnerHeight] = useState(0)
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

        return router.push("/app")
    }

    useEffect(() => {
        setInnerHeight(window.innerHeight)
        checkIfLoggedUser()
    }, [])

    return (
        <Center
            minHeight={innerHeight}
            background={style.color.background}
            flexDirection="column"
        >
            <Flex
                mt="-50px"
                mb="50px"
                direction="column"
                align="center"
            >
                <Heading
                    color={style.color.primary}
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
                                background={style.color.primary}
                                color="#fff"
                                width="100%"

                                isLoading={loading}

                                _hover={{
                                    background: style.color.primary,
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