"use strict";
exports.__esModule = true;
var react_1 = require("react");
var antd_1 = require("antd");
var TableComponent_1 = require("@components/commons/TableComponent");
var hook_1 = require("@components/commons/TableComponent/hook");
var SearchComponent_1 = require("@components/commons/SearchComponent/SearchComponent");
var functions_1 = require("@helper/functions");
var page_1 = require("@useCases/page");
var react_router_1 = require("react-router");
var icons_1 = require("@ant-design/icons");
var Page = function () {
    var getListPageInteractor = new page_1["default"]().getListPageInteractor;
    var register = hook_1["default"]();
    var history = react_router_1.useHistory();
    //   const { CONFIRM_DELETE_MESS } = useTranslate(commonKey);
    var columns = [
        {
            title: "Name",
            dataIndex: "pageName",
            key: "pageName",
            width: "70%"
        },
        {
            title: "Total",
            dataIndex: "pageModuleTotal",
            key: "pageModuleTotal",
            width: "20%"
        },
        {
            title: "Action",
            dataIndex: "",
            key: "",
            sorter: false,
            sortOrder: "",
            render: function (text, record) { return (react_1["default"].createElement("div", { className: "flex" },
                react_1["default"].createElement("div", { className: "btn-group mr-2" },
                    react_1["default"].createElement(antd_1.Tooltip, { title: "Detail", className: "mr-4" },
                        react_1["default"].createElement(icons_1.InfoCircleOutlined, { onClick: function () { return history.push("/page/detail/" + record.pageCode); } }))))); }
        },
    ];
    var handleSearch = functions_1.debounce(function (value) {
        register.fetchData({
            option: { search: value.trim() },
            pagination: { current: 1 }
        });
    }, 1000);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "KeyLanguage" },
            react_1["default"].createElement(antd_1.Breadcrumb, { className: "flex-auto breadcb mb-2", separator: react_1["default"].createElement(icons_1.RightOutlined, null) },
                react_1["default"].createElement(antd_1.Breadcrumb.Item, null, "Home"),
                react_1["default"].createElement(antd_1.Breadcrumb.Item, { className: "breadcb__last" }, "Page")),
            react_1["default"].createElement("div", { className: "flex" },
                react_1["default"].createElement("div", { className: "float-left" },
                    react_1["default"].createElement(SearchComponent_1["default"], { onChange: handleSearch, classNames: "ml-auto border-input", width: "500px" })),
                react_1["default"].createElement("div", { className: "mx-3 ml-auto flex justify-end" })),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement(TableComponent_1["default"], { columns: columns, register: register, apiServices: getListPageInteractor }))));
};
exports["default"] = react_1["default"].memo(Page);
