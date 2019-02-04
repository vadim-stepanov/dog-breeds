import 'jest-localstorage-mock'
import { ActionTypes } from '../utils/constants'
import store from '../store'
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

describe.skip('Store', () => {
	it('should match the snapshot', () => {
		expect(store.getState()).toMatchSnapshot()
	})

	describe('breedCatalog actions', () => {
		describe('setBreedCatalogStatus action', () => {
			const payload = 'loading'
			let actionBody = null

			beforeAll(
				() => (actionBody = store.dispatch(setBreedCatalogStatus(payload)))
			)

			it('should match the snapshot', () => {
				expect(actionBody).toMatchSnapshot()
			})

			it('should set infoStatus', () =>
				expect(store.getState().breedCatalog.infoStatus).toEqual(payload))
		})

		describe('addBreedCatalogInfo action', () => {
			const payload = ['affenpinscher', 'african', 'airedale']
			let actionBody = null

			beforeAll(
				() => (actionBody = store.dispatch(addBreedCatalogInfo(payload)))
			)

			it('should match the snapshot', () =>
				expect(actionBody).toMatchSnapshot())

			it('should add new list', () =>
				expect(store.getState().breedCatalog.infoList.length).toBe(3))

			it('should add a unique guid id', () =>
				expect(store.getState().breedCatalog.infoList[0].id.length).toBe(36))

			it('should set breed name', () =>
				expect(store.getState().breedCatalog.infoList[0].name).toEqual(
					payload[0]
				))

			it('should have imgURL', () =>
				expect(store.getState().breedCatalog.infoList[0].imgURL).toBeDefined())

			it('should have empty imgURL value', () =>
				expect(store.getState().breedCatalog.infoList[0].imgURL.length).toBe(0))
		})

		describe('setBreedCatalogImgStatus action', () => {
			const payload = 'loaded'
			let actionBody = null

			beforeAll(
				() => (actionBody = store.dispatch(setBreedCatalogImgStatus(payload)))
			)

			it('should match the snapshot', () => {
				expect(actionBody).toMatchSnapshot()
			})

			it('should set imgStatus', () =>
				expect(store.getState().breedCatalog.imgStatus).toEqual(payload))
		})

		describe('addBreedCatalogImg action', () => {
			const payload = {
				name: 'affenpinscher',
				imgURL:
					'https://images.dog.ceo/breeds/affenpinscher/n02110627_1446.jpg',
			}
			let actionBody = null

			beforeAll(
				() => (actionBody = store.dispatch(addBreedCatalogImg(payload)))
			)

			it('should match the snapshot', () =>
				expect(actionBody).toMatchSnapshot())

			it('should set imgURL', () =>
				expect(store.getState().breedCatalog.infoList[0].imgURL).toEqual(
					payload.imgURL
				))
		})
	})

	describe('dogList actions', () => {
		describe('setDogListStatus action', () => {
			const payload = 'loaded'
			let actionBody = null

			beforeAll(() => (actionBody = store.dispatch(setDogListStatus(payload))))

			it('should match the snapshot', () =>
				expect(actionBody).toMatchSnapshot())

			it('should set status', () =>
				expect(store.getState().dogList.status).toEqual(payload))
		})

		describe('addDogListInfo action', () => {
			const payload = [
				'https://images.dog.ceo/breeds/affenpinscher/n02110627_10147.jpg',
				'https://images.dog.ceo/breeds/affenpinscher/n02110627_10185.jpg',
				'https://images.dog.ceo/breeds/affenpinscher/n02110627_10225.jpg',
			]
			let actionBody = null

			beforeAll(() => (actionBody = store.dispatch(addDogListInfo(payload))))

			it('should match the snapshot', () =>
				expect(actionBody).toMatchSnapshot())

			it('should add new list', () =>
				expect(store.getState().dogList.list.length).toBe(3))

			it('should set url', () =>
				expect(store.getState().dogList.list[0].url).toEqual(payload[0]))

			it('should add a unique guid id', () =>
				expect(store.getState().dogList.list[0].id.length).toBe(36))
		})
	})

	describe('favorites actions', () => {
		const payload = {
			breed: 'affenpinscher',
			url: 'https://images.dog.ceo/breeds/affenpinscher/n02110627_1446.jpg',
		}
		let actionBody = null

		beforeAll(() => (actionBody = store.dispatch(addToFavorites(payload))))

		describe('addToFavorites action', () => {
			it('should match the snapshot', () =>
				expect(actionBody).toMatchSnapshot())

			it('should add new entry', () =>
				expect(store.getState().favorites.length).toBe(1))

			it('should not add existing entry', () => {
				store.dispatch(addToFavorites(payload))
				expect(store.getState().favorites.length).toBe(1)
			})

			it('should set breed', () =>
				expect(store.getState().favorites[0].breed).toEqual(payload.breed))

			it('should set url', () =>
				expect(store.getState().favorites[0].url).toEqual(payload.url))

			it('should add a unique guid', () =>
				expect(store.getState().favorites[0].id.length).toBe(36))

			it('should set timestamp', () =>
				expect(store.getState().favorites[0].timestamp).toBeDefined())
		})

		describe('removeFromFavorites action', () => {
			beforeAll(
				() =>
					(actionBody = store.dispatch(
						removeFromFavorites(
							'https://images.dog.ceo/breeds/affenpinscher/n02110627_1446.jpg'
						)
					))
			)

			it('should match the snapshot', () =>
				expect(actionBody).toMatchSnapshot())

			it('should remove entry', () =>
				expect(store.getState().favorites.length).toBe(0))
		})
	})

	describe('sortFavorites actions', () => {
		describe('setFavoritesSortType action', () => {
			const payload = 'breed'
			let actionBody = null

			beforeAll(
				() => (actionBody = store.dispatch(setFavoritesSortType(payload)))
			)

			it('should match the snapshot', () =>
				expect(actionBody).toMatchSnapshot())

			it('should set by', () =>
				expect(store.getState().sortFavorites.by).toEqual(payload))
		})

		describe('SORT_FAVORITES_BY_DATE action', () => {
			const payload = 'desc'
			let actionBody = null
			const action = { type: ActionTypes.SORT_FAVORITES_BY_DATE, payload }

			beforeAll(() => (actionBody = store.dispatch(action)))

			it('should match the snapshot', () =>
				expect(actionBody).toMatchSnapshot())

			it('should set byDate', () =>
				expect(store.getState().sortFavorites.byDate).toEqual(payload))
		})

		describe('SORT_FAVORITES_BY_BREED action', () => {
			const payload = 'desc'
			let actionBody = null
			const action = { type: ActionTypes.SORT_FAVORITES_BY_BREED, payload }

			beforeAll(() => (actionBody = store.dispatch(action)))

			it('should match the snapshot', () =>
				expect(actionBody).toMatchSnapshot())

			it('should set byBreed', () =>
				expect(store.getState().sortFavorites.byBreed).toEqual(payload))
		})
	})

	describe('breedInfo actions', () => {
		describe('setBreedInfoStatus action', () => {
			const payload = 'loading'
			let actionBody = null

			beforeAll(
				() => (actionBody = store.dispatch(setBreedInfoStatus(payload)))
			)

			it('should match the snapshot', () => {
				expect(actionBody).toMatchSnapshot()
			})

			it('should set status', () =>
				expect(store.getState().breedInfo.status).toEqual(payload))
		})

		describe('setBreedInfoLoadingProgress action', () => {
			const payload = 10.75
			let actionBody = null

			beforeAll(
				() =>
					(actionBody = store.dispatch(setBreedInfoLoadingProgress(payload)))
			)

			it('should match the snapshot', () => {
				expect(actionBody).toMatchSnapshot()
			})

			it('should set loadingProgress', () =>
				expect(store.getState().breedInfo.loadingProgress).toEqual(payload))
		})

		describe('addBreedInfoList action', () => {
			const payload = ['affenpinscher', 'african', 'airedale']
			let actionBody = null

			beforeAll(() => (actionBody = store.dispatch(addBreedInfoList(payload))))

			it('should match the snapshot', () =>
				expect(actionBody).toMatchSnapshot())

			it('should add new list', () =>
				expect(store.getState().breedInfo.breeds.length).toBe(3))

			it('should set breed name', () =>
				expect(store.getState().breedInfo.breeds[0]).toEqual(payload[0]))
		})

		describe('addBreedInfoListItem action', () => {
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
			let actionBody = null

			beforeAll(
				() => (actionBody = store.dispatch(addBreedInfoListItem(payload)))
			)

			it('should match the snapshot', () =>
				expect(actionBody).toMatchSnapshot())

			it('should add new entry', () =>
				expect(Object.keys(store.getState().breedInfo.infoList).length).toBe(1))

			it('info should have type as object', () =>
				expect(
					typeof store.getState().breedInfo.infoList[payload.breed]
				).toEqual('object'))

			it('should set title', () =>
				expect(
					store.getState().breedInfo.infoList[payload.breed].title
				).toEqual('Affenpinscher'))

			it('should set desc', () =>
				expect(store.getState().breedInfo.infoList[payload.breed].desc).toEqual(
					'test'
				))

			it('should set descUrl', () =>
				expect(
					store.getState().breedInfo.infoList[payload.breed].descUrl
				).toEqual('test'))

			it('should set imgUrl', () =>
				expect(
					store.getState().breedInfo.infoList[payload.breed].imgUrl
				).toEqual('test'))

			it('should set wikiUrl', () =>
				expect(
					store.getState().breedInfo.infoList[payload.breed].wikiUrl
				).toEqual('test'))

			it('should set dogtimeUrl', () =>
				expect(
					store.getState().breedInfo.infoList[payload.breed].dogtimeUrl
				).toEqual('test'))

			it('should set akcUrl', () =>
				expect(
					store.getState().breedInfo.infoList[payload.breed].akcUrl
				).toEqual('test'))

			it('should set petwaveUrl', () =>
				expect(
					store.getState().breedInfo.infoList[payload.breed].petwaveUrl
				).toEqual('test'))

			it('should set purinaUrl', () =>
				expect(
					store.getState().breedInfo.infoList[payload.breed].purinaUrl
				).toEqual('test'))
		})
	})

	describe('language actions', () => {
		const payload = 'ru'
		let actionBody = null

		beforeAll(() => (actionBody = store.dispatch(setLanguage(payload))))

		it('should match the snapshot', () => expect(actionBody).toMatchSnapshot())

		it('should set language', () =>
			expect(store.getState().language).toEqual(payload))
	})

	describe('theme actions', () => {
		const payload = 'blue'
		let actionBody = null

		beforeAll(() => (actionBody = store.dispatch(setTheme(payload))))

		it('should match the snapshot', () => expect(actionBody).toMatchSnapshot())

		it('should set theme', () =>
			expect(store.getState().theme).toEqual(payload))
	})
})
