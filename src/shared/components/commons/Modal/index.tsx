import React, {
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./styles.scss";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import modal from "./modalManagement";
import { Button } from "antd";

interface Iprops {
  visible?: boolean;
  onCancel?: () => void;
  onOk?: () => void;
  footer?: boolean;
  title?: string;
  children?: ReactElement;
  width?: string;
  reload?: boolean;
  registerId?: string;
}

const Modal = (props: Iprops) => {
  const [isFirstRender, setIsFirstRender] = useState(false);
  const [visible, setVisible] = useState(false);
  const visibleToUse = props.visible != undefined || visible;
  const setVisibleToUse = (value) => {
    if (props.visible != undefined && value == false) {
      props.onCancel && props.onCancel();
    } else {
      setVisible(value);
    }
  };

  useEffect(() => {
    const numberModal = document.querySelectorAll(".modalsbc");
    if (visibleToUse) {
      document.querySelector("body").style.height = "100vh";
      document.querySelector("body").style.overflow = "hidden";
    } else if (numberModal.length == 1) {
      document.querySelector("body").style.height = "100%";
      document.querySelector("body").style.overflow = "scroll";
    }
  }, [visibleToUse]);

  useEffect(() => {
    setIsFirstRender(true);
  }, []);

  useEffect(() => {
    setIsFirstRender(true);
  }, []);

  if (props.registerId) {
    modal.register(props.registerId, {
      setVisible: (value) => setVisible(value),
      getState: () => {
        visible;
      },
    });
  }

  return ReactDOM.createPortal(
    <div
      className="modalsbc"
      style={visibleToUse ? {} : { visibility: "hidden" }}
    >
      <div>
        <div
          onClick={() => {
            props.onCancel && props.onCancel();
          }}
          style={{
            backgroundColor: "#00000070",
            position: "fixed",
            top: "0px",
            left: "0px",
            right: "0px",
            bottom: "0px",
            overflow: "auto",
            outline: 0,
            zIndex: 0,
          }}
        />
        <div
          className={
            visibleToUse
              ? "modal-container modal-hidden"
              : "modal-container modal-show"
          }
          style={{ width: `${props.width && props.width}` }}
        >
          {props.title && (
            <div className="title">
              <div className="title_descr">
                <p className="title_descr_p">{props.title}</p>
              </div>
              <div className="title_icon">
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={() => {
                    setVisibleToUse(false);
                  }}
                />
              </div>
            </div>
          )}
          <div className="modal_body">
            {!props.reload
              ? isFirstRender && props.children
              : visibleToUse
              ? props.children
              : null}
          </div>
          {props.footer !== false && (
            <div className="footer">
              <div className="footer_button">
                <Button
                  style={{ backgroundColor: "green" }}
                  onClick={() => {
                    setVisibleToUse(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    props.onOk && props.onOk();
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default Modal;
