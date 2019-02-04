import i18n from 'i18next'

i18n.init({
	// we init with resources
	resources: {
		en: {
			translations: {
				en: 'en',
				ru: 'ru',
				gray: 'gray',
				blue: 'blue',
				About: 'About',
				'Dog Breeds': 'Dog Breeds',
				Favorites: 'Favorites',
				'Used API': 'Used API',
				date: 'date',
				breed: 'breed',
				'remove from favorites': 'remove from favorites',
				'add to favorites': 'add to favorites',
				'search for a breed...': 'search for a breed...',
				'This is a demo project showing the work with React':
					'This is a demo project showing the work with React',
				'List of used technologies:': 'List of used technologies:',
				'3. Testing': '3. Testing',
				'4. Miscellaneous': '4. Miscellaneous',
				'Special thanks to': 'Special thanks to:',
			},
		},
		ru: {
			translations: {
				en: 'анг',
				ru: 'рус',
				gray: 'серый',
				blue: 'синий',
				About: 'О проекте',
				'Dog Breeds': 'Породы',
				Favorites: 'Избранное',
				'Used API': 'Об АПИ',
				date: 'дата',
				breed: 'порода',
				'remove from favorites': 'удалить из избранного',
				'add to favorites': 'добавить в избранное',
				'search for a breed...': 'поиск породы...',
				'This is a demo project showing the work with React':
					'Этот демо-проект показывает работу с React',
				'List of used technologies:': 'Список использованных технологий',
				'3. Testing': '3. Тестирование',
				'4. Miscellaneous': '4. Разное',
				'Special thanks to': 'Отдельная благодарность:',
			},
		},
	},
	fallbackLng: 'en',
	debug: false,

	// have a common namespace used around the full app
	ns: ['translations'],
	defaultNS: 'translations',

	keySeparator: false, // we use content as keys

	interpolation: {
		escapeValue: false, // not needed for react!!
		formatSeparator: ',',
	},

	react: {
		wait: true,
	},
})

export default i18n
