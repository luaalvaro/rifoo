import {
    Flex,
    Skeleton,
    Stack,
    Text,
} from '@chakra-ui/react'
import Header from '../../components/Header'
import AuthProvider from '../../components/AuthProvider'
import { useEffect, useState } from 'react'
import StatsCard from '../../components/StatsCard'
import HistoryCard from '../../components/HistoryCard'
import { FaBoxOpen } from 'react-icons/fa'
import moment from 'moment'
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
import useSales from '../../store/useSales'

moment.locale('pt-br')

const MinhasVendas = () => {

    const sales = useSales(state => state)

    const loading = !sales.sales

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

    const stats = generateStats(sales.sales)
    const days = handleGetTotalSalesOfDay(sales.sales)

    useEffect(() => {
        sales.fetchSales()
    }, [])

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
                    onClick={() => sales.fetchSales("prev")}
                />
                <Text
                    fontSize={16}
                    fontWeight={600}
                >
                    {sales.weekLabel}
                </Text>
                <BsChevronRight
                    cursor="pointer"
                    onClick={() => sales.fetchSales("next")}
                />
            </Flex>

            <Flex
                paddingX="15px"
                gridGap="15px"
                marginBottom="10px"
            >
                <ResponsiveContainer width="100%" height={160}>
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
                    <Text textAlign="center">
                        Ooppps...
                        Você ainda não fez nenhuma venda nessa semana
                    </Text>
                </Flex>
            }

        </AuthProvider>
    )
}

export default MinhasVendas