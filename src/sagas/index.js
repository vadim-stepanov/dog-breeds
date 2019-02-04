import { all } from 'redux-saga/effects'
import { breedCatalogSagas } from './breedCatalog'
import { dogListSagas } from './dogList'
import { favoritesSagas } from './favorites'
import { sortFavoritesSagas } from './sortFavorites'
import { breedInfoSagas } from './breedInfo'

export default function* sagas() {
	yield all([
		...breedInfoSagas,
		...breedCatalogSagas,
		...dogListSagas,
		...favoritesSagas,
		...sortFavoritesSagas,
	])
}
