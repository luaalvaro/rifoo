import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import CardVantagem from '../containers/CardVantagem';
import { TiMediaFastForwardOutline } from 'react-icons/ti';
import { SlMagnifier } from 'react-icons/sl';
import { AiOutlineSafetyCertificate } from 'react-icons/ai';
import { TfiLoop } from 'react-icons/tfi';

const Vantagens = () => {
    return (
        <Flex
            id="vantagens"
            width="100%"
            direction="column"
            overflowX="hidden"
            px="auto"
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
                width="100%"
                maxWidth="1280px"
                mx="auto"
                direction={["column", "column", "column", "column", "row"]}
                justify="space-between"
                mt="40px"
            >
                <Flex
                    width={[627.42 / 1.8, 627.42 / 1.7, 627.42 / 1.5, 627.42 / 1.5, 627.42 / 1.3]}
                    height={[806.34 / 1.8, 806.34 / 1.7, 806.34 / 1.5, 806.34 / 1.5, 806.34 / 1.3]}
                    mx={["auto", "auto", "auto", "auto", "0"]}
                    position="relative"
                >
                    <Image
                        src="/mockup.png"
                        alt="Rifoo mockup"
                        quality={70}
                        layout="fill"
                    />
                </Flex>

                <Flex
                    display={["flex", "flex", "flex", "flex", "none"]}
                    mb="40px"
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
                        <SwiperSlide>
                            <CardVantagem
                                title="Praticidade"
                                description="Não queremos atrapalhar o seu dia a dia, por isso focamos na praticidade da nossa plataforma"
                                Icon={TiMediaFastForwardOutline}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <CardVantagem
                                title="Transparência"
                                description="Tenha total controle do seu negócio. Acompanhe sua métricas com trânsparência"
                                Icon={SlMagnifier}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <CardVantagem
                                title="Segurança"
                                description="Estamos preocupados com a segurança dos seus dados. Por isso utilizamos servidores de altíssima qualidade"
                                Icon={AiOutlineSafetyCertificate}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <CardVantagem
                                title="Estoque automático"
                                description="Não precisa perder tempo controlando estoque. Controle apenas os produtos que você realmente vende"
                                Icon={TfiLoop}
                            />
                        </SwiperSlide>
                    </Swiper>
                </Flex>

                <Flex
                    display={["none", "none", "none", "none", "flex"]}
                    flexWrap="wrap"
                    maxWidth="630px"
                    justify="space-between"
                    gridGap="15px"
                    mb="80px"
                >
                    <CardVantagem
                        title="Praticidade"
                        description="Não queremos atrapalhar o seu dia a dia, por isso focamos na praticidade da nossa plataforma"
                        Icon={TiMediaFastForwardOutline}
                    />
                    <CardVantagem
                        title="Transparência"
                        description="Tenha total controle do seu negócio. Acompanhe sua métricas com trânsparência"
                        Icon={SlMagnifier}
                    />
                    <CardVantagem
                        title="Segurança"
                        description="Estamos preocupados com a segurança dos seus dados. Por isso utilizamos servidores de altíssima qualidade"
                        Icon={AiOutlineSafetyCertificate}
                    />
                    <CardVantagem
                        title="Estoque automático"
                        description="Não precisa perder tempo controlando estoque. Controle apenas os produtos que você realmente vende"
                        Icon={TfiLoop}
                    />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Vantagens