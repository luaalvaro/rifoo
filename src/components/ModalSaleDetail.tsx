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
    useDisclosure,
    useToast,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import useLoading from '../hooks/useLoading'
import useSales from '../store/useSales'

interface IProps {
    isOpen: boolean,
    onClose: () => void,
    sale: Sale
}

export const mockId = (id: string) => {
    let idMocked: any = id.split('-')
    idMocked = `${idMocked[0]}-****-${idMocked[3]}`

    return idMocked
}

const ModalSaleDetail: React.FC<IProps> = ({ isOpen, onClose, sale }) => {

    const toast = useToast()
    const { deleteSale } = useSales()
    const { loading, startLoading } = useLoading()
    const [data, setData] = useState<any>({})
    const {
        isOpen: isConfirmMode,
        onClose: onCloseConfirmMode,
        onOpen: onOpenConfirmMode
    } = useDisclosure()

    const handleGetListProducts = () => {
        const { products, products_weight } = sale

        const productsArray = JSON.parse(products)
        const productsWeightArray = JSON.parse(products_weight)

        setData({
            productsArray,
            productsWeightArray
        })
    }

    const handleDeleteProduct = async () => {
        const deleted = await startLoading(() => deleteSale(sale.id))

        if (deleted) {
            toast({
                title: 'Venda excluída com sucesso!',
                status: 'success',
                duration: 5000,
            })
            onClose()
        }
    }

    useEffect(handleGetListProducts, [sale])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
                mx="15px"
            >
                <ModalHeader>{isConfirmMode ? 'Atenção!!!' : 'Comprovante da venda'}</ModalHeader>
                <ModalCloseButton
                    onClick={onClose}
                />

                <ModalBody
                    display="flex"
                    flexDirection="column"
                    gridGap="15px"
                >

                    {isConfirmMode ? (
                        <>
                            <Flex
                                background="#fff"
                                direction="column"
                                gridGap="15px"
                            >
                                <Text
                                    textAlign="center"
                                >
                                    Tem certeza que deseja excluir essa venda?
                                    Esta ação não poderá ser desfeita.
                                </Text>

                                <Text
                                    textAlign="center"
                                >
                                    Clique novamente no botão de excluir para confirmar.
                                </Text>
                            </Flex>
                        </>
                    ) : (
                        <Flex
                            flexDirection="column"
                            p="15px"
                            background="brand.backgroundCupom"
                        >
                            <Flex
                                width="100%"
                                justify="space-between"
                                mb="30px"
                            >
                                <Text
                                    fontSize="14px"
                                    fontWeight={600}
                                >
                                    Venda realizada
                                </Text>

                                <Text
                                    fontSize="14px"
                                >
                                    {new Date(sale.created_at).toLocaleString()}
                                </Text>
                            </Flex>

                            <Flex
                                width="100%"
                                justify="space-between"
                            >
                                <Text
                                    fontSize="14px"
                                    fontWeight={600}
                                >
                                    Produtos
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
                                                    {`R$ ${product.product_sell_price * product.weight}`}
                                                </Text>
                                            </Flex>
                                        )
                                    })
                            }

                            <Flex
                                borderTop="1px solid rgba(0,0,0,0.1)"
                                marginTop="15px"
                                paddingTop="15px"
                                width="100%"
                                justify="space-between"
                            >
                                <Text
                                    fontSize="14px"
                                >
                                    Sub total
                                </Text>

                                <Text>
                                    {`R$ ${sale.total_price + sale.total_price_weight}`}
                                </Text>
                            </Flex>

                            <Flex
                                width="100%"
                                justify="space-between"
                            >
                                <Text
                                    fontSize="14px"
                                >
                                    Desconto
                                </Text>

                                <Text>
                                    {`R$ ${sale.discount ? sale.discount : 0}`}
                                </Text>
                            </Flex>

                            <Flex
                                marginTop="30px"
                                width="100%"
                                justify="space-between"

                                paddingBottom="20px"
                                borderBottom="1px solid rgba(0,0,0,0.1)"
                            >
                                <Text
                                    fontSize="14px"
                                    fontWeight={600}
                                >
                                    Total
                                </Text>

                                <Text>
                                    {`R$ ${(sale.total_price + sale.total_price_weight) - sale.discount}`}
                                </Text>
                            </Flex>

                            <Flex
                                marginTop="20px"
                                width="100%"
                                justify="space-between"
                            >
                                <Text
                                    fontSize="14px"
                                    fontWeight={600}
                                >
                                    ID Vendedor
                                </Text>

                                <Text>
                                    {`${mockId(sale.user_id)}`}
                                </Text>
                            </Flex>
                            <Flex
                                width="100%"
                                justify="space-between"
                            >
                                <Text
                                    fontSize="14px"
                                    fontWeight={600}
                                >
                                    ID da transação
                                </Text>

                                <Text>
                                    {`${mockId(sale.id)}`}
                                </Text>
                            </Flex>
                        </Flex>
                    )}

                </ModalBody>

                <ModalFooter
                    display="flex"
                    gridGap="20px"
                    justifyContent="space-between"
                    flexDirection={isConfirmMode ? 'row-reverse' : 'row'}
                >
                    <Button
                        variant='ghost'
                        leftIcon={<FaTrash
                            cursor="pointer"
                            opacity={0.75}
                        />}

                        isLoading={loading}

                        onClick={isConfirmMode ? handleDeleteProduct : onOpenConfirmMode}
                    >
                        Deletar
                    </Button>

                    <Button
                        onClick={onClose}
                        variant='ghost'
                    >
                        Fechar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalSaleDetail