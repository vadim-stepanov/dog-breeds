import { ActionTypes } from '../utils/constants'

export const setFavoritesSortType = type => ({
	type: ActionTypes.SORT_FAVORITES_BY,
	payload: type,
})
