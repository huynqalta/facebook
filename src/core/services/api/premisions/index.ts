import { ServiceCMS } from "../../apiService";

export default class PremisionsService {
    getListPremision: () => Promise<any>;
    constructor() {
        this.getListPremision = async () => {
            const path = `api/Permission/showAll`;
            return await ServiceCMS.executeApi({
                path,
                showSuccess: false,
                showError: false
            })
        }
    }
}