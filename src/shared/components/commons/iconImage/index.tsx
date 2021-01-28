import React from 'react'
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import "./style.scss";
const IconImage = ({ title }) => {

    const renderFontAweSomeIcon = () => {
        switch (title) {
            case "edit":
                return <FontAwesomeIcon icon={faEdit} />
            case "delete":
                return <FontAwesomeIcon icon={faTrashAlt} />
            default:
                return null
        }

    }
    return (
        <div className="alta-icon">
            {renderFontAweSomeIcon()}
        </div>
    )
}

export default IconImage
