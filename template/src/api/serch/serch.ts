import { Axios } from "../Axios";
import { API_ROUTE } from "../../constants/api";

const authAPI = new Axios(true);

export const serch: any = async (serchType: string, serchValue: string, page: number, size: number) => {
  try {
    const response = await authAPI.get(API_ROUTE.AUTH.SERCH(serchType, serchValue, page, size));
    return response;
  }catch(error){
    console.log(error);
  }
};