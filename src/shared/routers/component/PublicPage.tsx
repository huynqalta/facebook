import React from "react";
import { publicRouter } from "../publicRouter";
import ShowRouter from "./ShowRouter";

interface Props { }

const PublicPage: React.FC<Props> = ({ }) => {
  return (
    <>
      <ShowRouter routers={publicRouter} />
    </>
  );
};

export default PublicPage;
