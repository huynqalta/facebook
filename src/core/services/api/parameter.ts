import apiService from "../apiService"

class ParameterService {
    getListParameters: (info) => any
    getDetailParameter: (parameterId) => any
    editParameters: (parameterId, parameter) => any
    addParameters: (parameter) => any
    removeParameter: (parameterId) => any

    constructor() {
        this.getListParameters = async (info) => {
            return await apiService.executeApi({
                path: "api/parameters/listParams",
                method: "post",
                payload: info,
                showSuccess: false,
                showError: false,
            })
        }
        this.getDetailParameter = async (parameterId) => {
            return await apiService.executeApi({
                path: `api/parameters/showDetailParameter/${ parameterId }`,
                showSuccess: false,
                showError: false,
            })
        }
        this.addParameters = async (parameter) => {
            return await apiService.executeApi({
                path: "api/parameters",
                method: "post",
                payload: parameter,
            })
        }
        this.editParameters = async (parameterId, parameter) => {
            return await apiService.executeApi({
                path: `api/parameters/${ parameterId }`,
                method: "put",
                payload: parameter,
            })
        }
        this.removeParameter = async (parameterId) => {
            return await apiService.executeApi({
                path: `api/parameters/${ parameterId }`,
                method: "delete",
            })
        }
    }
}

export default ParameterService