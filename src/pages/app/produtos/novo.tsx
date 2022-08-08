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
    Spinner,
    Icon
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Header from '../../../components/Header'
import AuthProvider from '../../../components/AuthProvider'
import { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import supabase from '../../../services/supabase'
import imageCompression from 'browser-image-compression'
import { MdOutlineUploadFile } from 'react-icons/md'
import { FaTimes } from 'react-icons/fa'
import NumberFormat from 'react-number-format';

const NovoProduto = () => {

    const toast = useToast()
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [loadingCompression, setLoadingCompression] = useState(false)

    const [productURL, setProductURL] = useState("")
    const [productFILE, setProductFILE] = useState<File>()
    const [productName, setProductName] = useState("")
    const [productSellType, setProductSellType] = useState("unidade")
    const [productCostPrice, setProductCostPrice] = useState<number | undefined>(undefined)
    const [productSellPrice, setProductSellPrice] = useState<number | undefined>(undefined)

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
            !productCostPrice ||
            !productSellPrice
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

    const hasImage = productURL && !loadingCompression ? true : false

    const handleRemoveImage = () => {
        setProductFILE(undefined)
        setProductURL("")
    }

    return (
        <AuthProvider>
            <Header />

            <Text
                fontSize={18}
                mt="15px"
                mx="15px"
                userSelect="none"
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
                    id="imageProduct"
                >

                    {hasImage &&
                        <Flex
                            width="100%"
                            background="rgba(255,0,0,0.1)"
                            height="60px"
                            borderRadius="8px"
                            border="1px dashed #ccc"
                            alignItems="center"
                            justifyContent="center"
                            cursor="pointer"
                            gridGap="10px"
                            mb="10px"
                            userSelect="none"

                            _hover={{ bg: 'rgba(255,0,0,0.15)' }}

                            _active={{
                                bg: 'rgba(255,0,0,0.15)',
                                transform: 'scale(0.98)',
                                borderColor: '#bec3c9',
                            }}

                            _focus={{
                                boxShadow:
                                    '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                            }}

                            onClick={handleRemoveImage}
                        >
                            <Icon
                                as={FaTimes}
                                fontSize="28px"
                                opacity={0.8}
                            />

                            <Text
                                opacity={0.9}
                            >
                                Remover imagem
                            </Text>
                        </Flex>
                    }

                    {!hasImage &&
                        <FormLabel
                            width="100%"
                            display="flex"
                            background="#fff"
                            height="90px"
                            borderRadius="8px"
                            border="1px dashed #ccc"
                            alignItems="center"
                            justifyContent="center"
                            cursor="pointer"
                            gridGap="10px"
                        >
                            <Icon
                                as={MdOutlineUploadFile}
                                fontSize="28px"
                                opacity={0.8}
                            />

                            <Text
                                opacity={0.9}
                            >
                                Foto do produto
                            </Text>
                        </FormLabel>
                    }

                    {hasImage &&
                        <Flex
                            width="max-content"
                            position="relative"
                        >
                            <Image
                                src={productURL}
                                width={200}
                                height={200}
                            />
                        </Flex>
                    }

                    {loadingCompression && <Spinner />}

                    <Input
                        display="none"
                        type="file"
                        background="#fff"
                        onChange={(event) => handleImageUpload(event)}
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
                        <option value="unidade">Vou vender por unidade</option>
                        <option value="peso">Vou vender no peso</option>
                    </Select>
                </FormControl>

                <FormControl
                    id="priceCost"
                >
                    <FormLabel mb="0">
                        {productSellType === "unidade" ? "Preço de custo" : "Preço de custo do KG (Quilo)"}
                    </FormLabel>
                    <Text
                        mb="8px"
                        fontSize="sm"
                        color="grey"
                        textAlign="justify"
                    >
                        O preço de custo é o total que foi pago pelo produto.
                        Este valor <b>pode e deve</b> ser modificação futuramente.
                    </Text>

                    <NumberFormat
                        customInput={Input}
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        prefix={"R$ "}
                        allowNegative={false}
                        decimalScale={2}
                        fixedDecimalScale={true}

                        background="#fff"
                        value={productCostPrice}
                        onValueChange={(values) => setProductCostPrice(values.floatValue)}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel mb="0">
                        {productSellType === "unidade" ? "Preço de venda" : "Preço de venda do KG (Quilo)"}
                    </FormLabel>
                    <Text
                        mb="8px"
                        fontSize="sm"
                        color="grey"
                        textAlign="justify"
                    >
                        O preço de venda é o valor final que o seu cliente vai pagar.
                        Este valor também pode ser modificado a qualquer momento.
                    </Text>
                    <NumberFormat
                        customInput={Input}
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        prefix={"R$ "}
                        allowNegative={false}
                        decimalScale={2}
                        fixedDecimalScale={true}

                        background="#fff"
                        value={productSellPrice}
                        onValueChange={(values) => setProductSellPrice(values.floatValue)}
                    />
                </FormControl>

                <Button
                    my="30px"
                    colorScheme="green"
                    height="60px"

                    onClick={handleSubmit}

                    isLoading={loading}
                >
                    Adicionar produto à base
                </Button>
            </Flex >
        </AuthProvider>
    )
}

export default NovoProduto