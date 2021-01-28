import { PROJECT } from "@config/index";
import PrivateLogin from "@hoc//PrivateLogin";
import PublicPage from "@routers/component/PublicPage";
import React, { Suspense, useEffect } from "react";
import { Switch } from "react-router-dom";

const PrivatePage = React.lazy(() => import("@routers/component/PrivatePage"));

interface Iprops {
  privateLogin: boolean;
}

const App = ({ privateLogin }: Iprops) => {
  useEffect(() => {
    if (PROJECT) document.getElementById("body-root").classList.add("alta");
    else document.getElementById("body-root").classList.remove("alta");
  }, []);
  return (
    <Switch>
      {privateLogin ? (
        <Suspense fallback={<div></div>}>
          <PrivatePage />
        </Suspense>
      ) : (
        <Suspense fallback={<div></div>}>
          <PublicPage />
        </Suspense>
      )}
      {/* <Suspense fallback={<div></div>}>
        <PrivatePage />
      </Suspense> */}
    </Switch>
  );
};

export default PrivateLogin(App);
