import CONFIG from "../config.js"

export default async function getSettings() {
	const response = await (await fetch(`${CONFIG.strapi}/api/settings/${CONFIG.location}`)).json();
	return response;
}
//error handle