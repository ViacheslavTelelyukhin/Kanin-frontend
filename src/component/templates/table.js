export default function Table(input) {
    const errormsg = <div>something went wrong</div>
    if(!Array.isArray(input.text)) return errormsg
    const len = input.text[0].length
    for (let i = 0; i < input.text.length; i++) {
        if(!Array.isArray(input.text[i]) || input.text[i].length !== len) return errormsg
    }
    const settings = input.settings
    return (<div className="table" style={{
        gridTemplateRows:'repeat('+input.text.length+', calc('+100/input.text.length+'% - '+settings.cellBorder+'))',
        gridTemplateColumns:'repeat('+len+', calc('+100/len+'% - '+settings.cellBorder+'))', 
        fontSize: settings.fontSize,
        gridGap: settings.cellBorder,
        padding: settings.cellBorder+" 0 0 "+settings.cellBorder,
        background: settings.borderColor,
    }}>
        {input.text.map((row, indexr) => row.map((item, indexc) =>
            <div key={'r'+indexr+'c'+indexc}
                className="tablecell"
                style={Array.isArray(item) ? 
                    {gridTemplateColumns: 'repeat('+item.length+', calc('+(100/item.length).toString()+'% - '+settings.inCellGridGap+' + ('+settings.inCellGridGap+' / '+item.length+'))',
                    display: 'grid', 
                    gridGap: settings.inCellGridGap,
                    background: settings.inCellBorderColor,
                    padding: 0
                    }:{
                    padding: "0.2em",
                    background: item.color ? item.color : settings.defaultBackground
                }}
            >
                {Array.isArray(item) ? item.map((subItem, subindex) => 
                    <div key={'r'+indexr+'c'+indexc+'s'+subindex}
                        style={{padding: "0.2em",
                        background: subItem.color ? subItem.color : settings.defaultBackground,
                        overflow: "hidden"
                    }}
                    >{subItem.text}</div>)
                : item.text}
            </div>
        ))}
    </div>)
}
//make padding settable
//impliment the relative to parent font size for user friendlyness when managing content
//handle settings and content errors
//improve error messages and check small elements
//calculate font color from backgoud contrast/lightness or force user/backend to set colors?