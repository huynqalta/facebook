import React, { useState, useEffect } from "react";
import { Skeleton } from "antd";
import "./LazyLoadImage.scss";

interface IProps {
  url: string;
  alt: string;
  w100?: boolean;
}

const LazyLoadImage = (props: IProps) => {
  const [rendered, setRendered] = useState(true);

  return (
    <div
      className="wrap-lazyload h-full w-full"
      style={{ borderRadius: "10px" }}
    >
      {rendered && (
        <Skeleton.Button
          className={"skeleton"}
          active={true}
          size={"large"}
          shape={"square"}
        ></Skeleton.Button>
      )}
      {props.url && (
        <img
          onLoad={() => {
            setRendered(false);
          }}
          style={{ maxWidth: "100%" }}
          src={props.url}
          alt={props.alt}
        />
      )}
    </div>
  );
};

export default LazyLoadImage;
