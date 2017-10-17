export const makeActionCreator = function(type, ...paramsNames){
    return function(...params){
        let action = {type}

        paramsNames.forEach((paramName, idx) => {
            action[paramName] = params[idx]
        })

        return action
    }
}

export const reducerCreator = function(initailState, types, reducerMap){
    return function(state = initailState, action){
        let newState = null;

        for(let type of Object.values(types)){
            if(action.type === type) {
                newState = reducerMap[type](state, action)
                break
            }
        }

        return newState || state
    }
}