import { injectGlobal } from 'styled-components'

injectGlobal`
	:root {
		--main-font: sans-serif;
	}

	html, body, #root, #root>div {
		height: 100%;
	}

	body {
		font-family: var(--main-font);
		font-size: 100%;
		padding: 0;
		margin: 0;
	}

	h1, h2, h3, h4, h5, h6, header {
		font-family: var(--main-font);
		font-size: 100%;
		padding: 0;
		margin: 0;
	}

	a {
		text-decoration: none;
	}
`
