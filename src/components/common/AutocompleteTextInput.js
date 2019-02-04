import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

class AutocompleteTextInput extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			inputValue: '',
			selectedItem: 0,
			results: [],
			hideResults: true,
		}
	}

	static propTypes = {
		placeholder: PropTypes.string.isRequired,
		data: PropTypes.array.isRequired,
		onSelect: PropTypes.func.isRequired,
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.inputValue !== this.state.inputValue) {
			this.updateResults()
		}
	}

	handleInputChange = event => {
		if (event.target.value.length) {
			this.setState({ hideResults: false })
		} else {
			this.hideResults()
		}
		this.setState({ inputValue: event.target.value })
	}

	updateResults = () => {
		const query = this.state.inputValue
		const results = this.props.data.filter(
			item => item.length >= query.length && item.startsWith(query)
		)
		this.setState({ results: results })
	}

	setSelected = event => {
		const text = event.currentTarget.textContent
		this.setState({
			selectedItem: '',
			inputValue: text,
		})
		this.props.onSelect(text)
		this.hideResults()
	}

	getResultsMarkup() {
		return this.state.results.map(
			(item, i) => (
				<li
					key={i}
					id={i}
					className={this.state.selectedItem === i ? 'selected' : ''}
					onClick={this.setSelected}
				>
					{item.slice(0, this.state.inputValue.length)}
					<strong>{item.slice(this.state.inputValue.length)}</strong>
				</li>
			),
			this
		)
	}

	//  up=38, down=40, enter=13
	handleKeyPress = event => {
		const KEY_ENTER = 13,
			KEY_UP = 38,
			KEY_DOWN = 40
		if (event.keyCode === KEY_ENTER) {
			const selectedItem = this.state.results[this.state.selectedItem]
			this.setState({
				inputValue: '',
				hideResults: true,
			})
			this.props.onSelect(selectedItem)
		}
		if (event.keyCode === KEY_UP && this.state.selectedItem > 0) {
			this.setState({ selectedItem: this.state.selectedItem - 1 })
		}
		if (
			event.keyCode === KEY_DOWN &&
			this.state.selectedItem < this.state.results.length - 1
		) {
			this.setState({ selectedItem: this.state.selectedItem + 1 })
		}
	}

	hideResults = () => {
		this.setState({ hideResults: true })
	}

	reset = () =>
		this.setState({
			inputValue: '',
			selectedItem: 0,
			results: [],
			hideResults: true,
		})

	render() {
		return (
			<Wrapper>
				<input
					type="text"
					value={this.state.inputValue}
					onChange={this.handleInputChange}
					onKeyDown={this.handleKeyPress}
					placeholder={this.props.placeholder}
					autoFocus
					className="text-input"
				/>
				{!this.state.hideResults ? (
					<ul className="autocomplete-results">{this.getResultsMarkup()}</ul>
				) : null}
			</Wrapper>
		)
	}
}

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 10px;
	position: relative;

	.text-input {
		font-size: 1em;
		color: ${props => props.theme.backgroundColor};
		padding-left: 10px;
	}

	.autocomplete-results {
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
		height: 500px;
		overflow: auto;
		margin-top: 0px;
		list-style: none;
		-webkit-padding-start: 0;
		z-index: 1;
		text-shadow: none;

		li {
			background: #fff;
			padding: 10px 20px;
			color: ${props => props.theme.backgroundColor};
			cursor: pointer;

			&:hover,
			.selected {
				background: #eee;
				border: 1px solid #eee;
			}
		}
	}
`

export default AutocompleteTextInput
