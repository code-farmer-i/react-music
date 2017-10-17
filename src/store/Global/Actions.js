import * as TYPES from './ActionsTypes'
import {makeActionCreator} from "../Creator/index";

export const setSinger = makeActionCreator(TYPES.SET_SINGER, 'singer')
export const setRecommendCd = makeActionCreator(TYPES.SET_RECOMMEND_CD, 'recommenCd')