import * as TYPES from './ActionsTypes'

export function setSongList(songList){
    return {
        type: TYPES.SET_SONGLIST,
        songList
    }
}

export function setCurrentIdx(idx){
    return {
        type: TYPES.SET_CURRENTIDX,
        idx: idx
    }
}

export function play(){
    return {
        type: TYPES.PLAY,
        playing: true
    }
}

export function pause(){
    return {
        type: TYPES.PAUSE,
        playing: false
    }
}

export function nextSong(){
    return {
        type: TYPES.NEXT_SONG
    }
}

export function prevSong(){
    return {
        type: TYPES.PREV_SONG
    }
}

export function showMini(){
    return {
        type: TYPES.SHOW_MINI
    }
}

export function changeMode(mode){
    return {
        type: TYPES.CHANGE_MODE,
        mode
    }
}

export function playList(conf){
    return {
        type: TYPES.PLAY_LIST,
        ...conf
    }
}