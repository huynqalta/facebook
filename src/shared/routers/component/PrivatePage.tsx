import DefaultLayout from "@components//layout";
import React, { useEffect } from "react";
import { privateRouter } from "../privateRouter";
import ShowRouter from "./ShowRouter";

interface Props {
  privateLogin?: boolean;
}

const PrivatePage: React.FC<Props> = ({ }) => {
  return (
    <DefaultLayout>
      <ShowRouter routers={privateRouter} />
    </DefaultLayout>
  );
};

export default PrivatePage;
