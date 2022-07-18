import { Flex } from "@chakra-ui/react"
import { useEffect, useState } from 'react'
import { style } from "../constants/globalTheme"

const Container = ({ children }: { children: React.ReactNode }) => {

    const [innerHeight, setInnerHeight] = useState(0)

    useEffect(() => {
        setInnerHeight(window.innerHeight)
    }, [])

    return (
        <Flex
            minHeight={innerHeight}
            background={style.color.background}
            flexDirection="column"
        >
            {children}
        </Flex>
    )
}

export default Container