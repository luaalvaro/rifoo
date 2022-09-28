import { BsBoxSeam, BsCartPlusFill, BsFillFileEarmarkBarGraphFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'

export const services = [
    { title: "Nova venda", icon: BsCartPlusFill, href: "/app/novavenda" },
    { title: "Minhas vendas", icon: BsFillFileEarmarkBarGraphFill, href: "/app/minhasvendas" },
    { title: "Meus produtos", icon: BsBoxSeam, href: "/app/produtos" },
    { title: "Meu Perfil", icon: FaUser, href: "/app/perfil" },
]

export const termsSignature = {
    pr1: "Rifoo é um serviço de assinatura, nós não exigimos cartão de crédito, nem temos contrato de fidelidade.",
    pr2: "Para continuar com o serviço, basta gerar um novo QR Code PIX e pagar o valor do plano contratado.",
    pr3: "Após a confirmação do pagamento, seu plano será renovado automaticamente.",
}