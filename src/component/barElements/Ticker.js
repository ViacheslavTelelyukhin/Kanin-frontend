import { useEffect, /*useContext*/ } from "react";
// import { barElementSettingsContext } from '../../services/barContext';
import getTicker from "../../services/TickerService";

let tickerBuffer = []
let restOfTickerItem = ""

export default function Ticker(key) {
    // const settings = useContext(barElementSettingsContext);
    useEffect(() => {
        const tickerBar = document.getElementById('tickerBar')
        const testItem = document.createElement('div')
        //v primeru, da se user odloci spammat @ (edini charechter sisrsi od W) se stvar sesuje
        //I couldn't find a less whack implimentation at the time.
        testItem.innerHTML = "W"
        testItem.className = 'ticker'
        tickerBar.append(testItem)
        const maxCharechterWidth = testItem.clientWidth
        testItem.remove()
        function get() {
            if (tickerBuffer.length < 10 ) getTicker().then((data) => {tickerBuffer=tickerBuffer.concat(data)})
            if (!tickerBuffer[0] && restOfTickerItem.length < 1) {
                setTimeout(get, 500)
                return
            }
            // distance (form 100% to -100%) / 24seconds (animation time)
            const velocity = tickerBar.clientWidth*2 / 24
            const tickerItem = document.createElement('div')
            let content
            const charecterLimit = Math.ceil(tickerBar.clientWidth/maxCharechterWidth)
            if (restOfTickerItem.length === 0) {
                content = tickerBuffer.shift()
                if (content === undefined) content = "   "
                restOfTickerItem = content.substring(charecterLimit)
                content = content.substring(0, charecterLimit)
            }
            else {
                content = restOfTickerItem.substring(0, charecterLimit)
                restOfTickerItem = restOfTickerItem.substring(charecterLimit)
            }
            tickerItem.innerHTML = content
            tickerItem.className = 'ticker'
            const catchupDistance = tickerBar.getBoundingClientRect().right - tickerBar.lastChild?.getBoundingClientRect().right
            const catchupTime = catchupDistance / velocity
            tickerItem.style.animationDelay = -catchupTime+"s";
            tickerBar.append(tickerItem)
            const time = tickerItem.clientWidth / velocity - catchupTime
            setTimeout(get, time*1000)
            setTimeout(() => {
                tickerItem.remove()
            }, 26000);
        }
        get()
    }, []);

    return (
        <div id="tickerBar"></div>
    );
}
//add a small buffer for the emements to catch up in so it's not vissible
//also mby improve catchup mechanics since the distance is like 30px on avg