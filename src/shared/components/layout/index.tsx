import React, { useState } from "react";
import Navbar from "./Navbar";
import Posts from "./Posts";
import SideBar from "./SideBar";
import "./style.scss"
const DefaultLayout = (props) => {
  const [ toogleSider, setToogleSider ] = useState(false);

  const toggle = () => {
    setToogleSider(!toogleSider);
  };
  return (
    // <section className="default-layout flex h-full">
    //   <SiderComponent toogleSider={toogleSider} />
    //   <div className="site-layout width-area ml-auto">
    //     <HeaderComponent toggle={toggle} toogleSider={toogleSider} />
    //     <div className={`main-content-wrapper `}>
    //       <div className={`wrap-content `}>{props.children}</div>
    //     </div>
    //   </div>
    // </section>
    <section>
      <Navbar />
      <div className="facebook">
        <SideBar />
        <Posts />
      </div>
    </section>
  );
};

export default DefaultLayout;
