import { Button, Text } from '@chakra-ui/react'
import { style } from '../constants/globalTheme'
import { useRouter } from 'next/router'
import { AiOutlineShoppingCart } from 'react-icons/ai'

interface IHomeButton {
    title: string;
    href: string;
}

const HomeButtom: React.FC<IHomeButton> = ({ title, href }) => {

    const router = useRouter()

    return (
        <Button
            background="#fff"
            borderRadius="8px"
            height="80px"
            gridGap="10px"
            fontSize={20}
            color={style.color.primary}
            boxShadow="3px 5px 8px rgba(0,0,0,0.2)"
            cursor="pointer"

            onClick={() => router.push(href)}
        >
            {title}
        </Button>
    )
}

export default HomeButtom