import {
    Center,
    Flex,
    Text,
    FormControl,
    FormLabel,
    Input,
    Button,
    Heading,
    VStack,
    FormErrorMessage,
    Checkbox
} from '@chakra-ui/react'
import { Formik, Field } from 'formik'

const Cadastro = () => {

    return (
        <Center
            minHeight="100vh"
            background="#405090"
            flexDirection="column"
        >

            <Heading
                color="#fff"
                fontSize={44}
                mt="-30px"
                mb="30px"
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
                    textAlign="center"
                >
                    Criar uma conta
                </Heading>

                <Formik
                    initialValues={{
                        fullName: "",
                        email: "",
                        password: "",
                        confirmPassword: ""
                    }}
                    onSubmit={(values) => {
                        alert(JSON.stringify(values, null, 2));
                    }}
                >
                    {({ handleSubmit, errors, touched }) => (
                        <form onSubmit={handleSubmit}>
                            <VStack spacing={4} align="flex-start">

                                <FormControl isInvalid={!!errors.fullName && touched.fullName}>
                                    <FormLabel htmlFor="fullName">Seu nome</FormLabel>
                                    <Field
                                        as={Input}
                                        id="fullName"
                                        name="fullName"
                                        variant="filled"
                                        validate={(value: string) => {
                                            let error;

                                            if (value.length < 5) {
                                                error = "Seu nome precisa ter pelo menos 6 caracteres";
                                            }

                                            return error;
                                        }}
                                    />
                                    <FormErrorMessage>{errors.fullName}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={!!errors.email && touched.email}>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Field
                                        as={Input}
                                        id="email"
                                        name="email"
                                        variant="filled"
                                        validate={(value: string) => {
                                            let error;

                                            if (value.indexOf("@") === -1) {
                                                error = "Preencha um email válido";
                                            }

                                            return error;
                                        }}
                                    />
                                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={!!errors.password && touched.password}>
                                    <FormLabel htmlFor="password">Senha</FormLabel>
                                    <Field
                                        as={Input}
                                        id="password"
                                        name="password"
                                        type="password"
                                        variant="filled"
                                        validate={(value: string) => {
                                            let error;

                                            if (value.length < 5) {
                                                error = "Sua senha precisa ter pelo menos 6 caracteres";
                                            }

                                            return error;
                                        }}
                                    />
                                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={!!errors.confirmPassword && touched.confirmPassword}>
                                    <FormLabel htmlFor="confirmPassword">Confirmar senha</FormLabel>
                                    <Field
                                        as={Input}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        variant="filled"
                                        validate={(value: string) => {
                                            let error;

                                            if (value.length < 5) {
                                                error = "Sua senha precisa ter pelo menos 6 caracteres";
                                            }

                                            return error;
                                        }}
                                    />
                                    <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                                </FormControl>

                                <Button type="submit" colorScheme="purple" width="full">
                                    Criar conta
                                </Button>
                            </VStack>
                        </form>
                    )}
                </Formik>

                <Text textAlign="center">
                    Já tem uma conta? <b>Fazer login</b>
                </Text>
            </Flex>
        </Center>
    )
}

export default Cadastro