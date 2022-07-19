import { Flex, Heading, Menu, MenuButton, IconButton, MenuItem, MenuList } from '@chakra-ui/react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { style } from '../constants/globalTheme'
import Link from 'next/link'
const Header = () => {
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
                    <MenuItem icon={<GiHamburgerMenu />} command='⌘T'>
                        New Tab
                    </MenuItem>
                    <MenuItem icon={<GiHamburgerMenu />} command='⌘N'>
                        New Window
                    </MenuItem>
                    <MenuItem icon={<GiHamburgerMenu />} command='⌘⇧N'>
                        Open Closed Tab
                    </MenuItem>
                    <MenuItem icon={<GiHamburgerMenu />} command='⌘O'>
                        Open File...
                    </MenuItem>
                </MenuList>
            </Menu>
        </Flex>

    )
}

export default Header