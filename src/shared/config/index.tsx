export let BASE_URL = document.head.querySelector<any>(
  "[property~=base_url][content]"
).content;
export let BASE_URL_CMS = document.head.querySelector<any>(
  "[property~=base_url_cms][content]"
).content;
export let BASE_URL_AC = document.head.querySelector<any>(
  "[property~=base_url_ac][content]"
).content;

export const SERVICES = {
  API_URL_BASE: BASE_URL,
  API_URL_BASE_CMS: BASE_URL_CMS,
  AuthenticationHeaderField: "JWT_TOKEN_HDBANK_CMS",
};
export const USA = "USA";
export const LANGUAGE = ["USA", "VNM"];
export const CURRENT_LANGUAGE = "__INIT__CURRENT_LANGUAGE__";

export const DASHBOARD = "/dashboard";
export const LIST_PRODUCT = "/list-product";
export const MANAGER_ORDER = "/manager-order";
export const USERSYSTEM = "/usersystem";
export const SCHEDULE_DETAILS = "/scheduleDetails/:scheduleId";
export const DETAI_MODULE = "/detail-module/:idCategory/:idModule";
export const DETAI_MODULE_PAGE =
  "/detail-module/:idCategory/:idModule/:pageCode";
export const PAGE = "/page";
export const PAGE_DETAIL = "/page/detail/:pageCode";
export const MEDIA_ASSET = "/media-asset";
export const TAG_MANAGER = "/tag-manager";
export const GROUP = "/group";

//true - Alta, false - HDBANK
export const PROJECT = true;
