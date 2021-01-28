import React, { useCallback, useMemo } from "react";
import ExpandedRowRender from "@components/commons/ExpandedRowRender";
import { Tooltip } from "antd";
import { article, common } from "@translateKey/index";
import {
  EditOutlined,
  DeleteOutlined,
  ExportOutlined,
  ImportOutlined,
} from "@ant-design/icons";
import { useTranslate } from "@hook/useTranslate";

export const rowArticleCommon = (data) => {
  const { ARTICLE } = useTranslate(article);
  const { ACTION } = useTranslate(common);
  return useCallback(
    (isWidth?: any) => {
      return {
        title: ARTICLE,
        dataIndex: "article",
        key: "articleName",
        width: isWidth || "auto",
        className: "drag-visible",
        render: (text, item) => (
          <div style={{ visibility: "visible" }}>{text.articleName}</div>
        ),
      };
    },
    [data]
  );
};

export const ColumnCommon = (data, rowArticle, func) => {
  const columnsParent = useMemo(() => {
    return [rowArticle("100%"), func];
  }, [data]);
  const columnsChildren = useMemo(() => {
    return [rowArticle("80%"), func];
  }, [data]);
  return { Parent: columnsParent, Children: columnsChildren };
};

export const rowArticleActionParent = (
  isChild,
  listArticleChild,
  categoryId,
  handleUpdateArticleParent,
  handleUpdateArticleChild,
  handleDetele,
  history,
  translate
) => {
  const { ACTION } = useTranslate(common);
  const { TAKE_IN_PARENT } = useTranslate(article);
  return {
    title: ACTION,
    dataIndex: "",
    key: "action",
    width: "20%",
    render: (index, item) => {
      return (
        <div className={`flex ${!isChild && "justify-end"}`}>
          {listArticleChild.find((item) => item === categoryId)
            ? null
            : isChild
            ? item.parentId && (
                <Tooltip title={translate.takeout} className="mr-4">
                  <ExportOutlined
                    onClick={() => handleUpdateArticleParent(item)}
                  />
                </Tooltip>
              )
            : item.modulePostChild &&
              item.modulePostChild.length === 0 && (
                <Tooltip title={TAKE_IN_PARENT} className="mr-4">
                  <ImportOutlined
                    onClick={() => handleUpdateArticleChild(item)}
                  />
                </Tooltip>
              )}
          <Tooltip title={translate.edit} className="mr-4">
            <EditOutlined
              onClick={() => {
                history.push(
                  `/detail-article/${item.article.articleId}/${categoryId}`
                );
              }}
            />
          </Tooltip>
          <Tooltip title={translate.delete}>
            <DeleteOutlined onClick={() => handleDetele(item)} />
          </Tooltip>
        </div>
      );
    },
  };
};

export const receiveSortCommon = (listArticle, setListArticle) => {
  return useCallback(
    (newData, parentId) => {
      if (parentId) {
        const dataConfig = listArticle.map((item) =>
          item.modulePostId === parentId
            ? {
                ...item,
                modulePostChild: newData,
              }
            : { ...item }
        );
        setListArticle(dataConfig);
      } else {
        setListArticle(newData);
      }
      //   sortArticleModule(newData).subscribe((res) => {
      //     toastSuccess(res.message);
      //   });
    },
    [listArticle]
  );
};

export const ExpandedRowRenderCommon = (
  isLoading,
  listArticle,
  rowArticleNameParent,
  categoryId,
  handleUpdateArticleParent,
  handleUpdateArticleChild,
  handleDetele,
  setListArticle,
  listArticleChild,
  history,
  translate
) => {
  const { ACTION } = useTranslate(common);
  const { TAKE_IN_PARENT } = useTranslate(article);

  return (
    <ExpandedRowRender
      propetyTable={{
        // bodered: false,
        showHeader: true,
        loading: isLoading,
        className: "mt-2",
      }}
      columns={
        ColumnCommon(
          listArticle,
          rowArticleNameParent,
          rowArticleActionParent(
            false,
            listArticleChild,
            categoryId,
            handleUpdateArticleParent,
            handleUpdateArticleChild,
            handleDetele,
            history,
            translate
          )
        ).Parent
      }
      data={listArticle}
      isDragable={true}
      rowKey={"modulePostIndex"}
      handleSortCallBack={receiveSortCommon(listArticle, setListArticle)}
      // type={detailModule.moduleTitle.moduleTitleName}
      expandable={{
        columns: ColumnCommon(
          listArticle,
          rowArticleNameParent,
          rowArticleActionParent(
            true,
            listArticleChild,
            categoryId,
            handleUpdateArticleParent,
            handleUpdateArticleChild,
            handleDetele,
            history,
            translate
          )
        ).Children,
        keyExpanded: {
          parentKey: "modulePostId",
          childrenKey: "modulePostChild",
        },
        isDragable: true,
        rowKey: "modulePostIndex",
        propetyTable: { showHeader: false },
      }}
    />
  );
};
