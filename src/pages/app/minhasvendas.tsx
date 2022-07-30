import {
    Flex,
    Skeleton,
    Stack,
    Text,
} from '@chakra-ui/react'
import Header from '../../components/Header'
import Container from '../../components/Container'
import BottomMenuNewOrder from '../../components/BottomMenuNewOrder'
import { useEffect, useState } from 'react'
import supabase from '../../services/supabase'
import useOrder from '../../store/useOrder'
import { useRouter } from 'next/router'
import StatsCard from '../../components/StatsCard'

const MinhasVendas = () => {

    const router = useRouter()
    const order = useOrder(state => state)
    const [sales, setSales] = useState<Order[] | null>(null)

    const fetchSales = async () => {

        const session = supabase.auth.session()
        if (!session) return router.push('/')

        try {
            const response = await fetch('/api/sales', {
                method: 'POST',
                body: JSON.stringify({
                    sessionToken: session.access_token
                })
            })

            const data = await response.json()



            console.log(data)
            setSales(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchSales()
    }, [])

    return (
        <Container>
            <Header />

            <Text
                fontSize={18}
                margin="15px"
                fontWeight={400}
            >
                Minhas vendas
            </Text>

            <Flex
                // bg="red"
                padding="15px"
                gridGap="15px"
            >
                <StatsCard />
                <StatsCard />
            </Flex>
        </Container>
    )
}

export default MinhasVendas