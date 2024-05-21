import { Axios } from "../Axios";
import { API_ROUTE } from "../../constants/api";

const authAPI = new Axios(true);

export const starList: any = async (year: number, month: number) => {
  try{
    const response = await authAPI.get(API_ROUTE.AUTH.STAR_LIST(year, month));
    return response;
  }catch(error){
    console.log(error);
  }
};

export const starSelectDate: any = async () => {
  try{
    const response = await authAPI.get(API_ROUTE.AUTH.STAR_SELECT_DATE_LIST);
    return response;
  }catch(error){
    console.log(error);
  }
};