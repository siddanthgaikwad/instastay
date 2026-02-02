import React from "react";
import {useState,useEffect} from "react";
import "./SlideShow.css"
const images = [
    "/assets/guest.jpg",
    "/assets/laptop-bg.jpg",
    "/assets/nature-bg.jpg",
    "/assets/beach-fam.jpg",
    "/assets/hospitality.jpg",
]


function SlideShow(){
    const [index,setIndex] = useState(0);

    useEffect(()=>{
        const interval = setInterval(()=>{
            setIndex((prevIndex)=> (prevIndex+1)%images.length);
        },4000)

        return ()=> clearInterval(interval);
    },[images.length])
    return(
        <div className="slide-show">
            <div 
                className="slideShow-inner"
                style = {{
                    transform : `translateX(-${index*100}%)`,
                    width: `${images.length*100}%`
                }}
            >
                {
                    images.map((image,i) => (
                        <img src={image} key={i} alt="image-not-found" />
                    ))
                }
            </div>
        </div>
    )
}

export default SlideShow;