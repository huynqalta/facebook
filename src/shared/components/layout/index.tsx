import React, { useState } from "react";
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
      hi huy
    </section>
  );
};

export default DefaultLayout;
