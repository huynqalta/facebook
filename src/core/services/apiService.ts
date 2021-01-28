import { clearToken, getToken } from "@api/auth";
import { SERVICES } from "@config/index";
import axios from "axios";
import notifiTranslate from "@components/layout/NotifTranslate";

export interface IParamsApi {
  method?: "get" | "post" | "delete" | "put";
  path: string;
  payload?: any;
  showSuccess?: boolean;
  showError?: boolean;
  config?: {
    isPrivate?: boolean;
    isFormData?: boolean;
  };
  customRes?: (res) => any;
}

class Service {
  public service: any;

  constructor() {
    let service = axios.create({
      baseURL: SERVICES.API_URL_BASE,
      paramsSerializer: (params) => {
        // Sample implementation of query string building
        let result = "";
        Object.keys(params).forEach((key) => {
          if (params[key]) {
            result += `${key}=${encodeURIComponent(params[key])}&`;
          }
        });
        return result.substr(0, result.length - 1);
      },
    });
    this.service = service;
  }

  private handleSuccess(response, showSuccess) {
    if (showSuccess) {
      notifiTranslate({
        type: "success",
        translateKey: response?.data?.data?.message,
      });
    }
    return Promise.resolve(response.data);
  }

  private handleError(error, showError) {
    let status = error.response?.status;
    switch (status) {
      case 400: {
        if (showError) {
          notifiTranslate({
            type: "error",
            translateKey: error?.response?.data?.message || "Something error",
          });
        }
        break;
      }
      case 401: {
        notifiTranslate({
          type: "error",
          translateKey: error?.response?.data?.message || "No permission",
        });
        clearToken();
        window.location.reload();
        window.location.href = `/#/login`;
        break;
      }
      case 500: {
        notifiTranslate({
          type: "error",
          translateKey: error?.response?.data?.message || "Server Error",
        });
        break;
      }
      default: {
        break;
      }
    }
    return Promise.reject(error);
  }

  private preparePrivateHeaderConfig() {
    const token = getToken();

    return {
      Authorization: `Bearer ${token}`,
    };
  }

  private getDefaultConfig({ isPrivate, isFormData }: any = {}) {
    const config = {
      headers: {},
    };

    if (isPrivate) {
      const privateHeaderConfig = this.preparePrivateHeaderConfig();
      Object.assign(config.headers, privateHeaderConfig);
    }

    if (isFormData) {
      Object.assign(config.headers, {
        "Content-Type": "multipart/form-data",
      });
    }

    return config;
  }

  async executeApi({
    method = "get",
    path = "",
    showSuccess = true,
    showError = true,
    payload = {},
    config = {},
    customRes = (response) => response,
  }: IParamsApi) {
    let arg: any;
    const { isPrivate = true, isFormData = false } = config;

    switch (method) {
      case "get":
        arg = [path, payload, this.getDefaultConfig({ isPrivate })];
        break;
      case "delete": {
        arg = [path, this.getDefaultConfig({ isPrivate })];
        break;
      }

      case "post":
      case "put": {
        arg = [path, payload, this.getDefaultConfig({ isPrivate, isFormData })];
        break;
      }

      default:
        break;
    }

    return await this.service[method](...arg)
      .then((response) =>
        this.handleSuccess({ data: customRes(response) }, showSuccess)
      )
      .catch((error) => this.handleError(error, showError));
  }
}
class ServiceBaseCRM extends Service {
  constructor() {
    super();
    let service = axios.create({
      baseURL: SERVICES.API_URL_BASE,
    });
    this.service = service;
  }
}
class ServiceBaseCMS extends Service {
  constructor() {
    super();
    let service = axios.create({
      baseURL: SERVICES.API_URL_BASE_CMS,
    });
    this.service = service;
  }
}

class ServiceBaseAC extends Service {
  constructor() {
    super();
    let service = axios.create({
      baseURL: SERVICES.API_URL_BASE_AC,
    });
    this.service = service;
  }
}

export const ServiceCRM = new ServiceBaseCRM();
export const ServiceCMS = new ServiceBaseCMS();
export const ServiceAC = new ServiceBaseAC();
export default new Service();
