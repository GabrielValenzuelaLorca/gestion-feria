import { ADD_STORY, UPDATE_STORIES } from './action-types'

export function updateStories(payload) {
    return {
        type: UPDATE_STORIES,
        payload: payload
    }
}

export function addStort(payload) {
  return {
      type: ADD_STORY,
      payload: payload
  }
}