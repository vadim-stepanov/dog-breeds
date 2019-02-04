import { put, fork, select, takeEvery } from 'redux-saga/effects'
import { ActionTypes } from '../utils/constants'
import { addToFavorites, removeFromFavorites } from '../actions'
import { favorites } from '../selectors'

export function* makeFavorite({ url, breed }) {
	const items = yield select(favorites)
	if (items.some(el => el.url === url)) {
		yield put(removeFromFavorites(url))
	} else {
		yield put(addToFavorites({ url, breed }))
	}
}

function* watchMakeFavorite() {
	yield takeEvery(ActionTypes.MAKE_FAVORITE, makeFavorite)
}

export const favoritesSagas = [fork(watchMakeFavorite)]
