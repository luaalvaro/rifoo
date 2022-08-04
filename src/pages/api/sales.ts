import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'

type Data = {
  message: string,
  stats?: Stats
}

type SessionDecoded = {
  aud: string,
  exp: number,
  sub: string,
  email: string,
  phone: string,
  app_metadata: { provider: string, providers: [string] },
  user_metadata: {},
  role: string
}

type Sale = {
  id: string,
  created_at: string,
  qtd_items: number,
  total_price: number,
  discount: number,
  paymentMethod: number,
  user_id: string,
  products: string,
  total_cost_price: number,
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
    const totalSales = data.length
    const totalPrice = data.reduce((acc, curr) => acc + curr.total_price, 0)
    const averagePrice = totalPrice / totalSales
    const totalCostPrice = data.reduce((acc, curr) => acc + curr.total_cost_price, 0)
    const totalProfit = totalPrice - totalCostPrice

    return {
      totalSales: totalSales,
      totalPrice: totalPrice,
      averagePrice: averagePrice,
      totalCostPrice: totalCostPrice,
      totalProfit: totalProfit,
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
    let sales: Sale[] = []

    try {
      const { data, error } = await supabase
        .from<Sale>('sales')
        .select('*')
        .eq('user_id', decoded.sub)

      if (error) throw error

      console.log(data)
      sales = data
    } catch (error) {
      console.log(error)
    }

    const stats = generateStats(sales)

    return res.status(200).json({ message: 'Success', stats: stats })
  }

  return res.status(400).json({ message: 'Invalid request type' })
}