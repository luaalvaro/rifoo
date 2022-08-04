import {
    Flex,
    Skeleton,
    Stack,
    Text,
} from '@chakra-ui/react'
import Header from '../../components/Header'
import Container from '../../components/Container'
import supabase from '../../services/supabase'
import StatsCard from '../../components/StatsCard'
import useSWR from 'swr'

interface IResponse {
    message: string,
    stats: Stats
}

const fetcher = async () => {
    const session = supabase.auth.session()

    if (!session) throw new Error('No session')

    const response = await fetch('/api/sales', {
        method: 'POST',
        body: JSON.stringify({
            sessionToken: session.access_token
        })
    })

    const data: IResponse = await response.json()

    console.log(data)
    return data.stats
}

const MinhasVendas = () => {

    const { data: stats, error } = useSWR('produtos', fetcher)

    return (
        <Container>
            <Header />

            <Text
                fontSize={18}
                margin="15px"
                fontWeight={400}
                userSelect="none"
            >
                Minhas vendas
            </Text>

            {!stats &&
                <Stack>
                    <Skeleton h="20px" />
                    <Skeleton h="20px" />
                    <Skeleton h="20px" />
                </Stack>
            }

            {stats && !error &&
                <>
                    <Flex
                        padding="15px"
                        gridGap="15px"
                    >
                        <StatsCard
                            variant='upper'
                            title="Total de vendas"
                            value={stats.totalSales}
                            type="int"
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