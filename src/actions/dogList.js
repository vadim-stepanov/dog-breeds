import { ActionTypes } from '../utils/constants'

export const setDogListStatus = payload => ({
	type: ActionTypes.SET_DOG_LIST_STATUS,
	payload,
})

export const addDogListInfo = payload => ({
	type: ActionTypes.ADD_DOG_LIST_INFO,
	payload,
})
