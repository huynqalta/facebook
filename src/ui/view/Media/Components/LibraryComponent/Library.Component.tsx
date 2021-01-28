import React, { useContext, useEffect, useState } from "react";
import {
  debounce,
  ReadSizeFilesUpload,
  Translate,
  useLog,
  useTranslate,
} from "../../../../../shared/functions";
import "./styles.scss";
import DropZoneComponent from "@components/commons/DropZoneComponent/DropZone.Component";
// import { toastSuccess, toastWarning } from "@config/ToastPlugin";
// import { NProgressEnd, NProgressStart } from "@config/NProgress/NProgressCofig";
import { Subscription } from "rxjs";
import moment from "moment";
import {
  IMedia,
  ISearchBy,
  PaginationLoad,
  initPaginationLoad,
} from "../../interface";
import { Link, useHistory } from "react-router-dom";
import { swalAfter } from "@config/swalPulgin";
// import { commonTitle, inputLocals } from "../../../_locals";
import { DatePicker, Tooltip, Checkbox, Row, List, Breadcrumb } from "antd";
// import { GlobalContext } from "@GlobalContext/GlobalContext";
import SearchComponent from "@components/commons/SearchComponent/SearchComponent";
import NoDataComponent from "@components/commons/NodataComponent";
import LazyLoadImage from "@components/commons/LazyLoadImage/LazyLoadImage";
import ButtonComponent from "@components/commons/ButtonComponentMedia/Button.Component";
import { useAsync } from "@hook/useAsync";
import MediaInteractor from "@useCases/media";
import { RightOutlined } from "@ant-design/icons";
// import { allKey } from "@TranslateKey/ImportAllKey";

// const { commonKey, specificKey } = allKey;

