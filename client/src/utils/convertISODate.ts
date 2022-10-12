const monthToWord = (monthNumber: number) => {
    const months = {
        1: 'January',
        2: 'Fabruary',
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    }

    return months[monthNumber as keyof typeof months]

}

export const convertISODate = (date: string, variant: "full date") => {
    const convertedDate = new Date(date)
    const month = convertedDate.getMonth() + 1
    const day = convertedDate.getDate()
    const year = convertedDate.getFullYear()

    if(variant === "full date"){
        return `${day.toString().padStart(2, '0')} ${monthToWord(month)} ${year}`
    }

}