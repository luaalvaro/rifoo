import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string,
}

const handler = async (reqreq: NextApiRequest, res: NextApiResponse<Data>) => {

    const ACESS_TOKEN = "TEST-7829759690126384-072123-a334ad66cee075e7d190e5668a1bedb8-182131920"
    const MP_URL = "https://api.mercadopago.com/v1/payments"

    const paymentConfig = {
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
        }
    }

    try {
        const response = await fetch(MP_URL, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + ACESS_TOKEN,
            },
            body: JSON.stringify({
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
                }
            })
        })

        const data = await response.json()

        console.log(data)
    } catch (error) {
        console.log(error)
    }

    return res.status(200).json({ message: "ok" })
}


export default handler

