import create from 'zustand'
import supabase from '../services/supabase'
import moment from 'moment'
moment.locale('pt-br')

const startDate = moment().startOf('week').add(1, 'days')
const endDate = moment().endOf('week').add(1, 'days')

interface ISales {
    sales: Sale[] | undefined,
    week: number,
    weekLabel: string,
    showSaleDetails: Sale | undefined,
    fetchSales: (method?: "prev" | "next") => Promise<boolean>,
    setShowSaleDetails: (sale: Sale | undefined) => void,
    deleteSale: (sale: string) => Promise<boolean>,
}

const useSales = create<ISales>((set, get) => ({
    sales: undefined,
    week: 0,
    weekLabel: "Esta semana",
    showSaleDetails: undefined,

    fetchSales: async (method?: "prev" | "next") => {

        const { week } = get()
        let newWeek = week
        let weekLabel = ""

        if (week === 0 && !!method && method === "next") return false

        if (!!method && method === "prev") {
            startDate.subtract(1, 'week')
            endDate.subtract(1, 'week')
            newWeek = week - 1
        }

        if (!!method && method === "next") {
            startDate.add(1, 'week')
            endDate.add(1, 'week')
            newWeek = week + 1
        }

        switch (newWeek) {
            case 0:
                weekLabel = "Esta semana"
                break;
            case -1:
                weekLabel = "Semana passada"
                break;
            default:
                weekLabel = `${startDate.format('DD/MM')} - ${endDate.format('DD/MM')}`
                break;
        }

        try {
            const { data, error } = await supabase.from<Sale>('sales')
                .select('*')
                .order('created_at', { ascending: false })
                .gte('created_at', startDate.toISOString())
                .lte('created_at', endDate.toISOString())

            if (error) throw error

            set(state => ({ ...state, sales: data, week: newWeek, weekLabel }))
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    },

    setShowSaleDetails: (sale) => {
        set(state => ({ ...state, showSaleDetails: sale }))
    },

    deleteSale: async (sale) => {
        const { sales } = get()
        try {
            const { data, error } = await supabase
                .from('sales')
                .delete()
                .eq('id', sale)

            if (error) throw error

            set(state => ({ ...state, sales: sales?.filter(s => s.id !== sale) }))
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}))

export default useSales