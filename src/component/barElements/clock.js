import { useEffect, useState, /*useContext*/ } from "react";
// import { barElementSettingsContext } from '../../services/barContext';

export default function Clock() {
    const [clock, setClock] = useState("00:00:00");
    // const settings = useContext(barElementSettingsContext);
    useEffect(() => {
        setInterval(() => {
            const time = new Date();
            setClock(
                ('0' + time.getHours()).slice(-2)
                + ":" +
                ('0' + time.getMinutes()).slice(-2)
                + ":" +
                ('0' + time.getSeconds()).slice(-2)
            );
        }, 1000);
    }, []);
    return <div>{clock}</div>
}
//not best practice. Also likely a few too many hooks for a mere clock?