import {
    Flex,
    Text,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    useToast,
    Spinner,
    Stack,
    Skeleton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Header from '../../../components/Header'
import Container from '../../../components/Container'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import supabase from '../../../services/supabase'


const DetalhesDoProduto = () => {

    const toast = useToast()
    const router = useRouter()

    const [loadingDelete, setLoadingDelete] = useState(false)
    const [loading, setLoading] = useState(false)
    const [productURL, setProductURL] = useState("")
    const [productPATH, setProductPATH] = useState("")
    const [productName, setProductName] = useState("")
    const [productSellType, setProductSellType] = useState("Por unidade")
    const [productCostPrice, setProductCostPrice] = useState("")
    const [productSellPrice, setProductSellPrice] = useState("")
    const [productId, setProductId] = useState("")

    const { isOpen, onToggle } = useDisclosure()

    const handleUpdateProduct = async () => {
        if (
            productName === "" ||
            productSellType === "" ||
            productCostPrice === "" ||
            productSellPrice === ""
        )
            return toast({
                title: "Informação necessária",
                description: "Preencha todas as informações do produto",
                duration: 5000,
                status: "error"
            })

        try {
            const { data, error } = await supabase
                .from('products')
                .update({
                    product_name: productName,
                    product_sell_price: productSellPrice,
                    product_cost_price: productCostPrice,
                    product_sell_type: productSellType,
                })
                .eq('id', productId)
                .single()

            if (error)
                throw error

            toast({
                title: 'Produto atualizado',
                description: 'Produto atualizado com sucesso',
                duration: 5000,
                status: 'success'
            })
            return router.push('/app/produtos')
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteProduct = async () => {
        try {
            setLoadingDelete(true)

            const { data, error } = await supabase
                .from('products')
                .delete()
                .eq('id', productId)

            if (error)
                throw error

        } catch (error) {
            console.log(error)
        }

        const path = productPATH.split('products/')[1]

        try {
            const { error } = await supabase
                .storage
                .from('products')
                .remove([
                    path
                ])

            if (error)
                throw error

            toast({
                title: 'Produto deletado',
                description: 'Produto deletado com sucesso',
                duration: 5000,
                status: 'success'
            })
            return router.push('/app/produtos')
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingDelete(false)
        }
    }

    const downloadImage = useCallback(async (imgPath: string) => {

        const path = imgPath.split("products/")[1]
        // if (avatarUrl) return
        try {
            setLoading(true)
            const { data, error } = await supabase
                .storage
                .from('products')
                .download(path)

            if (error)
                throw error

            if (!data)
                throw "Image não encontrada"

            const url = URL.createObjectURL(data)
            setProductURL(url)

        } catch (error: any) {
            console.log('Error downloading image: ', error.message)
        } finally {
            setLoading(false)
        }

    }, [])

    const fetchProduct = async (id: string | string[] | undefined) => {

        if (!id || typeof id !== 'string')
            return router.push('/app/produtos')

        try {
            setLoading(true)

            const { data, error } = await supabase
                .from<Product>('products')
                .select('*')
                .eq('id', id)
                .single()

            if (error)
                throw error

            downloadImage(data.product_image_url)
            setProductName(data.product_name)
            setProductSellPrice(String(data.product_sell_price))
            setProductSellType(data.product_sell_type)
            setProductCostPrice(String(data.product_cost_price))
            setProductId(data.id)
            setProductPATH(data.product_image_url)
        } catch (error: any) {
            console.log(error)

            if (error.code === "PGRST116")
                return router.push('/app/produtos')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const { id } = router.query

        fetchProduct(id)
    }, [])

    return (
        <Container>
            <Header />

            <Text
                fontSize={18}
                mt="15px"
                mx="15px"
            >
                Detalhes do produto
            </Text>

            {loading && !productId &&
                <Stack px="15px">
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                </Stack>
            }

            {productId &&
                <Flex
                    direction="column"
                    gridGap="15px"
                    px="15px"
                    pt="15px"
                >
                    <FormControl
                        id="imageProduct"
                    >
                        <FormLabel>Foto do produto</FormLabel>

                        {productURL &&
                            <Image
                                src={productURL}
                                width={100}
                                height={100}
                            />
                        }
                    </FormControl>

                    <FormControl
                        id="productName"
                    >
                        <FormLabel>Nome do produto</FormLabel>
                        <Input
                            background="#fff"
                            value={productName}
                            onChange={({ target }) => setProductName(target.value)}
                        />
                    </FormControl>

                    <FormControl
                        id="sellType"
                    >
                        <FormLabel>Tipo de venda</FormLabel>
                        <Select
                            background="#fff"
                            value={productSellType}
                            onChange={({ target }) => setProductSellType(target.value)}
                        >
                            <option>Por unidade</option>
                            <option>Venda em Peso (Ex:. Kg)</option>
                        </Select>
                    </FormControl>

                    <FormControl
                        id="priceCost"
                    >
                        <FormLabel>Preço de custo</FormLabel>
                        <Input
                            type="number"
                            background="#fff"
                            value={productCostPrice}
                            onChange={({ target }) => setProductCostPrice(target.value)}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Preço de venda</FormLabel>
                        <Input
                            type="number"
                            background="#fff"
                            value={productSellPrice}
                            onChange={({ target }) => setProductSellPrice(target.value)}
                        />
                    </FormControl>

                    <Text
                        fontSize="sm"
                        color="grey"
                        textAlign="justify"
                    >
                        Os valores salvos serão computados nas
                        transações efetivadas a partir deste momento. Informe um valor médio real para que os cálculos sejam feitos corretamente para você ter estatísticas mais precisas ao longo das transações
                    </Text>

                    <Flex gridGap="20px" mb="30px">
                        <Button
                            width="60%"
                            colorScheme="green"
                            height="60px"

                            onClick={handleUpdateProduct}

                            isLoading={loading}
                        >
                            Salvar
                        </Button>
                        <Button
                            width="40%"
                            colorScheme="red"
                            height="60px"

                            onClick={onToggle}

                            isLoading={loading}
                        >
                            Deletar
                        </Button>
                    </Flex>
                </Flex>
            }

            <Modal isOpen={isOpen} onClose={onToggle}>
                <ModalOverlay />
                <ModalContent mx="15px">
                    <ModalHeader>Tem certeza que você quer deletar<br /> este produto?</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody >
                        <Text>
                            Caso você prossiga com a confirmação,
                            este produto será removido da nossa base.
                            Essa ação é irreversível,
                            porém você poderá cadastrar outro produto quando quiser.
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='red'
                            mr={3}
                            onClick={handleDeleteProduct}
                            isLoading={loadingDelete}
                        >
                            Sim, deletar
                        </Button>
                        <Button variant='ghost' onClick={onToggle}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    )
}

export default DetalhesDoProduto