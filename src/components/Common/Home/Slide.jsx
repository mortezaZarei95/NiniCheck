import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons'

import image from  "assets/images/slide.jpg";
import classes from "scss/Public/Home.module.scss";


const Slide = () => (
    <React.Fragment>
        <div className={classes.SlideImage} >
        <img src={image} alt="Slide"/>
        </div>
            
        <FontAwesomeIcon icon={faArrowCircleDown}  className={classes.flashIcon} />
    </React.Fragment>
    
)

export default Slide;