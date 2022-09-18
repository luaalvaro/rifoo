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

    const [showContent, setShowContent] = useState(false)
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
        const newUserAtProfile = isNewUser && atProfile
        const routeHasPermission = !!permissions

        const userHasPermission = permissions?.includes(`${profile?.member_type}`)

        try {
            if (!authenticated) {
                console.log('Usuário não autenticado')
                return router.push('/')
            }
    
            if (profile === null && !atProfile) {
                console.log('Usuário não possui perfil')
                return router.push('/app/perfil')
            }
    
            if (routeHasPermission && !userHasPermission) {
                console.log('Usuário não possui permissão para acessar a rota')
                return router.push('/app')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setShowContent(true)
        }
    }

    useEffect(() => {
        if (!loading) {
            hasPermission()
        }
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

            {!loading && showContent &&
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