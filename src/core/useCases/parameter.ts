import ParameterService from "@api/parameter"
import PaginationInfo from "@entities/paginationInfo"
import Parameter from "@entities/parameter"

class ParameterIntoractor {
    getListParameters: (info: PaginationInfo, search: string) => any
    getDetailParameter: (parameterId: string) => any
    editParameters: (parameterId, parameter: Parameter) => any
    addParameters: (parameter) => any
    removeParameter: (parameterId) => any

    constructor() {
        const service = new ParameterService()

        this.getListParameters = async (info, search) => {
            const payload = {
                limit: info.pageSize,
                total: info.total,
                page: info.current,
                search
            }

            return await service.getListParameters(payload).then(res => {
                return {
                    data: new Parameter().createListParameter(res?.data?.data?.data),
                    info: new PaginationInfo({
                        pageSize: res?.data?.data?.info.limit,
                        total: res?.data?.data?.info.totalRecord,
                        current: res?.data?.data?.info.page,
                    })
                }
            })
        }

        this.getDetailParameter = async (parameterId) => {
            return await service.getDetailParameter(parameterId).then(res => {
                return new Parameter(res?.data)
            })
        }

        this.addParameters = async (parameter: Parameter) => {
            let payload = new Parameter(parameter)
            payload.parameterType = payload.convertParamerterType(parameter.parameterType)
            return await service.addParameters(payload)
        }

        this.editParameters = async (parameterId: string, parameter: Parameter) => {
            let payload = new Parameter(parameter)
            payload.parameterType = payload.convertParamerterType(parameter.parameterType)
            return await service.editParameters(parameterId, payload)
        }

        this.removeParameter = service.removeParameter
    }
}

export default ParameterIntoractor