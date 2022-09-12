import { Flex, Skeleton, Stack } from "@chakra-ui/react"
import { Session } from "@supabase/supabase-js"
import { useRouter } from "next/router"
import { useEffect, useState } from 'react'
import supabase from "../services/supabase"
import useSWR from 'swr'
import moment from "moment"
import useAuth from "../store/useAuth"

interface IAuthProvider {
    children: React.ReactNode,
    permissions?: string[],
}

const AuthProvider: React.FC<IAuthProvider> = ({ children, permissions }) => {

    const { profile, fetchProfile } = useAuth()
    const router = useRouter()
    const session = supabase.auth.session()

    const loading = profile === undefined

    const hasPermission = () => {
        console.log('Checando permissões do usuário')
        const authenticated = !!session
        const hasProfile = !!profile
        const atHomeApp = router.pathname === '/app'
        const atProfile = router.pathname === '/app/perfil'

        const isNewUser = authenticated && !hasProfile
        const newUserAtHome = isNewUser && atHomeApp
        const routeHasPermission = !!permissions

        const userHasPermission = permissions?.includes(`${profile?.member_type}`)

        if (!authenticated)
            return router.push('/')

        if (isNewUser && !atProfile)
            return router.push('/app/perfil')

        if (routeHasPermission && !userHasPermission)
            return router.push('/app')

        if (isNewUser && newUserAtHome)
            return true

        if (!isNewUser && hasProfile)
            return true

        return false
    }

    useEffect(() => {
        hasPermission()
    }, [profile])

    useEffect(() => {
        fetchProfile()
    }, [])
    return (
        <>
            {loading &&
                <Stack>
                    <Skeleton height='20px' />
                    <Skeleton height='20px' />
                    <Skeleton height='20px' />
                </Stack>
            }

            {!loading &&
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