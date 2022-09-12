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
    product_sell_type: "unidade" | "peso",
    user_id: string,
}

interface ProductSell {
    id: string,
    product_cost_price: number,
    product_name: string,
    product_sell_price: number,
    product_sell_type: string,
    qtd_items: number,
    url_image_product: string,
}

interface ProductSellWeight {
    id: string,
    product_sell_price: number,
    weight: number,
    total_sell_price: number,
    total_cost_price: number,
    qtd_items: number,
    product_name: string,
    product_sell_type: string,
    url_image_product: string,
}

interface Order {
    created_at?: string,
    id?: string,
    user_id?: string,
    qtd_items: number,
    total_price: number,
    total_cost_price: number,
    discount: number,
    products: ProductSell[] | string,
    products_weight: ProductSellWeight[] | string,
    paymentMethod: number,
    total_price_weight: number,
    total_cost_price_weight: number
}

type Sale = {
    id: string,
    created_at: string,
    qtd_items: number,
    total_price: number,
    discount: number,
    paymentMethod: number,
    user_id: string,
    products: string,
    products_weight: string,
    total_cost_price: number,
    total_price_weight: number,
    total_cost_price_weight: number
}

interface Stats {
    qtd_sales: number,
    qtd_items_products: number,
    total_unit_price: number,
    total_weight_price: number,
    total_sell_price: number,
    total_cost_weight_price: number,
    averagePrice: number,
    total_cost_price: number,
    total_cost_unit_price: number,
    total_profit: number,
    data: Sale[]
}

type SessionDecoded = {
    aud: string,
    exp: number,
    sub: string,
    email: string,
    phone: string,
    app_metadata: { provider: string, providers: [string] },
    user_metadata: {},
    role: string
}

interface PaymentPIX {
    date_of_expiration: string
    description: string
    qr_code: string
    qr_code_base64: string
    transaction_amount: number
}