import type { NextApiRequest, NextApiResponse } from 'next'
import mercadopago from 'mercadopago'
import moment from 'moment'
import supabase from '../../../services/supabase'

type Data = {
    message: string,
}

interface PaymentAction {
    action: string,
    api_version: string,
    data: { id: string },
    date_created: string,
    id: number,
    live_mode: boolean,
    type: string,
    user_id: string
}

// { id: 25734672125, status: 'approved', action: 'payment.updated' }

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    if (req.method !== 'POST')
        return res.status(405).json({ message: 'Method not allowed' })

    const MP_ACESS_TOKEN = `${process.env.MP_PROD_ACESS_TOKEN}`

    mercadopago
        .configurations
        .setAccessToken(MP_ACESS_TOKEN)

    const { action, data } = req.body

    if (action === 'payment.created')
        return res.status(200).json({ message: 'Pagamento criado' })

    if (action === 'payment.updated' && !!data.id) {
        try {
            const { response } = await mercadopago
                .payment
                .findById(data.id)

            const { id, status } = response
            console.log({ id, status, action })

            const { error } = await supabase
                .from('payments')
                .update({
                    transaction_status: status,
                })
                .eq('transaction_id', id)
                .single()

            if (error)
                throw error

            return res.status(200).json({ message: "Sucesso" })
        } catch (error) {
            console.log(error)
        }
    }

    console.log(req.body)
    return res.status(400).json({ message: 'Bad request' })
}


export default handler

