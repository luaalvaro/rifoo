import { Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import Button from '../atoms/Button'
import Image from 'next/image'

const EstoqueAutomatico = () => {
    return (
        <Flex
            width="100%"
            direction="column"
            minHeight="722px"
            position="relative"

            mt="130px"
            mb="250px"
            justify={["flex-end", "flex-end", "flex-end", "center", "center"]}
        >
            <Flex
                width="1936px"
                position="absolute"

                ml={["-850px", "-750px", "-650px", "-180px", "0"]}
                bottom="0"
                top="0"
            >
                <Image
                    src="/estoque.png"
                    quality={50}
                    alt=""
                    layout="fill"
                />

                <Flex
                    display={["flex", "flex", "flex", "none", "none"]}
                    width="100%"
                    position="absolute"
                    bottom="0"
                    top="0"

                    bg="linear-gradient(180deg, rgba(255,255,255,0) 50%, #fff 100%)"
                />
            </Flex>

            <Flex
                width={["100%", "100%", "100%", "620px", "620px"]}
                mt={["0", "0", "0", "120px", "120px"]}
                ml={["0", "0", "0", "80px", "80px"]}
                direction="column"
                px="30px"
                zIndex={1}

                position={["absolute", "absolute", "absolute", "initial", "initial"]}
                bottom={["-200px", "-200px", "-200px", "initial", "initial"]}
            >
                <Heading
                    color="#405090"
                    mx="auto"
                    textTransform="uppercase"
                    textAlign="center"
                    fontSize={["28px", "28px", "28px", "40px", "40px"]}
                >
                    Controle de estoque automático
                </Heading>

                <Text
                    color="#101010"
                    opacity={0.7}
                    textAlign="center"
                    mt="10px"
                    mb="30px"
                    fontWeight={500}
                    fontSize={["14px", "14px", "14px", "16px", "16px"]}
                >
                    Gerenciar estoque é algo extremamente importante, mas nós também sabemos que é chato, demorado e quase nunca conseguimos precisar os números.<br /><br />

                    Sabemos também que você às vezes acaba não vendendo uma ou outra unidade, não importa se o produto quebrou/estragou, ou você utilizou para consumo próprio, isso provavelmente iria desorganizar todo seu estoque e você ficaria desmotivado para continuar controlando seu negócio.
                </Text>

                <Button
                    label='Quero me cadastrar'
                />
            </Flex>
        </Flex>
    )
}

export default EstoqueAutomatico