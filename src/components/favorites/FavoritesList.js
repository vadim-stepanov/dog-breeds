import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { withNamespaces } from 'react-i18next'
import FavoritesItem from './FavoritesItem'
import withScrollTopButton from '../common/ScrollTopButton'

const FavoritesList = props => {
	const onRemove = url => props.remove(url)

	const onSortByDate = () => props.sortBy('date')

	const onSortByBreed = () => props.sortBy('breed')

	return (
		<>
			<TitleBar>
				<div className="sort-by">
					<div
						className="sort-type"
						onClick={onSortByDate}
						data-selected={props.sortType === 'date'}
					>
						{props.t('date')}
					</div>
					{props.sortByDateOrder === 'asc' ? (
						<div>
							<FaArrowUp onClick={props.sortByDate} />
						</div>
					) : (
						<div>
							<FaArrowDown onClick={props.sortByDate} />
						</div>
					)}
				</div>
				<div className="sort-by">
					<div
						className="sort-type"
						onClick={onSortByBreed}
						data-selected={props.sortType === 'breed'}
					>
						{props.t('breed')}
					</div>
					{props.sortByBreedOrder === 'asc' ? (
						<div>
							<FaArrowUp onClick={props.sortByBreed} />
						</div>
					) : (
						<div>
							<FaArrowDown onClick={props.sortByBreed} />
						</div>
					)}
				</div>
			</TitleBar>
			<Content innerRef={props.scrollViewRef} onScroll={props.onScroll}>
				{props.itemList.map(el => (
					<FavoritesItem key={el.id} remove={onRemove} {...el} />
				))}
			</Content>
		</>
	)
}

FavoritesList.propTypes = {
	remove: PropTypes.func.isRequired,
	sortBy: PropTypes.func.isRequired,
	sortByDate: PropTypes.func.isRequired,
	sortByBreed: PropTypes.func.isRequired,
	sortType: PropTypes.string.isRequired,
	sortByDateOrder: PropTypes.string.isRequired,
	sortByBreedOrder: PropTypes.string.isRequired,
	scrollViewRef: PropTypes.object.isRequired,
	onScroll: PropTypes.func.isRequired,
}

const TitleBar = styled.div`
	display: flex;
	flex-direction: row;
	height: 50px;
	line-height: 50px;
	font-size: 1.5em;
	color: white;
	background-color: ${props => props.theme.backgroundColor};
	text-shadow: 2px 2px 4px #000000;
	box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
	margin: 0 0 5px 15px;

	.sort-by {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1em;

		div {
			margin-left: 10px;
		}

		svg {
			cursor: pointer;
			margin-right: 10px;
			margin-top: 20px;

			&:hover {
				color: #00ff00;
			}
		}

		.sort-type {
			cursor: pointer;
			text-underline-position: under;

			&:hover {
				color: #00ff00 !important;
			}

			&[data-selected='true'] {
				text-decoration: underline;
			}
		}
	}
`

const Content = styled.div`
	display: flex;
	flex-wrap: wrap;
	height: 100%;
	width: 100%;
	overflow-y: auto;
	overflow-x: hidden;
`

export default withScrollTopButton({ bottom: 100, right: 50 })(
	withNamespaces('translations')(FavoritesList)
)
