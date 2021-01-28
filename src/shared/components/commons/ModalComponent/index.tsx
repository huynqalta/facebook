import React, { useState, useEffect, useMemo, ReactElement } from "react";
import "./style.scss";
import { Modal } from "antd";
import ButtonComponent from "@components/commons/ButtonComponentMedia/Button.Component";
import TitleComponent from "@components/commons/TitleComponent/TitleComponent";
import { Translate } from "../../../functions";
// import { allKey } from "@shared/TranslateKey/ImportAllKey";

interface Iprops {
  visible?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  title?: string;
  okFooter?: string;
  cancleFooter?: string;
  className?: string;
  children?: any;
  footer?: boolean;
  width?: any;
  loading?: boolean;
  disabledBtn?: boolean;
  noneOk?: boolean;
  closable?: boolean;
}

// const { commonKey } = allKey;
const ModalComponent = (props: Iprops) => {
  return (
    <Modal
      title={
        <TitleComponent
          text={props.title}
          className="title-question"
          style={{ fontSize: 27, marginBottom: 0 }}
        />
      }
      visible={props.visible}
      onOk={props.onOk}
      onCancel={props.onCancel}
      className={`modal-general ${props.className}`}
      maskClosable={props.closable}
      width={props.width}
      footer={
        props.footer === false ? (
          <div />
        ) : (
          <div className="footer-modal d-flex">
            <ButtonComponent
              onClick={props.onCancel}
              typeColor="gray"
              text={
                props.cancleFooter
                  ? props.cancleFooter
                  : "Translate(commonKey.CANCEL)"
              }
            />
            {props.noneOk ? (
              <></>
            ) : (
              <ButtonComponent
                disabled={props.disabledBtn}
                onClick={props.onOk}
                loading={props.loading}
                text={
                  props.okFooter ? props.okFooter : "Translate(commonKey.SAVE)"
                }
              />
            )}
          </div>
        )
      }
    >
      {props.children}
    </Modal>
  );
};
export default ModalComponent;
