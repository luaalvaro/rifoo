import { Flex, Heading, Text, } from '@chakra-ui/react'
import React from 'react'
import Image from 'next/image'
import Button from '../atoms/Button'

const SecondaryHero = () => {
    return (
        <Flex
            marginTop="140px"
            background="#F2F2F2"
            direction="column"
            pb="30px"
        >
            <Flex
                mt="100px"
                mx="auto"
            >
                <Image
                    src="/celular04.png"
                    alt="Celular"
                    width={330}
                    height={530}
                />
            </Flex>

            <Flex
                direction="column"
            >
                <Heading
                    mt="50px"
                    fontFamily="Poppins"
                    mx="30px"
                    textAlign="center"
                    textTransform="uppercase"
                    fontSize="24px"
                    color="#405090"
                    fontWeight={300}
                >
                    CADASTRE-SE NA RIFOO E TENHA CONTROLE DO <br /><strong>SEU NEGÓCIO</strong>
                </Heading>

                <Text
                    color="#000"
                    opacity={0.7}
                    textAlign="center"
                    mx="30px"
                    mt="20px"
                    fontSize="14px"
                >
                    Cadastrar um produto no RIFOO é tão simples quanto responder 4 perguntas. Em menos de 01 minuto você cadastra o seu primeiro produto e já está apto para começar a registrar as suas vendas.
                </Text>
            </Flex>

            <Flex
                mt="30px"
                mb="60px"
                direction="column"
                mx="30px"
                gridGap="15px"
            >
                <Button
                    label='Login'
                    variant='outline'
                />

                <Button
                    label='Quero me cadastrar'
                />
            </Flex>
        </Flex>
    )
}

export default SecondaryHero