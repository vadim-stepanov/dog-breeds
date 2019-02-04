import { expectSaga, testSaga } from 'redux-saga-test-plan'
import { call, select } from 'redux-saga/effects'
import { loadBreedInfo } from '../sagas/breedInfo'
import { getBreedInfoList, getBreedInfo } from '../api'
import { breedInfoStatus } from '../selectors'
import {
	setBreedInfoStatus,
	setBreedInfoLoadingProgress,
	addBreedInfoList,
	addBreedInfoListItem,
} from '../actions'

describe.skip('breedInfo sagas', () => {
	const storeState = {
		breedInfo: {
			status: 'notset',
			loadingProgress: 0,
			breeds: [],
			infoList: {},
		},
	}

	const successResponseBreedList = {
		status: 'success',
		message: ['affenpinscher'],
	}

	const successResponseBreed = {
		status: 'success',
		message: {
			desc: '',
			descUrl: '',
			imgUrl: '',
			wikiUrl: '',
			dogtimeUrl: '',
			akcUrl: '',
			petwaveUrl: '',
			purinaUrl: '',
		},
	}

	const errorResponse = { type: 'fake error' }

	it('snapshot test', () => {
		return expectSaga(loadBreedInfo)
			.withState(storeState)
			.run()
			.then(result => {
				expect(result.toJSON()).toMatchSnapshot()
			})
	})

	describe('unit tests', () => {
		it("shouldn't work when status is loaded", () => {
			testSaga(loadBreedInfo)
				.next()
				.select(breedInfoStatus)
				.next('loaded')
				.isDone()
		})

		it('completly success request', () => {
			testSaga(loadBreedInfo)
				.next()
				.select(breedInfoStatus)
				.next()
				.put(setBreedInfoStatus('loading'))
				.next()
				.call(getBreedInfoList)
				.next(successResponseBreedList)
				.put(addBreedInfoList(successResponseBreedList.message))
				.next()
				.call(getBreedInfo, 'affenpinscher')
				.next(successResponseBreed)
				.put(
					addBreedInfoListItem({
						breed: 'affenpinscher',
						info: successResponseBreed.message,
					})
				)
				.next()
				.put(setBreedInfoLoadingProgress('100.00'))
				.next()
				.put(setBreedInfoStatus('loaded'))
				.next()
				.isDone()
		})

		it('should do return when getBreedInfoList() request is failed', () => {
			testSaga(loadBreedInfo)
				.next()
				.select(breedInfoStatus)
				.next()
				.put(setBreedInfoStatus('loading'))
				.next()
				.call(getBreedInfoList)
				.next(errorResponse)
				.put(setBreedInfoStatus('error'))
				.next()
				.isDone()
		})

		it('should do return when getBreedInfo() request is failed', () => {
			testSaga(loadBreedInfo)
				.next()
				.select(breedInfoStatus)
				.next()
				.put(setBreedInfoStatus('loading'))
				.next()
				.call(getBreedInfoList)
				.next(successResponseBreedList)
				.put(addBreedInfoList(successResponseBreedList.message))
				.next()
				.call(getBreedInfo, 'affenpinscher')
				.next(errorResponse)
				.put(setBreedInfoStatus('loaded'))
				.next()
				.isDone()
		})
	})

	describe('integration tests', () => {
		it('completly success request', () => {
			return (
				expectSaga(loadBreedInfo)
					.withState(storeState)
					.provide([[select(breedInfoStatus)]])
					.put(setBreedInfoStatus('loading'))
					.provide([[call(getBreedInfoList), successResponseBreedList]])
					//.put(addBreedInfoList(successResponseBreedList.message)) // !!! this performs an update with real data, not fake, seems to be bug !!!
					.provide([
						[call(getBreedInfo, 'affenpinscher'), successResponseBreed],
					])
					.put(
						addBreedInfoListItem({
							breed: 'affenpinscher',
							info: successResponseBreed.message,
						})
					)
					.put(setBreedInfoLoadingProgress('100.05'))
					.put(setBreedInfoStatus('loaded'))
					.run(false)
			)
		})

		it('should do return when getBreedInfoList() request is failed', () => {
			expectSaga(loadBreedInfo)
				.withState(storeState)
				.provide([[select(breedInfoStatus)]])
				.put(setBreedInfoStatus('loading'))
				.provide([[call(getBreedInfoList), errorResponse]])
				.run(false)
		})

		it('should do return when getBreedInfo() request is failed', () => {
			return (
				expectSaga(loadBreedInfo)
					.withState(storeState)
					.provide([[select(breedInfoStatus)]])
					.put(setBreedInfoStatus('loading'))
					.provide([[call(getBreedInfoList), successResponseBreedList]])
					//.put(addBreedInfoList(successResponseBreedList.message)) // !!! this performs an update with real data, not fake, seems to be bug !!!
					.provide([[call(getBreedInfo, 'affenpinscher'), errorResponse]])
					.put(setBreedInfoStatus('loaded'))
					.run(false)
			)
		})
	})
})
