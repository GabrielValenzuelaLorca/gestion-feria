import { UPDATE_STORIES } from './action-types'

export function updateStories(payload) {

    return {
        type: UPDATE_STORIES,
        payload: payload
    }
}