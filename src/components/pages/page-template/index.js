import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Menu from './Menu'
import Footer from './Footer'

const PageTemplate = WrappedComponent => props => (
	<Page>
		<Header />
		<PageContent>
			<Menu />
			<WrappedComponent {...props} />
		</PageContent>
		<Footer />
	</Page>
)

const Page = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

const PageContent = styled.div`
	display: flex;
	flex-direction: row;
	height: 88vh;
`

export default PageTemplate
