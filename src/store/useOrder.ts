import create from 'zustand'

interface IUseOrder {
    qtd_items: number,
    total_price: number,
    discount: number,
    products: ProductSell[],

    addItem: (data: Product) => void,
    rmvItem: (data: Product) => void,
}

const useOrder = create<IUseOrder>((set) => ({

    qtd_items: 0,
    total_price: 0,
    discount: 0,
    products: [],

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
            products: newProductArray
        }
    }),

    rmvItem: (data) => set((state) => {
        if (state.qtd_items === 0) return {}

        let newProductArray: ProductSell[] = []

        const response = state.products.filter(item => item.id === data.id)

        if (response.length === 0) {
            newProductArray = [...state.products]
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
}))

export default useOrder