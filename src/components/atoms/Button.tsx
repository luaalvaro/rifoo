import { Button as ButtonChakra } from '@chakra-ui/react'

interface IProps {
    label: string,
    onClick?: () => void,
    variant?: 'outline'
}

const Button: React.FC<IProps> = ({ label, onClick, variant }) => {

    const background = variant === 'outline' ? 'transparent' : '#405090'
    const color = variant === 'outline' ? '#405090' : '#fff'
    const border = variant === 'outline' ? '1px solid #405090' : 'none'

    return (
        <ButtonChakra
            onClick={onClick && onClick}

            width="100%"
            height="50px"

            borderRadius="100px"

            background={background}
            color={color}
            border={border}
        >
            {label}
        </ButtonChakra>
    )
}

export default Button