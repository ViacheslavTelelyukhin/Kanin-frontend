import CONFIG from "../config.js"

export default async function getWeather() {
	const response = await (await fetch(`${CONFIG.strapi}/api/vreme`)).json();
	return response
}
//error handling