import CONFIG from "../config.js"

export default async function getScreen() {
    const response = await (await fetch(`${CONFIG.strapi}/api/slide/${CONFIG.location}`)).json();
    
    return response
}

//do error handling (show a special slide if the format received from backed is incorrect)