import {
    Flex,
    Skeleton,
    Stack,
    Text,
} from '@chakra-ui/react'
import Header from '../../components/Header'
import AuthProvider from '../../components/AuthProvider'
import { useCallback, useEffect, useState } from 'react'
import supabase from '../../services/supabase'
import useOrder from '../../store/useOrder'
import { useRouter } from 'next/router'
import StatsCard from '../../components/StatsCard'
import ProductsPreviewImages from '../../components/ProductsPreviewImages'
import HistoryCard from '../../components/HistoryCard'
import { FaBoxOpen } from 'react-icons/fa'

interface IResponse {
    message: string,
    stats: Stats
}
const MinhasVendas = () => {

    const router = useRouter()
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
        <AuthProvider>
            <Header />

            <Text
                fontSize={18}
                margin="15px"
                fontWeight={400}
                userSelect="none"
            >
                Minhas vendas (últimos 7 dias)
            </Text>

            {loading &&
                <Stack px="15px">
                    <Skeleton h="20px" />
                    <Skeleton h="20px" />
                    <Skeleton h="20px" />
                </Stack>
            }

            {stats && !loading &&
                <>
                    <Flex
                        paddingX="15px"
                        gridGap="15px"
                        marginBottom="10px"
                    >
                        <StatsCard
                            variant='upper'
                            title="Total de vendas"
                            value={stats.qtd_sales}
                            type="int"
                        />

                        <StatsCard
                            variant='upper'
                            title="Itens vendidos"
                            value={stats.qtd_items_products}
                            type="int"
                        />
                    </Flex>

                    <Flex
                        paddingX="15px"
                        gridGap="15px"
                        marginBottom="10px"
                    >
                        <StatsCard
                            variant='upper'
                            title="Faturamento"
                            value={stats.total_sell_price}
                        />

                        <StatsCard
                            variant='upper'
                            title="Ticket médio venda"
                            value={stats.averagePrice}
                        />
                    </Flex>

                    <Flex
                        paddingX="15px"
                        gridGap="15px"
                        marginBottom="10px"
                    >
                        <StatsCard
                            variant='upper'
                            title="Custos totais"
                            value={stats.total_cost_price}
                        />

                        <StatsCard
                            variant='upper'
                            title="Lucro total"
                            value={stats.total_profit}
                        />
                    </Flex>

                    <Flex
                        padding="15px"

                        direction="column"
                        gridGap="10px"

                        marginBottom="30px"
                    >
                        <Text>Histórico</Text>

                        {stats.data.map((sale, index) => (
                            <HistoryCard key={index} sale={sale} />
                        ))}
                    </Flex>
                </>
            }

            {!stats && !loading &&
                <Flex
                    mt="80px"
                    direction="column"
                    align="center"
                >
                    <FaBoxOpen
                        fontSize={70}
                        opacity={.5}
                    />
                    <Text>Ooppps... Você ainda não fez nenhuma venda</Text>
                </Flex>
            }

        </AuthProvider>
    )
}

export default MinhasVendas