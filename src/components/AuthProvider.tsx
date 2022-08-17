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
    const { data, error } = useSWR('profiles', fetcher)
    const profile = data?.data
    const loading = !data

    const authorized = !!profile && (!!permissions
        ? permissions?.includes(profile.member_type)
        : true)

    useEffect(() => {
        if (!authorized) {
            router.push('/app')
        }
    }, [data])

    return (
        <>
            {!authorized
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