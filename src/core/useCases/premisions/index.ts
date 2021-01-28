import PremisionsService from "@api/premisions";
import Premisions from "@entities/premissions";

class PremisionsInterrator {
    getListPremisions: () => any;
    constructor() {
        const service = new PremisionsService();
        this.getListPremisions = async () => {
            return await service.getListPremision().then((res) => {
                return {
                    data: new Premisions({}).createListPremisions(res?.data?.data)
                }
            })
        }
    }
}
export default PremisionsInterrator