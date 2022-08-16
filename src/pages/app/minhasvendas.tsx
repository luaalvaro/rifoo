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
import moment from 'moment'

interface IResponse {
    message: string,
    stats: Stats
}
const MinhasVendas = () => {

    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [stats, setStats] = useState<Stats | null>(null)

    const generateStats = (data: Sale[]) => {

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

            data: data
        }
    }

    const fetchSales = async () => {
        const session = supabase.auth.session()
        if (!session) return router.push('/')

        try {
            setLoading(true)
            const last_week = moment().subtract(7, 'days').calendar();

            const { data, error } = await supabase
                .from<Sale>('sales')
                .select('*')
                .order('created_at', { ascending: false })
                .gte('created_at', last_week)

            if (error) throw error

            console.log(data, data.length)
            if (data.length !== 0) {
                console.log('Estatísticas das vendas geradas')
                let stats = generateStats(data);
                return setStats(stats)
            } else {
                return setStats(null)
            }
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