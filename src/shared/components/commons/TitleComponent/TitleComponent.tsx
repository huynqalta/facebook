import React from "react";
import "./Title.scss";
interface Iprops {
    text: any,
    className?: string,
    style?: object
    status?: boolean;
}

const TitleComponent = (props:Iprops) => {
    return(
        <h1 className={`title ${props.className}`} style={props.style}>{props.text}</h1>
    )
}

export default TitleComponent;
