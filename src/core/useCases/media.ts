import MediaService from "@api/media";

class MediaInteractor implements MediaService {
  uploadFileMediaAssetService: (data) => any;
  showListMediaWithSearchByService: (data) => any;
  getMediaDetailService: (mediaId) => any;
  updateMediaAssetInfoService: (mediaId, data) => any;
  deleteMediaAssetInfoService: (mediaId) => any;
  multiDelete: (body) => any;
  getMediaAssetWithPagination: (body) => any;

  constructor() {
    const service = new MediaService();
    Object.keys(service).forEach((key) => {
      this[key] = service[key];
    });
  }
}

export default MediaInteractor;
