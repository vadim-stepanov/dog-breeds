import React from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { connect } from 'react-redux'
import Home from './pages/Home'
import About from './pages/About'
import DogBreeds from './pages/DogBreeds'
import Favorites from './pages/Favorites'
import UsedAPI from './pages/UsedAPI'
import Page404 from './pages/Page404'
import DogListPage from './pages/DogList'
import themes from '../utils/themes'
import { theme } from '../selectors'

const AppRouter = ({ location, theme }) => (
	<ThemeProvider theme={themes[theme]}>
		<section>
			<Switch location={location}>
				<Route exact path="/" component={Home} />
				<Route path="/about" component={About} />
				<Route exact path="/breeds" component={DogBreeds} />
				<Route path="/favorites" component={Favorites} />
				<Route path="/used-api" component={UsedAPI} />
				<Route path="/breeds/:breedName" component={DogListPage} />
				<Redirect from="/dog-breeds" to="/" />
				<Route component={Page404} />
			</Switch>
		</section>
	</ThemeProvider>
)

export default withRouter(
	connect(state => ({ theme: theme(state) }))(AppRouter)
)
