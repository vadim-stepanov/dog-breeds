import { ActionTypes } from '../utils/constants'

export const addToFavorites = payload => ({
	type: ActionTypes.ADD_TO_FAVORITES,
	payload,
})

export const removeFromFavorites = payload => ({
	type: ActionTypes.REMOVE_FROM_FAVORITES,
	payload,
})
