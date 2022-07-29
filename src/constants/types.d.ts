interface DataFormRegister {
    email: string;
    fullName: string;
    password: string;
    confirmPassword: string;
}

interface Product {
    created_at: string,
    id: string,
    product_cost_price: number,
    product_image_url: string,
    product_name: string,
    product_sell_price: number,
    product_sell_type: string,
    user_id: string,
}

interface ProductSell {
    id: string,
    product_cost_price: number,
    product_name: string,
    product_sell_price: number,
    product_sell_type: string,
    qtd_items: number,
}

interface Order {
    created_at?: string,
    id?: string,
    user_id?: string,
    qtd_items: number,
    total_price: number,
    discount: number,
    products: ProductSell[] | string
}