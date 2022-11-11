import { Flex, Heading, IconButton, Menu, MenuButton, MenuItem, Text, MenuList, Center } from '@chakra-ui/react'
import Image from 'next/image'
import { GiHamburgerMenu } from 'react-icons/gi'
import Logo from '../components/atoms/Logo'
import Head from 'next/head'
import Button from '../components/atoms/Button'
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import CardVantagem from '../components/containers/CardVantagem'
import CardProof from '../components/containers/CardProof'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const Home = () => {
    return (
        <Flex
            minHeight="100vh"
            direction='column'
        >

            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
            </Head>

            {/* HEADER */}
            <Flex
                position="fixed"

                top="0"

                background="#fff"
                zIndex={5}

                boxShadow="0px 8px 12px rgba(0, 0, 0, 0.15)"

                width="100%"
                height="65px"
                justify="space-between"
                align="center"
                px="40px"
            >
                <Logo />

                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<GiHamburgerMenu />}
                        variant='ghost'
                    />
                    {/* <MenuList>
                        <MenuItem>
                            Sair
                        </MenuItem>
                    </MenuList> */}
                </Menu>
            </Flex>

            {/* HERO */}
            <Flex
                width="100%"
                minHeight="max-content"
                background="radial-gradient(208.7% 631.97% at -51.69% 185.49%, rgba(0, 34, 164, 0.2) 23.05%, rgba(255, 255, 255, 0) 100%), radial-gradient(135.09% 508.11% at 114.35% -15.02%, rgba(81, 110, 222, 0.65) 6.2%, rgba(255, 255, 255, 0) 50.43%), #FFFFFF;"

                mt="65px"

                direction="column"
            >

                <Flex
                    width={359}
                    height={514}
                    mx="auto"
                >
                    <Image
                        src="/hero.png"
                        alt="Imagem de fundo"
                        width={359}
                        height={514}
                        quality={70}
                    />
                </Flex>

                <Flex
                    width="100%"
                    mt="40px"
                    direction="column"
                    gridGap="15px"
                >
                    <Heading
                        fontFamily="Poppins"
                        mx="15px"
                        textAlign="center"
                        textTransform="uppercase"
                        fontSize="24px"
                        color="#505050"
                    >
                        (PDV) Frente de Caixa para<br />Vendedores Ambulantes
                    </Heading>

                    <Text
                        mx="15px"
                        textAlign="center"
                        color="#505050"
                    >
                        Com o Rifoo, você tem o seu negócio na palma da sua mão.
                        Faça o seu cadastro e comece a vender agora mesmo!
                    </Text>
                </Flex>

                <Flex
                    mt="30px"
                    mb="60px"
                    direction="column"
                    mx="15px"
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

            {/* VANTAGENS */}
            <Flex
                width="100%"
                direction="column"
                overflowX="hidden"
            >
                <Flex
                    width="100%"
                    mt="40px"
                    direction="column"
                >
                    <Heading
                        width="100%"
                        fontFamily="Poppins"
                        mx="auto"
                        textAlign="center"
                        textTransform="uppercase"
                        fontSize="24px"
                        color="#4D5D99"
                    >
                        POR QUÊ USAR O RIFOO?
                    </Heading>

                    <Flex
                        width="155px"
                        height="2px"
                        mx="auto"
                        mt="10px"
                        background="#4D5D99"
                        borderRadius="50px"
                    />
                </Flex>

                <Flex
                    width={365}
                    height={395}
                    mx="auto"
                    mt="20px"
                >
                    <Image
                        src="/mockup.png"
                        alt="Rifoo mockup"
                        width={365}
                        height={395}
                        quality={70}
                    />
                </Flex>

                <Flex
                    my="40px"
                >
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={50}
                        slidesPerView={1}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}

                        pagination={{ clickable: true }}

                        centeredSlides={true}
                    >
                        <SwiperSlide><CardVantagem /></SwiperSlide>
                        <SwiperSlide><CardVantagem /></SwiperSlide>
                        <SwiperSlide><CardVantagem /></SwiperSlide>
                    </Swiper>
                </Flex>
            </Flex>

            {/* PROVAS SOCIAIS */}
            <Flex
                width="100%"
                direction="column"
                background="#f2f2f2"
                overflowX="hidden"
            >
                <Flex
                    width="100%"
                    mt="40px"
                    direction="column"
                >
                    <Heading
                        width="100%"
                        fontFamily="Poppins"
                        mx="auto"
                        textAlign="center"
                        textTransform="uppercase"
                        fontSize="24px"
                        color="#4D5D99"
                        fontWeight={400}
                    >
                        QUEM USA, <strong>APROVA</strong>
                    </Heading>

                    <Flex
                        width="155px"
                        height="2px"
                        mx="auto"
                        mt="10px"
                        background="#4D5D99"
                        borderRadius="50px"
                    />
                </Flex>

                <Flex
                    my="40px"
                >
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={50}
                        slidesPerView={1}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                        pagination={{ clickable: true }}
                        centeredSlides={true}
                    >
                        <SwiperSlide><CardProof /></SwiperSlide>
                        <SwiperSlide><CardProof /></SwiperSlide>
                        <SwiperSlide><CardProof /></SwiperSlide>
                    </Swiper>
                </Flex>
            </Flex>

            {/* PRIMEIRA VENDA */}
            <Flex
                width="100%"
                paddingTop="140px"
                direction="column"

                boxShadow="0px 30px 45px rgba(0, 0, 0, 0.25)"
            >
                <Flex
                    px="15px"
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
                    background="#5465A7"
                    direction="column"
                    marginTop="40px"
                    borderBottom="1px solid #5465A7"
                >
                    <Flex
                        width={268}
                        height={487}
                        mx="auto"
                        mt="-40px"
                        direction="column"
                        position="relative"
                    >
                        <Image
                            src="/celular01.png"
                            alt="Celular acessando o Rifoo"
                            width={268}
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
                            px="15px"
                            mt="10px"
                            fontSize="14px"
                        >
                            Cadastrar um produto no RIFOO é tão simples quanto responder 4 perguntas. Em menos de 01 minuto você cadastra o seu primeiro produto e já está apto para começar a registrar as suas vendas.
                        </Text>
                    </Flex>
                </Flex>

                <Flex
                    background="#5465A7"
                    direction="column"
                    borderBottom="1px solid #5465A7"
                >
                    <Flex
                        mx="auto"
                        direction="column"
                        position="relative"
                    >
                        <Flex
                            width={350}
                            height={493}
                            zIndex={1}
                        >
                            <Image
                                src="/celular02.png"
                                alt="Celular acessando o Rifoo"
                                width={350}
                                height={493}
                            />
                        </Flex>

                        <Flex
                            position="absolute"
                            left="-2"
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
                            px="15px"
                            mt="10px"
                            fontSize="14px"
                        >
                            Cadastrar um produto no RIFOO é tão simples quanto responder 4 perguntas. Em menos de 01 minuto você cadastra o seu primeiro produto e já está apto para começar a registrar as suas vendas.
                        </Text>
                    </Flex>
                </Flex>
            </Flex>

            {/* GERENCIAMENTO DE ESTOQUE AUTOMATICO */}
            <Flex
                marginTop="150px"
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

                    px="15px"
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
                        fontSize="32px"
                    >
                        Controle de estoque automático
                    </Heading>

                    <Text
                        color="#405090"
                        opacity={0.7}
                        textAlign="center"
                        px="15px"
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
        </Flex>
    )
}

export default Home