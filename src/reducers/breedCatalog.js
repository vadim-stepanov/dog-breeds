import { v4 } from 'uuid'
import { ActionTypes } from '../utils/constants'

const breedInfo = (state = {}, action) => {
	switch (action.type) {
		case ActionTypes.ADD_BREED_CATALOG_INFO:
			return { id: v4(), name: action.payload, imgURL: '' }
		case ActionTypes.ADD_BREED_CATALOG_IMG:
			return state.name !== action.payload.name
				? state
				: { ...state, imgURL: action.payload.imgURL }
		default:
			return state
	}
}

export const breedCatalog = (
	state = {
		infoList: [],
		infoStatus: 'notset',
		imgStatus: 'notset',
	},
	action
) => {
	switch (action.type) {
		case ActionTypes.SET_BREED_CATALOG_STATUS:
			return { ...state, infoStatus: action.payload }
		case ActionTypes.ADD_BREED_CATALOG_INFO:
			return {
				...state,
				infoList: action.payload.map(e =>
					breedInfo({}, { type: action.type, payload: e })
				),
			}
		case ActionTypes.SET_BREED_CATALOG_IMG_STATUS:
			return { ...state, imgStatus: action.payload }
		case ActionTypes.ADD_BREED_CATALOG_IMG:
			return {
				...state,
				infoList: state.infoList.map(e => breedInfo(e, action)),
			}
		default:
			return state
	}
}
