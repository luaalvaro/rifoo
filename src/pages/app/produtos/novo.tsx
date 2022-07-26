import {
    Flex,
    Text,
    Link as A,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Toast,
    useToast,
    Center,
    Spinner
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Header from '../../../components/Header'
import Container from '../../../components/Container'
import { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import supabase from '../../../services/supabase'
import imageCompression from 'browser-image-compression'

const NovoProduto = () => {

    const toast = useToast()
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [loadingCompression, setLoadingCompression] = useState(false)

    const [productURL, setProductURL] = useState("")
    const [productFILE, setProductFILE] = useState<File>()
    const [productName, setProductName] = useState("")
    const [productSellType, setProductSellType] = useState("Por unidade")
    const [productCostPrice, setProductCostPrice] = useState("")
    const [productSellPrice, setProductSellPrice] = useState("")

    async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {

        if (!event.target.files) return

        setLoadingCompression(true)
        const imageFile = event.target.files[0];

        const options = {
            maxSizeMB: 0.3,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        }

        try {
            const compressedFile = await imageCompression(imageFile, options);
            setProductFILE(compressedFile)
            const newURL = URL.createObjectURL(compressedFile)
            return setProductURL(newURL)
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingCompression(false)
        }

    }

    const handleSubmit = async () => {
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

        const user = supabase.auth.user()

        if (!user)
            return

        setLoading(true)
        const { id } = user;
        let imageKey = ""

        if (productURL && productFILE) {

            try {
                const fileExt = productFILE.name.split('.').pop()
                const fileName = `${Math.random()}.${fileExt}`
                const filePath = `${id}/${fileName}`

                let { data, error: uploadError } = await supabase.storage
                    .from('products')
                    .upload(filePath, productFILE)

                if (uploadError) {
                    throw uploadError
                }

                if (!data || !data.Key)
                    throw "Key inexistente"

                imageKey = data?.Key

            } catch (error) {
                console.log(error)
            }

        }

        try {
            const { data, error } = await supabase
                .from('products')
                .insert({
                    product_name: productName,
                    product_sell_type: productSellType,
                    product_image_url: imageKey,
                    product_cost_price: productCostPrice,
                    product_sell_price: productSellPrice,
                    user_id: id,
                })
                .single()

            if (error)
                throw error

            toast({
                title: "Produto cadastrado",
                description: "Produto adicionado com sucesso",
                duration: 5000,
                status: "success"
            })

            return router.push('/app/produtos')
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

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
                <FormControl
                    id="imageProduct"
                >
                    <FormLabel>Foto do produto</FormLabel>

                    {productURL && !loadingCompression &&
                        <Image
                            src={productURL}
                            width={100}
                            height={100}
                        />
                    }

                    {loadingCompression && <Spinner />}

                    <Input
                        type="file"
                        background="#fff"
                        onChange={(event) => handleImageUpload(event)}
                    />
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

                <Button
                    mb="30px"
                    colorScheme="green"
                    height="60px"

                    onClick={handleSubmit}

                    isLoading={loading}
                >
                    Adicionar produto à base
                </Button>
            </Flex>
        </Container>
    )
}

export default NovoProduto