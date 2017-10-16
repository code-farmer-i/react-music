import * as TYPES from './ActionsTypes'

let initailState = {
    playing: false,
    mode: 0,
    songList: [],
    currentIdx: -1,
    fullScreen: false,
    MiniShow: false,
    showSongList: false
}

function setSongList(state, songList){
    return Object.assign({}, state, {
        songList
    });
}

function setCurrentIdx(state, idx){
    return Object.assign({}, state, {
        currentIdx: idx
    });
}

function play(state){
    return Object.assign({}, state, {
        playing: true
    });
}

function pause(state){
    return Object.assign({}, state, {
        playing: false
    });
}

function changeMode(state, mode){
    return Object.assign({}, state, {
        mode
    });
}

function playList(state, action){
    return Object.assign({}, state, {
        songList: action.songList,
        currentIdx: action.currentIdx,
        playing: true,
        fullScreen: true
    });
}

function nextSong(state){
    let idx;

    if(state.currentIdx === state.songList.length - 1){
        idx = 0
    }else{
        idx = state.currentIdx + 1
    }

    return Object.assign({}, state, {
        currentIdx: idx
    });
}

function prevSong(state){
    let idx;

    if(state.currentIdx === 0){
        idx = state.songList.length -1
    }else{
        idx = state.currentIdx - 1
    }

    return Object.assign({}, state, {
        currentIdx: idx
    });
}

function showMini(state){
    return Object.assign({}, state, {
        MiniShow: true,
        fullScreen: false
    })
}

export function Play(state = initailState, action){
    switch (action.type) {
        case TYPES.PLAY:
            return play(state)
        case TYPES.PAUSE:
            return pause(state)
        case TYPES.CHANGE_MODE:
            return changeMode(state, action.mode)
        case TYPES.SET_SONGLIST:
            return setSongList(state, action.songList)
        case TYPES.SET_CURRENTIDX:
            return setCurrentIdx(state, action.idx)
        case TYPES.PLAY_LIST:
            return playList(state, action)
        case TYPES.NEXT_SONG:
            return nextSong(state)
        case TYPES.PREV_SONG:
            return prevSong(state)
        case TYPES.SHOW_MINI:
            return showMini(state)
        default:
            return state
    }
}