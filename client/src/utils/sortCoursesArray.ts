import { ICourse } from "../context/StoreProvider"

export const sortCoursesArray = (array: ICourse[], type: 'by date DESC' | 'by popular' | 'by rate') => {
    let sortedArray: ICourse[] = []

    if (type === "by date DESC") {

        sortedArray = array.sort((a, b) => {
            if (new Date(a.dateAdded).getTime() > new Date(b.dateAdded).getTime()) {
                return -1
            }
            if (new Date(a.dateAdded).getTime() < new Date(b.dateAdded).getTime()) {
                return 1
            }
            return 0
        })
    }

    if(type === "by popular"){
        sortedArray = array.sort((a, b) => {
            if (a.opinions > b.opinions) {
                return -1
            }
            if (a.opinions < b.opinions) {
                return 1
            }
            return 0
        })

    }
    if(type === "by rate"){
        sortedArray = array.sort((a, b) => {
            if (a.rate > b.rate) {
                return -1
            }
            if (a.rate < b.rate) {
                return 1
            }
            return 0
        })
    }

    return sortedArray;
}