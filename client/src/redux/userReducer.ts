import { produce } from 'immer'

export const InitialState = {

    currentUser: {

    }

}


export const userReducer = produce((state: any, action: any) => {
    switch (action.type) {
        case 'FILL_DATA_CURRENT_USER':
            state.currentUser = action.payload;
            break;
        case 'GET_DATA_CURRENT_USER':
            return state.currentUser;
        default:
            return state;
    }
}, InitialState);