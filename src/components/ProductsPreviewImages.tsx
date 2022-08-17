import { Flex } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import supabase from '../services/supabase'
import Image from 'next/image'

interface IProductsPreview {
    item: Sale
}

const ProductsPreviewImages: React.FC<IProductsPreview> = ({ item }) => {

    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState<string[]>([])

    const products: ProductSell[] = JSON.parse(item.products)
    const productsWeight: ProductSellWeight[] = JSON.parse(item.products_weight)

    const paths = products?.map((product) => {
        return product.url_image_product
    })

    const pathsWeight = productsWeight?.map((product) => {
        return product.url_image_product
    })

    const urls = [...paths, ...pathsWeight]

    const downloadImage = useCallback(async (path: string) => {
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
            return url
        } catch (error: any) {
            console.log('Error downloading image: ', error.message)
        } finally {
            setLoading(false)
        }
    }, [])

    const handleDownloadImages = () => {
        urls.forEach(async (path: string) => {
            const newPath = path.split("products/")[1]

            if (!newPath)
                return

            const url = await downloadImage(newPath)

            if (url) {
                setImages(prev => [...prev, url])
            }
        })
    }

    useEffect(() => {
        if (images.length !== urls.length) {
            handleDownloadImages()
        }
    }, [])

    return (
        <Flex
            paddingLeft="10px"
            justify="flex-end"
        >
            {images.length > 0 && !loading && images.map((image, index) => {
                const order = images.length - index
                const opacity = (order / images.length) * 2

                return (
                    <Flex
                        key={index}
                        borderRadius="100%"
                        overflow="hidden"
                        zIndex={order}
                        marginLeft="-10px"
                        opacity={opacity}
                    >
                        <Image
                            key={index}
                            src={image}
                            width="30px"
                            height="30px"
                            alt="Product"
                            quality={10}
                        />
                    </Flex>
                )
            })}

        </Flex>
    )
}

export default ProductsPreviewImages