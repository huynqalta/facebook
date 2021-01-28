import { getInfoFromToken, setToken } from "@api/auth";
import { useAsync } from "@hook/useAsync";
import { authAtom } from "@recoil/auth";
import AuthInteractor from "@useCases/auth";
import { useHistory } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";

const useAuth = () => {
  const { login: loginAuth } = new AuthInteractor();
  const [login, setLogin] = useRecoilState(authAtom);
  const history = useHistory();
  const loginUser = async (user) => {
    return await loginAuth(user).then((res) => {
      if (res.data) {
        setToken(res.data.data);
        const { UserName } = getInfoFromToken();
        setLogin((pre) => ({ ...pre, privateLogin: true, name: UserName }));
        history.push("/");
      }
    });
  };
  return {
    loginUser,
  };
};
export default useAuth;
