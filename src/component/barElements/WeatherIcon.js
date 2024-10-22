import {useEffect, useState, /*useContext*/} from "react";
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
// import { barElementSettingsContext } from '../../services/barContext';
import getWeather from "../../services/WeatherService";

const weatherMap = {
    "sunny": faSun,
    "rainy": faCloudShowersHeavy,
    "foggy": faSmog,
    "snowy": faSnowflake,
    "thunderstormy": faThunderstorm,
    "windy": faWind
};
export default function WeatherIcon(key) {
    const [weatherIcon, setWeatherIcon] = useState(faCake);
    // const settings = useContext(barElementSettingsContext);
    useEffect(() => {
        getWeather().then(weatherText => {
            if (weatherMap[weatherText] === undefined) {
                setWeatherIcon(faCake);
            } else {
                setWeatherIcon(weatherMap[weatherText]);
            }
        });
        setInterval(() => {
            getWeather().then(weatherText => {
                if (weatherMap[weatherText] === undefined) {
                    setWeatherIcon(faCake);
                } else {
                    setWeatherIcon(weatherMap[weatherText]);
                }
            });
        }, 60000);
    }, []);

    return (<div className="icon_container">
        <FontAwesomeIcon icon={weatherIcon}/>
    </div>);
}