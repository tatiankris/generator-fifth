import {UserType} from "../components/FakeDataGrid";

export type StateType = {
    params: {
        locale: string
        mistake: number
        seed: number
    }
    users: Array<UserType>
    mistakesUsers: Array<UserType>
}

let initialState = {
    params: {
        locale: 'de',
        mistake: 0,
        seed: 0
    },
    users: [],
    mistakesUsers: []
} as StateType

export const usersReducer = (state: StateType = initialState, action: UsersActionsType): StateType => {

    switch (action.type) {
        case 'users/SET-LOCALE': {
            return {...state, params: {...state.params, locale:action.locale}}
        }
        case 'users/SET-MISTAKE': {
            return {...state, params: {...state.params, mistake:action.mistake}}
        }
        case 'users/SET-SEED': {
            return {...state, params: {...state.params, seed: action.seed}}
        }
        case 'users/SET-USERS': {
            return {...state, users:action.users}
        }
        case 'users/SET-MISTAKES-USERS': {
            return {...state, mistakesUsers:action.users}
        }
        case 'users/CUT-MISTAKES-USERS': {
            return {...state, mistakesUsers: state.mistakesUsers.slice(0, 20)}
        }


        default:
            return state
    }
}

export const setLocaleAC = (locale: string) => {
    return {
        type: 'users/SET-LOCALE',
        locale
    } as const
}

export const setMistakeAC = (mistake: number) => {
    return {
        type: 'users/SET-MISTAKE',
        mistake
    } as const
}

export const setSeedAC = (seed: number) => {
    return {
        type: 'users/SET-SEED',
        seed
    } as const
}
export const setUsersAC = (users: UserType[]) => {
    return {
        type: 'users/SET-USERS',
        users
    } as const
}
export const setMistakesUsersAC = (users: any) => {
    return {
        type: 'users/SET-MISTAKES-USERS',
        users
    } as const
}
export const cutMistakesUsersAC = () => {
    return {
        type: 'users/CUT-MISTAKES-USERS'
    } as const
}

export type UsersActionsType = ReturnType<typeof setLocaleAC> | ReturnType<typeof setMistakeAC> | ReturnType<typeof setSeedAC> | ReturnType<typeof setUsersAC>| ReturnType<typeof setMistakesUsersAC>| ReturnType<typeof cutMistakesUsersAC>