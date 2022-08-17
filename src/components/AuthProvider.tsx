import { Flex, Skeleton, Stack } from "@chakra-ui/react"
import { Session } from "@supabase/supabase-js"
import { useRouter } from "next/router"
import { useEffect, useState } from 'react'
import supabase from "../services/supabase"
import useSWR from 'swr'

interface IAuthProvider {
    children: React.ReactNode,
    permissions?: string[],
}

const fetcher = async (url: any) => await supabase
    .from(url)
    .select("*")
    .single()

const AuthProvider: React.FC<IAuthProvider> = ({ children, permissions }) => {

    const router = useRouter()
    const session = supabase.auth.session()

    const { data, error } = useSWR('profiles', fetcher)
    const profile = data?.data
    const loading = !data

    const hasPermission = () => {

        const authenticated = !!session
        const hasProfile = !!profile
        const atHomeApp = router.pathname === '/app'

        const isNewUser = authenticated && !hasProfile
        const newUserAtHome = isNewUser && atHomeApp
        const routeHasPermission = !!permissions

        console.log(loading)

        const userHasPermission = permissions?.includes(profile?.member_type)

        console.log(profile?.member_type);

        console.log({
            routeHasPermission,
            userHasPermission
        })

        if (!authenticated)
            return router.push('/login')

        if (isNewUser && !newUserAtHome)
            return router.push('/app')

        if (routeHasPermission && !userHasPermission)
            return router.push('/app')

        if (isNewUser && newUserAtHome)
            return true

        if (!isNewUser && hasProfile)
            return true

        return false
    }



    return (
        <>
            {loading &&
                <Stack>
                    <Skeleton height='20px' />
                    <Skeleton height='20px' />
                    <Skeleton height='20px' />
                </Stack>
            }

            {!loading && hasPermission() &&
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