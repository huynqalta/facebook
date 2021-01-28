import React, { useEffect, useMemo, useState } from "react";
import "./Input.scss";
import { Translate } from "../../../functions";
// import { allKey } from "@shared/TranslateKey/ImportAllKey";
// const { commonKey, categoryKey, messageKey } = allKey;
import ModalComponent from "../ModalComponent";
// import { ShowListMediaWithSearchByService } from "../SelectMediaComponent/SelectMedia.service";
import ButtonComponent from "@components/commons/ButtonComponentMedia/Button.Component";
// const { MediaAssetKey } = allKey;
import LazyLoadImage from "@components/commons/LazyLoadImage/LazyLoadImage";
interface IProps {
  onChange?: (e) => void;
  name?: string;
  value?: any;
  id?: string;
  type?: string;
  placeholder?: string;
  classNames?: string;
  onBlur?: (event) => void;
  onFocus?: (event) => void;
  min?: number;
  max?: number;
  notAutoComplete?: boolean;
  label?: string;
  noLabel?: boolean;
  refInput?: any;
  autoValidate?: string;
  error?: {
    status: boolean;
    mess: string;
  };
  disabled?: boolean;
  require?: boolean;
  labelMinWidth?: string;
  onKeyDown?: (e) => void;
  isShow?: boolean;
  style?: object;
  marginBottom?: boolean;
  flex?: boolean;
  handleAutoFill?: () => void;
  onblur?: () => void;
  autoFocus?: boolean;
  media?: boolean;
  listMedia?: Array<any>;
}

const InputComponent = (props: IProps) => {
  const [visible, setVisible] = useState(false);
  const [url, setUrl] = useState("");
  const [idFocused, setIdFocused] = useState("");

  const handleCancel = () => {
    setVisible(false);
  };

  const chooseMedia = () => {
    props.onChange({
      target: {
        name: "",
        value: url,
      },
    });
    handleCancel();
  };

  return (
    <React.Fragment>
      <div
        className={`${!props.marginBottom ? "mb-0" : "mb-4"} ${
          props.flex ? "d-flex align-items-center" : ""
        }`}
        style={props.style}
      >
        <label
          style={{
            whiteSpace: "nowrap",
            display: "inline-block",
          }}
          className={`labelInput ${props.noLabel && "d-none"}`}
        >
          {props.label}{" "}
          {props.require ? <span style={{ color: "red" }}>*</span> : ""}
        </label>
        <div className="d-flex w-100 wrap-input">
          {props.isShow ? (
            <span>{props.value}</span>
          ) : (
            <>
              <input
                autoFocus={props.autoFocus}
                key={props.name}
                type={props.type ? props.type : "string"}
                name={props.name}
                onKeyDown={props.onKeyDown}
                onChange={props.onChange}
                onBlur={props.onBlur}
                onFocus={props.onFocus}
                checked={props.value}
                value={props.value}
                // value={props.type == "number" ? myFormatNumber(props.value) : props.value}
                min={props.min}
                max={props.max}
                autoComplete={props.notAutoComplete ? "off" : "on"}
                disabled={props.disabled}
                className={`input-style ${props.classNames} ${
                  props.disabled && "disabled"
                }`}
                id={props.id || ""}
                placeholder={
                  props.placeholder ? props.placeholder : "Nhập vào đây..."
                }
                ref={props.refInput || undefined}
              />
              {props.media && (
                <div
                  onClick={() => {
                    setVisible(true);
                  }}
                  className="media"
                >
                  {"Translate(MediaAssetKey.MEDIA)"}
                </div>
              )}
            </>
          )}
        </div>
        {props.error && props.error.status && (
          <span className="error-validate-auto">{props.error.mess}</span>
        )}
        <ModalComponent
          width={1215}
          footer={false}
          onCancel={handleCancel}
          visible={visible}
          title={"Translate(commonKey.CHOOSE_MEDIA)"}
        >
          <div className="list-media-to-choose">
            <div className="wrap-list mb-4">
              {props.listMedia &&
                props.listMedia.map((item) => {
                  return (
                    <div
                      onDoubleClick={chooseMedia}
                      onClick={() => {
                        setIdFocused(item.mediaID);
                        setUrl(item.mediaFullPath);
                      }}
                      className={`item-image m-3 ${
                        idFocused == item.mediaID && "active"
                      }`}
                      style={{
                        height: "200px",
                        width: "200px",
                        display: "inline-block",
                      }}
                    >
                      <LazyLoadImage
                        w100
                        url={item.mediaFullPath}
                        alt={item.mediaName}
                      />
                    </div>
                  );
                })}
            </div>
            <div className="d-flex justify-content-end">
              <ButtonComponent
                typeColor="gray"
                text={"Translate(commonKey.CANCEL)"}
                onClick={handleCancel}
              />
              <ButtonComponent
                disabled={false}
                text={"Translate(commonKey.SAVE)"}
                onClick={chooseMedia}
              />
            </div>
          </div>
        </ModalComponent>
      </div>
    </React.Fragment>
  );
};

export default InputComponent;
