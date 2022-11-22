import { Flex, Text, Heading, List, ListItem, ListIcon } from '@chakra-ui/react'
import React from 'react'
import Image from 'next/image'
import { MdCheckCircle } from 'react-icons/md'
import Button from '../atoms/Button'

const Oferta = () => {
    return (
        <Flex
            direction={["column", "column", "column", "row", "row"]}
            background="#405090"
            justify="space-around"
            align="center"

            width="100%"
            maxWidth="1280px"
            height={["initial", "initial", "initial", "768px", "768px"]}

            borderRadius="24px"
            mt="50px"
            mx="auto"
            py="35px"
            px="30px"
        >
            <Flex
                width={["100%", "100%", "100%", "421px", "421px"]}
                height={[294, 400, 600, "100%", "100%"]}
                overflow="hidden"
                borderRadius="24px"
                position="relative"
            >
                <Flex
                    display={["initial", "initial", "initial", "none", "none"]}
                >
                    <Image
                        src="/atriz.jpg"
                        alt="Atriz do Rifoo"
                        layout="fill"
                        quality="50"
                    />
                </Flex>

                <Flex
                    display={["none", "none", "none", "initial", "initial"]}
                >
                    <Image
                        src="/atrizdesktop.jpg"
                        alt="Atriz do Rifoo"
                        layout="fill"
                        quality="50"
                    />
                </Flex>

                <Flex
                    position="absolute"
                    left="0"
                    bottom="0"
                    top="0"
                    right="0"
                    bg="linear-gradient(190deg, rgba(255,255,255,0%) 0%, #0c183d 100%)"
                >
                    <Flex
                        width="100%"
                        mb="25px"
                        direction="column"
                        justify="flex-end"
                        px="15px"
                        gridGap="5px"
                    >
                        <Heading
                            color="#fff"

                            textTransform="uppercase"
                            fontSize="22px"
                        >
                            Seu negócio na palma da sua mão
                        </Heading>

                        <Text
                            color="#fff"
                            opacity={0.7}
                            fontSize="14px"
                        >
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum, ut?
                        </Text>
                    </Flex>
                </Flex>
            </Flex>

            <Flex
                width="100%"
                maxWidth="500px"
                direction="column"
            >
                <Flex>
                    <Heading
                        mt="30px"
                        width="100%"
                        fontFamily="Poppins"
                        mx="auto"
                        textAlign="center"
                        textTransform="uppercase"
                        fontSize="24px"
                        color="#ffffff"
                        fontWeight={300}
                    >
                        GARANTA UM DOS PLANOS E <strong>IMPULSIONE SUAS VENDAS</strong>
                    </Heading>
                </Flex>

                <Flex
                    background="#fff"
                    minHeight="400px"
                    borderRadius="16px"
                    mt="30px"
                    p="12px 24px"
                    direction="column"
                >
                    <Flex
                        width="100%"
                        justify="space-between"
                        align="center"
                        height="max-content"
                    >
                        <Flex
                            direction="column"
                        >
                            <Text
                                fontSize="28px"
                                fontWeight={700}
                            >
                                Simples
                            </Text>

                            <Flex width="50px" height="2px" background="#6676b6" />
                        </Flex>

                        <Flex gridGap="10px">
                            <Text
                                fontSize="16"
                                fontWeight={500}
                            >
                                R$
                            </Text>
                            <Text
                                fontSize="28px"
                                fontWeight={700}
                            >
                                7,99
                            </Text>
                        </Flex>
                    </Flex>

                    <List
                        mt="auto"
                        mb="25px"
                        spacing={3}
                    >
                        <ListItem>
                            <ListIcon as={MdCheckCircle} color='#405090' fontSize="20px" />
                            Cadastre até 15 produtos
                        </ListItem>

                        <ListItem>
                            <ListIcon as={MdCheckCircle} color='#405090' fontSize="20px" />
                            Tenha acesso a estatísticas e métricas do seu negócio
                        </ListItem>

                        <ListItem>
                            <ListIcon as={MdCheckCircle} color='#405090' fontSize="20px" />
                            Geração automática de QR Code PIX para facilitar o recebimento
                        </ListItem>

                        <ListItem>
                            <ListIcon as={MdCheckCircle} color='#405090' fontSize="20px" />
                            Cadastre até 01 colaborador
                        </ListItem>
                    </List>

                    <Button
                        label='Testar plano Simples'
                        variant='outline'
                    />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Oferta