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
    )
}

export default Vantagens