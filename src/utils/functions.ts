export const formatCpf = (cpf: string) => {
    //retornar valor limpo sem ponto e hifen
    return cpf.replace(/[^0-9]/g, '')
}