import swal from "sweetalert";
// import 'sweetalert/dist/sweetalert.min.js';

export const swalAfter = (message, content?) => {
    let lang = localStorage.getItem("__INIT__CURRENT_LANGUAGE__");
    let button = lang === "VNM" ? "Chấp nhận" : "Yes";
    let cancel = lang === "VNM" ? "Hủy bỏ" : "No";
    return swal({
        title: message,
        text: content, //content
        icon: "warning",
        buttons: [cancel, button],
        dangerMode: true,
    });
};

export const swalSuccess = (message?: any) => {
    let lang = localStorage.lang;
    let title = lang === "VNM" ? "Hoàn thành !" : "Success!" || message;
    // let button = (lang === 'VNM') ? 'Kết thúc' : 'OK';
    return swal({
        title: title,
        text: "", //text
        icon: "success",
    });
};
export const swalError = (error?) => {
    let lang = localStorage.lang;
    let title = lang == "VNM" ? "Lỗi" : "Error";
    // let button = (lang === 'VNM') ? 'Kết thúc' : 'OK';
    return swal({
        text: error,
        title: title,
        icon: "error",
    });
};
