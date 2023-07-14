import type { NextApiRequest, NextApiResponse } from 'next'
import mercadopago from 'mercadopago'
import moment from 'moment'
import jwt from 'jsonwebtoken'
import { createClient } from '@supabase/supabase-js'
const GZAPPY_URL = "https://api.gzappy.com/v1/message/send-message"

type Data = {
  message: string,
  data?: {
    date_of_expiration: string,
    qr_code_base64: string,
    qr_code: string,
    transaction_amount: string,
    description: string,
  }
}

const handleSendWhatsappNotification = async (name: string) => {

  const message = `O usuário ${name}, acabou de solicitar um pagamento`

  try {
    const response = await fetch(GZAPPY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "user_token_id": "3babd809-7d80-4f4e-a46c-81d7d81ba0ad"
      },
      body: JSON.stringify({
        instance_id: "F0GNPAPSYQV7QECWGGTMSMC7",
        instance_token: "7ea15d43-7689-4307-b861-c57dbcd9d91a",
        message: ["Olá Luã, tudo bem?", message],
        phone: "5511981782285"
      })
    })

    const data = await response.json()

    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.log('-----------------------------')
  const MP_ACESS_TOKEN = `${process.env.MP_PROD_ACESS_TOKEN}`
  const supabaseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}`
  const supabaseKey = `${process.env.MASTER_SUPABASE_KEY}`
  const NOTIFICATION_URL = `${process.env.NEXT_PUBLIC_MP_URL}`

  const checkTokenIsValid = (token: string) => {
    const JWT_SINGNATURE = process.env.JWT_SIGNATURE

    if (!JWT_SINGNATURE)
      return 'JWT_SIGNATURE is not defined'

    try {
      var decoded = jwt.verify(token, JWT_SINGNATURE) as SessionDecoded

      if (typeof decoded === 'string')
        return 'Token is not valid'

      console.log('Token JWT válido')
      return decoded
    } catch (error) {
      console.log('Token JWT Inválido')
      return 'Token is not valid'
    }
  }

  if (supabaseUrl === '' || supabaseKey === '')
    return res.status(500).json({ message: 'Url and key not found' })

  // Checando a validade do token
  const { sessionToken, fullName, cpf } = JSON.parse(req.body);

  const decoded = checkTokenIsValid(sessionToken)
  if (typeof decoded === 'string') {
    return res.status(400).json({ message: decoded })
  }

  await handleSendWhatsappNotification(fullName)

  const user_id = decoded.sub
  const user_email = decoded.email
  // Criando instancia do supabase
  const supabase = createClient(supabaseUrl, supabaseKey)

  mercadopago.configurations.setAccessToken(MP_ACESS_TOKEN)

  const expiration = moment()
    .utc()
    .add(30, 'minutes')
    .toISOString()

  const cpfNumbers = cpf.replace(/\D/g, '')

  const payment_data = {
    transaction_amount: 17.90,
    description: 'Rifoo Simples - 30 dias',
    payment_method_id: 'pix',
    payer: {
      email: user_email,
      first_name: fullName,
      identification: {
        type: 'CPF',
        number: cpfNumbers
      }
    },
    installments: 1,
    notification_url: `${NOTIFICATION_URL}?source_news=webhooks`,
    date_of_expiration: expiration
  }

  // Verificar se o usuário já possui um pagamento pendente

  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', user_id)
      .eq('transaction_status', 'pending')

    if (error)
      throw error

    console.log('Pagamentos encontrados', data.length)

    if (data.length > 0) {
      return res.status(200).json({
        message: "Sucesso",
        data: {
          date_of_expiration: data[0].transaction_date_of_expiration,
          qr_code_base64: data[0].transaction_qr_code_base64,
          qr_code: data[0].transaction_qr_code,
          transaction_amount: data[0].transaction_amount,
          description: data[0].transaction_description,
        }
      })
    }

  } catch (error) {
    console.log(error)
  }

  const { response } = await mercadopago
    .payment
    .create(payment_data)

  const {
    id,
    status,
    description,
    transaction_amount,
    date_of_expiration,
    payer,
    point_of_interaction
  } = response

  const {
    qr_code_base64,
    ticket_url,
    qr_code
  } = point_of_interaction.transaction_data

  console.log({ id, status, date_of_expiration })

  // Salvar o pagamento no banco de dados

  const qr_code_base64_data = `data:image/jpeg;base64, ${qr_code_base64}`

  try {
    const { data, error } = await supabase
      .from('payments')
      .insert({
        transaction_id: id,
        transaction_status: status,
        transaction_date_of_expiration: date_of_expiration,
        transaction_payer: JSON.stringify(payer),
        transaction_qr_code: qr_code,
        transaction_ticket_url: ticket_url,
        transaction_amount: transaction_amount,
        transaction_qr_code_base64: qr_code_base64_data,
        user_id: user_id,
        transaction_description: description
      })

    if (error)
      throw error

    return res.status(200).json({
      message: "Sucesso",
      data: {
        date_of_expiration,
        qr_code_base64: qr_code_base64_data,
        qr_code,
        transaction_amount,
        description
      }
    })

  } catch (error) {
    console.log(error)
    return res.status(404).json({ message: "Erro na criação do pagamento" })
  }
}


export default handler