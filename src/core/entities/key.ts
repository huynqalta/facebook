class Key {
    parameterKey: string
    parameterName: string
    parameterValue?: Array<{
        PAYMENT: string
        TOPUP: string
        TOPUP_PROMOTION: string
    }> = []
    parameterType: number
    createdAt: string

    constructor(key?) {
        if (key) {
            Object.keys(this).forEach((keyItem) => {
                if (key[ keyItem ]) {
                    this[ keyItem ] = key[ keyItem ]
                }
            });
        }
    }
    createListKey(listKey) {
        if (!Array.isArray(listKey)) return [];
        return listKey.map((key) => {
            return new Key(key);
        });
    }
}
export default Key