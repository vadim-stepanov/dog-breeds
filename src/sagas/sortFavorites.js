import { put, fork, select, takeEvery } from 'redux-saga/effects'
import { ActionTypes } from '../utils/constants'
import { sortFavoritesByDate, sortFavoritesByBreed } from '../selectors'

export function* setSortByDateOrder() {
	let sortBy = 'asc'
	const sortByDate = yield select(sortFavoritesByDate)
	if (sortByDate === sortBy) {
		sortBy = 'desc'
	}
	yield put({ type: ActionTypes.SORT_FAVORITES_BY_DATE, payload: sortBy })
}

export function* setSortByBreedOrder() {
	let sortBy = 'asc'
	const sortByBreed = yield select(sortFavoritesByBreed)
	if (sortByBreed === sortBy) {
		sortBy = 'desc'
	}
	yield put({ type: ActionTypes.SORT_FAVORITES_BY_BREED, payload: sortBy })
}

function* watchSetSortByDateOrder() {
	yield takeEvery(
		ActionTypes.SET_SORT_FAVORITES_BY_DATE_ORDER,
		setSortByDateOrder
	)
}

function* watchSetSortByBreedOrder() {
	yield takeEvery(
		ActionTypes.SET_SORT_FAVORITES_BY_BREED_ORDER,
		setSortByBreedOrder
	)
}

export const sortFavoritesSagas = [
	fork(watchSetSortByDateOrder),
	fork(watchSetSortByBreedOrder),
]
