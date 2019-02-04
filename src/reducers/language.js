import { ActionTypes } from '../utils/constants'

export const language = (state = 'en', action) => {
	switch (action.type) {
		case ActionTypes.SET_LANGUAGE:
			return action.payload
		default:
			return state
	}
}
