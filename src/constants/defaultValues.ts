import { BsBoxSeam, BsCartPlusFill, BsFillFileEarmarkBarGraphFill } from 'react-icons/bs'

export const services = [
    { title: "Nova venda", icon: BsCartPlusFill, href: "/app/novavenda" },
    { title: "Minhas vendas", icon: BsFillFileEarmarkBarGraphFill, href: "/app/minhasvendas" },
    { title: "Meus produtos", icon: BsBoxSeam, href: "/app/produtos" },
]

export const termsSignature = {
    pr1: "Rifoo é um serviço de assinatura, nós não exigimos cartão de crédito, nem temos contrato de fidelidade.",
    pr2: "Para continuar com o serviço, basta gerar um novo QR Code PIX e pagar o valor do plano contratado.",
}