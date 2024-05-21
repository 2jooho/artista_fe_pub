import axios from "axios";
import { timeStamp } from "console";
import { useDispatch, useSelector } from "react-redux";
// import CryptoJS from "crypto-js";

// export function encrypt(data) {
//   const secretKey = `${process.env.REACT_APP_SECRETKEY}`;
//   return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
// }

// export function decrypt(data) {
//   const secretKey = `${process.env.REACT_APP_SECRETKEY}`;
//   const bytes = CryptoJS.AES.decrypt(data, secretKey);
//   const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

//   // // 디코딩된 문자열을 JSON.parse()에 전달하여 파싱
//   const parsedData = JSON.parse(decryptedString);

//   return parsedData;
// }

export class Axios {
  instance;
  auth: any;
  // const userData = useSelector((state: any) => {
  //   return state.user;
  // });
  // user = useSelector((state: any) => state.user); // 토큰을 Redux 스토어에서 가져오기

  constructor(isAuthReq = false) {
    this.instance = axios.create({
      baseURL: "http://localhost:8082",
    });
    this.setInterceptor();
  }

  setInterceptor() {
    //요청
    this.instance.interceptors.request.use(
      this.reqMiddleWare.bind(this),
      this.reqOnError.bind(this)
    );
    //응답
    this.instance.interceptors.response.use(
      this.resMiddleWare.bind(this),
      this.resOnError.bind(this)
    );
  }

  /* Req */
  reqMiddleWare(config: any) {
    let newConfig = config;
    if (this.auth) newConfig = this.setAuthReq(newConfig);

    return newConfig;
  }

  setAuthReq(config: any): any {
    const { headers } = config;
    // const accessToken = this.user.accessToken;
    // const refreshToken = this.user.refreshToken;
    const newConfig = {
      ...config,
      headers: {
        ...headers,
        // Authorization: `Bearer ${accessToken}`,
        // refreshToken: `Bearer ${refreshToken}`,
        withCredentials: true,
      },
    };

    return newConfig;
  }

  reqOnError(error: any) {
    return Promise.reject(error);
  }

  /* Res */
  resMiddleWare(res: any) {
    // const { authorization, refreshtoken } = res.headers;

    // if (authorization) {
    //   this.#cookie.set(COOKIE.KEY.ACCESS_TOKEN, authorization, {
    //     ...COOKIE.CONFIG.DEFAULT,
    //   });
    // }

    // if (refreshtoken) {
    //   this.#cookie.set(COOKIE.KEY.REFRESH_TOKEN, refreshtoken, {
    //     ...COOKIE.CONFIG.DEFAULT,
    //   });
    // }
    return res;
  }

  resOnError(error: any) {
    // console.log("error:" + error.response.status);

    // return Promise.reject(error.response);
    return Promise.reject(error);
  }

  get(endPoint: any) {
    return this.instance({
      method: "GET",
      url: endPoint,
    });
  }

  post(endPoint: any, data: any) {
    return this.instance({
      method: "POST",
      url: `${endPoint}`,
      data,
    });
  }

  putFormData(endPoint: any, data: any) {
    return this.instance({
      method: "POST",
      url: `${endPoint}`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  }

  // getByQuery(endPoint: EndPoint, query: Query) {
  //   return this.#instance({
  //     method: METHOD.GET,
  //     url: endPoint,
  //     params: {
  //       ...query,
  //     },
  //   });
  // }

  // patch(endPoint: EndPoint, data: object = {}) {
  //   return this.#instance({
  //     method: METHOD.PATCH,
  //     url: endPoint,
  //     data,
  //   });
  // }

  // delete(endPoint: EndPoint, id: ID) {
  //   return this.#instance({
  //     method: METHOD.DELETE,
  //     url: `${endPoint}/${id}`,
  //   });
  // }
}
