import { Flex, Heading, Text } from '@chakra-ui/react'
import { BiUserCircle } from 'react-icons/bi'
import Button from '../atoms/Button'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Hero = () => {

    const router = useRouter()

    return (
        <Flex
            id="hero"
            width="100%"
            minHeight="max-content"
            background="radial-gradient(208.7% 631.97% at -51.69% 185.49%, rgba(0, 34, 164, 0.2) 23.05%, rgba(255, 255, 255, 0) 100%), radial-gradient(135.09% 508.11% at 114.35% -15.02%, rgba(81, 110, 222, 0.65) 6.2%, rgba(255, 255, 255, 0) 50.43%), #FFFFFF;"
            pt="65px"
            px="30px"
            overflowX="hidden"
        >
            <Flex
                width="100%"
                maxWidth="1280px"
                mx="auto"

                direction={["column", "column", "column", "row-reverse", "row-reverse"]}
                justify="space-between"
                align="center"
            >
                <Flex>
                    <Flex
                        position="relative"
                        display={['flex', 'flex', 'flex', 'none', 'none']}
                        width={[359, 359 * 1.1, 359 * 1.25, 0, 0]}
                        height={[514, 514 * 1.1, 514 * 1.25, 0, 0]}
                    >
                        <Image
                            src="/hero.png"
                            alt="Imagem de fundo"
                            layout="fill"
                            quality={70}
                        />
                    </Flex>

                    <Flex
                        display={['none', 'none', 'none', 'flex', 'flex']}
                        width={[0, 0, 0, 948 / 1.75, 948 / 1.45]}
                        height={[0, 0, 0, 868 / 1.75, 868 / 1.45]}
                        mr="-2.2rem"
                        position="relative"
                    >
                        <Image
                            src="/hero-desktop.png"
                            alt="Imagem de fundo"
                            layout="fill"
                            quality={70}
                        />
                    </Flex>
                </Flex>

                <Flex
                    direction="column"
                >
                    <Flex
                        width="100%"
                        maxWidth={['initial', 'initial', 'initial', '580px', '580px']}
                        mt={["40px", "40px", "40px", "0", "0"]}
                        direction="column"
                        gridGap="15px"
                        textAlign={["center", "center", "center", "left", "left"]}
                        color="#505050"
                    >
                        <Heading
                            fontFamily="Poppins"
                            textTransform="uppercase"
                            fontSize={['24px', '24px', '24px', '32px', '36px']}
                        >
                            Frente de Caixa p/<br />Pequenos Empreendedores
                        </Heading>

                        <Text
                            color="#818181"
                            fontSize={['15px', '15px', '15px', '20px', '24px']}
                        >
                            Com o Rifoo, você tem o controle do seu negócio na palma da sua mão.
                            Faça o seu cadastro e comece a vender agora mesmo!
                        </Text>
                    </Flex>

                    <Flex
                        mt="30px"
                        mb="60px"
                        gridGap="15px"
                        direction={['column', 'column', 'column', 'row', 'row']}
                    >
                        <Flex
                            maxWidth={['100%', '100%', '100%', '140px', '140px']}
                        >
                            <Button
                                label='Login'
                                variant='outline'
                                leftIcon={<BiUserCircle fontSize="24px" />}
                                onClick={() => router.push('/login')}
                            />
                        </Flex>

                        <Flex
                            maxWidth={['100%', '100%', '100%', '180px', '180px']}
                        >
                            <Button
                                label='Quero me cadastrar'
                                onClick={() => router.push('#cadastro')}
                            />
                        </Flex>

                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Hero