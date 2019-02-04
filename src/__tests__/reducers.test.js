import Immutable from 'seamless-immutable'
import { ActionTypes } from '../utils/constants'
import {
	breedCatalog,
	dogList,
	favorites,
	sortFavorites,
	breedInfo,
	language,
	theme,
} from '../reducers'
import {
	setBreedCatalogStatus,
	setBreedCatalogImgStatus,
	setDogListStatus,
	setFavoritesSortType,
	setBreedInfoStatus,
	setBreedInfoLoadingProgress,
	addBreedInfoList,
	addBreedInfoListItem,
	setLanguage,
	setTheme,
} from '../actions'

describe.skip('Reducers', () => {
	describe('breedCatalog reducer', () => {
		const initialState = Immutable({
			infoList: [],
			infoStatus: 'notset',
			imgStatus: 'notset',
		})

		it('should have initial state', () => {
			expect(breedCatalog(undefined, {})).toEqual(initialState)
		})

		it('should return the same state after accepting a non existing action', () => {
			expect(
				breedCatalog(initialState, {
					type: 'NON_EXISTING',
				})
			).toEqual(initialState)
		})

		it('should set infoStatus', () => {
			const expectedState = { ...initialState, infoStatus: 'loading' }
			const next = breedCatalog(initialState, setBreedCatalogStatus('loading'))
			expect(next).toEqual(expectedState)
			expect(next).toMatchSnapshot()
		})

		it('should set imgStatus', () => {
			const expectedState = { ...initialState, imgStatus: 'loaded' }
			const next = breedCatalog(
				initialState,
				setBreedCatalogImgStatus('loaded')
			)
			expect(next).toEqual(expectedState)
			expect(next).toMatchSnapshot()
		})
	})

	describe('dogList reducer', () => {
		const initialState = Immutable({
			list: [],
			status: 'notset',
		})

		it('should have initial state', () => {
			expect(dogList(undefined, {})).toEqual(initialState)
		})

		it('should return the same state after accepting a non existing action', () => {
			expect(
				dogList(initialState, {
					type: 'NON_EXISTING',
				})
			).toEqual(initialState)
		})

		it('should set status', () => {
			const expectedState = { ...initialState, status: 'loaded' }
			const next = dogList(initialState, setDogListStatus('loaded'))
			expect(next).toEqual(expectedState)
			expect(next).toMatchSnapshot()
		})
	})

	describe('favorites reducer', () => {
		const initialState = Immutable([])

		it('should have initial state', () => {
			expect(favorites(undefined, [])).toEqual(initialState)
		})

		it('should return the same state after accepting a non existing action', () => {
			expect(
				favorites(initialState, {
					type: 'NON_EXISTING',
				})
			).toEqual(initialState)
		})
	})

	describe('sortFavorites reducer', () => {
		const initialState = Immutable({
			by: 'date',
			byDate: 'asc',
			byBreed: 'asc',
		})

		it('should have initial state', () => {
			expect(sortFavorites(undefined, {})).toEqual(initialState)
		})

		it('should return the same state after accepting a non existing action', () => {
			expect(
				sortFavorites(initialState, {
					type: 'NON_EXISTING',
				})
			).toEqual(initialState)
		})

		it('should set by', () => {
			const expectedState = { ...initialState, by: 'breed' }
			const next = sortFavorites(initialState, setFavoritesSortType('breed'))
			expect(next).toEqual(expectedState)
			expect(next).toMatchSnapshot()
		})

		it('should set byDate', () => {
			const expectedState = { ...initialState, byDate: 'desc' }
			const next = sortFavorites(initialState, {
				type: ActionTypes.SORT_FAVORITES_BY_DATE,
				payload: 'desc',
			})
			expect(next).toEqual(expectedState)
			expect(next).toMatchSnapshot()
		})

		it('should set byBreed', () => {
			const expectedState = { ...initialState, byBreed: 'desc' }
			const next = sortFavorites(initialState, {
				type: ActionTypes.SORT_FAVORITES_BY_BREED,
				payload: 'desc',
			})
			expect(next).toEqual(expectedState)
			expect(next).toMatchSnapshot()
		})
	})

	describe('breedInfo reducer', () => {
		const initialState = Immutable({
			status: 'notset',
			loadingProgress: 0,
			breeds: [],
			infoList: {},
		})

		it('should have initial state', () => {
			expect(breedInfo(undefined, {})).toEqual(initialState)
		})

		it('should return the same state after accepting a non existing action', () => {
			expect(
				breedInfo(initialState, {
					type: 'NON_EXISTING',
				})
			).toEqual(initialState)
		})

		it('should set status', () => {
			const expectedState = { ...initialState, status: 'loading' }
			const next = breedInfo(initialState, setBreedInfoStatus('loading'))
			expect(next).toEqual(expectedState)
			expect(next).toMatchSnapshot()
		})

		it('should set loadingProgress', () => {
			const expectedState = { ...initialState, loadingProgress: 10.75 }
			const next = breedInfo(initialState, setBreedInfoLoadingProgress(10.75))
			expect(next).toEqual(expectedState)
			expect(next).toMatchSnapshot()
		})

		it('should set breeds', () => {
			const payload = ['affenpinscher', 'african', 'airedale']
			const expectedState = { ...initialState, breeds: payload }
			const next = breedInfo(initialState, addBreedInfoList(payload))
			expect(next).toEqual(expectedState)
			expect(next).toMatchSnapshot()
		})

		it('should set infoList', () => {
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
			const expectedItem = {
				affenpinscher: {
					desc: 'test',
					descUrl: 'test',
					imgUrl: 'test',
					wikiUrl: 'test',
					dogtimeUrl: 'test',
					akcUrl: 'test',
					petwaveUrl: 'test',
					purinaUrl: 'test',
					title: 'Affenpinscher',
				},
			}
			const expectedState = { ...initialState, infoList: expectedItem }
			const next = breedInfo(initialState, addBreedInfoListItem(payload))
			expect(next).toEqual(expectedState)
			expect(next).toMatchSnapshot()
		})
	})

	describe('language reducer', () => {
		const initialState = Immutable('en')

		it('should have initial state', () => {
			expect(language(undefined, {})).toEqual(initialState)
		})

		it('should return the same state after accepting a non existing action', () => {
			expect(
				language(initialState, {
					type: 'NON_EXISTING',
				})
			).toEqual(initialState)
		})

		it('should set correct value', () => {
			const expectedState = 'ru'
			const next = language(initialState, setLanguage('ru'))
			expect(next).toEqual(expectedState)
			expect(next).toMatchSnapshot()
		})
	})

	describe('theme reducer', () => {
		const initialState = Immutable('gray')

		it('should have initial state', () => {
			expect(theme(undefined, {})).toEqual(initialState)
		})

		it('should return the same state after accepting a non existing action', () => {
			expect(
				theme(initialState, {
					type: 'NON_EXISTING',
				})
			).toEqual(initialState)
		})

		it('should set correct value', () => {
			const expectedState = 'blue'
			const next = theme(initialState, setTheme('blue'))
			expect(next).toEqual(expectedState)
			expect(next).toMatchSnapshot()
		})
	})
})
