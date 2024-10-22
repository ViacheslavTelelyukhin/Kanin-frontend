export default function Raw(input) {
    //console.log("displaying raw input: " + input);
    return (<div dangerouslySetInnerHTML={{__html: input}}></div>)
}