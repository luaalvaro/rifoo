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
    useToast
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import Link from 'next/link'
import { style } from '../constants/globalTheme'
import { useState } from 'react'

const Cadastro = () => {

    const toast = useToast()
    const [formStep, setformStep] = useState(0)

    const useError = (description: string) => {
        return toast({
            description: description,
            duration: 5000,
            status: 'error'
        })
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            fullName: '',
        },
        onSubmit: async (values) => {

            if (values.email === "")
                useError("O email não pode ser vazio")
            if (values.password === "")
                useError("A senha não pode ser vazia")
            if (values.fullName === "")
                useError("O seu nome não pode ser vazio")


        },
    })

    return (
        <Center
            minHeight="100vh"
            background={style.color.background}
            flexDirection="column"
        >
            <Flex
                mt="-35px"
                mb="35px"
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
                    Fazer Cadastro
                </Heading>

                <form onSubmit={formik.handleSubmit}>

                    {formStep === 0 &&
                        <Flex
                            direction="column"
                        >
                            <FormControl mb="25px">
                                <FormLabel>Seu nome</FormLabel>
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                />
                            </FormControl>
                            <FormControl mb="25px">
                                <FormLabel>Email</FormLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                            </FormControl>
                        </Flex>
                    }

                    {formStep === 1 &&
                        <Flex
                            direction="column"
                        >
                            <FormControl mb="25px">
                                <FormLabel>Senha</FormLabel>
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                            </FormControl>
                            <FormControl mb="25px">
                                <FormLabel>Confirme sua senha</FormLabel>
                                <Input
                                    type="password"
                                    id="password2"
                                    name="password2"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                />
                            </FormControl>
                        </Flex>
                    }

                    {formStep === 0 &&
                        <Button
                            background="#405090"
                            color="#fff"
                            width="100%"

                            onClick={() => setformStep(1)}
                            _hover={{
                                background: "#405090",
                                opacity: 0.8,
                            }}
                        >
                            Próximo
                        </Button>
                    }

                    {formStep === 1 &&
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
                            Cadastrar
                        </Button>
                    }
                </form>

                <Flex>
                    <Text
                        mr="5px"
                    >
                        Já tem uma conta?
                    </Text>

                    <Link href="/login">
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