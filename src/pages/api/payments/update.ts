import type { NextApiRequest, NextApiResponse } from 'next'
import mercadopago from 'mercadopago'
import moment from 'moment'

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
        console.log(req.body)

        const { response } = await mercadopago
            .payment
            .findById(req.body.data.id)

        console.log(response)
    } catch (error) {
        console.log(error)
    }

    return res.status(200).json({ message: "Sucesso" })
}


export default handler

