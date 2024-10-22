import CONFIG from "../config.js"

export default async function getTicker() {
	const response = await (await fetch(`${CONFIG.strapi}/api/ticker/${CONFIG.location}`)).json();
	if (Array.isArray(response)) return response;
	return ['invalid ticker']
}
//error handling