import apiService from "../apiService";

export default class KeyService {
    getListKey: (request) => Promise<any>;
    constructor() {
        this.getListKey = async (request) => {
            const path = `api/Parameters/listParams`;
            return await apiService.executeApi({
                path,
                payload: {
                    ...request,
                },
                showSuccess: false,
                showError: false,
                method: "post",
            })
        }
    }
}