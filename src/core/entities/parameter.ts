class Parameter {
    parameterKey: string = ""
    parameterName: string = ""
    parameterType: "text" | "array" | "object" = "text"
    parameterValue: any

    constructor(parameter?) {
        if (!parameter) return
        Object.keys(this).forEach((key) => {
            if (parameter[key]) {
                this[key] = parameter[key]
            }
        })

        this.createListParameter = this.createListParameter.bind(this)
    }

    convertParamerterType(value, type?: "entities"): any {
        if (type == "entities") {
            switch (value) {
                case 1:
                    return "text"
                case 2:
                    return "array"
                default:
                    return "object"
            }
        } else {
            switch (value) {
                case "text":
                    return 1
                case "array":
                    return 2
                default:
                    return "object"
            }
        }
    }

    createListParameter(listParameter) {
        if (!Array.isArray(listParameter)) return []

        return listParameter.map((parameter) => {
            return new Parameter({ ...parameter, parameterType: this.convertParamerterType(parameter.parameterType, "entities") })
        })
    }
}

export default Parameter