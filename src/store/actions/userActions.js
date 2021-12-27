import { ADD_USER, REMOVE_USER } from './action-types'

export function addUser(payload) {
  return {
    type: ADD_USER,
    payload: payload
  }
}

export function removeUser() {
  return {
    type: REMOVE_USER,
    payload: null
  }
}