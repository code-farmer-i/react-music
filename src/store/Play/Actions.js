import * as TYPES from './ActionsTypes'
import {makeActionCreator} from "../Creator/index";

export const play = function(){
    return {
        type: TYPES.PLAY,
        playing: true
    }
}

export const pause = function(){
    return {
        type: TYPES.PAUSE,
        playing: false
    }
}

export const playList = makeActionCreator(TYPES.PLAY_LIST, 'songList', 'currentIdx')
export const setSongList = makeActionCreator(TYPES.SET_SONGLIST, 'songList')
export const setCurrentIdx = makeActionCreator(TYPES.SET_CURRENTIDX, 'idx')
export const nextSong = makeActionCreator(TYPES.NEXT_SONG)
export const prevSong = makeActionCreator(TYPES.PREV_SONG)
export const showMini = makeActionCreator(TYPES.SHOW_MINI)
export const changeMode = makeActionCreator(TYPES.CHANGE_MODE, 'mode')
export const addSongToList = makeActionCreator(TYPES.ADD_SONG_TO_LIST, 'song')
export const playerfullScreen = makeActionCreator(TYPES.PLAYER_FULLSCREEN)