const LibraryComponent = (props) => {
  const {
    deleteMediaAssetInfoService,
    getMediaAssetWithPagination,
    uploadFileMediaAssetService,
    multiDelete,
  } = new MediaInteractor();
  const [
    asyncDeleteMediaAssetInfoService,
    asyncGetMediaAssetWithPagination,
    asyncUploadFileMediaAssetService,
    asyncMultiDelete,
  ] = useAsync(
    deleteMediaAssetInfoService,
    getMediaAssetWithPagination,
    uploadFileMediaAssetService,
    multiDelete
  );
  // const { currentLang } = useContext(GlobalContext);
  const history = useHistory();
  const [subscriptions, setSubscriptions] = useState<Array<Subscription>>([]);
  const [listImageAssets, setListImageAsset] = useState<Array<IMedia>>([]);
  const [mediaIds, setMediaIds] = useState<Array<string>>([]);
  const [numberFilesUpload, setNumberFileUpload] = useState(0);
  const [loadMoreState, setLoadMoreState] = useState({
    hasMore: true,
    loading: false,
  });
  const [paginatinLoad, setPaginationLoad] = useState<PaginationLoad>(
    initPaginationLoad
  );
  // const { CONFIRM_DELETE_MESS } = useTranslate(commonKey);
  const [monthSearch, setMonthSearch] = useState("");

  // first init request api
  useEffect(() => {
    const _subscriptions = getListMediaAssets(paginatinLoad);
    // return () => {
    //   _subscriptions.unsubscribe();
    // };
  }, []);

  const getListMediaAssets = (
    pagination: PaginationLoad,
    isLoadMore = false
  ) => {
    // NProgressStart();
    setLoadMoreState((prev) => ({ ...prev, loading: true }));
    const _subscriptions = asyncGetMediaAssetWithPagination
      .execute(pagination)
      .then((res) => {
        // NProgressEnd();
        if (res && res.data) {
          const info = res.data.data.info;
          let listItem;
          if (res.data.data.data.length != 0 && isLoadMore) {
            listItem = listImageAssets.concat(res.data.data.data);
          } else {
            listItem = res.data.data.data;
          }
          setListImageAsset(listItem);
          setPaginationLoad({
            limit: info.limit,
            page: info.page,
            searchType: pagination.searchType,
            searchContent: pagination.searchContent,
            totalRecord: info.totalRecord,
          });
          if (info.totalRecord == listItem.length) {
            setLoadMoreState((prev) => ({
              ...prev,
              loading: false,
              hasMore: false,
            }));
          } else {
            setLoadMoreState((prev) => ({
              ...prev,
              loading: false,
              hasMore: true,
            }));
          }
        }
      });
    setSubscriptions([...subscriptions, _subscriptions]);
    window.dispatchEvent(new Event("resize"));
    return _subscriptions;
  };

  const handleChangeDropzone = (files) => {
    let sizeFilesUploaded = ReadSizeFilesUpload(files, "GB");
    if (sizeFilesUploaded < 2) {
      const data = new FormData();
      setNumberFileUpload(files.length);
      files.forEach((item) => {
        data.append("mediaFiles", item);
      });
      // start upload file
      // NProgressStart();
      const _subscriptions = asyncUploadFileMediaAssetService
        .execute(data)
        .then(
          (res) => {
            history.push(`/media-asset/preview/${res.data.data[0].mediaID}`);
          },
          (error) => {}
        );
      setSubscriptions([...subscriptions, _subscriptions]);
    } else {
      // toastWarning("Size all files upload larger 2GB");
    }
  };

  const handleChangeInputSearch = debounce(function (_value) {
    getListMediaAssets({
      ...paginatinLoad,
      searchType: ISearchBy.KeyWord,
      searchContent: _value,
      page: 1,
    });
  }, 500);

  const callFunction = (data) => {
    // NProgressEnd();
    getListMediaAssets(paginatinLoad);
    // toastSuccess(data.message);
  };

  const deleteMediaAsset = (id) => {
    swalAfter(`${"CONFIRM_DELETE_MESS"}`).then((willDetele) => {
      if (willDetele) {
        // NProgressStart();
        const _subscriptions = asyncDeleteMediaAssetInfoService
          .execute(id)
          .then(
            (res) => {
              callFunction(res);
              const index = mediaIds.indexOf(id);
              if (index != -1) {
                const arr = [...mediaIds];
                arr.splice(index, 1);
                setMediaIds(arr);
              }
            },
            (error) => {}
          );
        setSubscriptions([...subscriptions, _subscriptions]);
      }
    });
  };

  const onChangeMonthPicker = (date, dateString) => {
    setMonthSearch(dateString);
    getListMediaAssets({
      ...paginatinLoad,
      searchType: dateString == "" ? ISearchBy.Default : ISearchBy.ByTime,
      searchContent: dateString,
      page: 1,
    });
  };
  const changeCheckboxMediaAsset = (value) => {
    setMediaIds(value);
  };
  const handleMultipleDelete = (mediaIds) => {
    swalAfter(`${"CONFIRM_DELETE_MESS"}`).then((willDetele) => {
      if (willDetele) {
        // NProgressStart();
        const bodyJson = {
          mediaIds,
        };
        const _subscriptions = asyncMultiDelete
          .execute(bodyJson)
          .then((res) => {
            callFunction(res);
          });
        setSubscriptions([...subscriptions, _subscriptions]);
      }
    });
  };

  // unsubscribe request api
  // useEffect(() => {
  //   return () => {
  //     subscriptions.forEach(function (el) {
  //       // el.unsubscribe();
  //     });
  //   };
  // });

  const loadMore = (
    // loadMoreState.hasMore && !loadMoreState.loading ? (
    <div className="w-100 pt-3">
      <ButtonComponent
        classNames="m-auto"
        text={"Load More"}
        onClick={(event) => {
          getListMediaAssets(
            { ...paginatinLoad, page: paginatinLoad.page + 1 },
            true
          );
        }}
      />
    </div>
  );
  // ) : null;
  return (
    <React.Fragment>
      <Breadcrumb className="flex-auto breadcb" separator={<RightOutlined />}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item className="breadcb__last">Library</Breadcrumb.Item>
      </Breadcrumb>
      <DropZoneComponent
        language={"currentLang"}
        onChange={handleChangeDropzone}
        numberFiles={numberFilesUpload}
        status={asyncUploadFileMediaAssetService.status}
      />
      <div className="library-content-bottom">
        <div className="wrap-search w-100 d-flex justify-content-between">
          <div className="search-left ml-2 d-flex col-3">
            <DatePicker
              format={"MM-YYYY"}
              value={monthSearch ? moment(monthSearch, "MM-YYYY") : null}
              onChange={onChangeMonthPicker}
              picker="month"
              className="custom-monthPicker"
              dropdownClassName="custom-dropdow_month_picker_media"
              placeholder={"Search Month"}
            />
          </div>
          <div className="d-flex searchBar">
            <div className={"searchBar_detail  d-flex align-items-center mr-3"}>
              <SearchComponent
                onChange={(value) => {
                  handleChangeInputSearch(value);
                }}
              />
            </div>

            <button
              disabled={mediaIds.length == 0}
              className={`btn btn-search-all ml-0 ${
                paginatinLoad.searchType == ISearchBy.Default && "active"
              }`}
              onClick={() => handleMultipleDelete(mediaIds)}
            >
              {"Delete"}
            </button>
          </div>
        </div>
        <Row gutter={[0, 15]} className="wrap-content-search">
          <Checkbox.Group
            className={"w-100 "}
            onChange={changeCheckboxMediaAsset}
          >
            <List
              // className="d-flex"
              loading={loadMoreState.loading}
              dataSource={listImageAssets}
              grid={{ column: 12 }}
              renderItem={(item) => (
                <List.Item className="content-item">
                  <Tooltip placement="topLeft" title={item.mediaTitle}>
                    <div className="d-inline-block w-100 h-100">
                      <Checkbox
                        value={item.mediaID}
                        className="checkbox-media-item"
                      />
                      <Link to={`/media-asset/preview/${item.mediaID}`}>
                        <LazyLoadImage
                          w100
                          url={item.mediaFullPath}
                          alt={"media"}
                        />
                      </Link>
                      <i
                        className="fas fa-trash  delete-media-item"
                        title={"remove"}
                        onClick={() => deleteMediaAsset(item.mediaID)}
                      />
                    </div>
                  </Tooltip>
                </List.Item>
              )}
            >
              {loadMore}
            </List>
          </Checkbox.Group>
        </Row>
        {listImageAssets.length == 0 && (
          <div className="w-100 justify-content-center">
            <NoDataComponent />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
export default LibraryComponent;
