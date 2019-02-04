import React from 'react'
import styled from 'styled-components'
import withPageTemplate from './page-template'
import FavoritesList from '../favorites'

const Favorites = () => (
	<Wrapper>
		<FavoritesList />
	</Wrapper>
)

const Wrapper = styled.section`
	display: flex;
	width: 80%;
	flex-direction: column;
	margin: 5px;

	animation: fadein 2s;
	@keyframes fadein {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`

export default withPageTemplate(Favorites)
