import Table from "./templates/table";
import Raw from "./templates/test"
import WeatherWeekly from "./templates/weatherWeekly";
import WeatherDaily from "./templates/weatherDaily";
import List from "./templates/list";
import BarGraph from "./templates/barGraph";
import LineGraph from "./templates/lineGraph";

// import UnavailableComponent from "./UnavailableComponent"

const presetMap = {
    'raw': <Raw/>,
    'table': <Table/>,
    'weatherWeekly': <WeatherWeekly/>,
    'weatherDaily': <WeatherDaily/>,
    'list': <List/>,
    'barGraph': <BarGraph/>,
    'lineGraph': <LineGraph/>,
}
export default function SlideRenderer(input) {
    const template = input.slides.template
    let templateMatrix = template.split('" "')
    templateMatrix[0] = templateMatrix[0].slice(1)
    templateMatrix[templateMatrix.length-1] = templateMatrix[templateMatrix.length-1].slice(0,-1)
    let areas = new Set(template.replace(/"/g, "").split(' '))
    let parentDimensionMultipliers = {}
    const xSectorSize = 1/templateMatrix[0].split(' ').length
    const ySectorSize = 1/templateMatrix.length
    areas.forEach(area => {
        const totalInstances = template.match(new RegExp( area, 'g' )).length
        let i = 0
        let instances = 0
        while (!instances) {
            instances = templateMatrix[i].match(new RegExp( area, 'g' ))?.length
            i++
        }
        parentDimensionMultipliers[area] = {"x": xSectorSize*instances, "y": ySectorSize*(totalInstances/instances)}
    })

    return <div className="screen"
        style={{
            gridTemplateAreas: input.slides.template,
            "--row-count": templateMatrix.length,
            "--column-count": templateMatrix[0].split(' ').length,
            "--borderColor": input.slides.settings.borderColor || "transparent",
            "--inverted": input.slides.settings.inverted || "var(--root-background-color)",
            "color": input.slides.settings.textColor || "var(--root-text-color)"
        }}
    >
        {input.slides.presets.map((item, i) => 
            <div className="flex" style={{gridArea: item.gridArea}} key={"flex"+i}>
                {(presetMap[item.preset] || <Raw/>).type(item.content, parentDimensionMultipliers[item.gridArea])}
            </div>
        )}
    </div>
    
    //error handle
}