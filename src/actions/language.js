import { ActionTypes } from '../utils/constants'

export const setLanguage = data => ({
	type: ActionTypes.SET_LANGUAGE,
	payload: data,
})
