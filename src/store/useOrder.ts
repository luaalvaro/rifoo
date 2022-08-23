import create from 'zustand'

interface IUseOrder {
    stepProgress: number,
    qtd_items: number,
    total_price: number,
    total_price_weight: number,
    total_cost_price: number,
    total_cost_price_weight: number,
    discount: number,
    products: ProductSell[],
    products_weight: ProductSellWeight[],
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
    total_price_weight: 0,
    total_cost_price: 0,
    total_cost_price_weight: 0,
    discount: 0,
    products: [],
    products_weight: [],
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
                    url_image_product: data.product_image_url,
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
        let newWeightArray: ProductSellWeight[] = []

        if (!weight) {
            newProductArray = state.products.filter(item => item.id !== data.id)
            newWeightArray = state.products_weight.filter(item => item.id !== data.id)

            return {
                qtd_items: state.qtd_items - 1,
                products_weight: newWeightArray,
                products: newProductArray
            }
        }

        const response = state.products_weight.filter(item => item.id === data.id)
        const isNewProduct = response.length === 0

        if (isNewProduct) {
            newWeightArray = [
                ...state.products_weight,
                {
                    id: data.id,
                    product_sell_price: data.product_sell_price,
                    weight: weight,
                    total_sell_price: data.product_sell_price * weight,
                    total_cost_price: data.product_cost_price * weight,
                    product_name: data.product_name,
                    qtd_items: 1,
                    product_sell_type: data.product_sell_type,
                    url_image_product: data.product_image_url,
                }
            ]

        } else {
            newWeightArray = state.products_weight.map(item => {
                if (item.id === data.id) {
                    return {
                        ...item,
                        weight: weight,
                        total_sell_price: data.product_sell_price * weight,
                        total_cost_price: data.product_cost_price * weight,
                    }
                }

                return item
            })
        }

        const totalWeightPrice = newWeightArray
            .reduce((acc, item) => acc + item.total_sell_price, 0)

        const totalWeightPriceCost = newWeightArray
            .reduce((acc, item) => acc + item.total_cost_price, 0)

        console.log(totalWeightPrice, totalWeightPriceCost)

        return {
            qtd_items: isNewProduct ? state.qtd_items + 1 : state.qtd_items,
            products_weight: newWeightArray,
            total_cost_price_weight: totalWeightPriceCost,
            total_price_weight: totalWeightPrice,
        }
    }),
    rmvItem: (data) => set((state) => {
        console.log('removendo item do estado')
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

        console.log(state.total_cost_price - data.product_cost_price,);

        return {
            qtd_items: state.qtd_items - 1,
            total_price: state.total_price - data.product_sell_price,
            total_cost_price: state.total_cost_price - data.product_cost_price,
            products: newProductArray
        }
    }),

    nextStep: () => set(state => {
        if (state.products.length === 0 && state.products_weight.length === 0) return {}

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