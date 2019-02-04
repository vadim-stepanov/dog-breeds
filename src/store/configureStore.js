import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import createSagaMiddleware from 'redux-saga'
import persistedReducer from './persist'
import rootSagas from '../sagas'

const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware]

const configureStore = initialState => {
	const composeEnhancers = composeWithDevTools({
		// options like actionSanitizer, stateSanitizer
	})

	const store = createStore(
		persistedReducer,
		initialState,
		composeEnhancers(applyMiddleware(...middleware))
	)

	sagaMiddleware.run(rootSagas)

	return store
}

export default configureStore
