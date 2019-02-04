import { ActionTypes } from '../utils/constants'

export const setTheme = data => ({
	type: ActionTypes.SET_THEME,
	payload: data,
})
