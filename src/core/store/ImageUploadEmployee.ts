import { atom } from "recoil";
export interface UploadImage {
  dataShowInModal: Array<any>;
  visible: boolean;
  newImage: Array<any>;
  imageShow: Array<any>;
  imageServer: Array<any>;
  arrayImageBinaryUpload: Array<any>;
  TagEmployee: Array<any>;
}
export const UploadImageStore = atom<UploadImage>({
  key: "UploadImageStore",
  default: {
    dataShowInModal: [],
    visible: false,
    newImage: [],
    imageShow: [],
    imageServer: [],
    arrayImageBinaryUpload: [],
    TagEmployee: [],
  },
});
