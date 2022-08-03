import { Flex, Icon, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { IconType } from 'react-icons';
import { BsArrowRight } from 'react-icons/bs'

interface IHomeButton {
    title: string;
    href: string;
    icon: IconType;
}

const HomeButtom: React.FC<IHomeButton> = ({ title, href, icon }) => {

    const router = useRouter()

    return (
        <Flex
            background="#fff"
            borderRadius="8px"
            height="80px"
            fontSize={20}
            // color="rgba(0,0,0,0.85)"
            boxShadow="3px 5px 8px rgba(0,0,0,0.2)"
            cursor="pointer"
            userSelect="none"
            align="center"
            justify="space-between"

            _hover={{ bg: '#ebedf0' }}

            _active={{
                bg: '#dddfe2',
                transform: 'scale(0.98)',
                borderColor: '#bec3c9',
            }}

            _focus={{
                boxShadow:
                    '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
            }}

            onClick={() => router.push(href)}
        >

            <Flex>
                <Icon
                    as={icon}
                    fontSize={30}
                    mx="20px"
                    color="brand.primary"
                    opacity={0.7}
                />

                <Text
                    fontWeight={500}
                >
                    {title}
                </Text>
            </Flex>

            <Icon
                as={BsArrowRight}
                fontSize={20}
                mx="20px"
                justifySelf="right"
            />
        </Flex>
    )
}

export default HomeButtom