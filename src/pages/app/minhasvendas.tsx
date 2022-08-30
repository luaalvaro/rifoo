import {
    Flex,
    Skeleton,
    Stack,
    Text,
    useDisclosure,
} from '@chakra-ui/react'
import Header from '../../components/Header'
import AuthProvider from '../../components/AuthProvider'
import { useCallback, useEffect, useState } from 'react'
import supabase from '../../services/supabase'
import StatsCard from '../../components/StatsCard'
import HistoryCard from '../../components/HistoryCard'
import { FaBoxOpen } from 'react-icons/fa'
import moment from 'moment'
import useSWR, { useSWRConfig } from 'swr'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';


moment.locale('pt-br')
const startWeek = moment().startOf('week').add(1, 'days').toISOString()
const endWeek = moment().endOf('week').add(1, 'days').toISOString()

const startLastWeek = moment().startOf('week').subtract((6), 'days').toISOString()
const endLastWeek = moment().endOf('week').subtract((6), 'days').toISOString()

const fetcher = async (url: any) => await supabase.from<Sale>(url)
    .select('*')
    .order('created_at', { ascending: false })
    .gte('created_at', startWeek)
    .lte('created_at', endWeek)

const MinhasVendas = () => {

    const { mutate } = useSWRConfig()
    const [periodSelected, setPeriodSelected] = useState('week')

    const { data, error } = useSWR('sales', fetcher)
    const loading = !data

    const { isOpen, onToggle } = useDisclosure()

    const handleGetTotalSalesOfDay = (data: Sale[] | null | undefined) => {
        if (!data || data.length === 0) return undefined

        let days = {
            seg: 0,
            ter: 0,
            qua: 0,
            qui: 0,
            sex: 0,
            sab: 0,
            dom: 0
        }

        data.forEach((sale: Sale) => {
            const sellDate = moment(sale.created_at).toDate().getDay()
            const total = (sale.total_price_weight + sale.total_price) - sale.discount

            switch (sellDate) {
                case 1:
                    days.seg += total
                    break;
                case 2:
                    days.ter += total
                    break;
                case 3:
                    days.qua += total
                    break;
                case 4:
                    days.qui += total
                    break;
                case 5:
                    days.sex += total
                    break;
                case 6:
                    days.sab += total
                    break;
                case 0:
                    days.dom += total
                    break;


                default:
                    break;
            }
        })

        const arrDays = Object.entries(days).map(item => ({
            label: item[0],
            value: item[1]
        }))

        console.log(arrDays)
        return arrDays
    }

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

        // criar um array separando as vendas por dia da semana
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

    const stats = generateStats(data?.data)
    const days = handleGetTotalSalesOfDay(data?.data)

    const handleChangePeriod = (period: "week" | "lastWeek") => {

        const start = period === "week" ? startWeek : startLastWeek
        const end = period === "week" ? endWeek : endLastWeek

        mutate('sales', async () => await supabase.from<Sale>('sales')
            .select('*')
            .order('created_at', { ascending: false })
            .gte('created_at', start)
            .lte('created_at', end)
            , false)

        setPeriodSelected(period)
        onToggle()
    }

    return (
        <AuthProvider>
            <Header />

            <Flex
                align="center"
                justify="space-between"
                margin="20px 15px"
                userSelect="none"
                fontSize={18}
            >
                <BsChevronLeft
                    cursor="pointer"
                    onClick={() => handleChangePeriod("lastWeek")}
                />
                <Text
                    fontSize={16}
                    fontWeight={600}
                >
                    {periodSelected === "week" ? "Esta semana" : "Semana passada"}
                </Text>
                <BsChevronRight
                    cursor="pointer"
                    onClick={() => handleChangePeriod("week")}
                />
            </Flex>

            <Flex
                paddingX="15px"
                gridGap="15px"
                marginBottom="10px"
            >
                <ResponsiveContainer width="100%" height={150}>
                    <BarChart
                        data={days}
                        margin={{
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" />
                        {/* <YAxis dataKey="value" /> */}
                        <Tooltip />
                        <Bar
                            dataKey="value"
                            name="Total"
                            fill="#42834F"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </Flex>

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