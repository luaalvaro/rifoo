import { Flex, Text, Link as A } from '@chakra-ui/react'
import React from 'react'
import Logo from '../atoms/Logo'

const Footer = () => {
    return (
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
    )
}

export default Footer