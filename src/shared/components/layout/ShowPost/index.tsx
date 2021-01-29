import React, { useState } from 'react'
import { FaRegCommentAlt, FaRegThumbsUp, FaShareAlt } from 'react-icons/fa'
import "./style.scss"
const ShowPost = () => {
    const [ state, setState ] = useState([
        {
            id: 1,
            name: "Mồn lèo 1",
            time: "2h",
            userImage: "https://upload.khamphaplus.com/2020/06/19/anh-meo-ngao-hinh-meo-ngao-hai-huoc-3.jpg",
            title: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id dolorem officiis assumenda doloribus libero maiores et reiciendis iusto nobis commodi cumque, veritatis, sint deserunt, eaque corporis excepturi unde fugit. Impedit.",
            postImage: "https://upload.khamphaplus.com/2020/06/19/anh-meo-ngao-hinh-meo-ngao-hai-huoc-3.jpg"
        },
        {
            id: 2,
            name: "Mồn lèo  2",
            time: "2h",
            userImage: "https://upload.khamphaplus.com/2020/06/19/anh-meo-ngao-hinh-meo-ngao-hai-huoc-7.jpg",
            title: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id dolorem officiis assumenda doloribus libero maiores et reiciendis iusto nobis commodi cumque, veritatis, sint deserunt, eaque corporis excepturi unde fugit. Impedit.",
            postImage: "https://upload.khamphaplus.com/2020/06/19/anh-meo-ngao-hinh-meo-ngao-hai-huoc-7.jpg"
        },
        {
            id: 3,
            name: "Mồn lèo  3",
            time: "2h",
            userImage: "https://upload.khamphaplus.com/2020/06/19/anh-meo-ngao-hinh-meo-ngao-hai-huoc-11.jpg",
            title: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id dolorem officiis assumenda doloribus libero maiores et reiciendis iusto nobis commodi cumque, veritatis, sint deserunt, eaque corporis excepturi unde fugit. Impedit.",
            postImage: "https://upload.khamphaplus.com/2020/06/19/anh-meo-ngao-hinh-meo-ngao-hai-huoc-11.jpg"
        },
        {
            id: 4,
            name: "Mồn lèo  4",
            time: "2h",
            userImage: "https://upload.khamphaplus.com/2020/06/19/anh-meo-ngao-hinh-meo-ngao-hai-huoc-12.jpg",
            title: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id dolorem officiis assumenda doloribus libero maiores et reiciendis iusto nobis commodi cumque, veritatis, sint deserunt, eaque corporis excepturi unde fugit. Impedit.",
            postImage: "https://upload.khamphaplus.com/2020/06/19/anh-meo-ngao-hinh-meo-ngao-hai-huoc-12.jpg"
        },
        {
            id: 5,
            name: "Mồn lèo  5",
            time: "2h",
            userImage: "https://upload.khamphaplus.com/2020/06/19/anh-meo-ngao-hinh-meo-ngao-hai-huoc-12.jpg",
            title: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id dolorem officiis assumenda doloribus libero maiores et reiciendis iusto nobis commodi cumque, veritatis, sint deserunt, eaque corporis excepturi unde fugit. Impedit.",
            postImage: "https://upload.khamphaplus.com/2020/06/19/anh-meo-ngao-hinh-meo-ngao-hai-huoc-12.jpg"
        },
        {
            id: 6,
            name: "Mồn lèo  6",
            time: "2h",
            userImage: "https://upload.khamphaplus.com/2020/06/19/anh-meo-ngao-hinh-meo-ngao-hai-huoc-2.jpg",
            title: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id dolorem officiis assumenda doloribus libero maiores et reiciendis iusto nobis commodi cumque, veritatis, sint deserunt, eaque corporis excepturi unde fugit. Impedit.",
            postImage: "https://upload.khamphaplus.com/2020/06/19/anh-meo-ngao-hinh-meo-ngao-hai-huoc-2.jpg"
        },
    ])
    return (
        <div className="show">
            {
                state.map((item) => {
                    return (
                        <div className="empty" key={item.id}>
                            <div className="show__header">
                                <div className="show__header-img">
                                    <img src={item.userImage} />
                                </div>
                                <div className="show__header-name">{item.name} <div className="date">{item.time}</div> </div>
                            </div>
                            <div className="show__body">
                                <div className="show__body-text">
                                    {item.title}
                                </div>
                                <div className="show__body-img">
                                    <img src={item.postImage} alt="" />
                                </div>
                                <div className="show__reactions">
                                    <div className="reactions">
                                        <FaRegThumbsUp /><span className="reactions-text">Likes</span>
                                    </div>
                                    <div className="reactions">
                                        <FaRegCommentAlt /><span className="reactions-text">Comments</span>
                                    </div>
                                    <div className="reactions">
                                        <FaShareAlt /><span className="reactions-text">Share</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>

    )
}

export default ShowPost
