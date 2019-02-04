import React from 'react'
import styled, { keyframes } from 'styled-components'
import {
	fadeIn,
	bounceIn,
	lightSpeedIn,
	bounceInLeft,
	fadeInUp,
	flipInY,
	zoomIn,
	bounceInDown,
} from 'react-animations'
import { withNamespaces } from 'react-i18next'
import withPageTemplate from './page-template'

const UsedAPI = ({ t }) => (
	<Page>
		<PageContent>
			<h1>{t('Special thanks to')}</h1>
			<div>
				<a href="https://dog.ceo/dog-api/" target="blank">
					https://dog.ceo/dog-api/
				</a>
				<a href="https://en.wikipedia.org/" target="blank">
					https://en.wikipedia.org/
				</a>
				<a href="https://www.petfinder.com/" target="blank">
					https://www.petfinder.com/
				</a>
				<a href="https://dogtime.com/" target="blank">
					https://dogtime.com/
				</a>
				<a href="https://www.akc.org/" target="blank">
					https://www.akc.org/
				</a>
				<a href="https://www.petwave.com/" target="blank">
					https://www.petwave.com/
				</a>
				<a href="https://www.purina.com/" target="blank">
					https://www.purina.com/
				</a>
			</div>
		</PageContent>
	</Page>
)

const Page = styled.section`
	display: flex;
	width: 80%;
	margin: 5px;
	overflow-x: hidden;
`

const fadeInAnimation = keyframes`${fadeIn}`
const lightSpeedInAnimation = keyframes`${lightSpeedIn}`
const bounceInAnimation = keyframes`${bounceIn}`
const bounceInLeftAnimation = keyframes`${bounceInLeft}`
const fadeInUpAnimation = keyframes`${fadeInUp}`
const flipInYAnimation = keyframes`${flipInY}`
const zoomInAnimation = keyframes`${zoomIn}`
const rubberBandAnimation = keyframes`${bounceInDown}`

const PageContent = styled.div`
	width: 80%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	h1 {
		font-size: 4em;
		color: ${props => props.theme.backgroundColor};
		text-shadow: 2px 2px 2px rgba(150, 150, 150, 1);
		animation: 1s ${lightSpeedInAnimation};
	}

	div {
		display: flex;
		flex-direction: column;
		align-items: flex-start;

		a {
			font-size: 2em;
			color: #0000ff;
			text-shadow: 2px 2px 2px rgba(150, 150, 150, 1);
			margin-left: 20px;
			opacity: 0;
		}

		a:nth-child(1) {
			animation: 3s ${fadeInAnimation};
			animation-delay: 0.5s;
			animation-fill-mode: forwards;
		}

		a:nth-child(2) {
			animation: 2s ${bounceInAnimation};
			animation-delay: 1s;
			animation-fill-mode: forwards;
		}

		a:nth-child(3) {
			animation: 2s ${bounceInLeftAnimation};
			animation-delay: 1s;
			animation-fill-mode: both, forwards;
			opacity: 1;
		}

		a:nth-child(4) {
			animation: 2s ${flipInYAnimation};
			animation-delay: 2s;
			animation-fill-mode: both, forwards;
			opacity: 1;
		}

		a:nth-child(5) {
			animation: 2s ${rubberBandAnimation};
			animation-delay: 2s;
			animation-fill-mode: both, forwards;
			opacity: 1;
		}

		a:nth-child(6) {
			animation: 2s ${zoomInAnimation};
			animation-delay: 3s;
			animation-fill-mode: both, forwards;
			opacity: 1;
		}

		a:nth-child(7) {
			animation: 2s ${fadeInUpAnimation};
			animation-delay: 4s;
			animation-fill-mode: forwards;
		}
	}
`

export default withPageTemplate(withNamespaces('translations')(UsedAPI))
