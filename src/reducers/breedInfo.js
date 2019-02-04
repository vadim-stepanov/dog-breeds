import _ from 'lodash'
import { ActionTypes } from '../utils/constants'

export const breedInfo = (
	state = {
		status: 'notset',
		loadingProgress: 0,
		breeds: [],
		infoList: {},
	},
	action
) => {
	switch (action.type) {
		case ActionTypes.SET_BREED_INFO_STATUS:
			return { ...state, status: action.payload }
		case ActionTypes.SET_BREED_INFO_LOADING_PROGRESS:
			return { ...state, loadingProgress: action.payload }
		case ActionTypes.ADD_BREED_INFO_LIST:
			return { ...state, breeds: action.payload }
		case ActionTypes.ADD_BREED_INFO_LIST_ITEM:
			return {
				...state,
				infoList: {
					...state.infoList,
					[action.payload.breed]: {
						...action.payload.info,
						title: _.upperFirst(action.payload.breed),
					},
				},
			}
		default:
			return state
	}
}
