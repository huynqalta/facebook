import React from 'react'
import LibraryComponent from "./Components/LibraryComponent/Library.Component";

const MediaAssetPage = (props) => {

    return (
        <React.Fragment>
            <div className="card mt-3">
                <div className="card-content">
                    <LibraryComponent />
                    <div className="mt-4" />
                </div>
            </div>
        </React.Fragment>
    )
}
export default MediaAssetPage
