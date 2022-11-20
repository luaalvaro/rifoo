import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import CardVantagem from '../containers/CardVantagem';

const Vantagens = () => {
    return (
        <Flex
            width="100%"
            direction="column"
            overflowX="hidden"
            px="30px"
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
                    width={[365, 365, 365 * 1.1, 365 * 1.3, 365 * 1.5]}
                    height={[395, 395, 395 * 1.1, 395 * 1.3, 395 * 1.5]}
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

                <Flex
                    display={["none", "none", "none", "none", "flex"]}
                    flexWrap="wrap"
                    maxWidth="630px"
                    justify="space-between"
                    gridGap="15px"
                    mb="80px"
                >
                    <CardVantagem />
                    <CardVantagem />
                    <CardVantagem />
                    <CardVantagem />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Vantagens