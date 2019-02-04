import React from 'react'
import { MemoryRouter, Switch, Route, Redirect } from 'react-router-dom'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import 'jest-enzyme'
import 'jest-localstorage-mock'
import Home from '../components/pages/Home'
import About from '../components/pages/About'
import DogBreeds from '../components/pages/DogBreeds'
import Favorites from '../components/pages/Favorites'
import UsedAPI from '../components/pages/UsedAPI'
import Page404 from '../components/pages/Page404'
import DogListPage from '../components/pages/DogList'
import i18n from '../components/common/i18n'
import store from '../store'

configure({ adapter: new Adapter() })

const RouteSection = () => (
	<Switch>
		<Route exact path="/" component={Home} />
		<Route path="/about" component={About} />
		<Route exact path="/breeds" component={DogBreeds} />
		<Route path="/favorites" component={Favorites} />
		<Route path="/used-api" component={UsedAPI} />
		<Route path="/breeds/:breedName" component={DogListPage} />
		<Redirect from="/dog-breeds" to="/" />
		<Route component={Page404} />
	</Switch>
)

describe.skip('Router', () => {
	describe('pathname: "/"', () => {
		it('should render <Home />', () => {
			const wrapper = mount(
				<Provider store={store}>
					<I18nextProvider i18n={i18n}>
						<MemoryRouter initialEntries={['/']}>
							<RouteSection />
						</MemoryRouter>
					</I18nextProvider>
				</Provider>
			)

			expect(wrapper.find('Home')).toExist()
			expect(wrapper.find('Page404')).not.toExist()

			wrapper.unmount()
		})
	})

	describe('pathname: "/about"', () => {
		it('should render <About />', () => {
			const wrapper = mount(
				<Provider store={store}>
					<I18nextProvider i18n={i18n}>
						<MemoryRouter initialEntries={['/about']}>
							<RouteSection />
						</MemoryRouter>
					</I18nextProvider>
				</Provider>
			)

			expect(wrapper.find('About')).toExist()
			expect(wrapper.find('Page404')).not.toExist()

			wrapper.unmount()
		})
	})

	describe('pathname: "/breeds"', () => {
		it('should render <DogBreeds />', () => {
			const wrapper = mount(
				<Provider store={store}>
					<I18nextProvider i18n={i18n}>
						<MemoryRouter initialEntries={['/breeds']}>
							<RouteSection />
						</MemoryRouter>
					</I18nextProvider>
				</Provider>
			)

			expect(wrapper.find('DogBreeds')).toExist()
			expect(wrapper.find('Page404')).not.toExist()

			wrapper.unmount()
		})
	})

	describe('pathname: "/favorites"', () => {
		it('should render <Favorites />', () => {
			const wrapper = mount(
				<Provider store={store}>
					<I18nextProvider i18n={i18n}>
						<MemoryRouter initialEntries={['/favorites']}>
							<RouteSection />
						</MemoryRouter>
					</I18nextProvider>
				</Provider>
			)

			expect(wrapper.find('Favorites')).toExist()
			expect(wrapper.find('Page404')).not.toExist()

			wrapper.unmount()
		})
	})

	describe('pathname: "/favorites"', () => {
		it('should render <Favorites />', () => {
			const wrapper = mount(
				<Provider store={store}>
					<I18nextProvider i18n={i18n}>
						<MemoryRouter initialEntries={['/favorites']}>
							<RouteSection />
						</MemoryRouter>
					</I18nextProvider>
				</Provider>
			)

			expect(wrapper.find('Favorites')).toExist()
			expect(wrapper.find('Page404')).not.toExist()

			wrapper.unmount()
		})
	})

	describe('pathname: "/used-api"', () => {
		it('should render <UsedAPI />', () => {
			const wrapper = mount(
				<Provider store={store}>
					<I18nextProvider i18n={i18n}>
						<MemoryRouter initialEntries={['/used-api']}>
							<RouteSection />
						</MemoryRouter>
					</I18nextProvider>
				</Provider>
			)

			expect(wrapper.find('UsedAPI')).toExist()
			expect(wrapper.find('Page404')).not.toExist()

			wrapper.unmount()
		})
	})

	describe('pathname: "/breeds/affenpinscher"', () => {
		it('should render <DogListPage />', () => {
			const wrapper = mount(
				<Provider store={store}>
					<I18nextProvider i18n={i18n}>
						<MemoryRouter initialEntries={['/breeds/affenpinscher']}>
							<RouteSection />
						</MemoryRouter>
					</I18nextProvider>
				</Provider>
			)

			expect(wrapper.find('DogListPage')).toExist()
			expect(wrapper.find('Page404')).not.toExist()

			wrapper.unmount()
		})
	})

	describe('pathname: "/blablabla"', () => {
		it('should render <Page404 />', () => {
			const wrapper = mount(
				<Provider store={store}>
					<I18nextProvider i18n={i18n}>
						<MemoryRouter initialEntries={['/blablabla']}>
							<RouteSection />
						</MemoryRouter>
					</I18nextProvider>
				</Provider>
			)

			expect(wrapper.find('Page404')).toExist()

			wrapper.unmount()
		})
	})

	describe('pathname: "/dog-breeds"', () => {
		it('should render <Home />', () => {
			const wrapper = mount(
				<Provider store={store}>
					<I18nextProvider i18n={i18n}>
						<MemoryRouter initialEntries={['/dog-breeds']}>
							<RouteSection />
						</MemoryRouter>
					</I18nextProvider>
				</Provider>
			)

			expect(wrapper.find('Home')).toExist()
			expect(wrapper.find('Page404')).not.toExist()

			wrapper.unmount()
		})
	})
})
