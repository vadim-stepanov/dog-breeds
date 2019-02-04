import { put, call, fork, select, takeEvery } from 'redux-saga/effects'
import { ActionTypes } from '../utils/constants'
import {
	setBreedInfoStatus,
	setBreedInfoLoadingProgress,
	addBreedInfoList,
	addBreedInfoListItem,
} from '../actions'
import { breedInfoStatus } from '../selectors'
import { getBreedInfoList, getBreedInfo } from '../api'

export function* loadBreedInfo() {
	const status = yield select(breedInfoStatus)
	if (status === 'loaded') {
		return
	}

	yield put(setBreedInfoStatus('loading'))

	const data = yield call(getBreedInfoList)

	if (data.status === 'success') {
		yield put(addBreedInfoList(data.message))
	} else {
		console.error(`breed info list request failed: ${data.type}`)
		yield put(setBreedInfoStatus('error'))
		return
	}

	const progressPart = Number(100 / data.message.length).toFixed(2)
	let curProgress = 0
	for (const breed of data.message) {
		const breedInfo = yield call(getBreedInfo, breed)
		if (breedInfo.status === 'success') {
			yield put(addBreedInfoListItem({ breed, info: breedInfo.message }))
			curProgress = (Number(curProgress) + Number(progressPart)).toFixed(2)
			yield put(setBreedInfoLoadingProgress(curProgress))
		} else {
			console.error(`breed info request failed: ${breedInfo.type}`)
		}
	}

	yield put(setBreedInfoStatus('loaded'))
}

function* watchLoadBreedInfo() {
	yield takeEvery(ActionTypes.LOAD_BREED_INFO, loadBreedInfo)
}

export const breedInfoSagas = [fork(watchLoadBreedInfo)]
