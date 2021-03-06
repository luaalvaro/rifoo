import {
    Flex,
    Skeleton,
    Stack,
    Text,
} from '@chakra-ui/react'
import Header from '../../components/Header'
import Container from '../../components/Container'
import { useEffect, useState } from 'react'
import supabase from '../../services/supabase'
import useOrder from '../../store/useOrder'
import { useRouter } from 'next/router'
import StatsCard from '../../components/StatsCard'

interface IResponse {
    message: string,
    stats: Stats
}
const MinhasVendas = () => {

    const router = useRouter()
    const order = useOrder(state => state)
    const [loading, setLoading] = useState(false)
    const [stats, setStats] = useState<Stats | null>(null)

    const fetchSales = async () => {

        const session = supabase.auth.session()
        if (!session) return router.push('/')

        try {
            setLoading(true)
            const response = await fetch('/api/sales', {
                method: 'POST',
                body: JSON.stringify({
                    sessionToken: session.access_token
                })
            })

            const data: IResponse = await response.json()

            console.log(data)
            setStats(data.stats)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
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

            {loading &&
                <Stack>
                    <Skeleton h="20px" />
                    <Skeleton h="20px" />
                    <Skeleton h="20px" />
                </Stack>
            }

            {stats && !loading &&
                <>
                    <Flex
                        padding="15px"
                        gridGap="15px"
                    >
                        <StatsCard
                            variant='upper'
                            title="Total de vendas"
                            value={stats.totalSales}
                        />

                        <StatsCard
                            variant='upper'
                            title="Faturamento"
                            value={stats.totalPrice}
                        />
                    </Flex>

                    <Flex
                        padding="15px"
                        gridGap="15px"
                    >
                        <StatsCard
                            variant='upper'
                            title="Custos totais"
                            value={stats.totalCostPrice}
                        />

                        <StatsCard
                            variant='upper'
                            title="Lucro total"
                            value={stats.totalProfit}
                        />
                    </Flex>
                </>
            }


        </Container>
    )
}

export default MinhasVendas