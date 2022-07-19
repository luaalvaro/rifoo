import { Flex, Heading, Menu, MenuButton, IconButton, MenuItem, MenuList } from '@chakra-ui/react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { style } from '../constants/globalTheme'
import Link from 'next/link'
import { BiLogIn } from 'react-icons/bi'
import supabase from '../services/supabase'
import { useRouter } from 'next/router'

const Header = () => {

    const router = useRouter()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        return router.push("/")
    }

    return (
        <Flex
            background="#fff"
            boxShadow="3px 5px 8px rgba(0,0,0,0.2)"
            p="15px"
            justify="space-between"
            align="center"
        >

            <Link href="/app">
                <a>
                    <Heading
                        color={style.color.primary}
                        fontSize={28}
                        cursor="pointer"
                    >
                        Rifoo
                    </Heading>
                </a>
            </Link>

            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    icon={<GiHamburgerMenu />}
                    variant='outline'
                />
                <MenuList>
                    <MenuItem icon={<GiHamburgerMenu />}>
                        New Tab
                    </MenuItem>
                    <MenuItem icon={<GiHamburgerMenu />}>
                        New Window
                    </MenuItem>
                    <MenuItem icon={<GiHamburgerMenu />}>
                        Open Closed Tab
                    </MenuItem>
                    <MenuItem
                        icon={<BiLogIn />}
                        onClick={() => handleLogout()}
                    >
                        Sair
                    </MenuItem>
                </MenuList>
            </Menu>
        </Flex>

    )
}

export default Header