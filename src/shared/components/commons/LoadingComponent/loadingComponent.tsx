import React from "react";
import "./loading.css";

// let loadingImg = require('./../../../assets/images/tenor.gif');
const LoadingComponent = () => {
    return (
        <div className='loader-wrapper'>
            <div className='lds-ring'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default LoadingComponent;
