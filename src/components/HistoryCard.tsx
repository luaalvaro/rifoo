import {
    Flex,
    Icon,
    Text,
} from '@chakra-ui/react'
import React from 'react'
import ProductsPreviewImages from './ProductsPreviewImages'
import { FaMoneyBillWave, FaRegCreditCard, FaCreditCard } from 'react-icons/fa'
import { BsXDiamondFill } from 'react-icons/bs'
import useSales from '../store/useSales'

const paymentMethods = [
    { id: 1, name: 'Chave PIX', icon: BsXDiamondFill },
    { id: 2, name: 'Dinheiro', icon: FaMoneyBillWave },
    { id: 3, name: 'Máquina de cartão - Débito', icon: FaCreditCard },
    { id: 4, name: 'Máquina de cartão - Crédito', icon: FaRegCreditCard },
]

interface IHistoryCard {
    sale: Sale
    cardTitle?: string,
    enableDetails?: boolean
}

const HistoryCard: React.FC<IHistoryCard> = ({ sale, cardTitle, enableDetails = true }) => {

    const { setShowSaleDetails } = useSales()

    const subtotal = (sale.total_price + sale.total_price_weight)
    const total = (subtotal - sale.discount).toFixed(2)

    return (
        <Flex
            background="#fff"
            padding="10px"
            borderRadius="8px"
            boxShadow="0px 0px 10px rgba(0,0,0,0.1)"

            justify="space-between"

            direction="column"
            userSelect="none"

            onClick={() => enableDetails && setShowSaleDetails(sale)}

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
                    {`R$ ${total}`}
                </Text>
            </Flex>

            <Flex
                justify="space-between"
                align="center"
            >
                <Icon
                    as={paymentMethods[sale.paymentMethod - 1]?.icon}
                    fontSize="25px"
                    opacity={0.5}
                />

                <ProductsPreviewImages item={sale} />
            </Flex>
        </Flex>
    )
}

export default HistoryCard