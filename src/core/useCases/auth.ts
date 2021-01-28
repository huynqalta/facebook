import { apilogin } from "@api/auth";
import Auth from "@entities/auth";

class AuthInteractor {
  login: (user: Auth) => any;

  constructor() {
    // const service = new CategorysService();
    // Object.keys(service).forEach((key) => {
    //   this[key] = service[key];
    // });

    this.login = async (user: Auth) => {
      return await apilogin(user);
    };
  }
}

export default AuthInteractor;
