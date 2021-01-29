import React from 'react'
import "./style.scss"
import { FaVideo, FaRegFileImage, FaRegGrinAlt } from "react-icons/fa"
const Create = () => {
    return (
        <div className="create">
            <div className="create__first">
                <div className="create__first-img">
                    <span>
                        <img src="https://upload.khamphaplus.com/2020/06/19/anh-meo-ngao-hinh-meo-ngao-hai-huoc-2.jpg" alt="" />
                    </span>
                </div>
                <div className="create__first-input">
                    <input type="text" className="create__first-inputs" placeholder="Hôm nay bạn thế nào !!!!!" />
                </div>
            </div>
            <div className="create__second">
                <span className="create__second-icon">
                    <FaVideo className="redColor" /><span className="text">Live Video</span>
                </span>
                <span className="create__second-icon">
                    <FaRegFileImage className="greenColor" /><span className="text">Photo / Image</span>
                </span>
                <span className="create__second-icon">
                    <FaRegGrinAlt className="orargeColor" /><span className="text">Feeling</span>
                </span>
            </div>
        </div>
    )
}

export default Create
