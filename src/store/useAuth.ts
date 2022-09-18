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
    member_type: string,
    email: string | null
}

interface IAuth {
    profile: Profile | undefined | null,
    fetchProfile: () => Promise<void>
}

const useAuth = create<IAuth>((set, get) => ({
    profile: undefined,
    fetchProfile: async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select("*")

            if (error) {
                throw error
            }

            if (data.length === 0) {
                //Não tem perfil cadastrado
                return set({ profile: null })
            }

            set({ profile: data[0] })
        } catch (error) {
            console.log(error)
        }
    }
}))

export default useAuth