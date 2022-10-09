export function formatCurrency(number: number, currency: string){
    return Intl.NumberFormat(undefined, {
        style: 'currency',
        currency
    }).format(number)
}