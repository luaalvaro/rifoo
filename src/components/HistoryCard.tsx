import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import ProductsPreviewImages from './ProductsPreviewImages'

interface IHistoryCard {
    sale: Sale
    cardTitle?: string
}

const HistoryCard: React.FC<IHistoryCard> = ({ sale, cardTitle }) => {
    return (
        <Flex
            background="#fff"
            padding="10px"
            borderRadius="8px"
            boxShadow="0px 0px 10px rgba(0,0,0,0.1)"

            justify="space-between"

            direction="column"
            userSelect="none"

            _active={{
                bg: '#dddfe2',
                transform: 'scale(0.98)',
                borderColor: '#bec3c9',
            }}

            _focus={{
                boxShadow:
                    '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
            }}
        >
            <Flex
                justify="space-between"
                marginBottom="8px"
            >
                <Flex
                    direction="column"
                >
                    <Text
                        fontWeight={600}
                        fontSize="14px"
                    >
                        {cardTitle}
                    </Text>

                    <Text
                        fontSize="16px"
                    >
                        {new Date(sale.created_at).toLocaleString()}
                    </Text>

                </Flex>
                <Text
                    fontSize="16px"
                    fontWeight={600}
                >
                    R$ {(sale.total_price + sale.total_price_weight).toFixed(2)}
                </Text>
            </Flex>

            <Flex
                justify="flex-end"
                align="center"
            >
                {/* <Text
            width="max-content"
            fontSize="14px"
            fontStyle="italic"
            opacity={0.6}
        >
            Ver detalhes...
        </Text> */}

                <ProductsPreviewImages item={sale} />
            </Flex>
        </Flex>
    )
}

export default HistoryCard