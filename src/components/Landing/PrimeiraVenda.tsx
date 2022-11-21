import { Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import Image from 'next/image'

const PrimeiraVenda = () => {

    const shadow = "0px 30px 45px rgba(0, 0, 0, 0.25)"

    return (
        <Flex
            width="100%"
            // paddingTop="140px"
            direction="column"
            // height="100%"
            // minHeight="1650px"
            // borderBottom={"1px solid black"}

            overflowX="hidden"

            boxShadow={[shadow, shadow, shadow, "none", "none"]}
            p={["140px 0 0 0", "140px 0 0 0", "140px 0 0 0", "140px 0 140px 0", "140px 0 140px 0"]}
        >
            <Flex
                display={['flex', 'flex', 'flex', 'flex', 'none']}
                px="30px"
                mb="35px"
            >
                <Heading
                    color="#27242456"
                    fontSize={["60px", "60px", "60px", "80px", "80px"]}
                    lineHeight={["60px", "60px", "60px", "80px", "80px"]}
                    fontWeight={900}
                    fontFamily="Poppins"
                >
                    SUA PRIMEIRA VENDA EM DOIS PASSOS
                </Heading>
            </Flex>

            <Flex
                width="100%"
                marginTop={["40px", "40px", "40px", "100px", "100px"]}
                minHeight="450px"

                pr={[0, 0, 0, "30px", "30px"]}

                gridGap="40px"
            >
                <Flex
                    maxWidth="1180px"
                    background="#5465A7"

                    direction={['column', 'column', 'column', 'row', 'row']}

                    borderRightRadius={['0px', '0px', '0px', '60px', '60px']}
                    position="relative"

                    justify="center"
                    align="center"
                >
                    <Flex
                        position={["relative", "relative", "relative", "absolute", "absolute"]}
                        width={[431 / 1.6, 431 / 1.6, 431 / 1.6, 431 / 1.2, 431 / 1.2]}
                        height={[845 / 1.8, 845 / 1.8, 845 / 1.8, 845 / 1.3, 845 / 1.3]}
                        mx={['auto', 'auto', 'auto', '0', '0']}
                        mt={["-50px", "-50px", "-50px", "initial", "initial"]}

                        left={["0px", "0px", "0px", "8%", "0"]}
                    >
                        <Image
                            src="/celular01.png"
                            alt="Celular acessando o Rifoo"
                            layout="fill"
                        />

                        <Flex
                            position="absolute"
                            left={["-10", "-10", "-10", "100%", "100%"]}
                            bottom={["-4", "-4", "-4", "28%", "28%"]}
                        >
                            <Text
                                fontFamily="Poppins"
                                fontSize={["200px", "200px", "200px", "300px", "300px"]}
                                lineHeight={["200px", "200px", "200px", "300px", "300px"]}
                                fontWeight={900}
                                color="#fff"
                                opacity="0.3"
                            >
                                1
                            </Text>
                        </Flex>
                    </Flex>

                    <Flex
                        width={["100%", "100%", "100%", "100%", "100%"]}
                        mt="15px"
                        mb="40px"
                        direction="column"
                        px="30px"
                        ml={[0, 0, 0, "550px", "450px"]}
                    >
                        <Heading
                            width="100%"
                            color="#fff"
                            mx="auto"
                            textTransform="uppercase"
                            textAlign={["center", "center", "center", "left", "left"]}
                            fontSize={["26px", "26px", "26px", "32px", "32px"]}
                        >
                            Cadastre seu produto
                        </Heading>

                        <Text
                            width="100%"
                            color="#fff"
                            opacity={0.7}
                            textAlign={["center", "center", "center", "justify", "justify"]}
                            mt="10px"
                            fontSize={["14px", "14px", "14px", "18px", "18px"]}
                            maxWidth={["100%", "100%", "100%", "100%", "100%"]}
                        >
                            Cadastrar um produto no RIFOO é tão simples quanto responder 4 perguntas. Em menos de 01 minuto você cadastra o seu primeiro produto e já está apto para começar a registrar as suas vendas.
                        </Text>
                    </Flex>
                </Flex>

                <Flex
                    minWidth={424}
                    display={['none', 'none', 'none', 'none', 'flex']}
                    maxWidth={300}
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
                width="100%"
                marginTop={["0", "0", "0", "300px", "300px"]}
                minHeight="450px"

                pl={[0, 0, 0, "30px", "30px"]}

                justify="flex-end"
            >
                <Flex
                    minWidth="max-content"
                    display={['none', 'none', 'none', 'none', 'flex']}
                    maxWidth={300}
                    align="center"
                    pr="30px"
                >
                    <Heading
                        color="#27242456"
                        fontSize="90px"
                        lineHeight="90px"
                        fontWeight={900}
                        fontFamily="Poppins"
                    >
                        EM DOIS<br /> PASSOS
                    </Heading>
                </Flex>

                <Flex
                    maxWidth="1180px"
                    background="#5465A7"

                    direction={['column', 'column', 'column', 'row', 'row']}

                    borderLeftRadius={['0px', '0px', '0px', '60px', '60px']}
                    position="relative"
                    // justifySelf="flex-end"

                    justify="center"
                    align="center"
                >
                    <Flex
                        position={["relative", "relative", "relative", "absolute", "absolute"]}
                        width={[508 / 1.6, 508 / 1.6, 508 / 1.6, 508 / 1.2, 508 / 1.2]}
                        height={[845 / 1.8, 845 / 1.8, 845 / 1.8, 845 / 1.3, 845 / 1.3]}
                        mx={['auto', 'auto', 'auto', '0', '0']}
                        mt={["30px", "30px", "30px", "initial", "initial"]}

                        left={["0px", "0px", "0px", "8%", "20px"]}
                    >
                        <Image
                            src="/celular02.png"
                            alt="Celular acessando o Rifoo"
                            layout="fill"
                            style={{
                                zIndex: 1
                            }}
                        />

                        <Flex
                            position="absolute"
                            left={["-10", "-10", "-10", "90%", "90%"]}
                            bottom={["-4", "-4", "-4", "28%", "28%"]}
                        >
                            <Text
                                fontFamily="Poppins"
                                fontSize={["200px", "200px", "200px", "300px", "300px"]}
                                lineHeight={["200px", "200px", "200px", "300px", "300px"]}
                                fontWeight={900}
                                color="#fff"
                                opacity="0.3"
                            >
                                2
                            </Text>
                        </Flex>
                    </Flex>

                    <Flex
                        width={["100%", "100%", "100%", "100%", "100%"]}
                        mt="15px"
                        mb="40px"
                        direction="column"
                        px="30px"
                        ml={[0, 0, 0, "650px", "570px"]}
                    >
                        <Heading
                            width="100%"
                            color="#fff"
                            mx="auto"
                            textTransform="uppercase"
                            textAlign={["center", "center", "center", "left", "left"]}
                            fontSize={["26px", "26px", "26px", "32px", "32px"]}
                        >
                            Cadastre seu produto
                        </Heading>

                        <Text
                            width="100%"
                            color="#fff"
                            opacity={0.7}
                            textAlign={["center", "center", "center", "justify", "justify"]}
                            mt="10px"
                            fontSize={["14px", "14px", "14px", "18px", "18px"]}
                            maxWidth={["100%", "100%", "100%", "100%", "100%"]}
                        >
                            Cadastrar um produto no RIFOO é tão simples quanto responder 4 perguntas. Em menos de 01 minuto você cadastra o seu primeiro produto e já está apto para começar a registrar as suas vendas.
                        </Text>
                    </Flex>
                </Flex>
            </Flex>

            <Flex
                display="none"
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
                        position="relative"
                        width={431 / 1.6}
                        height={845 / 1.8}
                        zIndex={1}
                    >
                        <Image
                            src="/celular02.png"
                            alt="Celular acessando o Rifoo"
                            layout="fill"
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
        </Flex >
    )
}

export default PrimeiraVenda