// import * as toastr from "toastr";
// import "toastr/build/toastr.min.css";
// import { useTranslate } from "../functions";
// // import { allKey } from "@shared/TranslateKey/ImportAllKey";
// // const messageKey = require("@shared/TranslateKey/MessageKey.json");

// // declare var toastr;
// toastr.options.closeButton = false;
// toastr.options.debug = false;
// toastr.options.newestOnTop = false;
// toastr.options.progressBar = false;
// toastr.options.positionClass = "toast-bottom-right";
// toastr.options.preventDuplicates = false;
// toastr.options.showDuration = 300;
// toastr.options.hideDuration = 1000;
// toastr.options.timeOut = 5000;
// toastr.options.extendedTimeOut = 1000;
// toastr.options.extendedTimeOut = 1000;
// toastr.options.showEasing = "swing";
// toastr.options.hideEasing = "linear";
// toastr.options.showMethod = "fadeIn";
// toastr.options.hideMethod = "fadeOut";
// // const translate = useTranslate(allKey.messageKey);
// //     console.log(translate);
// export const toastSuccess = (message?: string) => {
//   const currentLang = JSON.parse(localStorage.getItem("CURRENT_LANG"));
//   let currentMess = messageKey[message]
//     ? messageKey[message][currentLang]
//     : "Success";
//   toastr.success(message ? currentMess : "Success");
// };
// export const toastWarning = (message?: string) => {
//   const currentLang = JSON.parse(localStorage.getItem("CURRENT_LANG"));
//   let currentMess = messageKey[message]
//     ? messageKey[message][currentLang]
//     : "Warning";
//   toastr.warning(currentMess ? currentMess : "Warning");
// };
// export const toastError = (message?: string) => {
//   const currentLang = JSON.parse(localStorage.getItem("CURRENT_LANG")) || "USA";

//   // let currentMess = messageKey[message]
//   //   ? messageKey[message][currentLang]
//   //   : "Error";

//   toastr.error(currentMess ? currentMess : "Error", "Error!");
// };
