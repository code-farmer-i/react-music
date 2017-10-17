import * as TYPES from './ActionsTypes'
import {reducerCreator} from "../Creator/index";

let initailState = {
    playing: false,
    mode: 0,
    songList: [],
    currentIdx: -1,
    fullScreen: false,
    MiniShow: false,
    showSongList: false
}

const reducerMap = {
    [TYPES.PLAY]: function(state){
        return Object.assign({}, state, {
            playing: true
        })
    },
    [TYPES.PAUSE]: function(state){
        return Object.assign({}, state, {
            playing: false
        });
    },
    [TYPES.CHANGE_MODE]: function(state, {mode}){
        return Object.assign({}, state, {
            mode
        });
    },
    [TYPES.SET_SONGLIST]: function(state, {songList}){
        return Object.assign({}, state, {
            songList
        });
    },
    [TYPES.SET_CURRENTIDX]: function(state, {idx}){
        return Object.assign({}, state, {
            currentIdx: idx
        });
    },
    [TYPES.PLAY_LIST]: function(state, {songList, currentIdx}){
        return Object.assign({}, state, {
            songList,
            currentIdx,
            playing: true,
            fullScreen: true,
            MiniShow: true
        });
    },
    [TYPES.NEXT_SONG]: function(state){
        let idx;

        if(state.currentIdx === state.songList.length - 1){
            idx = 0
        }else{
            idx = state.currentIdx + 1
        }

        return Object.assign({}, state, {
            currentIdx: idx
        });
    },
    [TYPES.PREV_SONG]: function(state){
        let idx;

        if(state.currentIdx === 0){
            idx = state.songList.length -1
        }else{
            idx = state.currentIdx - 1
        }

        return Object.assign({}, state, {
            currentIdx: idx
        });
    },
    [TYPES.SHOW_MINI]: function(state){
        return Object.assign({}, state, {
            fullScreen: false
        })
    },
    [TYPES.PLAYER_FULLSCREEN]: function(state){
        return Object.assign({}, state, {
            fullScreen: true
        })
    },
    [TYPES.ADD_SONG_TO_LIST]: function(state, {song}){
        const {songList} = state;
        let changeState = {};

        const idx = songList.findIndex((songItem)=>{
            return songItem.id === song.id
        })

        if(idx != -1){
            changeState = {
                currentIdx: idx
            }
        }else{
            changeState = {
                songList: [song, ...songList],
                currentIdx: 0
            }
        }

        return Object.assign({}, state, changeState, {
            playing: true,
            fullScreen: true,
            MiniShow: true
        })
    }
}

export const Play = reducerCreator(initailState, TYPES, reducerMap)