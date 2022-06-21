import {
    Center,
    Flex,
    Text,
    FormControl,
    FormLabel,
    Input,
    Button,
    Heading
} from '@chakra-ui/react'
import { useFormik } from 'formik'

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
            background="#405090"
            flexDirection="column"
        >

            <Heading
                color="#fff"
                fontSize={44}
                mt="-120px"
                mb="120px"
            >
                Rifoo
            </Heading>

            <Flex
                background="#fff"
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

                <Text>
                    Ainda não tem uma conta? <b>Cadastre-se</b>
                </Text>
            </Flex>
        </Center>
    )
}

export default Login