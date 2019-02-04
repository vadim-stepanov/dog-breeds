import { ActionTypes } from '../utils/constants'

export const setBreedCatalogStatus = payload => ({
	type: ActionTypes.SET_BREED_CATALOG_STATUS,
	payload,
})

export const addBreedCatalogInfo = payload => ({
	type: ActionTypes.ADD_BREED_CATALOG_INFO,
	payload,
})

export const setBreedCatalogImgStatus = payload => ({
	type: ActionTypes.SET_BREED_CATALOG_IMG_STATUS,
	payload,
})

export const addBreedCatalogImg = payload => ({
	type: ActionTypes.ADD_BREED_CATALOG_IMG,
	payload,
})
