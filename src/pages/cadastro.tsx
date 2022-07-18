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
import { style } from '../constants/globalTheme'
import { useState, useEffect } from 'react'
import { BiLeftArrowAlt } from 'react-icons/bi'

const Cadastro = () => {

    const toast = useToast()
    const [formStep, setformStep] = useState(0)

    const handleSubmitForm = (values: {
        fullName: string,
        email: string,
        password: string,
        confirmPassword: string
    }) => {
        console.log(values)
    }

    const [innerHeight, setInnerHeight] = useState(0)

    useEffect(() => {
        setInnerHeight(window.innerHeight)
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
                <Flex
                    align="center"
                    gridGap="5px"

                    onClick={() => setformStep(0)}
                >
                    <BiLeftArrowAlt fontSize={24} />
                    <Heading
                        fontSize={20}
                    >
                        Fazer Cadastro
                    </Heading>
                </Flex>

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

                            {formStep === 0 &&
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
                            }

                            {formStep === 1 &&
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
                    )}
                </Formik>
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