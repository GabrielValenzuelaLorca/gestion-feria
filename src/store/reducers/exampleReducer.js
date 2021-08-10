const defaultState = {
    STR: {stat: 10, mod: 0},
    DEX: {stat: 10, mod: 0},
    CON: {stat: 10, mod: 0},
    INT: {stat: 10, mod: 0},
    WIS: {stat: 10, mod: 0},
    CHA: {stat: 10, mod: 0}
};

const homeReducer = (state = defaultState, {type, payload}) => {

    switch (type){
        case "ADD_STAT":
            return {...state, ...payload}
        case "SUB_STAT":
            return {...state, ...payload}
        default:
            return state
    }
}

export default homeReducer;