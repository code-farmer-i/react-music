import * as TYPES from './ActionsTypes'
import {makeActionCreator} from "../Creator";

export const addFavoriteSong = makeActionCreator(TYPES.ADD_FAVORITE_SONG, 'song')
export const removeFavoriteSong = makeActionCreator(TYPES.REMOVE_FAVORITE_SONG, 'songIdx')