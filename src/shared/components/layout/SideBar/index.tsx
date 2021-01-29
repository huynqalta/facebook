import { stat } from 'fs'
import React, { useState } from 'react'
import "./style.scss"
const SideBar = () => {
    const [ state, setState ] = useState([
        {
            id: 1,
            image: "https://upload.khamphaplus.com/2020/06/19/anh-meo-ngao-hinh-meo-ngao-hai-huoc-2.jpg",
            name: "Mèo vui vẻ"
        },
        {
            id: 2,
            image: "https://upload.khamphaplus.com/2020/06/19/anh-meo-ngao-hinh-meo-ngao-hai-huoc-3.jpg",
            name: "Mèo ngu ngơ"
        },
        {
            id: 3,
            image: "https://upload.khamphaplus.com/2020/06/19/anh-meo-ngao-hinh-meo-ngao-hai-huoc-7.jpg",
            name: "Mèo bác học"
        },
        {
            id: 4,
            image: "https://upload.khamphaplus.com/2020/06/19/anh-meo-ngao-hinh-meo-ngao-hai-huoc-11.jpg",
            name: "Mèo lươn lẹo"
        },
        {
            id: 5,
            image: "https://upload.khamphaplus.com/2020/06/19/anh-meo-ngao-hinh-meo-ngao-hai-huoc-12.jpg",
            name: "Mèo ham zui"
        },
    ])
    return (
        <div className="sidebar">
            {state.map((info) => {
                return (
                    <div className="sidebar__list" key={info.id}>
                        <div className="sidebar__list-img">
                            <img src={info.image} alt="" />
                        </div>
                        <div className="sidebar_list-name">{info.name}</div>
                    </div>
                )
            })}

        </div>
    )
}

export default SideBar
