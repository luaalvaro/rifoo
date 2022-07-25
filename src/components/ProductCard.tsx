import { Flex, Text, Button } from '@chakra-ui/react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import supabase from '../services/supabase'

interface IProductCard {
    data: Product
}

const ProductCard: React.FC<IProductCard> = ({ data }) => {

    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

    const downloadImage = useCallback(async () => {

        const path = data.product_image_url.split("products/")[1]
        if (avatarUrl) return

        try {
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
        }

    }, [])

    useEffect(() => {
        downloadImage()
    }, [])

    return (
        <Flex
            direction="column"
            gridGap="15px"
            px="15px"
            pt="15px"
        >

            <Flex
                gridGap="20px"
            >
                {avatarUrl &&
                    <Image
                        src={avatarUrl}
                        width="120px"
                        height="120px"
                    />
                }

                <Flex
                    direction="column"
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

                </Flex>
            </Flex>

        </Flex>
    )
}

export default ProductCard