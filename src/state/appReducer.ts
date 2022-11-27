export type StateType = {
    status: string
    error: null | string
}

let initialState = {
    status: 'succeeded',
    error: null
} as StateType

export const appReducer = (state: StateType = initialState, action: AppActionsType): StateType => {

    switch (action.type) {
        case 'app/SET-STATUS': {
            return {...state, status: action.status}
        }
        default:
            return state
    }
}

export const setAppStatusAC = (status: string) => {
    return {
        type: 'app/SET-STATUS',
        status
    } as const
}

export type AppActionsType = ReturnType<typeof setAppStatusAC>