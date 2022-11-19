import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import CardProof from '../containers/CardProof';

const Provas = () => {
    return (
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
    )
}

export default Provas