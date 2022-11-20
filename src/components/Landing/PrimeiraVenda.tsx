import { Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import Image from 'next/image'

const PrimeiraVenda = () => {

    const shadow = "0px 30px 45px rgba(0, 0, 0, 0.25)"

    return (
        <Flex
            width="100%"
            paddingTop="140px"
            direction="column"

            overflowX="hidden"

            boxShadow={[shadow, shadow, shadow, shadow, "none"]}
        >
            <Flex
                display={['flex', 'flex', 'flex', 'flex', 'none']}
                px="30px"
                mb="35px"
            >
                <Heading
                    color="#27242456"
                    fontSize="60px"
                    lineHeight="60px"
                    fontWeight={900}
                    fontFamily="Poppins"
                >
                    SUA PRIMEIRA VENDA EM DOIS PASSOS
                </Heading>
            </Flex>

            <Flex
                maxWidth="1180px"
                background="#5465A7"
                direction="column"
                marginTop="40px"
                borderBottom="1px solid #5465A7"

                borderRightRadius={['0px', '0px', '0px', '60px', '60px']}
                position="relative"
            >
                <Flex
                    width={280}
                    height={487}
                    mx="auto"
                    mt="-40px"
                    direction="column"
                    position="relative"
                >
                    <Image
                        src="/celular01.png"
                        alt="Celular acessando o Rifoo"
                        width={280}
                        height={487}
                    />

                    <Flex
                        position="absolute"
                        left="-10"
                        bottom="-4"
                    >
                        <Text
                            fontFamily="Poppins"
                            fontSize="200px"
                            lineHeight="200px"
                            fontWeight={900}
                            color="#fff"
                            opacity="0.3"
                        >
                            1
                        </Text>
                    </Flex>
                </Flex>

                <Flex
                    width="100%"
                    mt="15px"
                    mb="40px"
                    direction="column"
                >
                    <Heading
                        color="#fff"
                        mx="auto"
                        textTransform="uppercase"
                        fontSize="26px"
                    >
                        Cadastre seu produto
                    </Heading>

                    <Text
                        color="#fff"
                        opacity={0.7}
                        textAlign="center"
                        px="30px"
                        mt="10px"
                        fontSize="14px"
                    >
                        Cadastrar um produto no RIFOO é tão simples quanto responder 4 perguntas. Em menos de 01 minuto você cadastra o seu primeiro produto e já está apto para começar a registrar as suas vendas.
                    </Text>
                </Flex>

                <Flex
                    display={['none', 'none', 'none', 'none', 'flex']}

                    position="absolute"
                    right={-300}
                    top={0}
                    bottom={0}

                    maxWidth={300}
                    px="30px"
                    mb="35px"

                    align="center"
                >
                    <Heading
                        color="#27242456"
                        fontSize="90px"
                        lineHeight="90px"
                        fontWeight={900}
                        fontFamily="Poppins"
                    >
                        SUA PRIMEIRA VENDA
                    </Heading>
                </Flex>
            </Flex>

            <Flex
                mt={[0, 0, 0, 100, 200]}
                ml="auto"
                maxWidth="1180px"
                background="#5465A7"
                direction="column"
                borderBottom="1px solid #5465A7"

                borderLeftRadius={['0px', '0px', '0px', '60px', '60px']}
                position="relative"
            >
                <Flex
                    mx="auto"
                    direction="column"
                    position="relative"
                >
                    <Flex
                        width={280}
                        height={487}
                        zIndex={1}
                    >
                        <Image
                            src="/celular02.png"
                            alt="Celular acessando o Rifoo"
                            width={280}
                            height={487}
                        />
                    </Flex>

                    <Flex
                        position="absolute"
                        left="-40px"
                        bottom="-4"
                    >
                        <Text
                            fontFamily="Poppins"
                            fontSize="200px"
                            lineHeight="200px"
                            fontWeight={900}
                            color="#fff"
                            opacity="0.3"
                        >
                            2
                        </Text>
                    </Flex>
                </Flex>

                <Flex
                    width="100%"
                    mt="15px"
                    mb="40px"
                    direction="column"
                >
                    <Heading
                        color="#fff"
                        mx="auto"
                        textTransform="uppercase"
                        fontSize="26px"
                    >
                        Faça sua primeira venda
                    </Heading>

                    <Text
                        color="#fff"
                        opacity={0.7}
                        textAlign="center"
                        px="30px"
                        mt="10px"
                        fontSize="14px"
                    >
                        Cadastrar um produto no RIFOO é tão simples quanto responder 4 perguntas. Em menos de 01 minuto você cadastra o seu primeiro produto e já está apto para começar a registrar as suas vendas.
                    </Text>
                </Flex>

                <Flex
                    display={['none', 'none', 'none', 'none', 'flex']}

                    position="absolute"
                    left={-410}
                    top={0}
                    bottom={0}

                    maxWidth={300}
                    px="30px"
                    mb="35px"

                    align="center"
                >
                    <Heading
                        color="#27242456"
                        fontSize="90px"
                        lineHeight="90px"
                        fontWeight={900}
                        fontFamily="Poppins"
                        textAlign="right"
                    >
                        EM DOIS PASSOS
                    </Heading>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default PrimeiraVenda