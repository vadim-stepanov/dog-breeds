import React from 'react'
import styled from 'styled-components'
import withPageTemplate from './page-template'
import DogList from '../dog-list'

const DogListPage = ({ match }) => (
	<Wrapper>
		<DogList breedName={match.params.breedName} />
	</Wrapper>
)

const Wrapper = styled.section`
	display: flex;
	width: 80%;
	flex-direction: column;
	margin: 5px;
`

export default withPageTemplate(DogListPage)
