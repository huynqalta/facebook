export interface IMedia {
    createdAt: string;
    mediaAltText: string;
    mediaTag: string;
    mediaDescription: string;
    mediaID: number;
    mediaName: string;
    mediaPath: string;
    mediaTitle: string;
    mediaFullPath: string;
    urlImage: string;
    userSystemName: string;
}
export const IInitMedia = {
    createdAt: "",
    mediaAltText: "",
    mediaTag: "",
    mediaDescription: "",
    mediaID: null,
    mediaName: "",
    mediaPath: "",
    mediaTitle: "",
    mediaFullPath: "",
    urlImage: "",
    userSystemName: "",
};

export interface IMediaSearchInput {
    searchType: string;
    searchContent: string;
}
export interface IformMediaSearch {
    Default: searchType;
    KeyWord: searchType;
    ByTime: searchType;
}
export const InitformMediaSearch = {
    Default: "",
    KeyWord: "",
    ByTime: "",
};

export const ISearchBy: IformMediaSearch = {
    Default: "Default",
    KeyWord: "KeyWord",
    ByTime: "ByTime",
};
export type searchType = "Default" | "KeyWord" | "ByTime";
export interface PaginationLoad {
    searchType: searchType;
    searchContent: string;
    page: number;
    limit: number;
    totalRecord: number;
}

export const InitLimit = 36;

export const initPaginationLoad: PaginationLoad = {
    searchType: "Default",
    searchContent: "",
    page: 1,
    limit: InitLimit,
    totalRecord: 0,
};
