import { useEffect, useReducer, useState, useContext } from "react";
import { barElementSettingsContext } from '../../services/barContext';

export default function CountdownTimer() {
    const settings = useContext(barElementSettingsContext);
    const [hours, setHours] = useState()
    const [hourIndex, setHourIndex] = useState()

    function reducer(state, action) {
        // idk if this is needed anymore
        if (typeof action === 'number') return action
        if (state === 1) {setHourIndex(hourIndex+1); return hours[hourIndex+1]*60}
        if (action === undefined) return state-1
        //make this a little more guarded
        setHours(settings.settings)
        const rn = new Date()
        let rnMinutes = rn.getHours()*60 + rn.getMinutes()
        for (let i = 0; i < settings.settings.length; i++) {
            rnMinutes -= settings.settings[i]
            if (rnMinutes < 0) {
                setHourIndex(i)
                return ((Math.abs(rnMinutes)*60)-rn.getSeconds())
            }
        }
    }

    const [clock, dispatch] = useReducer(reducer, 61)

    useEffect(() => {
        //this doesn't work properly. sethours is useless here
        // if (typeof settings.settings === "string") {
        //     setHours([1440])
        //     setHourIndex(0)
        //     dispatch(1440*60)
        // }
        // setHours(settings.settings)
        // const rn = new Date()
        // let rnMinutes = rn.getHours()*60 + rn.getMinutes()
        // for (let i = 0; i < settings.settings.length; i++) {
        //     rnMinutes -= settings.settings[i]
        //     if (rnMinutes < 0) {
        //         setHourIndex(i)
        //         dispatch((Math.abs(rnMinutes)*60)-rn.getSeconds())
        //         rnMinutes = 1
        //         break
        //     }
        // }
        // if (rnMinutes !== 1) {
        //     setHourIndex(settings.settings.length-1)
        //     dispatch((Math.abs(rnMinutes)*60)-rn.getSeconds())
        // }
        // setInterval(() => {dispatch()}, 1000)
        dispatch("start clock")
        setInterval(() => {dispatch()}, 1000)
    }, [])

    return (
        <div>
            {((Math.floor(clock/3600)+':') !== "0:" ? Math.floor(clock/3600)+':' : "")
            +('0'+Math.floor(clock/60%60)).slice(-2)+':'
            +('0'+clock%60).slice(-2)}
        </div>
    );
}
//This thing is wack \/
//check logic on the start of the clock since (also wobbly)
//reducer wobbly
//use less state
//fix zeros displayed at the start of minutes sometimes
//do smthing if hour index is too big
//do error handling