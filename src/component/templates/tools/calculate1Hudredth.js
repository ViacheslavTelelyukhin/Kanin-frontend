//returns 1% of height that is available to template content with px unit
//usually used to calculate font sizes since they are difficult to set dynamically
//formula was exported to separate file to avoid having to change it in every single file that uses it if it needs to be changed
const SPACE_AVAILABLE_TO_SLIDE_CONTENT_VH = 86
//refers to elements with the flex class
const FLEX_MARGIN_AND_PADDING_WIDTH_VH = 1
//multiplier is passed to a template by slideRenderer.js. defines the fraction of total height/width given to a template when multiple are rendered
export default function calculateOneHudredthComonentHeight(multiplier) {
    return ((window.innerHeight*SPACE_AVAILABLE_TO_SLIDE_CONTENT_VH/100*multiplier)-(window.innerHeight/100*FLEX_MARGIN_AND_PADDING_WIDTH_VH))/100
}
//TODO: return value is a lil too big??