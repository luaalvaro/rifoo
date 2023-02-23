import { Center, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import { FaQuoteLeft } from 'react-icons/fa'

const CardProof = ({
    testimony,
    userName,
    date,
    userImage,
}: {
    testimony: string,
    userName: string,
    date: string,
    userImage: string
}) => {
    return (
        <Center
            width="307px"
            height="307px"

            background="#fff"
            boxShadow="0px 4px 12px rgba(0, 0, 0, 0.25)"

            flexDirection="column"
        >
            <Flex
                direction="column"
                align="center"
            >
                <FaQuoteLeft fontSize={50} color="#5465A7" />

                <Text
                    mt="15px"
                    fontSize="14px"
                    textAlign="center"
                    mx="15px"
                    lineHeight="18px"
                    color="#49454F"
                >
                    {testimony}
                </Text>

                <Flex
                    my="15px"
                    width="56px"
                    height="1px"
                    background="#A7A7A7"
                    borderRadius="100%"
                />

                <Flex
                    width="56px"
                    height="56px"
                    background="#CECECE"
                    borderRadius="100%"
                    overflow="hidden"
                >
                    <Image src={userImage} alt="" width={56} height={56} />
                </Flex>

                <Text color="#1C1B1F" fontWeight={500} mt="10px">{userName}</Text>
                <Text color="#1C1B1F" fontSize="14px">{date}</Text>
            </Flex>
        </Center>
    )
}

export default CardProof