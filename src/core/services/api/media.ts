// import Module from "@entities/module/module";
import apiService from "../apiService";

export default class MediaService {
  uploadFileMediaAssetService: (data) => any;
  showListMediaWithSearchByService: (data) => any;
  getMediaDetailService: (mediaId) => any;
  updateMediaAssetInfoService: (mediaId, data) => any;
  deleteMediaAssetInfoService: (mediaId) => any;
  multiDelete: (body) => any;
  getMediaAssetWithPagination: (body) => any;

  constructor() {
    this.uploadFileMediaAssetService = async (data) => {
      return await apiService.executeApi({
        path: "/api/media/upload",
        method: "post",
        payload: data,
      });
    };
    // Get list media assets search by
    this.showListMediaWithSearchByService = async (data) => {
      return await apiService.executeApi({
        path: "/api/media/search",
        method: "post",
        payload: data,
      });
    };
    // Get list media assets search by
    this.getMediaDetailService = async (id) => {
      return await apiService.executeApi({
        path: `/api/media/${id}`,
        method: "get",
        showSuccess: false,
      });
    };

    this.updateMediaAssetInfoService = async (mediaId, data) => {
      const body = {
        MediaTitle: data.mediaTitle,
        MediaTag: data.mediaTag,
        MediaDescription: data.mediaDescription,
      };
      return await apiService.executeApi({
        path: `/api/media/${mediaId}`,
        method: "put",
        payload: body,
      });
    };
    this.deleteMediaAssetInfoService = async (mediaId) => {
      return await apiService.executeApi({
        path: `/api/media/${mediaId}`,
        method: "delete",
      });
    };
    this.multiDelete = async (bodyJson) => {
      return await apiService.executeApi({
        path: `/api/media/deleteBulk`,
        method: "post",
        payload: bodyJson,
      });
    };
    this.getMediaAssetWithPagination = async (paginationLoad) => {
      return await apiService.executeApi({
        path: `/api/media/searchPagination`,
        method: "post",
        payload: paginationLoad,
      });
    };
  }
}
