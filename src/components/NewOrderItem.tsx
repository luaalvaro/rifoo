import { Flex, Text, Button } from '@chakra-ui/react'
import Image from 'next/image'
import Biscoito from '../assets/biscoito.jpg'

const NewOrderItem = () => {
    return (
        <Flex
            direction="column"
            gridGap="15px"
            px="15px"
            pt="15px"
        >

            <Flex
                gridGap="20px"
            >
                <Image
                    src={Biscoito}
                    width="120px"
                    height="120px"
                />

                <Flex
                    direction="column"
                >
                    <Text
                        fontWeight={700}
                        fontSize={18}
                    >
                        Bolacha princesa und.
                    </Text>

                    <Text>
                        R$ 4,87/und
                    </Text>

                    <Flex
                        flex="1"
                        align="center"
                        justify="space-around"
                    >
                        <Button
                            height="100%"
                            width="50px"
                            fontSize={30}
                            bg="transparent"
                        >
                            -
                        </Button>
                        <Text
                            fontSize={35}
                        >
                            00
                        </Text>
                        <Button
                            height="100%"
                            width="50px"
                            fontSize={30}
                            bg="transparent"
                        >
                            +
                        </Button>
                    </Flex>
                </Flex>
            </Flex>

        </Flex>
    )
}

export default NewOrderItem