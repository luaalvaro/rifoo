import { Button, Center, Flex, FormControl, Input, InputGroup, InputRightAddon, List, ListIcon, ListItem, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { MdCheckCircle, MdContentCopy } from 'react-icons/md'
import usePayments from '../../store/usePayments'
import Image from 'next/image'
import moment from 'moment'

interface IProps {
    title: string,
    price: string,
}

const CardPricingSignature: React.FC<IProps> = ({ title, price }) => {

    const toast = useToast()
    const { newPayment, payment } = usePayments()

    const expiresAt = moment(payment?.date_of_expiration).fromNow()

    const handleCopyQr = () => {
        navigator.clipboard.writeText(`${payment?.qr_code}`)
        toast({
            status: 'success',
            title: 'QR Code copiado com sucesso!',
        })
    }
    return (
        <Flex
            background="#FFF"
            padding="15px"
            borderRadius="4px"
            direction="column"
            marginBottom="20px"
        >
            <Text
                width="100%"
                textAlign="center"
                fontSize={20}
            >
                {title}
            </Text>

            {!payment &&
                <>
                    <Flex
                        justify="center"
                        py="40px"
                        gridGap="15px"
                        align="flex-start"
                    >
                        <Text fontSize={20} lineHeight="32px">R$</Text>
                        <Text fontSize={40} lineHeight="40px">{price}</Text>
                    </Flex>

                    <List spacing={3} mb="20px">
                        <ListItem>
                            <ListIcon
                                as={MdCheckCircle}
                                color='green.500'
                                fontSize="20px"
                            />
                            Tenha acesso a todas as funcionalidades do Rifoo
                        </ListItem>
                    </List>

                    <Button
                        px="20px"
                        height="50px"
                        background="brand.primary"
                        color="#fff"

                        onClick={newPayment}

                        _hover={{ bg: 'brand.primaryDark' }}
                    >
                        Gerar QR Code
                    </Button>
                </>
            }

            {payment &&
                <Flex
                    py="20px"
                    align="center"
                    direction="column"
                >
                    {payment.qr_code_base64 &&
                        <Flex>
                            <Image
                                src={payment.qr_code_base64}
                                width={200}
                                height={200}
                            />
                        </Flex>
                    }

                    <Flex>
                        <Text fontSize={14} lineHeight="32px">R$</Text>
                        <Text fontSize={28} lineHeight="40px">{price}</Text>
                    </Flex>

                    <FormControl
                        id="qrCode"
                        mt="15px"
                    >
                        <InputGroup>
                            <Input
                                readOnly
                                value={payment.qr_code}
                                height="44px"
                            />
                            <InputRightAddon
                                p="0"
                                height="44px"
                                background="brand.primary"
                                overflow="hidden"
                            >
                                <Center
                                    h="100%"
                                    px="5"
                                    gridGap="10px"
                                    cursor="pointer"
                                    color="#fff"
                                    _hover={{ bg: 'brand.primaryDark' }}

                                    onClick={handleCopyQr}
                                >
                                    <MdContentCopy />
                                    Copiar
                                </Center>
                            </InputRightAddon>
                        </InputGroup>
                    </FormControl>

                    <Flex
                        mt="30px"
                        width="100%"
                        direction="column"
                    >
                        <Text
                            fontSize="14px"
                        >
                            O tempo para você pagar acaba <b>{expiresAt}</b>
                        </Text>
                        <Text></Text>
                    </Flex>
                </Flex>
            }
        </Flex>
    )
}

export default CardPricingSignature