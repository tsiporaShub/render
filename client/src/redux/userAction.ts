import { User } from "../interfaces/user.interface";

export const FillDataCurrentUser = (value: User) => {
    return { type: 'FILL_DATA_CURRENT_USER', payload: value }
}

export const getDataCurrentUser = () => {
    return { type: 'GET_DATA_CURRENT_USER' }
}