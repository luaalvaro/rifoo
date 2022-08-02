import create from 'zustand'

interface IUseOrder {
    stepProgress: number,
    qtd_items: number,
    total_price: number,
    total_cost_price: number,
    discount: number,
    products: ProductSell[],
    paymentMethod: number,

    nextStep: () => void,
    prevStep: () => void,
    addItem: (data: Product) => void,
    rmvItem: (data: Product) => void,
    resetState: () => void,
    setPaymentMethod: (id: number) => void,
}

const initialState = {
    stepProgress: 0,
    qtd_items: 0,
    total_price: 0,
    total_cost_price: 0,
    discount: 0,
    products: [],
    paymentMethod: 1,
}

const useOrder = create<IUseOrder>((set) => ({
    ...initialState,

    addItem: (data) => set((state) => {

        let newProductArray: ProductSell[] = []
        const response = state.products.filter(item => item.id === data.id)

        if (response.length === 0) {
            newProductArray = [
                ...state.products,
                {
                    id: data.id,
                    product_cost_price: data.product_cost_price,
                    product_name: data.product_name,
                    product_sell_price: data.product_sell_price,
                    product_sell_type: data.product_sell_type,
                    qtd_items: 1,
                }]
        } else {
            newProductArray = state.products.map(item => {
                if (item.id === data.id) {
                    return {
                        ...item,
                        qtd_items: item.qtd_items + 1
                    }
                }

                return item
            })
        }

        return {
            qtd_items: state.qtd_items + 1,
            total_price: state.total_price + data.product_sell_price,
            total_cost_price: state.total_cost_price + data.product_cost_price,
            products: newProductArray
        }
    }),
    rmvItem: (data) => set((state) => {

        const response = state.products.filter(item => item.id === data.id)

        if (state.qtd_items === 0) return {}

        let newProductArray: ProductSell[] = []

        if (response.length === 0) {
            return {}
        } else if (response.length === 1 && response[0].qtd_items === 1) {
            newProductArray = state.products.filter(item => item.id !== data.id)
        } else {
            newProductArray = state.products.map(item => {
                if (item.id === data.id) {
                    return {
                        ...item,
                        qtd_items: item.qtd_items - 1
                    }
                }

                return item
            })
        }

        return {
            qtd_items: state.qtd_items - 1,
            total_price: state.total_price - data.product_sell_price,
            products: newProductArray
        }
    }),

    nextStep: () => set(state => {
        if (state.products.length === 0) return {}

        return {
            stepProgress: state.stepProgress + 1
        }
    }),
    prevStep: () => set(state => {
        if (state.stepProgress === 0) return {}

        return {
            stepProgress: state.stepProgress - 1
        }
    }),

    resetState: () => set(state => ({
        ...initialState
    })),

    setPaymentMethod: (id) => set(state => ({ paymentMethod: id }))
}))

export default useOrder