/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./*.php',
		'./template-parts/**/*.php',
		'./inc/**/*.php',
		'./assets/**/*.{php,css,js}',
		'./woocommerce/**/*.php',
		'./woocommerce/*.php',
		'./quotes/build/*.{php,js}',
	],
	theme: {
		extend: {
			colors: {
				'nova-light': '#D2D2D2',
				'nova-gray': '#5E5E5E',
				'nova-primary': '#f22e00',
				'nova-secondary': '#ff5e3d',
			},
		},
		fontFamily: {
			title: ['"Secular One"', 'sans-serif'],
			body: ['Lato', 'sans-serif'],
		},
	},
	important: '#nova',
	plugins: [
		require('tailwindcss-animate'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
	],
};
