import { Flex, Heading, IconButton, Menu, MenuButton, MenuItem, Text, MenuList, Link as A, List, ListItem, ListIcon } from '@chakra-ui/react'
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
import { MdCheckCircle } from 'react-icons/md'
import Link from 'next/link'

const Home = () => {
    return (
        <Flex
            minHeight="100vh"
            direction='column'
        >
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
                px="30px"
            >
                <Logo />

                <Button
                    label='Login'
                    variant='outline'
                    width='100px'
                    height='40px'
                />
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
                        mx="30px"
                        textAlign="center"
                        textTransform="uppercase"
                        fontSize="24px"
                        color="#505050"
                    >
                        (PDV) Frente de Caixa p/<br />Vendedores Ambulantes
                    </Heading>

                    <Text
                        mx="30px"
                        textAlign="center"
                        color="#505050"
                        fontSize="15px"
                    >
                        Com o Rifoo, você tem o seu negócio na palma da sua mão.
                        Faça o seu cadastro e comece a vender agora mesmo!
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
                    background="#5465A7"
                    direction="column"
                    marginTop="40px"
                    borderBottom="1px solid #5465A7"
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
                </Flex>
            </Flex>

            {/* GERENCIAMENTO DE ESTOQUE AUTOMATICO */}
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

            {/* OFERTA */}
            <Flex
                mt="50px"
                background="#405090"
                borderRadius="24px"
                py="35px"
                direction="column"
                px="30px"
            >
                <Flex
                    width="100%"
                    height={294}
                    overflow="hidden"
                    borderRadius="24px"
                    position="relative"
                >
                    <Image
                        src="/atriz.jpg"
                        alt="Atriz do Rifoo"
                        width={343 * 1.1}
                        height={294 * 1.1}
                    />

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

            {/* HERO 2*/}
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

            {/* FOOTER*/}
            <Flex
                background="#323232"
                justify="center"

                pt="35px"
                direction="column"
            >
                <Flex mx="auto">
                    <Logo variant="footer" />
                </Flex>

                <Text
                    color="#939393"
                    textAlign="center"
                    px="15px"
                    fontSize="14px"
                >
                    (PDV) FRENTE DE CAIXA PARA<br />VENDEDORES AMBULANTES
                </Text>

                <Flex
                    gridGap="35px"
                    color="#fff"
                    fontSize="22px"
                    justify="center"
                    my="50px"
                >
                    <A>Home</A>
                    <A>Vantagens</A>
                    <A>Planos</A>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Home