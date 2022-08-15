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

                        {stats.data.map((item, index) => (
                            <Flex
                                key={index}
                                background="#fff"
                                padding="10px"
                                borderRadius="8px"
                                boxShadow="0px 0px 10px rgba(0,0,0,0.1)"

                                justify="space-between"

                                direction="column"
                            >
                                <Flex
                                    justify="space-between"
                                    marginBottom="15px"
                                >
                                    <Text
                                        fontSize="16px"
                                    >
                                        {new Date(item.created_at).toLocaleString()}
                                    </Text>

                                    <Text
                                        fontSize="16px"
                                        fontWeight={600}
                                    >
                                        R$ {(item.total_price + item.total_price_weight).toFixed(2)}
                                    </Text>
                                </Flex>

                                <Flex
                                    justify="space-between"
                                    align="center"
                                >
                                    <Text
                                        width="max-content"
                                        fontSize="14px"
                                        fontStyle="italic"
                                        opacity={0.6}
                                    >
                                        Ver detalhes...
                                    </Text>

                                    <ProductsPreviewImages item={item} />
                                </Flex>
                            </Flex>
                        ))}
                    </Flex>
                </>
            }


        </AuthProvider>
    )
}

export default MinhasVendas