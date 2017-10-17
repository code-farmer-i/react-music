import * as TYPES from './ActionsTypes'
import {reducerCreator} from "../Creator/index";

const favoriteListStr = localStorage.getItem('favoriteList');

let initailState = favoriteListStr ?  JSON.parse(favoriteListStr) : []

//相对应的actionType执行的业务逻辑
const reducerMap = {
    [TYPES.ADD_FAVORITE_SONG]: function(state, {song}){
        let newFavoriteList = [song, ...state]
        console.log(newFavoriteList);

        localStorage.setItem('favoriteList', JSON.stringify(newFavoriteList))

        return newFavoriteList
    },
    [TYPES.REMOVE_FAVORITE_SONG]: function(state, {songIdx}){
        let newFavoriteList = [...state];
        newFavoriteList.splice(songIdx, 1)

        localStorage.setItem('favoriteList', JSON.stringify(newFavoriteList))

        return newFavoriteList
    }
}

export const favoriteList = reducerCreator(initailState, TYPES, reducerMap)