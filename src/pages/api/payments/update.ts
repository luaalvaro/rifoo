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

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const MP_ACESS_TOKEN = `${process.env.MP_STAGING_ACESS_TOKEN}`

    mercadopago
        .configurations
        .setAccessToken(MP_ACESS_TOKEN)

    try {
        const { action, data } = req.body

        if (action === 'payment.created')
            return res.status(200).json({ message: 'Pagamento criado' })

        const { response } = await mercadopago
            .payment
            .findById(data.id)

        const {
            id,
            status,
        } = response

        console.log({
            id,
            status,
            action
        })

        try {
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
            return res.status(404).json({
                message: "Erro na edição do pagamento"
            })
        }

    } catch (error) {
        console.log(error)
    }
}


export default handler

