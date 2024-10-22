import CONFIG from "../../config"
import { useContext, useRef, useEffect } from "react";
import { barElementSettingsContext } from '../../services/barContext';

function selectLogoTheme(backgroundColor) {
    backgroundColor = backgroundColor.substring(1)
    let rgb = parseInt(backgroundColor, 16)
    let r = (rgb >> 16) & 0xff
    let g = (rgb >>  8) & 0xff
    let b = (rgb >>  0) & 0xff

    let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    return ((luma < 128) ? 1 : 0)
}

export default function Logo() {
    const settings = useContext(barElementSettingsContext);
    const imgElement = useRef();

    useEffect(() => {
        imgElement.current.addEventListener("themeChange", e => {
            e.target.src = CONFIG.strapi+settings.settings[selectLogoTheme(e.detail)]
        })
    }, [settings])

    return <img src={CONFIG.strapi+settings.settings[selectLogoTheme(document.getElementById("root").style.getPropertyValue("--root-background-color"))]} 
        alt="Company logo" className="logo" ref={imgElement}/>
}
//settings is the logourl given by bar Component. will perhaps be changed to hold more values in the future. confusing name