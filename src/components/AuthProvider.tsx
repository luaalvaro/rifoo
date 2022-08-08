import { Flex, Skeleton, Stack } from "@chakra-ui/react"
import { Session } from "@supabase/supabase-js"
import { useRouter } from "next/router"
import { useEffect, useState } from 'react'
import supabase from "../services/supabase"

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const router = useRouter()
    const [session, setSession] = useState<Session | null>(null)

    const handleWithAuth = () => {
        const session = supabase.auth.session()

        if (!session)
            return router.push("/")

        setSession(session)
    }

    useEffect(() => {
        handleWithAuth()
    }, [])

    return (
        <>
            {!session
                ?
                <Stack>
                    <Skeleton height='20px' />
                    <Skeleton height='20px' />
                    <Skeleton height='20px' />
                </Stack>
                :
                <Flex
                    minHeight="100vh"
                    background="brand.background"
                    flexDirection="column"
                >
                    {children}
                </Flex>
            }
        </>
    )
}

export default AuthProvider