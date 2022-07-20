import { Flex, Text, Button } from '@chakra-ui/react'
import Image from 'next/image'
import Biscoito from '../assets/biscoito.jpg'

interface IProductCard {
    data: Product
}

const ProductCard: React.FC<IProductCard> = ({ data }) => {
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
                <Image
                    src={Biscoito}
                    width="120px"
                    height="120px"
                />

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