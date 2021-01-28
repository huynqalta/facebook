import React, { useContext, useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link, withRouter } from "react-router-dom";
// import { GetMediaDetailService, UpdateMediaAssetInfoService } from "../../service";
import InputComponent from "@components/commons/InputComponent/Input.Component";
import { Subscription } from "rxjs";
import InpurTagsAntdComponent from "@components/commons/InputTagsAntdComponent";
import join from "lodash/join";

import { IInitMedia, IMedia } from "../../interface";
import "./style.scss";
import ButtonComponent from "@components/commons/ButtonComponentMedia/Button.Component";
import LazyLoadImage from "@components/commons/LazyLoadImage/LazyLoadImage";
import { Translate, IKey } from "../../../../../shared/functions";
import MediaInteractor from "@useCases/media";
import { useAsync } from "@hook/useAsync";
import { Breadcrumb, Col, Row, Tooltip } from "antd";
import { RightOutlined } from "@ant-design/icons";

const PreviewComponent = (props) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [itemMedia, setItemMedia] = useState(IInitMedia);
  const [textCopy, setTextCopy] = useState("");

  const {
    getMediaDetailService,
    updateMediaAssetInfoService,
  } = new MediaInteractor();
  const [
    asyncGetMediaDetailService,
    asyncUpdateMediaAssetInfoService,
  ] = useAsync(getMediaDetailService, updateMediaAssetInfoService);

  useEffect(() => {
    const _subscriptions = getMediaDetail(props.match.params.id);
    // return () => {
    //     _subscriptions.unsubscribe();
    // };
  }, []);

  // handle change form
  const handleChange = (event: any) => {
    const target = event.target;
    const value: any =
      target.type === "checkbox" ? target.checked : target.value;
    const name: any = target.name;
    // get current data hook
    setItemMedia((prevState) => ({ ...prevState, [name]: value }));
  };

  const updateInfoMedia = () => {
    // NProgressStart();
    const _subscriptions = asyncUpdateMediaAssetInfoService
      .execute(itemMedia.mediaID, itemMedia)
      .then(
        (res) => {
          if (res.data) {
            // NProgressEnd();
            // toastSuccess(res.data.message);
            props.history.push("/media-asset");
          }
        },
        (error) => {}
      );
    setSubscriptions([...subscriptions, _subscriptions]);
  };

  const getMediaDetail = (id) => {
    // NProgressStart();
    const _subscriptions = asyncGetMediaDetailService.execute(id).then(
      (res) => {
        // NProgressEnd();
        setItemMedia(res.data.data);
      },
      (error) => {}
    );
    setSubscriptions([...subscriptions, _subscriptions]);
    return _subscriptions;
  };

  const copyToClipboard = (e) => {
    setTextCopy("COPIED");
  };
  const onMouseOutFnc = () => {
    setTextCopy("COPY_TO_CLIPBOARD");
  };
  // unsubscribe request api
  // useEffect(() => {
  //     return () => {
  //         subscriptions.forEach(function (el) {
  //             el.unsubscribe();
  //         });
  //     };
  // });

  return (
    <React.Fragment>
      <div className="preview-wrap-content" key={11111}>
        <Breadcrumb className="flex-auto breadcb" separator={<RightOutlined />}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/media-asset">Library</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="breadcb__last">Preview</Breadcrumb.Item>
        </Breadcrumb>
        <div className="wrap-content row pt-4">
          <Row>
            <Col>
              {" "}
              <LazyLoadImage url={itemMedia.mediaFullPath} alt={"media"} />
            </Col>
            <Col>
              <div style={{ width: "34vw", marginLeft: "50px" }}>
                <form className={"preview-form"}>
                  <div className="form-group row" key={"link-url"}>
                    <label htmlFor="url-input" className="col-form-label">
                      {"Url"}
                    </label>
                    <div className={"input-group-copy"}>
                      <InputComponent
                        type="text"
                        key={"url"}
                        noLabel={true}
                        disabled={true}
                        value={itemMedia.mediaFullPath || ""}
                        id="url-input"
                        style={{ width: "27vw" }}
                      />
                      <div className="wrapper-input" key={"1112"}>
                        <div className="tooltip-input-copy">
                          <CopyToClipboard
                            text={itemMedia.mediaFullPath}
                            onCopy={copyToClipboard}
                          >
                            <Tooltip title={textCopy}>
                              <button
                                type="button"
                                className="btn-group-custom"
                                onMouseOut={onMouseOutFnc}
                              >
                                {"COPY_LINK"}
                              </button>
                            </Tooltip>
                          </CopyToClipboard>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="title-input" className=" col-form-label">
                      {"Title"}
                    </label>
                    <InputComponent
                      onChange={handleChange}
                      name={"mediaTitle"}
                      noLabel={true}
                      placeholder={"title"}
                      type={"text"}
                      value={itemMedia.mediaTitle || ""}
                      style={{ width: "27vw" }}
                    />
                  </div>
                  <div className="form-group row" style={{ marginTop: "20px" }}>
                    <label htmlFor="caption-input" className=" col-form-label">
                      {"Tags"}
                    </label>

                    <InpurTagsAntdComponent
                      value={itemMedia.mediaTag}
                      onChange={({ listTag }) =>
                        setItemMedia((prevState) => ({
                          ...prevState,
                          mediaTag: join(listTag, ","),
                        }))
                      }
                      // style={{ width: "30vw" }}
                    />
                  </div>
                  <div
                    className="form-group row"
                    style={{ margin: " 20px 0px" }}
                  >
                    <label
                      htmlFor="description-input"
                      className=" col-form-label"
                    >
                      {"Descriptions"}
                    </label>
                    <textarea
                      rows={2}
                      className="form-control mediaDescription"
                      name={"mediaDescription"}
                      value={itemMedia.mediaDescription || ""}
                      placeholder={"description"}
                      onChange={handleChange}
                      id="description-input"
                    />
                  </div>
                  <div className="form-group row float-right pr-3">
                    <ButtonComponent
                      loading={
                        asyncUpdateMediaAssetInfoService.status == "loading"
                      }
                      classNames="fz-14"
                      onClick={updateInfoMedia}
                      text={"save"}
                    />
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};
export default withRouter(PreviewComponent);
