/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
	dest: 'public',
	register: true,
	skipWaiting: true,
})

module.exports = withPWA({
	images: {
		remotePatterns: [new URL('https://openweathermap.org/**')],
	},
	reactStrictMode: true,
})
