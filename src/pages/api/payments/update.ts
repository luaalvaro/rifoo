import type { NextApiRequest, NextApiResponse } from 'next'
import mercadopago from 'mercadopago'
import moment from 'moment'

type Data = {
    message: string,
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    console.log(req.body)

    return res.status(200).json({ message: "Sucesso" })
}


export default handler

