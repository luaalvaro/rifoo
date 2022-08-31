import type { NextApiRequest, NextApiResponse } from 'next'
import mercadopago from 'mercadopago'
import moment from 'moment'

type Data = {
    message: string,
    qr_code_base64: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const PUBLIC_KEY = "TEST-e8f71bea-5883-4735-9a4e-6e3f801d09fc"
    const ACESS_TOKEN = "TEST-7829759690126384-072123-a334ad66cee075e7d190e5668a1bedb8-182131920"
    const MP_URL = "https://api.mercadopago.com/v1/payments"
    const expiration = moment().add(30, 'minutes').toISOString()

    mercadopago.configurations.setAccessToken(ACESS_TOKEN)

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

    const { response } = await mercadopago.payment.create(payment_data)

    console.log(response)

    const { id, status, transaction_amount, date_of_expiration, payer, point_of_interaction } = response
    const { qr_code_base64, ticket_url, qr_code } = point_of_interaction.transaction_data

    console.log({
        id,
        status,
        date_of_expiration,
        payer,
        qr_code,
        ticket_url,
        transaction_amount,
        qr_code_base64: qr_code_base64.substring(0, 10)
    })

    return res.status(200).json({ message: "Sucesso", qr_code_base64 })
}


export default handler

