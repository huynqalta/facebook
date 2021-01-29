import React, { useState } from 'react'
import "./style.scss"
const Stories = () => {
    const [ state, setState ] = useState([

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
        {
            id: 6,
            image: "https://upload.khamphaplus.com/2020/06/19/anh-meo-ngao-hinh-meo-ngao-hai-huoc-12.jpg",
            name: "Mèo ham zui"
        },
        {
            id: 7,
            image: "https://upload.khamphaplus.com/2020/06/19/anh-meo-ngao-hinh-meo-ngao-hai-huoc-2.jpg",
            name: "Mèo ham zui"
        },
    ])
    return (
        <div className="stories">
            {state.map((item) => {
                return (
                    <div className="stories__col" key={item.name}>
                        <div className="stories__body">
                            <img src={item.image} alt="" />
                            <div className="stories__body-overlay">
                                <div className="stories__body-overlay-img">
                                    <img src={item.image} alt="" />
                                </div>
                                <div className="stories__body-name">
                                    {item.name}
                                </div>

                            </div>
                        </div>
                    </div>
                )
            })}


        </div>
    )
}

export default Stories
