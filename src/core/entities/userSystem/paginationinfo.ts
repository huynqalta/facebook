export interface IPaginationInfoInfo {
    limit: number,
    page: number,
    totalRecord: number
}
export default class PaginationInfo implements IPaginationInfoInfo {
    limit: number = 10;
    page: number = 1;
    totalRecord: number = 0;
    constructor(paginationInfo?) {
        Object.keys(this).forEach((key) => {
            if (paginationInfo[ key ]) {
                this[ key ] = paginationInfo[ key ]
            }
        })
    }
}