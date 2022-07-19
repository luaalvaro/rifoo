import {
    Flex,
    Text,
    Link as A,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import Container from '../../components/Container'

const NovoProduto = () => {

    const router = useRouter()

    return (
        <Container>
            <Header />

            <Text
                fontSize={18}
                mt="15px"
                mx="15px"
            >
                Cadastrar novo produto
            </Text>

            <Flex
                direction="column"
                gridGap="15px"
                px="15px"
                pt="15px"
            >

                <FormControl>
                    <FormLabel>Nome do produto</FormLabel>
                    <Input
                        background="#fff"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Tipo de venda</FormLabel>
                    <Select
                        background="#fff"
                    >
                        <option>Venda unidade</option>
                        <option>Venda em Peso (Ex:. Kg)</option>
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel>Foto do produto</FormLabel>
                    <Input
                        type="file"
                        background="#fff"
                    />
                </FormControl>

                <Button
                    colorScheme="green"
                >
                    Adicionar produto à base
                </Button>
            </Flex>
        </Container>
    )
}

export default NovoProduto