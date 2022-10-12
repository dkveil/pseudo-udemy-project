import { ICourse } from "../context/StoreProvider"

export const sortCoursesArray = (array: ICourse[], type: 'by date DESC') => {
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

    return sortedArray;
}