import {
    Flex,
    Heading,
    Menu,
    MenuButton,
    IconButton,
    MenuItem,
    MenuList,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Text,
} from '@chakra-ui/react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { BiLogIn } from 'react-icons/bi'
import supabase from '../services/supabase'
import { useRouter } from 'next/router'
import useOrder from '../store/useOrder'

const Header = () => {

    const order = useOrder(state => state)
    const router = useRouter()
    const { isOpen, onToggle } = useDisclosure()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        return router.push("/")
    }

    const handleRedirectToHomePage = () => {
        if (order.products.length === 0) {
            return router.push('/app')
        } else {
            return onToggle()
        }
    }

    return (
        <Flex
            background="#fff"
            boxShadow="3px 5px 8px rgba(0,0,0,0.2)"
            p="15px"
            justify="space-between"
            align="center"
        >

            <Text
                color="brand.primary"
                fontSize={30}
                cursor="pointer"
                userSelect="none"
                fontWeight={600}

                onClick={handleRedirectToHomePage}
            >
                Rifoo
            </Text>

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

            <Modal isOpen={isOpen} onClose={onToggle}>
                <ModalOverlay />
                <ModalContent mx="15px">
                    <ModalHeader>Venda em andamento</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody >
                        <Text>
                            Você deseja descartar essa venda e voltar para o menu inicial?
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='red'
                            mr={3}
                            onClick={() => {
                                order.resetState()
                                return router.push('/app')
                            }}
                        >
                            Descartar venda
                        </Button>
                        <Button variant='ghost' onClick={onToggle}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>

    )
}

export default Header