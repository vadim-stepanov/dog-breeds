import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {
	breedCatalog,
	dogList,
	favorites,
	sortFavorites,
	breedInfo,
	language,
	theme,
} from '../reducers'

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['favorites', 'language', 'theme'],
}

const rootReducer = combineReducers({
	breedInfo,
	breedCatalog,
	dogList,
	favorites,
	sortFavorites,
	language,
	theme,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer
