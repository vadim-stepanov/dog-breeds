import { ActionTypes } from '../utils/constants'

export const theme = (state = 'gray', action) => {
	switch (action.type) {
		case ActionTypes.SET_THEME:
			return action.payload
		default:
			return state
	}
}
