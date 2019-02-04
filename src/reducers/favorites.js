import { v4 } from 'uuid'
import { ActionTypes } from '../utils/constants'

export const favorites = (state = [], action) => {
	switch (action.type) {
		case ActionTypes.ADD_TO_FAVORITES:
			if (state.some(el => el.url === action.payload.url)) {
				return state
			} else {
				return [
					...state,
					{
						id: v4(),
						breed: action.payload.breed,
						url: action.payload.url,
						timestamp: new Date().toString(),
					},
				]
			}
		case ActionTypes.REMOVE_FROM_FAVORITES:
			return state.filter(el => el.url !== action.payload)
		default:
			return state
	}
}
