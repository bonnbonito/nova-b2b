module.exports = {
	content: ['./**/*.php', './src/**/*.js'],
	theme: {
		fontFamily: {
			title: ['"Secular One"', 'sans-serif'],
		},
	},
	important: '#novaQuote',
	plugins: [
		require('tailwindcss-animate'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
	],
};
