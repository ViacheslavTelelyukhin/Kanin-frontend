import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faCake,
    faCloudShowersHeavy,
    faSmog,
    faSnowflake,
    faSun,
    faThunderstorm,
    faWind
} from '@fortawesome/free-solid-svg-icons';

import calculateOneHudredthComonentHeight from "./tools/calculate1Hudredth.js"

const weatherMap = {
    "sunny": faSun,
    "rainy": faCloudShowersHeavy,
    "foggy": faSmog,
    "snowy": faSnowflake,
    "thunderstormy": faThunderstorm,
    "windy": faWind
};

export default function Weather(input, parentDimensionMultipliers) {
    const errormsg = <div>something went wrong</div>
    if(!Array.isArray(input.data)) return errormsg
    const settings = input.settings
    const tempDiff = settings.tempMax-settings.tempMin
    return (<div style={{
        display: 'grid', 
        gridTemplateColumns: 'repeat('+input.data.length+', '+(100/input.data.length)+'%)', 
        minHeight: '100%',
        maxHeight: "100%",
        fontSize: calculateOneHudredthComonentHeight(parentDimensionMultipliers.y)+"px"
    }}>
        {input.data.map((item, index) => <div key={"col"+index}
            style={{display: "grid",
            gridTemplateRows: "20% 60% 20%",
            maxHeight: "100%",
            minHeight: 0,
        }}>
            <div style={{minWidth: 0}}>
                <div className='weatherText'>wind: {item.wind}</div>
                <div className='weatherText'>RH: {item.RH}</div>
                <div className='weatherText'>precipitation: {item.precipitation}%</div>
            </div>
            <div className='weatherData'>
                <div className='tempData' 
                    style={{
                    top: (100-(100/tempDiff)*(item.temperatureHigh-settings.tempMin))+"%",
                    height: 100/tempDiff*(item.temperatureHigh-settings.tempMin)+"%",}}
                >{item.temperatureHigh + settings.tempUnit}</div>
                <div className='tempData' 
                    style={{
                    top: (100-(100/tempDiff)*(item.temperatureLow-settings.tempMin))+"%",
                    height: 100/tempDiff*(item.temperatureLow-settings.tempMin)+"%"}}
                >{item.temperatureLow + settings.tempUnit}</div>
            </div>
            <div>
                <FontAwesomeIcon icon={weatherMap[item.icon] ? weatherMap[item.icon] : faCake} className='weatherIcon'/>
                <h3 className='weatherWeekDay'>{item.day}</h3>
            </div>
        </div>)}
    </div>)
}
//temperature overflows sometimes.
//ugly
//figure out how to display the rest of the values