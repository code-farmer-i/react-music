import * as TYPES from './ActionsTypes'

export function setSinger(singer){
    return {
        type: TYPES.SET_SINGER,
        singer
    }
}

export function setRecommendCd(cdInfo){
    return {
        type: TYPES.SET_RECOMMEND_CD,
        cdInfo
    }
}