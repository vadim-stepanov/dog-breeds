import { delay } from 'redux-saga'
import {
	put,
	call,
	fork,
	select,
	takeLatest,
	takeEvery,
} from 'redux-saga/effects'
import { ActionTypes } from '../utils/constants'
import {
	setBreedCatalogStatus,
	addBreedCatalogInfo,
	setBreedCatalogImgStatus,
	addBreedCatalogImg,
} from '../actions'
import {
	breedCatalogInfoStatus,
	breedCatalogImgStatus,
	breedCatalogInfoList,
} from '../selectors'
import { getCatalog, getRandomBreedImage } from '../api'

export function* loadBreedCatalog() {
	// optimization
	const infoStatus = yield select(breedCatalogInfoStatus)
	if (infoStatus === 'loaded') {
		return
	}

	yield put(setBreedCatalogStatus('loading'))

	const data = yield call(getCatalog)

	if (data.status === 'success') {
		yield call(delay, 1000)
		yield put(addBreedCatalogInfo(data.message))
	} else {
		console.error(`catalog request failed: ${data.type}`)
	}

	yield put(setBreedCatalogStatus('loaded'))

	yield put({ type: ActionTypes.LOAD_NEXT_BREED_IMAGE })
}

export function* loadNextBreedImage(action) {
	const count = action.count || 10

	const imgStatus = yield select(breedCatalogImgStatus)
	if (imgStatus === 'loading') {
		return
	}

	let infoList = yield select(breedCatalogInfoList)
	if (!infoList.some(b => b.imgURL === '')) {
		return
	}

	yield put(setBreedCatalogImgStatus('loading'))

	for (let i = 0; i < count; ++i) {
		infoList = yield select(breedCatalogInfoList)
		const breed = infoList.find(b => b.imgURL === '')
		if (breed === undefined) {
			break
		}

		const data = yield call(getRandomBreedImage, breed.name)

		if (data.status === 'success') {
			yield put(addBreedCatalogImg({ name: breed.name, imgURL: data.message }))
		} else {
			console.error(`image request failed: ${data.type}`)
		}
	}

	yield put(setBreedCatalogImgStatus('loaded'))
}

function* watchLoadBreedCatalog() {
	yield takeLatest(ActionTypes.LOAD_BREED_CATALOG, loadBreedCatalog)
}

function* watchLoadNextBreedImage() {
	yield takeEvery(ActionTypes.LOAD_NEXT_BREED_IMAGE, loadNextBreedImage)
}

export const breedCatalogSagas = [
	fork(watchLoadBreedCatalog),
	fork(watchLoadNextBreedImage),
]
