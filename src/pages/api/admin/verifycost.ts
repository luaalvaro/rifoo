import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import { formatDateStartsWithDay } from '../../../utils/dataHacks'
moment.locale('pt-br')

type Data = {
  message: string,
  data?: Sale[] | null
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

  if (req.method === 'POST') {

    if (supabaseUrl === '' || supabaseKey === '')
      return res.status(500).json({ message: 'Url and key not found' })

    const { sessionToken } = JSON.parse(req.body);

    const decoded = checkTokenIsValid(sessionToken)

    if (typeof decoded === 'string') {
      return res.status(400).json({ message: decoded })
    }

    const subAllowed = '30eb3bd4'
    const subPart = decoded.sub.substring(0, 8)
    console.log("SUB PART", subPart)

    if (subPart !== subAllowed)
      return res.status(400).json({ message: "Cannot access" })

    const supabase = createClient(supabaseUrl, supabaseKey)

    try {
      const last_week =
        formatDateStartsWithDay(
          moment()
            .subtract(7, 'days')
            .calendar()
        )

      const { data, error } = await supabase
        .from<Sale>('sales')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      console.log(data.length)

      data.map((sale, index) => {
        const sale_products: ProductSell[] = JSON.parse(sale.products)

        const total_cost_products = sale_products.reduce((acc, product) => {
          return acc + product.product_cost_price * product.qtd_items
        }, 0)

        console.log(sale.total_cost_price, total_cost_products)
        const cost_price_correct = sale.total_cost_price === total_cost_products

        if (!cost_price_correct) {
          console.log(sale.id, 'Errado: ', sale.total_cost_price, 'Deveria ser: ', total_cost_products)
        }
      })

      return res.status(200).json({ message: 'Success', data: data })
    } catch (error) {
      console.log(error)
    } finally {
      console.log('Finally')
    }
  }

  return res.status(400).json({ message: 'Invalid request type' })
}