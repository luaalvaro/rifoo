import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'
import moment from 'moment'
moment.locale('pt-br')

type Data = {
  message: string,
  stats?: Stats | null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const supabaseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}`
  const supabaseKey = `${process.env.MASTER_SUPABASE_KEY}`

  const checkTokenIsValid = (token: string) => {
    console.log('checkTokenIsValid - Checando se o Token JWT é válido')
    const JWT_SINGNATURE = process.env.JWT_SIGNATURE

    if (!JWT_SINGNATURE)
      return 'JWT_SIGNATURE is not defined'

    try {
      var decoded = jwt.verify(token, JWT_SINGNATURE) as SessionDecoded

      if (typeof decoded === 'string')
        return 'Token is not valid'

      console.log('checkTokenIsValid - Token JWT válido')
      return decoded
    } catch (error) {
      console.log('checkTokenIsValid - Token JWT Inválido')
      return 'Token is not valid'
    }
  }

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

  if (req.method === 'POST') {

    if (supabaseUrl === '' || supabaseKey === '')
      return res.status(500).json({ message: 'Url and key not found' })

    const { sessionToken } = JSON.parse(req.body);

    const decoded = checkTokenIsValid(sessionToken)

    if (typeof decoded === 'string') {
      return res.status(400).json({ message: decoded })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    try {
      const last_week = moment().subtract(7, 'days').calendar();

      console.log(decoded)

      const { data, error } = await supabase
        .from<Sale>('sales')
        .select('*')
        .eq('user_id', decoded.sub)
        .order('created_at', { ascending: false })
        .gte('created_at', last_week)

      if (error) throw error

      console.log(data, data.length)
      if (data.length !== 0) {
        console.log('Estatísticas das vendas geradas')
        let stats = generateStats(data);
        return res.status(200).json({ message: 'Success', stats: stats })
      } else {
        return res.status(200).json({ message: 'Success', stats: null })
      }
    } catch (error) {
      console.log(error)
    } finally {
      console.log('Finally')
    }
  }

  return res.status(400).json({ message: 'Invalid request type' })
}