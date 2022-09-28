import React, { useEffect } from 'react'
import { MdCheckCircle, MdContentCopy } from 'react-icons/md'
import usePayments from '../../store/usePayments'
// import Image from 'next/image'
import moment from 'moment'
import supabase from '../../services/supabase'
import {
    Flex,
    Text,
    Button,
    FormControl,
    FormLabel,
    Input,
    Image,
    FormErrorMessage,
    useToast,
    Stack,
    Skeleton,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    InputGroup,
    InputRightAddon,
    Center,
} from '@chakra-ui/react'

interface IProps {
    payment: any,
    onClose: () => void
}

const ModalBuyRifoo: React.FC<IProps> = ({ payment, onClose }) => {

    const toast = useToast()
    const expiresAt = moment(payment?.date_of_expiration).fromNow()

    const handleCopyQr = () => {
        navigator.clipboard.writeText(`${payment?.qr_code}`)
        toast({
            status: 'success',
            title: 'QR Code copiado com sucesso!',
        })
    }

    return (
        <Modal isOpen={true} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
                mx="20px"
            >
                <ModalHeader>Rifoo Premium 30 dias</ModalHeader>
                <ModalCloseButton onClick={onClose} />

                <ModalBody>
                    <Flex
                        py="15px"
                        justify="center"
                    >
                        <Image src="/pix.png" width="50%" />
                    </Flex>

                    {payment &&
                        <Flex

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
                                <Text fontSize={28} lineHeight="40px">29,90</Text>
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
                                    textAlign="justify"
                                >
                                    Faça o pagamento <b>{expiresAt}</b> para concluir a compra do Rifoo premium por 30 dias.
                                    O pagamento será confirmado automaticamente.
                                </Text>
                                <Text></Text>
                            </Flex>
                        </Flex>
                    }
                </ModalBody>

                <ModalFooter>
                    <Button variant='ghost' onClick={onClose}>Fechar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalBuyRifoo