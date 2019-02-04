import { ActionTypes } from '../utils/constants'

export const setBreedInfoStatus = payload => ({
	type: ActionTypes.SET_BREED_INFO_STATUS,
	payload,
})

export const setBreedInfoLoadingProgress = payload => ({
	type: ActionTypes.SET_BREED_INFO_LOADING_PROGRESS,
	payload,
})

export const addBreedInfoList = payload => ({
	type: ActionTypes.ADD_BREED_INFO_LIST,
	payload,
})

export const addBreedInfoListItem = payload => ({
	type: ActionTypes.ADD_BREED_INFO_LIST_ITEM,
	payload,
})
