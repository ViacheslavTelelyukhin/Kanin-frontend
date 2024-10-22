export default function BarGraph(input) {
    const settings = input.settings
    return (<div style={{fontSize: window.innerHeight*0.0085*input.parentDimensionMultipliers[1]+"px"}}>
    <div className="graphTitle">{settings.title}</div>
    <div className="barGraph"
        style={{
            //                  scaleWidth
            gridTemplateColumns: '10% repeat('+settings.length+', '+(90/settings.length-settings.gap)+'%)', 
            gap: settings.gap+"%",
            minHeight: settings.useLegend ? 'calc(100% - 15em)' : 'calc(100% - 10em)',
            maxHeight: settings.useLegend ? 'calc(100% - 15em)' : 'calc(100% - 10em)',
    }}>
        <div style={{display: "grid", 
            gridTemplateRows: "repeat("+(settings.displayScale.incriments+3)+", 3em)",
            alignContent: "space-between",
            padding: "10em 0 0",
            height: "calc(100% - 16em)"
        }}>
            {Array.apply(null, {length: settings.displayScale.incriments+3}).map((item, i) => 
                <div className="graphScaleText" key={"scaleItenN"+i} style={{
                    "--left-offset": settings.gap+"%",
                    "--bar-size": Math.ceil(window.innerHeight*0.002*input.parentDimensionMultipliers[1])+"px"
                    //add variable so that the line doesn't sit at the top of the text (more accurate)
                }}>
                    {100-Math.round(settings.displayScale.max
                    /(settings.displayScale.incriments+2)*i)
                    +settings.displayScale.unit}
                </div>
            )}
        </div>
        {Array.apply(null, {length: settings.length}).map((item, i) => <div key={"col"+i}
            style={{display: "grid",
            gridTemplateRows: "calc(100% - 6em) 6em",
            padding: "10em 0 0",
            maxHeight: "100%",
            minHeight: 0,
        }}>
            <div className='graphColumn'>
                {input.data.map((item, index) => {
                    const columnHeight = 100/(item.max-item.min)*(item.values[i]-item.min)
                    return <div className='graphData' key={"col"+i+"subcol"+index}
                        style={{top: 100-columnHeight+"%",
                        height: columnHeight+"%",
                        width: 100/input.data.length+"%",
                        left: 100/input.data.length*index+"%",
                        background: item.color
                        }}
                    >
                        {settings.valueOnColumn ? 
                            // account for gap in the fonst size????
                            //check how it acts with width
                            // set up z indexes so it goes over the line but under the colorful value bar
                            <span className="graphValue" 
                                style={{fontSize: 45/(settings.length*input.data.length)+"em", background: "white"
                            }}>
                                {item.values[i]+item.unit}
                            </span>
                        : null}
                    </div>
                })}
            </div>
            <div>
                <h3 className='graphLabelX'>{settings.columnLabels[i]}</h3>
            </div>
        </div>)}
    </div>
    {settings.useLegend? <div className="graphLegend">
        Legend: 
        {input.data.map(item => 
            <div className="graphLegendLabel" key={item.label}>
                {item.label}
                <span className="graphLegendColor" style={{background: item.color}}/>
            </div>
        )}
    </div> : null}
    </div>)
}

//account for gap in the fonst size
//tilt scales depending on overflow
//fully test width overflows (includes weather)
//errors
//set horizontal lines to a less random amount of pixels
//add more fauterer (color changes depending on height and shit. not at all needed tho)