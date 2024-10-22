import BarComponent from "./component/barComponent";
import Screen from "./component";
import getSettings from './services/settingsService';
import { useEffect, useState } from "react";

const rootElement = document.getElementById('root')

function setTheme(themes, timings, currentIndex, alteredTiming) {
	rootElement.style.setProperty("--root-background-color", themes[timings.order[currentIndex]].background)
	rootElement.style.setProperty("--root-text-color", themes[timings.order[currentIndex]].text)
	//tell logos they need to adjust for the theme
	let logos = document.getElementsByClassName("logo")
	for (let i = 0; i < logos.length; i++) {
		console.log("changed theme");
		logos[i].dispatchEvent(new CustomEvent("themeChange", {"detail": themes[timings.order[currentIndex]].background}))
	}
	if (currentIndex >= timings.minutes.length-1) currentIndex = -1
	setTimeout(() => setTheme(themes, timings, currentIndex+1, false),
		alteredTiming ? alteredTiming : timings.minutes[currentIndex+1]*60000)
}

export default function App() {
	const [settingsState, setSettings] = useState(null);
	useEffect(() => {
		getSettings().then(settings => {
			const rn = new Date()
			let rnMinutes = rn.getHours()*60 + rn.getMinutes()
			for (let i = 0; i < settings.themeTiming.minutes.length; i++) {
				rnMinutes -= settings.themeTiming.minutes[i]
				if (rnMinutes < 0) {
					setTheme(settings.themes, settings.themeTiming, i, Math.abs(rnMinutes)*60000)
					break
				}
			}
			rootElement.style.fontFamily = settings.font
			setSettings(settings)
		})
	}, [])

	return (
		settingsState
		? <div>
			<BarComponent settings={settingsState.headerSettings} giveKey={"top"}/>
			<Screen />
			<BarComponent settings={settingsState.footerSettings} giveKey={"bottom"}/>
		</div>
		: <div className="loading screen" style={{display: "block"}}>
            <div className="loadingIcon"></div>
            <div className="loadingText">loading your configuration</div>
        </div>
	);
}
//theme timing thingy may be hazardous