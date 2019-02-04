import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FaArrowUp } from 'react-icons/fa'

const ScrollTopButton = ({ bottom, right, show, scrollTop }) => (
	<StyledButton
		bottom={bottom}
		right={right}
		data-show={show}
		onClick={scrollTop}
	>
		<FaArrowUp />
	</StyledButton>
)
ScrollTopButton.propTypes = {
	bottom: PropTypes.number.isRequired,
	right: PropTypes.number.isRequired,
	show: PropTypes.string.isRequired,
	scrollTop: PropTypes.func.isRequired,
}

const StyledButton = styled.div`
	position: fixed;
	bottom: ${props => props.bottom + 'px'};
	right: ${props => props.right + 'px'};
	background-color: ${props => props.theme.backgroundColor};
	box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
	width: 50px;
	height: 50px;
	text-decoration: none;
	-webkit-border-radius: 35px;
	-moz-border-radius: 35px;
	border-radius: 35px;

	display: none;
	align-items: center;
	justify-content: center;
	opacity: 0.6;
	cursor: pointer;

	&[data-show='true'] {
		animation: scroll-fade-in 2s;
		@keyframes scroll-fade-in {
			from {
				opacity: 0;
			}
			to {
				opacity: 1;
			}
		}
		display: flex;
	}

	svg {
		color: white;
		font-size: 1.5em;
	}

	&:hover {
		opacity: 1;
	}
`

const withScrollTopButton = params => WrappedComponent =>
	class ComposedComponent extends React.PureComponent {
		state = {
			showScrollTopButton: false,
		}

		intervalId = 0
		scrollInerval = 50
		scrollViewRef = React.createRef()

		componentDidMount() {
			clearInterval(this.intervalId)
		}

		componentWillUnmount() {
			clearInterval(this.intervalId)
		}

		onScrollTop = () => {
			this.scrollInerval = (this.scrollViewRef.current.scrollTop / 100) * 5
			this.intervalId = setInterval(this.scrollStep, 10)
		}

		onScroll = () =>
			this.setState({
				showScrollTopButton:
					this.scrollViewRef.current.scrollTop > this.scrollInerval * 5,
			})

		scrollStep = () => {
			if (this.scrollViewRef.current.scrollTop === 0) {
				clearInterval(this.intervalId)
			}
			this.scrollViewRef.current.scrollTop =
				this.scrollViewRef.current.scrollTop - this.scrollInerval
		}

		render() {
			return (
				<>
					<WrappedComponent
						{...this.props}
						scrollViewRef={this.scrollViewRef}
						onScroll={this.onScroll}
					/>
					<ScrollTopButton
						{...params}
						show={this.state.showScrollTopButton.toString()}
						scrollTop={this.onScrollTop}
					/>
				</>
			)
		}
	}

export default withScrollTopButton
