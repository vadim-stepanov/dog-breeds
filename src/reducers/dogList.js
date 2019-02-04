import { v4 } from 'uuid'
import { ActionTypes } from '../utils/constants'

export const dogList = (
	state = {
		list: [],
		status: 'notset',
	},
	action
) => {
	switch (action.type) {
		case ActionTypes.SET_DOG_LIST_STATUS:
			return { ...state, status: action.payload }
		case ActionTypes.ADD_DOG_LIST_INFO:
			return {
				...state,
				list: action.payload.map(e => ({
					id: v4(),
					url: e,
				})),
			}
		default:
			return state
	}
}
