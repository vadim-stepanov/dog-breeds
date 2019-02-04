import { delay } from 'redux-saga'
import { put, call, fork, takeEvery } from 'redux-saga/effects'
import { ActionTypes } from '../utils/constants'
import { setDogListStatus, addDogListInfo } from '../actions'
import { getBreedImages } from '../api'

export function* loadDogList(action) {
	yield put(setDogListStatus('loading'))

	const data = yield call(getBreedImages, action.breed)

	if (data.status === 'success') {
		yield call(delay, 1000)
		yield put(addDogListInfo(data.message))
		yield put(setDogListStatus('loaded'))
	} else {
		console.error(`dog-list request failed: ${data.type}`)
		yield put(setDogListStatus('error'))
	}
}

function* watchLoadDogList() {
	yield takeEvery(ActionTypes.LOAD_DOG_LIST, loadDogList)
}

export const dogListSagas = [fork(watchLoadDogList)]
