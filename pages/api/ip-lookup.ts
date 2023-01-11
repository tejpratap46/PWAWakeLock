import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
	latitude: number,
	longitude: number
}
type ApiResponse = {
	loc: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const clientIP = req.headers['cf-connecting-ip']
	const ipResponse = await fetch(`https://ipinfo.io/${clientIP}/json?token=ef8461623ce04a`)
	const apiResponse: ApiResponse = await ipResponse.json()

	const [lat, long] = apiResponse.loc.split(",")

	const data: Data = {
		latitude: parseFloat(lat),
		longitude: parseFloat(long)
	}

	res.status(200).json(data)
}
