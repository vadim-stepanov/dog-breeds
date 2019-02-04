import { expectSaga, testSaga } from 'redux-saga-test-plan'
import { select } from 'redux-saga/effects'
import { ActionTypes } from '../utils/constants'
import {
	setSortByDateOrder,
	setSortByBreedOrder,
} from '../sagas/sortFavorites'
import { sortFavoritesByDate, sortFavoritesByBreed } from '../selectors'

describe.skip('sortFavorites sagas', () => {
	const storeState = {
		sortFavorites: {
			by: 'date',
			byDate: 'asc',
			byBreed: 'asc',
		},
	}

	describe('setSortByDateOrder saga', () => {
		it('snapshot test', () => {
			return expectSaga(setSortByDateOrder)
				.withState(storeState)
				.run()
				.then(result => {
					expect(result.toJSON()).toMatchSnapshot()
				})
		})

		describe('unit tests', () => {
			it('should switch to desc if asc set', () => {
				testSaga(setSortByDateOrder)
					.next()
					.select(sortFavoritesByDate)
					.next('asc')
					.put({
						type: ActionTypes.SORT_FAVORITES_BY_DATE,
						payload: 'desc',
					})
					.next()
					.isDone()
			})

			it('should switch to asc if desc set', () => {
				testSaga(setSortByDateOrder)
					.next()
					.select(sortFavoritesByDate)
					.next('desc')
					.put({
						type: ActionTypes.SORT_FAVORITES_BY_DATE,
						payload: 'asc',
					})
					.next()
					.isDone()
			})
		})

		describe('integration tests', () => {
			it('should switch to desc if asc set', () => {
				return expectSaga(setSortByDateOrder)
					.provide([[select(sortFavoritesByDate), 'asc']])
					.put({
						type: ActionTypes.SORT_FAVORITES_BY_DATE,
						payload: 'desc',
					})
					.run()
			})

			it('should switch to asc if desc set', () => {
				return expectSaga(setSortByDateOrder)
					.provide([[select(sortFavoritesByDate), 'desc']])
					.put({
						type: ActionTypes.SORT_FAVORITES_BY_DATE,
						payload: 'asc',
					})
					.run()
			})
		})
	})

	describe('setSortByBreedOrder saga', () => {
		it('snapshot test', () => {
			return expectSaga(setSortByBreedOrder)
				.withState(storeState)
				.run()
				.then(result => {
					expect(result.toJSON()).toMatchSnapshot()
				})
		})

		describe('unit tests', () => {
			it('should switch to desc if asc set', () => {
				testSaga(setSortByBreedOrder)
					.next()
					.select(sortFavoritesByBreed)
					.next('asc')
					.put({
						type: ActionTypes.SORT_FAVORITES_BY_BREED,
						payload: 'desc',
					})
					.next()
					.isDone()
			})

			it('should switch to asc if desc set', () => {
				testSaga(setSortByBreedOrder)
					.next()
					.select(sortFavoritesByBreed)
					.next('desc')
					.put({
						type: ActionTypes.SORT_FAVORITES_BY_BREED,
						payload: 'asc',
					})
					.next()
					.isDone()
			})
		})

		describe('integration tests', () => {
			it('should switch to desc if asc set', () => {
				return expectSaga(setSortByBreedOrder)
					.provide([[select(sortFavoritesByBreed), 'asc']])
					.put({
						type: ActionTypes.SORT_FAVORITES_BY_BREED,
						payload: 'desc',
					})
					.run()
			})

			it('should switch to asc if desc set', () => {
				return expectSaga(setSortByBreedOrder)
					.provide([[select(sortFavoritesByBreed), 'desc']])
					.put({
						type: ActionTypes.SORT_FAVORITES_BY_BREED,
						payload: 'asc',
					})
					.run()
			})
		})
	})
})
