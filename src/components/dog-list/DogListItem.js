import React from 'react'
import styled from 'styled-components'
import { FaHeart } from 'react-icons/fa'
import { withNamespaces } from 'react-i18next'

const DogListItem = ({ imgURL, favorite, addToFavorites, t }) => {
	const onClick = () => addToFavorites(imgURL)

	return (
		<Wrapper>
			<div
				className="img-container"
				style={{ background: `url(${imgURL}) center center / cover no-repeat` }}
			/>
			<div className="add-to-favorites">
				{favorite ? (
					<label title={t('remove from favorites')}>
						<FaHeart onClick={onClick} className="selected" />
					</label>
				) : (
					<label title={t('add to favorites')}>
						<FaHeart onClick={onClick} />
					</label>
				)}
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	width: 400px;
	height: 300px;
	background-color: ${props => props.theme.backgroundColor};
	box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
	margin: 15px;

	.add-to-favorites {
		font-size: 1.7em;
		text-align: right;
		color: white;
		margin: 0;

		svg {
			cursor: pointer;
			margin-right: 10px;

			&.selected {
				color: #ff6666;
			}

			&:hover {
				color: #00ff00;
			}
		}
	}

	transition: 500ms;
	&:hover {
		-webkit-transform: rotateZ(3deg);
		-ms-transform: rotateZ(3deg);
		transform: rotateZ(3deg);
	}

	.img-container {
		margin: 10px;
		height: 240px;
		width: 380px;
		box-sizing: inherit;
	}
`

export default withNamespaces('translations')(DogListItem)
