import 'jest-localstorage-mock'
import store from '../store'
import {
	breedCatalogInfoStatus,
	breedCatalogImgStatus,
	breedCatalogInfoList,
	dogListList,
	dogListStatus,
	favorites,
	sortFavoritesBy,
	sortFavoritesByDate,
	sortFavoritesByBreed,
	breedInfoStatus,
	breedInfoLoadingProgress,
	breedInfoBreeds,
	breedInfoList,
	language,
	theme,
} from '../selectors'

describe.skip('Selectors', () => {
	describe('breedCatalog selectors', () => {
		it('check breedCatalogInfoStatus', () => {
			expect(typeof breedCatalogInfoStatus(store.getState())).toBe('string')
			expect(breedCatalogInfoStatus(store.getState())).toEqual('notset')
		})

		it('check breedCatalogImgStatus', () => {
			expect(typeof breedCatalogImgStatus(store.getState())).toBe('string')
			expect(breedCatalogImgStatus(store.getState())).toEqual('notset')
		})

		it('check breedCatalogInfoList', () => {
			expect(Array.isArray(breedCatalogInfoList(store.getState()))).toBe(true)
			expect(breedCatalogInfoList(store.getState())).toEqual([])
		})
	})

	describe('dogList selectors', () => {
		it('check dogListList', () => {
			expect(Array.isArray(dogListList(store.getState()))).toBe(true)
			expect(dogListList(store.getState())).toEqual([])
		})

		it('check dogListStatus', () => {
			expect(typeof dogListStatus(store.getState())).toBe('string')
			expect(dogListStatus(store.getState())).toEqual('notset')
		})
	})

	describe('favorites selectors', () => {
		it('check favorites', () => {
			expect(Array.isArray(favorites(store.getState()))).toBe(true)
			expect(favorites(store.getState())).toEqual([])
		})
	})

	describe('sortFavorites selectors', () => {
		it('check sortFavoritesBy', () => {
			expect(typeof sortFavoritesBy(store.getState())).toBe('string')
			expect(sortFavoritesBy(store.getState())).toEqual('date')
		})

		it('check sortFavoritesByDate', () => {
			expect(typeof sortFavoritesByDate(store.getState())).toBe('string')
			expect(sortFavoritesByDate(store.getState())).toEqual('asc')
		})

		it('check sortFavoritesByBreed', () => {
			expect(typeof sortFavoritesByBreed(store.getState())).toBe('string')
			expect(sortFavoritesByBreed(store.getState())).toEqual('asc')
		})
	})

	describe('breedInfo selectors', () => {
		it('check breedInfoStatus', () => {
			expect(typeof breedInfoStatus(store.getState())).toBe('string')
			expect(breedInfoStatus(store.getState())).toEqual('notset')
		})

		it('check breedInfoLoadingProgress', () => {
			expect(typeof breedInfoLoadingProgress(store.getState())).toBe('number')
			expect(breedInfoLoadingProgress(store.getState())).toEqual(0)
		})

		it('check breedInfoBreeds', () => {
			expect(Array.isArray(breedInfoBreeds(store.getState()))).toBe(true)
			expect(breedInfoBreeds(store.getState())).toEqual([])
		})

		it('check breedInfoList', () => {
			expect(typeof breedInfoList(store.getState())).toBe('object')
			expect(breedInfoList(store.getState())).toEqual({})
		})
	})

	describe('language selector', () => {
		it('check', () => {
			expect(typeof language(store.getState())).toBe('string')
			expect(language(store.getState())).toEqual('en')
		})
	})

	describe('theme selector', () => {
		it('check', () => {
			expect(typeof theme(store.getState())).toBe('string')
			expect(theme(store.getState())).toEqual('gray')
		})
	})
})
