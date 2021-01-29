import React from 'react'
import Create from '../Create'
import ShowPost from '../ShowPost'
import Stories from '../Stories'
import "./style.scss"
const Posts = () => {

    return (
        <div className="posts">
            <Stories />
            <Create />
            <ShowPost />
        </div>
    )
}

export default Posts
