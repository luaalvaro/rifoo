import {
    Flex,
    Skeleton,
    Stack,
    Text,
} from '@chakra-ui/react'
import Header from '../../../components/Header'
import AuthProvider from '../../../components/AuthProvider'
import supabase from '../../../services/supabase'
import { useRouter } from 'next/router'
import StatsCard from '../../../components/StatsCard'
import { FaBoxOpen } from 'react-icons/fa'
import useSWR from 'swr'

const sessionToken = supabase.auth.session()

const fetcher = (url: any) => fetch(url, {
    method: 'POST',
    body: JSON.stringify({ sessionToken: sessionToken?.access_token })
}).then(res => res.json()).then(data => data)

const MinhasVendas = () => {

    const { data, error } = useSWR('/api/admin/info', fetcher)
    const loading = !data

    const generateStats = (data: Sale[] | null | undefined) => {

        if (!data || data.length === 0) return null

        const qtd_sales = data.length

        let qtd_items_products = 0;
        data.forEach(sale => {
            const products: { qtd_items: number }[] = JSON.parse(sale.products)
            const products_weight: { qtd_items: number }[] = JSON.parse(sale.products_weight)

            qtd_items_products += products.reduce((acc, product) => acc + product.qtd_items, 0)

            return qtd_items_products += products_weight.length
        })

        const total_unit_price = data.reduce((acc, curr) => acc + curr.total_price, 0)
        const total_weight_price = data.reduce((acc, curr) => acc + curr.total_price_weight, 0)
        const averagePrice = (total_unit_price + total_weight_price) === 0 ? 0
            : (total_unit_price + total_weight_price) / qtd_sales

        const total_cost_unit_price = data.reduce((acc, curr) => acc + curr.total_cost_price, 0)
        const total_cost_weight_price = data.reduce((acc, curr) => acc + curr.total_cost_price_weight, 0)

        const total_sell_price = total_weight_price + total_unit_price
        const total_cost_price = total_cost_unit_price + total_cost_weight_price
        const total_profit = total_sell_price - total_cost_price

        const qtd_users_actives_ids = data.map(item => item.user_id)
        const qtd_users_actives = new Set(qtd_users_actives_ids).size

        const averageSellsPerActiveUser = qtd_users_actives === 0 ? 0 : qtd_sales / qtd_users_actives

        return {
            qtd_sales: qtd_sales,
            qtd_items_products: qtd_items_products,
            total_sell_price: total_sell_price,
            total_cost_price: total_cost_price,

            total_cost_unit_price: total_cost_unit_price,
            total_cost_weight_price: total_cost_weight_price,

            total_unit_price: total_unit_price,
            total_weight_price: total_weight_price,

            averagePrice: averagePrice,
            total_profit: total_profit,

            qtd_users_actives: qtd_users_actives,
            averageSellsPerActiveUser: averageSellsPerActiveUser,

            data: data
        }
    }

    const stats = generateStats(data?.data)

    return (
        <AuthProvider permissions={["admin"]}>
            <Header />

            <Text
                fontSize={18}
                margin="15px"
                fontWeight={400}
                userSelect="none"
            >
                Estatísticas da plataforma (últimos 30 dias)
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
                            title="Usuários ativos"
                            value={stats.qtd_users_actives}
                            type="int"
                        />

                        <StatsCard
                            variant='upper'
                            title="Média de vendas por usuário ativo"
                            value={stats.averageSellsPerActiveUser.toFixed(2)}
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
                    <Text>Ooppps... Nenhuma venda foi encontrada</Text>
                </Flex>
            }

        </AuthProvider>
    )
}

export default MinhasVendas