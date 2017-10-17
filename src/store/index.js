import { combineReducers, createStore, compose } from 'redux'

import * as PlayReducers from './Play/Reducers'
import * as GlobalReducers from './Global/Reducers'
import * as FavoriteListReducers from './FavoriteList/Reducers'

import DevTools from '../components/common/DevTools'

const enhancer = compose(
    //必须的！启用带有monitors（监视显示）的DevTools
    DevTools.instrument()
)

const rootReducer = combineReducers({
    ...PlayReducers,
    ...GlobalReducers,
    ...FavoriteListReducers
})

export default function createStoreWithMiddleware(initialState){
    //注意：仅仅只有redux>=3.1.0支持第三个参数
    const store = createStore(rootReducer, initialState, enhancer)
    return store
}