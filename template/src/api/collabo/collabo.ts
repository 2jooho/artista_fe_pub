import { Axios } from "../Axios";
import { API_ROUTE } from "../../constants/api";

const authAPI = new Axios(true);

export const collaboList: any = async (page: number, size: number) => {
  try{
    const response = await authAPI.get(API_ROUTE.AUTH.COLLABO_LIST(page, size));
    return response;
  }catch(error){
    console.log(error);
  }
};
