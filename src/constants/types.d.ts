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