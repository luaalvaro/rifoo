import create from 'zustand'

interface PricingItemWeight {
    id: string,
    sell_price: number,
    weight: number,
    total_price: number,
    total_cost_price: number,
}

interface IUseOrder {
    stepProgress: number,
    qtd_items: number,
    total_price: number,
    total_price_weight: PricingItemWeight[],
    total_cost_price: number,
    total_cost_price_weight: number,
    discount: number,
    products: ProductSell[],
    paymentMethod: any,

    nextStep: () => void,
    prevStep: () => void,
    addItem: (data: Product) => void,
    addItemWeight: (data: Product, weight?: number) => void,
    rmvItem: (data: Product) => void,
    resetState: () => void,
    setPaymentMethod: (id: number) => void,
}

const initialState = {
    stepProgress: 0,
    qtd_items: 0,
    total_price: 0,
    total_price_weight: [],
    total_cost_price: 0,
    total_cost_price_weight: 0,
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
                    weight: undefined,
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
    addItemWeight: (data, weight) => set((state) => {

        let newProductArray: ProductSell[] = []
        let newWeightArray: any[] = []
        let pricingItem: PricingItemWeight | null = null

        if (!weight) {
            console.log('Sem peso, removendo produto')
            newProductArray = state.products.filter(item => item.id !== data.id)
            newWeightArray = state.total_price_weight.filter(item => item.id !== data.id)

            return {
                qtd_items: state.qtd_items - 1,
                total_price_weight: newWeightArray,
                products: newProductArray
            }
        }

        const response = state.total_price_weight.filter(item => item.id === data.id)

        const isNewProduct = response.length === 0
        console.log('Status do produto', isNewProduct)

        const sellPrice = weight ? data.product_sell_price * weight : 0

        if (isNewProduct) {
            newProductArray = [
                ...state.products,
                {
                    id: data.id,
                    product_cost_price: data.product_cost_price,
                    product_name: data.product_name,
                    product_sell_price: data.product_sell_price,
                    product_sell_type: data.product_sell_type,
                    qtd_items: 1,
                    weight: weight
                }]

            newWeightArray = [
                ...state.total_price_weight,
                pricingItem = {
                    id: data.id,
                    sell_price: data.product_sell_price,
                    weight: weight,
                    total_price: sellPrice,
                    total_cost_price: data.product_cost_price * weight,
                }
            ]

        } else {
            newProductArray = state.products.map(item => {
                if (item.id === data.id) {
                    return {
                        ...item,
                        weight: weight
                    }
                }

                return item
            })

            newWeightArray = state.total_price_weight.map(item => {
                if (item.id === data.id) {
                    return {
                        ...item,
                        weight: weight,
                        total_price: item.sell_price * weight,
                        total_cost_price: item.total_cost_price * weight,
                    }
                }

                return item
            })
        }

        return {
            qtd_items: isNewProduct ? state.qtd_items + 1 : state.qtd_items,
            total_price_weight: newWeightArray,
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