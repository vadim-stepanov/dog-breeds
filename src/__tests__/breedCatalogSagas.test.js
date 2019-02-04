import { expectSaga, testSaga } from 'redux-saga-test-plan'
import { delay } from 'redux-saga'
import { call, select } from 'redux-saga/effects'
import { ActionTypes } from '../utils/constants'
import { loadBreedCatalog, loadNextBreedImage } from '../sagas/breedCatalog'
import { getCatalog, getRandomBreedImage } from '../api'
import {
	breedCatalogInfoStatus,
	breedCatalogImgStatus,
	breedCatalogInfoList,
} from '../selectors'
import {
	setBreedCatalogStatus,
	addBreedCatalogInfo,
	setBreedCatalogImgStatus,
	addBreedCatalogImg,
} from '../actions'

describe.skip('breedCatalog sagas', () => {
	const errorResponse = { type: 'fake error' }

	describe('loadBreedCatalog saga', () => {
		const storeState = {
			breedCatalog: { infoList: [], infoStatus: 'notset', imgStatus: 'notset' },
		}
		const successResponse = { status: 'success', message: [] }

		it('snapshot test', () => {
			return expectSaga(loadBreedCatalog)
				.withState(storeState)
				.run()
				.then(result => {
					expect(result.toJSON()).toMatchSnapshot()
				})
		})

		describe('unit tests', () => {
			it('success request', () => {
				testSaga(loadBreedCatalog)
					.next()
					.select(breedCatalogInfoStatus)
					.next()
					.put(setBreedCatalogStatus('loading'))
					.next()
					.call(getCatalog)
					.next(successResponse)
					.call(delay, 1000)
					.next()
					.put(addBreedCatalogInfo(successResponse.message))
					.next()
					.put(setBreedCatalogStatus('loaded'))
					.next()
					.put({ type: ActionTypes.LOAD_NEXT_BREED_IMAGE })
					.next()
					.isDone()
			})

			it('bad request', () => {
				testSaga(loadBreedCatalog)
					.next()
					.select(breedCatalogInfoStatus)
					.next()
					.put(setBreedCatalogStatus('loading'))
					.next()
					.call(getCatalog)
					.next(errorResponse)
					.put(setBreedCatalogStatus('loaded'))
					.next()
					.put({ type: ActionTypes.LOAD_NEXT_BREED_IMAGE })
					.next()
					.isDone()
			})

			it("shouldn't work when status is loaded", () => {
				testSaga(loadBreedCatalog)
					.next()
					.select(breedCatalogInfoStatus)
					.next('loaded')
					.isDone()
			})
		})

		describe('integration tests', () => {
			it('success request', () => {
				return expectSaga(loadBreedCatalog)
					.withState(storeState)
					.provide([[select(breedCatalogInfoStatus)]])
					.put(setBreedCatalogStatus('loading'))
					.provide([[call(getCatalog), successResponse], [call(delay), 1000]])
					.put(addBreedCatalogInfo(successResponse.message))
					.put(setBreedCatalogStatus('loaded'))
					.put({ type: ActionTypes.LOAD_NEXT_BREED_IMAGE })
					.run(false)
			})

			it('bad request', () => {
				expectSaga(loadBreedCatalog)
					.withState(storeState)
					.provide([[select(breedCatalogInfoStatus)]])
					.put(setBreedCatalogStatus('loading'))
					.provide([[call(getCatalog), errorResponse]])
					.put(setBreedCatalogStatus('loaded'))
					.put({ type: ActionTypes.LOAD_NEXT_BREED_IMAGE })
					.run(false)
			})
		})
	})

	describe('loadNextBreedImage saga', () => {
		const storeState = {
			breedCatalog: { infoList: [], infoStatus: 'notset', imgStatus: 'notset' },
		}
		const action = { count: 3 }

		it('snapshot test', () => {
			return expectSaga(loadNextBreedImage, action)
				.withState(storeState)
				.run()
				.then(result => {
					expect(result.toJSON()).toMatchSnapshot()
				})
		})

		describe('unit tests', () => {
			it("shouldn't work when status is loading", () => {
				testSaga(loadNextBreedImage, action)
					.next()
					.select(breedCatalogImgStatus)
					.next('loading')
					.isDone()
			})

			it('should do return when breedCatalogInfoList is empty', () => {
				const infoList = []
				testSaga(loadNextBreedImage, action)
					.next()
					.select(breedCatalogImgStatus)
					.next()
					.select(breedCatalogInfoList)
					.next(infoList)
					.isDone()
			})

			it('should do return when breedCatalogInfoList is filled and all imgURL`s have values', () => {
				const infoList = [
					{
						id: '6091d7c2-7d51-44c5-b073-f6d8689d8e2b',
						name: 'affenpinscher',
						imgURL:
							'https://images.dog.ceo/breeds/affenpinscher/n02110627_12227.jpg',
					},
					{
						id: '53cb2c8f-41ce-41e6-b03b-5fa6fafd9b88',
						name: 'african',
						imgURL: 'https://images.dog.ceo/breeds/african/n02116738_2327.jpg',
					},
					{
						id: 'b22d402d-bbc0-435e-a2ee-587c5916bc53',
						name: 'airedale',
						imgURL: 'https://images.dog.ceo/breeds/airedale/n02096051_584.jpg',
					},
				]
				testSaga(loadNextBreedImage, action)
					.next()
					.select(breedCatalogImgStatus)
					.next()
					.select(breedCatalogInfoList)
					.next(infoList)
					.isDone()
			})

			it('should work when breedCatalogInfoList is filled and some imgURL`s don`t have values', () => {
				const infoList = [
					{
						id: '6091d7c2-7d51-44c5-b073-f6d8689d8e2b',
						name: 'affenpinscher',
						imgURL: '',
					},
					{
						id: '53cb2c8f-41ce-41e6-b03b-5fa6fafd9b88',
						name: 'african',
						imgURL: '',
					},
					{
						id: 'b22d402d-bbc0-435e-a2ee-587c5916bc53',
						name: 'airedale',
						imgURL: 'https://images.dog.ceo/breeds/airedale/n02096051_584.jpg',
					},
				]
				testSaga(loadNextBreedImage, { count: 1 })
					.next()
					.select(breedCatalogImgStatus)
					.next()
					.select(breedCatalogInfoList)
					.next(infoList)
					.put(setBreedCatalogImgStatus('loading'))
					.next()
					.select(breedCatalogInfoList)
					.next(infoList)
					.call(getRandomBreedImage, 'affenpinscher')
					.next({
						status: 'success',
						message:
							'https://images.dog.ceo/breeds/affenpinscher/n02110627_12227.jpg',
					})
					.put(
						addBreedCatalogImg({
							name: 'affenpinscher',
							imgURL:
								'https://images.dog.ceo/breeds/affenpinscher/n02110627_12227.jpg',
						})
					)
					.next()
					.put(setBreedCatalogImgStatus('loaded'))
					.next()
					.isDone()
			})

			it('should not work with bad response', () => {
				const infoList = [
					{
						id: '6091d7c2-7d51-44c5-b073-f6d8689d8e2b',
						name: 'affenpinscher',
						imgURL: '',
					},
					{
						id: '53cb2c8f-41ce-41e6-b03b-5fa6fafd9b88',
						name: 'african',
						imgURL: '',
					},
					{
						id: 'b22d402d-bbc0-435e-a2ee-587c5916bc53',
						name: 'airedale',
						imgURL: 'https://images.dog.ceo/breeds/airedale/n02096051_584.jpg',
					},
				]
				testSaga(loadNextBreedImage, { count: 1 })
					.next()
					.select(breedCatalogImgStatus)
					.next()
					.select(breedCatalogInfoList)
					.next(infoList)
					.put(setBreedCatalogImgStatus('loading'))
					.next()
					.select(breedCatalogInfoList)
					.next(infoList)
					.call(getRandomBreedImage, 'affenpinscher')
					.next(errorResponse)
					.put(setBreedCatalogImgStatus('loaded'))
					.next()
					.isDone()
			})
		})

		describe('integration tests', () => {
			it('should do return when breedCatalogInfoList is empty', () => {
				const infoList = []
				expectSaga(loadNextBreedImage, action)
					.withState(storeState)
					.provide([
						[select(breedCatalogImgStatus)],
						[select(breedCatalogInfoList), infoList],
					])
					.run()
			})

			it('should do return when breedCatalogInfoList is filled and all imgURL`s have values', () => {
				const infoList = [
					{
						id: '6091d7c2-7d51-44c5-b073-f6d8689d8e2b',
						name: 'affenpinscher',
						imgURL:
							'https://images.dog.ceo/breeds/affenpinscher/n02110627_12227.jpg',
					},
					{
						id: '53cb2c8f-41ce-41e6-b03b-5fa6fafd9b88',
						name: 'african',
						imgURL: 'https://images.dog.ceo/breeds/african/n02116738_2327.jpg',
					},
					{
						id: 'b22d402d-bbc0-435e-a2ee-587c5916bc53',
						name: 'airedale',
						imgURL: 'https://images.dog.ceo/breeds/airedale/n02096051_584.jpg',
					},
				]

				expectSaga(loadNextBreedImage, action)
					.withState(storeState)
					.provide([
						[select(breedCatalogImgStatus)],
						[select(breedCatalogInfoList), infoList],
					])
					.run()
			})

			it('should work when breedCatalogInfoList is filled and some imgURL`s don`t have values', () => {
				const infoList = [
					{
						id: '6091d7c2-7d51-44c5-b073-f6d8689d8e2b',
						name: 'affenpinscher',
						imgURL: '',
					},
					{
						id: '53cb2c8f-41ce-41e6-b03b-5fa6fafd9b88',
						name: 'african',
						imgURL: '',
					},
					{
						id: 'b22d402d-bbc0-435e-a2ee-587c5916bc53',
						name: 'airedale',
						imgURL: 'https://images.dog.ceo/breeds/airedale/n02096051_584.jpg',
					},
				]

				expectSaga(loadNextBreedImage, { count: 1 })
					.withState(storeState)
					.provide([
						[select(breedCatalogImgStatus)],
						[select(breedCatalogInfoList), infoList],
					])
					.put(setBreedCatalogImgStatus('loading'))
					.provide([
						[select(breedCatalogInfoList), infoList],
						[
							call(getRandomBreedImage, 'affenpinscher'),
							{
								status: 'success',
								message:
									'https://images.dog.ceo/breeds/affenpinscher/n02110627_12227.jpg',
							},
						],
					])
					.put(
						addBreedCatalogImg({
							name: 'affenpinscher',
							imgURL:
								'https://images.dog.ceo/breeds/affenpinscher/n02110627_12227.jpg',
						})
					)
					.put(setBreedCatalogImgStatus('loaded'))
					.run(false)
			})

			it('should not work with bad response', () => {
				const infoList = [
					{
						id: '6091d7c2-7d51-44c5-b073-f6d8689d8e2b',
						name: 'affenpinscher',
						imgURL: '',
					},
					{
						id: '53cb2c8f-41ce-41e6-b03b-5fa6fafd9b88',
						name: 'african',
						imgURL: '',
					},
					{
						id: 'b22d402d-bbc0-435e-a2ee-587c5916bc53',
						name: 'airedale',
						imgURL: 'https://images.dog.ceo/breeds/airedale/n02096051_584.jpg',
					},
				]

				expectSaga(loadNextBreedImage, { count: 1 })
					.withState(storeState)
					.provide([
						[select(breedCatalogImgStatus)],
						[select(breedCatalogInfoList), infoList],
					])
					.put(setBreedCatalogImgStatus('loading'))
					.provide([
						[select(breedCatalogInfoList), infoList],
						[call(getRandomBreedImage, 'affenpinscher'), errorResponse],
					])
					.put(setBreedCatalogImgStatus('loaded'))
					.run(false)
			})
		})
	})
})
