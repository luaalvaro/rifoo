import type { NextApiRequest, NextApiResponse } from 'next'
import mercadopago from 'mercadopago'
import moment from 'moment'
import supabase from '../../../services/supabase'

type Data = {
    message: any,
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

    const { id } = req.body

    const { response } = await mercadopago
        .payment
        .findById(id)

    return res.status(200).json({ message: response })
}


export default handler

