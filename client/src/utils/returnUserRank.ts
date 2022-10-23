import { IUser } from "../context/StoreProvider"

export const returnUserRank = (rankNumber: IUser['accessLevel']) => {
    const ranks = {
        0: 'User',
        1: 'Admin'
    }

    return ranks[rankNumber as keyof typeof ranks]
}