import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { I18nextProvider } from 'react-i18next'
import store from './store'
import AppRouter from './components/AppRouter'
import i18n from './components/common/i18n'
import './utils/global-styles'

const persistor = persistStore(store)

const App = () => (
	<Provider store={store}>
		<PersistGate loading={<div>Loading...</div>} persistor={persistor}>
			<Router>
				<I18nextProvider i18n={i18n}>
					<AppRouter />
				</I18nextProvider>
			</Router>
		</PersistGate>
	</Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))
