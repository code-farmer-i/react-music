import * as TYPES from './ActionsTypes'

export function singer(state = '', action){
    switch (action.type) {
        case TYPES.SET_SINGER:
            return action.singer
        default:
            return state
    }
}

export function recommendCd(state = '', action){
    switch (action.type) {
        case TYPES.SET_RECOMMEND_CD:
            return action.recommenCd
        default:
            return state
    }
}