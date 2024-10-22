import calculateOneHudredthComonentHeight from "./tools/calculate1Hudredth";
import { useLayoutEffect } from "react"

export default function List(input, parentDimensionMultipliers) {
    useLayoutEffect(() => {
        const list = document.getElementById('list')
        const fontSize = parseInt(list.style.fontSize.slice(0, -2))
        if (!list) return
        if (input.settings.shrinkAll) {
            const goealHeight = (window.innerHeight*0.85+10)*parentDimensionMultipliers.y
            while (goealHeight <= list.scrollHeight) {
                list.style.fontSize = parseInt(list.style.fontSize.slice(0, -2))-1+'px'
                console.log(list.scrollHeight, goealHeight);
            }
            return
        }
        for (let i = 0; i < list.children.length; i++) {
            const e = list.children[i];
            const paddingHeight = parseInt(window.getComputedStyle(e, null).getPropertyValue('padding-bottom').slice(0, -2))
            while(e.clientHeight-paddingHeight > fontSize+1) {
                e.style.fontSize = e.style.fontSize ? parseInt(e.style.fontSize.slice(0, -2))-2+'px' : fontSize-2+'px'
            }
        }
    }, [input.settings.shrinkAll, parentDimensionMultipliers])
    const errormsg = <div>something went wrong</div>
    if(!Array.isArray(input.data)) return errormsg
    const settings = input.settings
    const dividers = settings.dividers
    function count(arr) {
        let lineAmount = 0
        let pixelAmount = 0
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].text) {
                lineAmount++
                if (dividers[arr[i].divider]) {
                    const hr = dividers[arr[i].divider]
                    if (hr.unit === "em") lineAmount+=hr.width+hr.margin*2
                    else pixelAmount+=hr.width+hr.margin*2
                }
            }
            else {
                lineAmount+=count(arr[i])[0]
                pixelAmount+=count(arr[i])[1]
            }
        }
        return [lineAmount, pixelAmount]
    }
    function render(list, depth, parentKey) {
        return list.map((item, index) => item.text ? 
            <div key={parentKey+"d"+depth+"i"+index}
                className="listItem"
                style={dividers[item.divider] 
                ? {paddingLeft: depth*settings.indent+"%",
                    paddingBottom: dividers[item.divider].margin+dividers[item.divider].unit,
                    marginBottom: dividers[item.divider].margin+dividers[item.divider].unit,
                    borderBottom: dividers[item.divider].type,
                    borderBottomWidth: dividers[item.divider].width+dividers[item.divider].unit,
                    borderColor: dividers[item.divider].color,
                    color: item.color ? item.color : settings.color,
                    background: item.bg ? item.bg : settings.bg
                } : {paddingLeft: depth*settings.indent+"%",
                    color: item.color ? item.color : settings.color,
                    background: item.bg ? item.bg : settings.bg
                }}
            >
                {item.text}
            </div>
            : render(item, depth+1, parentKey+"d"+depth+"i"+index)
        )
    }
    const lines = count(input.data)
    const renderoutput = render(input.data, 0, "")
    return (<div style={{
        fontSize: (calculateOneHudredthComonentHeight(parentDimensionMultipliers.y)*100-lines[1])/lines[0]+"px",
        lineHeight: "1em",
    }} id="list">
        {/* {render(input.data, 0, "")} */}
        {renderoutput}
    </div>)
}
//reconsider format.
//merge count and render
//remove looping layout effect
//get better margin unit. check if the padding should actally be included.
//errors