import type { NextApiRequest, NextApiResponse } from 'next'
import mercadopago from 'mercadopago'
import moment from 'moment'
import jwt from 'jsonwebtoken'
import { createClient } from '@supabase/supabase-js'

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

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const MP_ACESS_TOKEN = `${process.env.MP_STAGING_ACESS_TOKEN}`
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

    if (supabaseUrl === '' || supabaseKey === '')
        return res.status(500).json({ message: 'Url and key not found' })

    const expiration = moment()
        .add(5, 'minutes')
        .format('YYYY-MM-DDTHH:mm:ss.SSSZ')

    console.log(expiration)

    mercadopago
        .configurations
        .setAccessToken(MP_ACESS_TOKEN)

    const payment_data = {
        transaction_amount: 29.9,
        description: 'Rifoo Mensal',
        payment_method_id: 'pix',
        payer: {
            email: 'luan.alc@hotmail.com',
            first_name: 'Luã Álvaro',
            last_name: 'Lage Carlos',
            identification: {
                type: 'CPF',
                number: '06149203530'
            }
        },
        installments: 1,
        // notification_url: "",
        date_of_expiration: expiration
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

    console.log({
        id,
        status,
        date_of_expiration,
        payer,
        description,
        qr_code,
        ticket_url,
        transaction_amount,
        qr_code_base64: qr_code_base64.substring(0, 10)
    })

    // Salvar o pagamento no banco de dados

    const { sessionToken } = JSON.parse(req.body);

    const decoded = checkTokenIsValid(sessionToken)

    if (typeof decoded === 'string') {
        return res.status(400).json({ message: decoded })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    const user_id = decoded.sub
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

