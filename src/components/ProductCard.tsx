import { Flex, Text, Button, Stack, Skeleton, Center } from '@chakra-ui/react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import supabase from '../services/supabase'
import { useRouter } from 'next/router'
import useOrder from '../store/useOrder'

interface IProductCard {
    data: Product,
    type?: "sell",
}

const ProductCard: React.FC<IProductCard> = ({ data, type }) => {

    const order = useOrder(state => state)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [productUrl, setProductUrl] = useState<string | null>(null)

    const downloadImage = useCallback(async () => {

        const path = data.product_image_url.split("products/")[1]
        if (productUrl) return
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
            setProductUrl(url)

        } catch (error: any) {
            console.log('Error downloading image: ', error.message)
        } finally {
            setLoading(false)
        }

    }, [])

    useEffect(() => {
        downloadImage()
    }, [])

    const hasOrderItem = order.products.filter(item => item.id === data.id)

    return (
        <Flex
            bg="#fff"
            direction="column"
            gridGap="15px"
            px="15px"
            py="15px"
            borderRadius="8px"
            boxShadow="3px 5px 8px rgba(0,0,0,0.2)"
            cursor={type === "sell" ? "default" : "pointer"}

            onClick={type === "sell" ? undefined : () => router.push(`/app/produtos/${data.id}`)}
        >

            <Flex
                gridGap="20px"
            >
                {productUrl && !loading &&
                    <Image
                        src={productUrl}
                        width="120px"
                        height="120px"
                    />
                }

                {loading &&
                    <Stack
                        width="120px"
                    >
                        <Skeleton h="20px" />
                        <Skeleton h="20px" />
                        <Skeleton h="20px" />
                    </Stack>
                }

                <Flex
                    direction="column"
                    flex="1"
                >
                    <Text
                        fontWeight={700}
                        fontSize={18}
                    >
                        {data.product_name}
                    </Text>

                    <Text>
                        R$ {data.product_sell_price}/und
                    </Text>

                    {!type &&
                        <Text
                            fontStyle="italic"
                            mt="auto"
                            opacity={.7}
                        >
                            Ver mais
                        </Text>
                    }

                    {type === "sell" &&
                        <Center
                            flex="1"
                            gridGap="30px"
                        >
                            <Button
                                variant="ghost"
                                fontSize={40}
                                width="50px"
                                height="50px"

                                onClick={() => order.rmvItem(data)}
                            >
                                -
                            </Button>

                            <Text
                                fontWeight={700}
                                fontSize={35}
                            >
                                {hasOrderItem.length === 0 ? "0" : hasOrderItem[0].qtd_items}
                            </Text>

                            <Button
                                variant="ghost"
                                fontSize={40}
                                width="50px"
                                height="50px"

                                onClick={() => order.addItem(data)}
                            >
                                +
                            </Button>
                        </Center>
                    }
                </Flex>
            </Flex>

        </Flex >
    )
}

export default ProductCard