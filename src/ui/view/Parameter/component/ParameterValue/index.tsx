import React from "react"
import ArrayValue from "./ArrayValue";
import ObjectValue from "./ObjectValue";
import TextValue from "./TextValue";

const ParameterValue = ({ type }) => {
    switch (type) {
        case "text":
            return <TextValue />
        case "array":
            return <ArrayValue />

        default:
            return <ObjectValue />
    }
}

export default ParameterValue