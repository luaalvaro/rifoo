import { Flex, Text, Button, Stack, Skeleton, Center } from '@chakra-ui/react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import supabase from '../services/supabase'

interface IProductCard {
    data: Product
}

const ProductCard: React.FC<IProductCard> = ({ data }) => {

    const [loading, setLoading] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

    const downloadImage = useCallback(async () => {

        const path = data.product_image_url.split("products/")[1]
        if (avatarUrl) return
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
            setAvatarUrl(url)

        } catch (error: any) {
            console.log('Error downloading image: ', error.message)
        } finally {
            setLoading(false)
        }

    }, [])

    useEffect(() => {
        downloadImage()
    }, [])

    return (
        <Flex
            bg="#fff"
            direction="column"
            gridGap="15px"
            px="15px"
            py="15px"
            borderRadius="8px"
            boxShadow="3px 5px 8px rgba(0,0,0,0.2)"
            cursor="pointer"
        >

            <Flex
                gridGap="20px"
            >
                {avatarUrl && !loading &&
                    <Image
                        src={avatarUrl}
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

                    <Text
                        fontStyle="italic"
                        mt="auto"
                        opacity={.7}
                    >
                        Ver mais
                    </Text>
                </Flex>
            </Flex>

        </Flex >
    )
}

export default ProductCard