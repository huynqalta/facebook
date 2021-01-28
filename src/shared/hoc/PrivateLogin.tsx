import { getInfoFromToken, getToken } from "@api/auth";
import { useAsync } from "@hook/useAsync";
import { authAtom } from "@recoil/auth";
import React, { useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useRecoilState } from "recoil";

function PrivateLogin(Component: React.ComponentType<any | string>) {
  return withRouter(({ history }: RouteComponentProps) => {
    const [ login, setLogin ] = useRecoilState(authAtom);
    // const [ { execute } ] = useAsync(getInfo);

    useEffect(() => {
      if (getToken()) {
        const { UserName = "" } = getInfoFromToken();
        setLogin((pre) => ({
          ...pre,
          privateLogin: true,
          controlLogin: true,
          name: UserName,
        }));
      } else {
        setLogin((pre) => ({ ...pre, controlLogin: true }));
      }
    }, []);
    console.log(login.privateLogin, "login.privateLogin");

    return (
      <>
        {login.controlLogin ? (
          // <Component privateLogin={login.privateLogin} />
          <Component privateLogin={true} />

        ) : null}
      </>
    );
  });
}

export default PrivateLogin;
