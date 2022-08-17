import {
    Flex,
    Icon,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ProductsPreviewImages from './ProductsPreviewImages'
import { FaMoneyBillWave, FaRegCreditCard, FaCreditCard } from 'react-icons/fa'
import { BsXDiamondFill } from 'react-icons/bs'

const paymentMethods = [
    { id: 1, name: 'Chave PIX', icon: BsXDiamondFill },
    { id: 2, name: 'Dinheiro', icon: FaMoneyBillWave },
    { id: 3, name: 'Máquina de cartão - Débito', icon: FaCreditCard },
    { id: 4, name: 'Máquina de cartão - Crédito', icon: FaRegCreditCard },
]

interface IHistoryCard {
    sale: Sale
    cardTitle?: string
}

const HistoryCard: React.FC<IHistoryCard> = ({ sale, cardTitle }) => {

    const [showModal, setShowModal] = useState(false)
    const [data, setData] = useState<any>({})

    const handleGetListProducts = () => {
        const { products, products_weight } = sale

        const productsArray = JSON.parse(products)
        const productsWeightArray = JSON.parse(products_weight)

        setData({
            productsArray,
            productsWeightArray
        })
    }

    useEffect(() => {
        handleGetListProducts()
    }, [])

    return (
        <>
            {showModal &&
                <Modal isOpen={showModal} onClose={() => false}>
                    <ModalOverlay />
                    <ModalContent
                        mx="15px"
                    >
                        <ModalHeader>Comprovante da venda</ModalHeader>
                        <ModalCloseButton
                            onClick={() => setShowModal(false)}
                        />

                        <ModalBody
                            display="flex"
                            flexDirection="column"
                            gridGap="15px"
                        >
                            <Flex
                                flexDirection="column"
                                p="15px"
                                background="brand.backgroundCupom"
                            >
                                <Flex
                                    width="100%"
                                    justify="flex-end"
                                    mb="30px"
                                >
                                    <Text
                                        fontSize="14px"
                                        fontWeight={600}
                                    >
                                        {new Date(sale.created_at).toLocaleString()}
                                    </Text>
                                </Flex>

                                {
                                    data.productsArray
                                    && data.productsArray.length > 0
                                    && data.productsArray
                                        .map((product: any, index: number) => {
                                            return (
                                                <Flex
                                                    key={index}
                                                    width="100%"
                                                    justify="space-between"
                                                >
                                                    <Text
                                                        fontSize="14px"
                                                    >
                                                        {`${product.qtd_items}x ${product.product_name}`}
                                                    </Text>

                                                    <Text>
                                                        {`R$ ${product.product_sell_price * product.qtd_items}`}
                                                    </Text>
                                                </Flex>
                                            )
                                        })
                                }


                                {
                                    data.productsWeightArray
                                    && data.productsWeightArray.length > 0
                                    && data.productsWeightArray
                                        .map((product: any, index: number) => {
                                            return (
                                                <Flex
                                                    key={index}
                                                    width="100%"
                                                    justify="space-between"
                                                >
                                                    <Text
                                                        fontSize="14px"
                                                    >
                                                        {`${product.weight} kg ${product.product_name}`}
                                                    </Text>

                                                    <Text>
                                                        {`R$ ${product.product_sell_price * product.qtd_items}`}
                                                    </Text>
                                                </Flex>
                                            )
                                        })
                                }

                            </Flex>

                        </ModalBody>

                        <ModalFooter>
                            <Button
                                onClick={() => setShowModal(false)}
                                variant='ghost'
                            >
                                Fechar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            }

            <Flex
                background="#fff"
                padding="10px"
                borderRadius="8px"
                boxShadow="0px 0px 10px rgba(0,0,0,0.1)"

                justify="space-between"

                direction="column"
                userSelect="none"

                onClick={() => setShowModal(true)}

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

        </>
    )
}

export default HistoryCard