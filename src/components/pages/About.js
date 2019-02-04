import React from 'react'
import styled from 'styled-components'
import { withNamespaces } from 'react-i18next'
import withPageTemplate from './page-template'

const About = ({ t }) => (
	<Page>
		<PageContent>
			<Marquee>
				<h1>{t('This is a demo project showing the work with React')}</h1>
				<br />
				<br />
				<br />
				<h2>{t('List of used technologies:')}</h2>
				<p>
					1. React -{' '}
					<a href="https://reactjs.org/" target="blank">
						https://reactjs.org/
					</a>
				</p>
				<ul>
					<li>
						<a href="https://reacttraining.com/react-router/" target="blank">
							react-router
						</a>
					</li>
					<li>
						<a href="https://www.styled-components.com/" target="blank">
							styled-components
						</a>
					</li>
				</ul>
				<p>
					2. Redux -{' '}
					<a href="https://redux.js.org/" target="blank">
						https://redux.js.org/
					</a>
				</p>
				<ul>
					<li>
						<a href="https://github.com/redux-saga/redux-saga/" target="blank">
							redux-saga
						</a>
					</li>
					<li>
						<a href="https://github.com/reduxjs/reselect/" target="blank">
							reselect
						</a>
					</li>
					<li>
						<a
							href="https://github.com/toomuchdesign/re-reselect/"
							target="blank"
						>
							re-reselect
						</a>
					</li>
					<li>
						<a href="https://github.com/rt2zz/redux-persist/" target="blank">
							redux-persist
						</a>
					</li>
				</ul>
				<p>{t('3. Testing')}</p>
				<ul>
					<li>
						<a href="https://jestjs.io/" target="blank">
							jest
						</a>
					</li>
					<li>
						<a href="https://github.com/airbnb/enzyme/" target="blank">
							enzyme
						</a>
					</li>
					<li>
						<a
							href="https://github.com/jfairbank/redux-saga-test-plan/"
							target="blank"
						>
							redux-saga-test-plan
						</a>
					</li>
				</ul>
				<p>{t('4. Miscellaneous')}</p>
				<ul>
					<li>
						<a href="https://github.com/i18next/react-i18next/" target="blank">
							react-i18next
						</a>
					</li>
					<li>
						<a
							href="https://github.com/RRutsche/react-parallax/"
							target="blank"
						>
							react-parallax
						</a>
					</li>
					<li>
						<a
							href="https://github.com/FormidableLabs/react-animations/"
							target="blank"
						>
							react-animations
						</a>
					</li>
					<li>
						<a
							href="https://github.com/reactjs/react-transition-group/"
							target="blank"
						>
							react-transition-group
						</a>
					</li>
					<li>
						<a
							href="https://github.com/rtfeldman/seamless-immutable/"
							target="blank"
						>
							seamless-immutable
						</a>
					</li>
					<li>
						<a href="https://github.com/bitinn/node-fetch/" target="blank">
							node-fetch
						</a>
					</li>
					<li>
						<a
							href="https://github.com/react-icons/react-icons/"
							target="blank"
						>
							react-icons
						</a>
					</li>
					<li>
						<a
							href="https://github.com/abraztsov/react-sweet-progress/"
							target="blank"
						>
							react-sweet-progress
						</a>
					</li>
					<li>
						<a href="https://github.com/lodash/lodash/" target="blank">
							lodash
						</a>
					</li>
					<li>
						<a
							href="https://github.com/dmitry-zaets/redux-mock-store/"
							target="blank"
						>
							redux-mock-store
						</a>
					</li>
				</ul>
			</Marquee>
		</PageContent>
	</Page>
)

const Page = styled.section`
	display: flex;
	width: 80%;
	flex-direction: column;
	margin: 5px;
	overflow-y: auto;
	overflow-x: hidden;
`

const Marquee = styled.section`
	animation: moving 3s;
	position: relative;

	@keyframes moving {
		from {
			top: 700px;
		}
		to {
			top: 0px;
		}
	}
`

const PageContent = styled.div`
	width: 100%;
	height: 100%;

	display: block;
	margin: 60px;

	color: ${props => props.theme.backgroundColor};
	text-shadow: 5px 5px 8px rgba(150, 150, 150, 0.4);

	font-weight: bold;

	h1 {
		font-size: 3em;
	}
	h2 {
		font-size: 2.5em;
		margin-left: 30px;
	}
	p {
		font-size: 2em;
		padding-left: 100px;
		margin-bottom: 0;
	}
	a {
		color: #0000ff;
	}
	ul {
		font-size: 1.5em;
		margin-left: 120px;
		margin-top: 5px;
	}
`

export default withPageTemplate(withNamespaces('translations')(About))
