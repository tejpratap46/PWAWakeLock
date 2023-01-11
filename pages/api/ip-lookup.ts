import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
	latitude: number,
	longitude: number
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	console.log(req.rawHeaders);

	const clientIP = req.headers['cf-connecting-ip']
	const ipResponse = await fetch(`https://ipapi.co/${clientIP}/json/`)

	const data: Data = await ipResponse.json()

	res.status(200).json(data)
}
