import { expectSaga, testSaga } from 'redux-saga-test-plan'
import { delay } from 'redux-saga'
import { call } from 'redux-saga/effects'
import { loadDogList } from '../sagas/dogList'
import { setDogListStatus, addDogListInfo } from '../actions'
import { getBreedImages } from '../api'

describe.skip('dogList sagas', () => {
	const errorResponse = { type: 'fake error' }
	const successResponse = { status: 'success', message: [] }
	const action = { breed: 'affenpinscher' }
	const storeState = {
		dogList: {
			list: [],
			status: 'notset',
		},
	}

	it('snapshot test', () => {
		return expectSaga(loadDogList, action)
			.withState(storeState)
			.run()
			.then(result => {
				expect(result.toJSON()).toMatchSnapshot()
			})
	})

	describe('unit tests', () => {
		it('success request', () => {
			testSaga(loadDogList, action)
				.next()
				.put(setDogListStatus('loading'))
				.next()
				.call(getBreedImages, action.breed)
				.next(successResponse)
				.call(delay, 1000)
				.next()
				.put(addDogListInfo(successResponse.message))
				.next()
				.put(setDogListStatus('loaded'))
				.next()
				.isDone()
		})

		it('bad request', () => {
			testSaga(loadDogList, action)
				.next()
				.put(setDogListStatus('loading'))
				.next()
				.call(getBreedImages, action.breed)
				.next(errorResponse)
				.put(setDogListStatus('error'))
				.next()
				.isDone()
		})
	})

	describe('integration tests', () => {
		it('success request', () => {
			return expectSaga(loadDogList, action)
				.withState(storeState)
				.put(setDogListStatus('loading'))
				.provide([
					[call(getBreedImages, action.breed), successResponse],
					[call(delay), 1000],
				])
				.put(addDogListInfo(successResponse.message))
				.put(setDogListStatus('loaded'))
				.run(false)
		})

		it('bad request', () => {
			return expectSaga(loadDogList, action)
				.withState(storeState)
				.put(setDogListStatus('loading'))
				.provide([[call(getBreedImages, action.breed), errorResponse]])
				.put(setDogListStatus('error'))
				.run(false)
		})
	})
})
