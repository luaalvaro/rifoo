import { Flex, Heading, Text, } from '@chakra-ui/react'
import React from 'react'
import Image from 'next/image'
import Button from '../atoms/Button'
import { useRouter } from 'next/router'

const SecondaryHero = () => {

    const router = useRouter()
    return (
        <Flex
            marginTop="140px"
            background="#F3F3F3"
            direction={["column", "column", "column", "row", "row"]}
            justify="center"
            align="center"
            gridGap={["60px", "60px", "60px", "120px", "120px"]}
            py="100px"
        >
            <Flex
                width={330}
                height={530}
                position="relative"
            >
                <Image
                    src="/celular04.png"
                    alt="Celular"
                    layout="fill"
                />
            </Flex>

            <Flex
                direction="column"
                maxWidth="580px"

                justify="center"
            >
                <Heading
                    mt="50px"
                    fontFamily="Poppins"
                    mx="30px"
                    textAlign="center"
                    textTransform="uppercase"
                    fontSize={["24px", "24px", "24px", "40px", "40px"]}
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
                    fontSize={["14px", "14px", "14px", "18px", "18px"]}
                >
                    Cadastrar um produto no RIFOO é tão simples quanto responder 4 perguntas. Em menos de 01 minuto você cadastra o seu primeiro produto e já está apto para começar a registrar as suas vendas.
                </Text>

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
                        onClick={() => router.push('/login')}
                    />

                    <Button
                        label='Quero me cadastrar'
                        onClick={() => router.push('#cadastro')}
                    />
                </Flex>
            </Flex>

        </Flex>
    )
}

export default SecondaryHero