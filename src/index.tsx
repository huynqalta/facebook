import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
// import "antd/dist/antd.css";
// import "src/ui/styles/main.css";
import "./ui/styles/style.scss";
import App from "./App";

ReactDOM.render(
  <RecoilRoot>
    <HashRouter>
      <App />
    </HashRouter>
  </RecoilRoot>,
  document.getElementById("root")
)