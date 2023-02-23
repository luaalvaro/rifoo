import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import CardProof from '../containers/CardProof';

const social = [
    {
        testimony: 'Meu faturamento aumentou depois que comecei a usar o Rifoo para controlar minhas vendas',
        date: '22/07/2022',
        userImage: '/assets/social/oldman.jpg',
        userName: 'João Carlos',
    },
    {
        testimony: 'Nunca mais perco informações importantes com esse sistema de controle',
        date: '02/09/2022',
        userImage: '/assets/social/oldman1.jpg',
        userName: 'Francisco',
    },
    {
        testimony: 'Não vivo mais sem esse software, que me ajuda a ter uma visão completa do meu negócio.',
        date: '29/11/2022',
        userImage: '/assets/social/lady.jpg',
        userName: 'Maria B',
    },
    {
        testimony: 'Agora consigo ter um controle melhor do meu estoque e fazer compras mais assertivas.',
        date: '11/01/2023',
        userImage: '/assets/social/oldman2.jpg',
        userName: 'Alberto Neto',
    },
    {
        testimony: 'Excelente custo-benefício, vale cada centavo investido.',
        date: '01/02/2023',
        userImage: '/assets/social/lady2.jpg',
        userName: 'Roberta Campos',
    },
    {
        testimony: 'Recomendo para todos os pequenos empreendedores que querem ter mais controle e lucratividade.',
        date: '12/11/2022',
        userImage: '/assets/social/youngman.jpg',
        userName: 'Matheus S',
    },
]

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
                    {social.map((item, index) => (
                        <SwiperSlide key={index}>
                            <CardProof
                                testimony={item.testimony}
                                date={item.date}
                                userImage={item.userImage}
                                userName={item.userName}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Flex>
        </Flex>
    )
}

export default Provas