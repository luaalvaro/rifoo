import {
    Center,
    Flex,
    Text,
    FormControl,
    FormLabel,
    Input,
    Button,
    Heading,
    Link as A
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import Link from 'next/link'
import { style } from '../constants/globalTheme'

const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            senha: '',
        },
        onSubmit: async (values) => {

        },
    })

    return (
        <Center
            minHeight="100vh"
            background={style.color.background}
            flexDirection="column"
        >
            <Flex
                mt="-80px"
                mb="80px"
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
                    Fazer login
                </Heading>

                <form onSubmit={formik.handleSubmit}>
                    <FormControl mb="25px">
                        <FormLabel>Email</FormLabel>
                        <Input
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                    </FormControl>

                    <FormControl mb="25px">
                        <FormLabel>Senha</FormLabel>
                        <Input
                            type="password"
                            id="senha"
                            name="senha"
                            value={formik.values.senha}
                            onChange={formik.handleChange}
                        />
                    </FormControl>

                    <Button
                        type="submit"
                        background="#405090"
                        color="#fff"
                        width="100%"

                        _hover={{
                            background: "#405090",
                            opacity: 0.8,
                        }}
                    >
                        Entrar
                    </Button>
                </form>

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