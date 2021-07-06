import { SUB_STAT, ADD_STAT } from './action-types'

export function subStat(type, stat) {

    return {
        type: SUB_STAT,
        payload: {[type]:{stat: stat-1, mod: Math.floor((stat-11)/2)}}
    }
}

export function addStat(type, stat) {
    return {
      type: ADD_STAT,
      payload: {[type]:{stat: stat+1, mod: Math.floor((stat-9)/2)}}
    }
}