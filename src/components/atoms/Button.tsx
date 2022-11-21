import { Button as ButtonChakra } from '@chakra-ui/react'
import { JSXElementConstructor, ReactElement } from 'react'

interface IProps {
    label: string,
    onClick?: () => void,
    variant?: 'outline',
    width?: string,
    height?: string,
    leftIcon?: ReactElement<any, string | JSXElementConstructor<any>>,
}

const Button: React.FC<IProps> = ({ label, onClick, variant, height, width, leftIcon }) => {

    const background = variant === 'outline' ? 'transparent' : '#405090'
    const color = variant === 'outline' ? '#405090' : '#fff'
    const border = variant === 'outline' ? '1px solid #405090' : 'none'

    const backgroundActive = variant === 'outline' ? '#e5e7f0' : '#344072'

    return (
        <ButtonChakra
            onClick={onClick && onClick}

            width={width ? width : '100%'}
            height={height ? height : '50px'}

            borderRadius="100px"

            leftIcon={leftIcon}

            background={background}

            _hover={{
                background: backgroundActive
            }}

            _active={{
                background: backgroundActive
            }}
            color={color}
            border={border}
        >
            {label}
        </ButtonChakra>
    )
}

export default Button