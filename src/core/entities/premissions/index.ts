class Premisions {
    permissionCode: string = ""
    permissionName: string = ""
    permissionCreated: string = ""
    constructor(premisions?) {
        if (premisions) {
            Object.keys(this).forEach((pre) => {
                if (premisions[ pre ]) {
                    this[ pre ] = premisions[ pre ]
                }
            })
        }
    }
    createListPremisions(listPremisions) {
        if (!Array.isArray(listPremisions)) return [];
        return listPremisions.map((pre) => {
            return new Premisions(pre);
        })
    }
}
export default Premisions