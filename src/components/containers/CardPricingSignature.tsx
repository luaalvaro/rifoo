import { Button, Flex, List, ListIcon, ListItem, Text } from '@chakra-ui/react'
import React from 'react'
import { MdCheckCircle } from 'react-icons/md'

interface IProps {
    title: string,
    price: string,
}

const CardPricingSignature: React.FC<IProps> = ({ title, price }) => {
    return (
        <Flex
            background="#FFF"
            padding="15px"
            borderRadius="4px"
            direction="column"
            marginBottom="20px"
        >
            <Text
                width="100%"
                textAlign="center"
                fontSize={20}
            >
                {title}
            </Text>

            <Flex
                justify="center"
                py="40px"
                gridGap="15px"
                align="flex-start"
            >
                <Text fontSize={20} lineHeight="32px">R$</Text>
                <Text fontSize={40} lineHeight="40px">{price}</Text>
            </Flex>

            <List spacing={3} mb="20px">
                <ListItem>
                    <ListIcon as={MdCheckCircle} color='green.500' />
                    Tenha acesso a todas as funcionalidades do Rifoo
                </ListItem>
            </List>

            <Button
                px="20px"
                height="50px"
                background="brand.primary"
                color="#fff"

                _hover={{ bg: 'brand.primaryDark' }}
            >
                Gerar QR Code
            </Button>
        </Flex>
    )
}

export default CardPricingSignature