import { Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import Button from '../atoms/Button'

const EstoqueAutomatico = () => {
    return (
        <Flex
            marginTop="150px"
            mb="250px"
            width="100%"
            background="url(/celular03.png)"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            direction="column"
            minHeight={636}

            position="relative"
        >
            <Flex
                width="100%"
                mt="auto"
                direction="column"
                position="absolute"

                justify="flex-end"

                px="30px"
                pb="50px"

                top="0"
                left="0"
                right="0"
                bottom="-220"
            >
                <Heading
                    color="#405090"
                    mx="auto"
                    textTransform="uppercase"
                    textAlign="center"
                    fontSize="28px"
                >
                    Controle de estoque automático
                </Heading>

                <Text
                    color="#405090"
                    opacity={0.7}
                    textAlign="center"
                    mt="10px"
                    mb="30px"
                    fontSize="14px"
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