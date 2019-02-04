import React from 'react'
import styled from 'styled-components'
import withPageTemplate from './page-template'
import BreedCatalog from '../breed-catalog'

const DogBreeds = () => (
	<Wrapper>
		<BreedCatalog />
	</Wrapper>
)

const Wrapper = styled.section`
	display: flex;
	width: 80%;
	flex-direction: column;
	margin: 5px;
	overflow: hidden;

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

export default withPageTemplate(DogBreeds)
