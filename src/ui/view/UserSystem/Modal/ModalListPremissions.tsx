import React from "react"
import { Modal } from "antd"
const ModalListPremissions = (props) => {
    const handleOk = () => {
        props.setIsModalListPre(false);
    }
    const handleCancel = () => {
        props.setIsModalListPre(false);
    }
    return (
        <Modal
            visible={props.isModalListPre}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            {props.permissions.map((item, index) => {
                return <p key={index}>{item}</p>
            })}
        </Modal>
    )
}
export default ModalListPremissions