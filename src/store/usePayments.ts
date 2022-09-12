import create from 'zustand'
import supabase from '../services/supabase'
import moment from 'moment'
moment.locale('pt-br')

const startDate = moment().startOf('week').add(1, 'days')
const endDate = moment().endOf('week').add(1, 'days')

interface Profile {
    id: string,
    created_at: string,
    fullName: string,
    cpf: string,
    whatsapp: string,
    birthdate: string,
    user_id: string,
    valid_until: string,
    referred: string,
    member_type: string
}

interface IAuth {
    payment: PaymentPIX | undefined | null,
    newPayment: () => Promise<void>
}

const usePayments = create<IAuth>((set, get) => ({
    payment: undefined,
    newPayment: async () => {
        try {
            const session = supabase.auth.session()

            const response = await fetch('/api/payments/create', {
                method: 'POST',
                body: JSON.stringify({
                    sessionToken: session?.access_token,
                })
            })
            const { data } = await response.json()

            console.log(data)
            set({ payment: data })
        } catch (error) {
            console.log(error)
        }
    }
}))

export default usePayments