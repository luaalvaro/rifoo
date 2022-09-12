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

    const expiration = moment()
        .utc()
        .add(65, 'minutes')
        .toISOString()
    console.log({
        expiration,
    })

    return res.status(200).json({ message: expiration })
}


export default handler

