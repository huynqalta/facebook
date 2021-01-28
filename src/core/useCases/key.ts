import KeyService from "@api/key";
import Key from "@entities/key"
class KeyInterator {
    getListKey: (limit, page, search?: string, sorter?: string) => any;
    constructor() {
        const service = new KeyService();
        this.getListKey = async (kun, search, sorter) => {
            let requet = {
                limit: kun.limit,
                page: kun.page,
                sortOrder: "",
                sortField: "",
                search: "",
            };
            return await service.getListKey(requet).then((res) => {
                return {
                    data: new Key({}).createListKey(res?.data?.data?.data)
                }
            })
        };
    }
}
export default KeyInterator