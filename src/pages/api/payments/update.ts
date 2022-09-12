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
    try {
        const { response } = await mercadopago
            .payment
            .findById(req.body.data.id)

        const {
            id,
            status,
            status_detail,
            description,
            transaction_amount,
            date_of_expiration,
            payer,
            point_of_interaction
        } = response

        try {
            const { data, error } = await supabase
                .from('payments')
                .update({
                    transaction_status: status,
                })
                .eq('transaction_id', id)
                .single()

            if (error)
                throw error

            console.log(data)

        } catch (error) {
            console.log(error)
            return res.status(404).json({ message: "Erro na edição do pagamento" })
        }

    } catch (error) {
        console.log(error)
    }

    return res.status(200).json({ message: "Sucesso" })
}


export default handler

