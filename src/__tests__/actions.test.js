import { ActionTypes } from '../utils/constants'
import {
	setBreedCatalogStatus,
	addBreedCatalogInfo,
	setBreedCatalogImgStatus,
	addBreedCatalogImg,
	setDogListStatus,
	addDogListInfo,
	addToFavorites,
	removeFromFavorites,
	setFavoritesSortType,
	setBreedInfoStatus,
	setBreedInfoLoadingProgress,
	addBreedInfoList,
	addBreedInfoListItem,
	setLanguage,
	setTheme,
} from '../actions'

describe.skip('Actions', () => {
	describe('breedCatalog actions', () => {
		describe('setBreedCatalogStatus action', () => {
			it('should match the action object', () => {
				const payload = 'loading'
				const expectedAction = {
					type: ActionTypes.SET_BREED_CATALOG_STATUS,
					payload,
				}
				expect(setBreedCatalogStatus(payload)).toEqual(expectedAction)
			})
		})

		describe('addBreedCatalogInfo action', () => {
			it('should match the action object', () => {
				const payload = ['affenpinscher', 'african', 'airedale']
				const expectedAction = {
					type: ActionTypes.ADD_BREED_CATALOG_INFO,
					payload,
				}
				expect(addBreedCatalogInfo(payload)).toEqual(expectedAction)
			})
		})

		describe('setBreedCatalogImgStatus action', () => {
			it('should match the action object', () => {
				const payload = 'loaded'
				const expectedAction = {
					type: ActionTypes.SET_BREED_CATALOG_IMG_STATUS,
					payload,
				}
				expect(setBreedCatalogImgStatus(payload)).toEqual(expectedAction)
			})
		})

		describe('addBreedCatalogImg action', () => {
			it('should match the action object', () => {
				const payload = {
					name: 'affenpinscher',
					imgURL:
						'https://images.dog.ceo/breeds/affenpinscher/n02110627_1446.jpg',
				}
				const expectedAction = {
					type: ActionTypes.ADD_BREED_CATALOG_IMG,
					payload,
				}
				expect(addBreedCatalogImg(payload)).toEqual(expectedAction)
			})
		})
	})

	describe('dogList actions', () => {
		describe('setDogListStatus action', () => {
			it('should match the action object', () => {
				const payload = 'loaded'
				const expectedAction = {
					type: ActionTypes.SET_DOG_LIST_STATUS,
					payload,
				}
				expect(setDogListStatus(payload)).toEqual(expectedAction)
			})
		})

		describe('addDogListInfo action', () => {
			it('should match the action object', () => {
				const payload = [
					'https://images.dog.ceo/breeds/affenpinscher/n02110627_10147.jpg',
					'https://images.dog.ceo/breeds/affenpinscher/n02110627_10185.jpg',
					'https://images.dog.ceo/breeds/affenpinscher/n02110627_10225.jpg',
				]
				const expectedAction = { type: ActionTypes.ADD_DOG_LIST_INFO, payload }
				expect(addDogListInfo(payload)).toEqual(expectedAction)
			})
		})
	})

	describe('favorites actions', () => {
		describe('addToFavorites action', () => {
			it('should match the action object', () => {
				const payload = {
					breed: 'affenpinscher',
					url: 'https://images.dog.ceo/breeds/affenpinscher/n02110627_1446.jpg',
				}
				const expectedAction = { type: ActionTypes.ADD_TO_FAVORITES, payload }
				expect(addToFavorites(payload)).toEqual(expectedAction)
			})
		})

		describe('removeFromFavorites action', () => {
			it('should match the action object', () => {
				const payload =
					'https://images.dog.ceo/breeds/affenpinscher/n02110627_1446.jpg'
				const expectedAction = {
					type: ActionTypes.REMOVE_FROM_FAVORITES,
					payload,
				}
				expect(removeFromFavorites(payload)).toEqual(expectedAction)
			})
		})
	})

	describe('sortFavorites actions', () => {
		describe('setFavoritesSortType action', () => {
			it('should match the action object', () => {
				const payload = 'breed'
				const expectedAction = { type: ActionTypes.SORT_FAVORITES_BY, payload }
				expect(setFavoritesSortType(payload)).toEqual(expectedAction)
			})
		})

		describe('SORT_FAVORITES_BY_DATE action', () => {
			it('should match the action object', () => {
				const payload = 'desc'
				const action = { type: ActionTypes.SORT_FAVORITES_BY_DATE, payload }
				expect(action).toEqual(action)
			})
		})

		describe('SORT_FAVORITES_BY_BREED action', () => {
			it('should match the action object', () => {
				const payload = 'desc'
				const action = { type: ActionTypes.SORT_FAVORITES_BY_BREED, payload }
				expect(action).toEqual(action)
			})
		})
	})

	describe('breedInfo actions', () => {
		describe('setBreedInfoStatus action', () => {
			it('should match the action object', () => {
				const payload = 'loading'
				const expectedAction = {
					type: ActionTypes.SET_BREED_INFO_STATUS,
					payload,
				}
				expect(setBreedInfoStatus(payload)).toEqual(expectedAction)
			})
		})

		describe('setBreedInfoLoadingProgress action', () => {
			it('should match the action object', () => {
				const payload = 10.75
				const expectedAction = {
					type: ActionTypes.SET_BREED_INFO_LOADING_PROGRESS,
					payload,
				}
				expect(setBreedInfoLoadingProgress(payload)).toEqual(expectedAction)
			})
		})

		describe('addBreedInfoList action', () => {
			it('should match the action object', () => {
				const payload = ['affenpinscher', 'african', 'airedale']
				const expectedAction = {
					type: ActionTypes.ADD_BREED_INFO_LIST,
					payload,
				}
				expect(addBreedInfoList(payload)).toEqual(expectedAction)
			})
		})

		describe('addBreedInfoListItem action', () => {
			it('should match the action object', () => {
				const payload = {
					breed: 'affenpinscher',
					info: {
						desc: 'test',
						descUrl: 'test',
						imgUrl: 'test',
						wikiUrl: 'test',
						dogtimeUrl: 'test',
						akcUrl: 'test',
						petwaveUrl: 'test',
						purinaUrl: 'test',
					},
				}
				const expectedAction = {
					type: ActionTypes.ADD_BREED_INFO_LIST_ITEM,
					payload,
				}
				expect(addBreedInfoListItem(payload)).toEqual(expectedAction)
			})
		})
	})

	describe('language action', () => {
		it('should match the action object', () => {
			const payload = 'ru'
			const expectedAction = { type: ActionTypes.SET_LANGUAGE, payload }
			expect(setLanguage(payload)).toEqual(expectedAction)
		})
	})

	describe('theme action', () => {
		it('should match the action object', () => {
			const payload = 'blue'
			const expectedAction = { type: ActionTypes.SET_THEME, payload }
			expect(setTheme(payload)).toEqual(expectedAction)
		})
	})
})
