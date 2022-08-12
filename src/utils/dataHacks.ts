export const yyyyMMdd_to_ddMMyyyy = (date: string) => {
    if (typeof date !== 'string')
        return ''

    let newDate = date?.split('-')
    return `${newDate[2]}/${newDate[1]}/${newDate[0]}`
}