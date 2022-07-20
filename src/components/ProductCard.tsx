import { Flex, Text, Button } from '@chakra-ui/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import supabase from '../services/supabase'

interface IProductCard {
    data: Product
}

const ProductCard: React.FC<IProductCard> = ({ data }) => {

    const [signedURL, setSignedURL] = useState("")

    const getUrlImages = async () => {
        try {

            const path = data.product_image_url.split("products/")[1]

            const { data: resData, error } = await supabase
                .storage
                .from('products')
                .createSignedUrl(path, 3600)

            if (error) throw error

            if (!resData) return

            setSignedURL(resData.signedURL)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUrlImages()
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
                {signedURL !== "" &&
                    <Image
                        src={signedURL}
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