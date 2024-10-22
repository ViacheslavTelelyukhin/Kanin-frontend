import CountdownTimer from "./barElements/CountdownTimer"
import Clock from "./barElements/clock"
import Logo from "./barElements/logo"
import WeatherIcon from "./barElements/WeatherIcon"
import Ticker from "./barElements/Ticker"

import { barElementSettingsContext } from '../services/barContext';

const barElementMap = {
    "logo": <Logo/>,
    "clock": <Clock/>,
    "countDown": <CountdownTimer/>,
    "weatherIcon": <WeatherIcon/>,
    "ticker": <Ticker/>
}

export default function BarComponent(input) {
    return (
        <div className={"barContainer "+input.settings.spacing}>
            {input.settings.contents.map((item, key) => 
                <barElementSettingsContext.Provider value={{settings:item.settings}} key={"ctx"+input.giveKey+key}>
                    {barElementMap[item.type]}
                </barElementSettingsContext.Provider>
            )}
        </div>
    );
}
//reconsider format of data given by context. maybe reconsider iterative rendering of context providers