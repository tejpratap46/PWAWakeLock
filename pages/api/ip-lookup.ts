import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
	country: string,
	countryCode: string,
	lat: number,
	lon: number
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	// console.log(req.rawHeaders);

	const clientIP = req.headers['x-nf-client-connection-ip'] || req.connection.remoteAddress
	const ipResponse = await fetch(`http://ip-api.com/json/${clientIP}`)

	const data: Data = await ipResponse.json()

	res.status(200).json(data)
}
