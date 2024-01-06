module.exports = {
	content: ['./**/*.php', './src/**/*.js', './src/**/**/*.js'],
	theme: {
		extend: {
			colors: {
				'nova-light': '#D2D2D2',
				'nova-gray': '#5E5E5E',
				'nova-primary': '#f22e00',
			},
		},
		fontFamily: {
			title: ['"Secular One"', 'sans-serif'],
		},
	},
	important: '#novaReact',
	plugins: [
		require('tailwindcss-animate'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
	],
};
