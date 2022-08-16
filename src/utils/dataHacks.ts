export const yyyyMMdd_to_ddMMyyyy = (date: string) => {
    if (typeof date !== 'string')
        return ''

    let newDate = date?.split('-')
    return `${newDate[2]}/${newDate[1]}/${newDate[0]}`
}

export const formatDateStartsWithDay = (date: string) => {
    //dd/mm/yyyy
    if (date === "") return ""
    const dateArray = date.split('/');

    const day = dateArray[0];
    const month = dateArray[1];
    const year = dateArray[2];

    const strDate = `${year}-${month}-${day}`;

    return strDate;
}