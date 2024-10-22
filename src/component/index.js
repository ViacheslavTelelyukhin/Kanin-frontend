import getScreen from "../services/ScreenService";
import { useEffect, useReducer } from "react";
import SlideRenderer from "./SlideRenderer";

let toConcatSlides = []

const calculateTime = (screens, slideIndex) => {
    let toSubtractSeconds = 0
    for (let i = 0; i < slideIndex+1; i++) toSubtractSeconds += screens[i].settings.duration
    let inSlideLoopTimeCounter = 0
    let loadedSlideTimeSeconds = -toSubtractSeconds
    for (let i = 0; i < screens.length; i++) {
        if (typeof screens[i] === 'number') {
            loadedSlideTimeSeconds += inSlideLoopTimeCounter*(screens[i] > -1 ? screens[i]+1 : 1)
            inSlideLoopTimeCounter = 0
        } else inSlideLoopTimeCounter += screens[i].settings.duration
    }
    return loadedSlideTimeSeconds
}

export default function Screen() {
    const retriveSlides = (state, action) => {
        let screens = state.slides ? state.slides : []
        let slideIndex = state.slideIndex

        if (Array.isArray(action)) {
            screens = screens.concat(action)
        }

        if (action === "incriment" || slideIndex === -1){
            if (toConcatSlides.length !== 0) {
                screens = screens.concat(toConcatSlides)
                toConcatSlides = []
            }
            slideIndex++
            if (typeof screens[slideIndex] === 'number') {
                screens[slideIndex] -= 1
                if (screens[slideIndex] < 0) screens.splice(0, slideIndex+1)
                slideIndex = 0
            }
            //if there are no loaded slides try again in 10 seconds. no animations. breaks if number?
            if (typeof screens[slideIndex] === 'undefined') {
                slideIndex--
                setTimeout(() => dispatch("incriment"), 10000)
            } else {
                const wrapper = document.getElementById("anim-wrapper")
                if (wrapper !== null) wrapper.className = screens[slideIndex].settings.animation+"-in"
                setTimeout(() => {
                    if(wrapper !== null) wrapper.className = screens[slideIndex].settings.animation+"-out"
                    setTimeout(() => dispatch("incriment"), 1000)
                }, screens[slideIndex].settings.duration*1000)
            }
        }

        //check error?
        function loadSlides() {
            if (calculateTime(screens.concat(toConcatSlides), slideIndex) < 60) getScreen().then(screens => {
                toConcatSlides = toConcatSlides.concat(screens)
                loadSlides()
            })
        }
        loadSlides()
        
        return {
            "slideIndex": slideIndex,
            "slides": screens,
        }
    }
    
    const [slides, dispatch] = useReducer(retriveSlides, {"slideIndex": -1});

    useEffect(() => {
        getScreen().then(screens => {
            // put this in the screen service
            //if (typeof screens === 'string') screens = [{"template": "full","presets": [{"preset": "raw","content": "An error occured, please contact someone about it: "+screens}]}]
            dispatch(screens)
        })
    }, [])

    return ( 
        slides.slides ?
        <div id="anim-wrapper" className="fade-in"><SlideRenderer slides={slides.slides[slides.slideIndex]}/></div>
        : <div className="loading screen" style={{display: "block"}}>
            <div className="loadingIcon"></div>
            <div className="loadingText">loading</div>
        </div>
    )
}

//The code for loading slides sucks and I will rewrite it
//handle errors
//when something doesn't load make an alert on the 'nav'