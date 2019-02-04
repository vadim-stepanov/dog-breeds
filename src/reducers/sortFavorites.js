import { ActionTypes } from '../utils/constants'

export const sortFavorites = (
	state = {
		by: 'date',
		byDate: 'asc',
		byBreed: 'asc',
	},
	action
) => {
	switch (action.type) {
		case ActionTypes.SORT_FAVORITES_BY:
			return { ...state, by: action.payload }
		case ActionTypes.SORT_FAVORITES_BY_DATE:
			return { ...state, byDate: action.payload }
		case ActionTypes.SORT_FAVORITES_BY_BREED:
			return { ...state, byBreed: action.payload }
		default:
			return state
	}
}
