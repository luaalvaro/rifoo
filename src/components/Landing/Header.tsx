import { Flex, Link as A } from "@chakra-ui/react"
import Logo from "../atoms/Logo"
import Link from 'next/link'
import { BiUserCircle } from "react-icons/bi"
import Button from "../atoms/Button"

const Header = () => {
    return (
        <Flex
            width="100%"
            position="fixed"

            top="0"
            background="#fff"
            zIndex={5}
            boxShadow="0px 8px 12px rgba(0, 0, 0, 0.15)"
            px="30px"
        >
            <Flex
                width="100%"
                maxWidth="1280px"
                mx="auto"
                height="65px"
                justify="space-between"
                align="center"

            >
                <Flex
                    gridGap="64px"
                >
                    <Logo />

                    <Flex
                        display={['none', 'none', 'none', 'flex', 'flex']}
                        fontSize="20px"
                        fontWeight={500}
                        color="#303030"

                        gridGap="32px"
                    >
                        <Link href="/#vantagens">
                            <A>Home</A>
                        </Link>

                        <Link href="/#vantagens">
                            <A>Vantagens</A>
                        </Link>

                        <Link href="/#vantagens">
                            <A>Planos</A>
                        </Link>
                    </Flex>
                </Flex>

                <Flex
                    width="max-content"
                    gridGap="16px"
                >
                    <Flex
                        display={['none', 'none', 'flex', 'flex', 'flex']}
                    >
                        <Button
                            width='200px'
                            label='Quero me cadastrar'
                        />
                    </Flex>

                    <Button
                        label='Login'
                        variant='outline'
                        width='100px'
                        leftIcon={<BiUserCircle fontSize="24px" />}
                    />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Header