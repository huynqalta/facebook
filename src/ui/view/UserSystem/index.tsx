import React, { useCallback, useEffect, useState } from "react";
import ButtonAdd from "@components/commons/ButtonAdd";
import SearchComponent from "@components/commons/SearchComponent/SearchComponent";
import { Table, Button, Space, Tooltip, Breadcrumb } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ModalAddNewUserSystem from "./Modal/ModalAddNewUserSystem";
import { useRecoilValue } from "recoil";
import { UserSystemPaginationStore } from "src/core/store/userSystem/userSystem";
import useUserSystem from "./viewModel";
import { useAsync } from "@hook/useAsync";
import ModalListPremissions from "./Modal/ModalListPremissions";
import { swalAfter } from "@config/swalPulgin";
import { RightOutlined } from "@ant-design/icons";
import { useTranslate } from "@hook/useTranslate";
import { usersystem } from "@translateKey/index";
import { debounce } from "src/shared/functions";
import Showing from "@components/commons/Showing";
import IconImage from "@components/commons/iconImage";


const UserSystem = () => {
    const {
        Name,
        Edit,
        Delete,
        User_system,
        Home,
        add_User,
        ADD_TAG,
        TICKET_NAME,
        REPEAT_TYPE,
        TAG_MANAGER,
    } = useTranslate(usersystem);
    const [ isModalListPre, setIsModalListPre ] = useState({
        visible: false,
        permissions: [],
    });
    const { data, info } = useRecoilValue(UserSystemPaginationStore);
    const { limit, page, totalRecord } = info;

    const { getList, remove, showEditUser, setShowEditUser } = useUserSystem();

    const [ listUser, deleteUser ] = useAsync(getList, remove);
    useEffect(() => {
        listUser.execute({
            limit: 10,
            page: 1,
        });
    }, []);

    const colums = [
        {
            title: Name,
            dataIndex: "userName",
            key: "UserName",
        },
        {
            title: "Email",
            dataIndex: "userEmail",
            key: "userEmail",
        },
        {
            width: "10%",
            render: (text, record) => {
                return (
                    <Space size="middle">
                        <Tooltip title={Edit}>
                            <a className="btn-icon" onClick={() => {
                                EditUser(record);
                            }}>
                                {/* <EditOutlined
                                   
                                /> */}
                                <IconImage title="edit" />
                            </a>
                        </Tooltip>
                        <Tooltip title={Delete}>
                            <a className="btn-icon" onClick={() => {
                                removeUser(record, info);
                            }}>
                                {/* <DeleteOutlined
                                    
                                /> */}
                                <IconImage title="delete" />
                            </a>
                        </Tooltip>
                    </Space>
                );
            },
        },
    ];

    const showModal = () => {
        setShowEditUser({ edit: true, type: "add" });
    };
    const removeUser = useCallback((record, info) => {
        swalAfter(`${ Delete } ${ record.userName }`).then((isOkie) => {
            if (isOkie) {
                deleteUser.execute(record.userCMSId, info);
            }
        });
    }, []);
    const CloseModal = (type: "" | "add" | "edit") => {
        setShowEditUser({ edit: false, data: {}, type: type });
    };
    const EditUser = (data?: any) => {
        setShowEditUser({ edit: true, data: data, type: "edit" });
    };
    const showModalListPre = (permissions) => {
        setIsModalListPre({
            ...isModalListPre,
            visible: true,
            permissions: permissions,
        });
    };
    const handelOnchange = (pagiantion) => {
        const info = {
            totalRecord: pagiantion.total,
            page: pagiantion.current,
            limit: pagiantion.pageSize,
        };
        listUser.execute(info);
    };
    const handleSearch = debounce(function (value) {
        listUser.execute(
            {
                ...info,
                current: 1,
                search: value
            },
        );
    }, 1000);
    return (
        <div>
            <Breadcrumb
                className="flex-auto breadcb mb-3"
                separator={<RightOutlined />}
            >
                <Breadcrumb.Item>{Home}</Breadcrumb.Item>
                <Breadcrumb.Item className="breadcb__last">{User_system}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="mb-5 flex justify-between">
                <div className="d-flex">
                    <div className="">
                        <SearchComponent
                            onChange={handleSearch}
                            classNames={"ml-auto border-input"}
                            width="500px"
                        />
                    </div>
                </div>
                <ButtonAdd onClick={showModal} title={add_User} className="mb-3 " />
            </div>

            {showEditUser.edit && (
                <ModalAddNewUserSystem
                    visible={showEditUser.edit}
                    data={showEditUser.data}
                    type={showEditUser.type}
                    closeModal={CloseModal}
                />
            )}
            {isModalListPre.visible && (
                <ModalListPremissions
                    isModalListPre={isModalListPre.visible}
                    permissions={isModalListPre.permissions}
                    setIsModalListPre={setIsModalListPre}
                />
            )}

            <Table
                columns={colums}
                dataSource={data}
                pagination={{ total: totalRecord, current: page, pageSize: limit, hideOnSinglePage: true }}
                onChange={handelOnchange}
                loading={listUser.status == "loading"}
            ></Table>
            <Showing info={info} data={data} />
        </div>
    );
};
export default UserSystem;
