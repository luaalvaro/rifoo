import { Center, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { GiButterfly } from 'react-icons/gi'

const CardVantagem = () => {
    return (
        <Center
            width="307px"
            height="307px"
            borderRadius="8px"

            background="#fff"
            boxShadow="0px 4px 12px rgba(0, 0, 0, 0.25)"

            color="#5465A7"

            flexDirection="column"
        >
            <Flex
                flexDirection="column"
                align="center"
                gridGap="5px"
            >
                <GiButterfly fontSize={50} />

                <Text
                    fontSize="32px"
                    fontWeight={500}
                >
                    Simplicidade
                </Text>

                <Text
                    fontSize="16px"
                    textAlign="center"
                    opacity={0.8}
                >
                    Não queremos te atrapalhar, por isso o Rifoo é simples e fácil de usar.
                </Text>
            </Flex>
        </Center>
    )
}

export default CardVantagem