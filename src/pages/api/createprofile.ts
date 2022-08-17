import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'

type Data = {
  message: string,
  stats?: Stats,
  profile?: any,
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

  const add30Days = (date: string) => {
    const date_ = new Date(date)
    date_.setDate(date_.getDate() + 30)
    return date_.toISOString().split('T')[0]
  }

  if (req.method === 'POST') {

    if (supabaseUrl === '' || supabaseKey === '')
      return res.status(500).json({ message: 'Url and key not found' })

    const { sessionToken, fullName, birthdate,
      cpf, whatsapp, referred, } = JSON.parse(req.body);

    const decoded = checkTokenIsValid(sessionToken)

    if (typeof decoded === 'string') {
      return res.status(400).json({ message: decoded })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    const user_id = decoded.sub
    console.log(fullName, birthdate, cpf, whatsapp, referred)

    if (fullName === '' || birthdate === '' || cpf === '' || whatsapp === '')
      return res.status(400).json({ message: 'All fields are required' })

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user_id)

      if (error) throw error

      if (data.length > 0) {
        return res.status(400).json({ message: 'Profile already exists' })
      }

      if (data.length === 0) {
        // Criar um novo PERFIL

        const today = new Date().toISOString().split('T')[0]
        const until = add30Days(today)
        console.log(until)

        const { data: profile, error: errorProfile } = await supabase
          .from('profiles')
          .insert({
            user_id: user_id,
            fullName: fullName,
            cpf: cpf,
            whatsapp: whatsapp,
            birthdate: birthdate,
            valid_until: until,
            referred: referred,
            member_type: 'user',
          })
          .single()

        if (errorProfile) throw errorProfile

        console.log(profile)
        return res.status(200).json({ message: 'Success', profile: profile })
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Try again' })
    }


  }

  return res.status(400).json({ message: 'Invalid request type' })
}
