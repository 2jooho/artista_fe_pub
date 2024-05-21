import { Axios } from "../Axios";
import { API_ROUTE } from "../../constants/api";

const authAPI = new Axios(true);

export const galleryBestInfo: any = async () => {
  try {
    const response = await authAPI.get(API_ROUTE.AUTH.GALLERY_BEST_INFO);
    return response;
  }catch(error){
    console.log(error);
  }
};

export const galleryList: any = async (page: number, size: number, userId:any, categoryId:any, orderType:any, selectType:any) => {
    const response = await authAPI.get(API_ROUTE.AUTH.GALLERY_LIST(page, size, userId, categoryId, orderType, selectType));
    return response;
};

export const categoryList: any = async () => {
  try {
    const response = await authAPI.get(API_ROUTE.AUTH.CATEGORY_LIST);
    return response;
  }catch(error){
    console.log(error);
  }
};

export const galleryDetailInfo: any = async (artId: number) => {
  try{
    const response = await authAPI.get(API_ROUTE.AUTH.GALLERY_DETAIL(artId));
    return response;
  }catch(error){
    console.log(error);
  }
};

export const artUpdate: any = async (data: any) => {
    const response = await authAPI.putFormData(API_ROUTE.AUTH.ART_UPDATE, data);
    return response;
};

export const artInsert: any = async (data: any) => {
  const response = await authAPI.putFormData(API_ROUTE.AUTH.ART_INSERT, data);
  return response;
};

export const likeUpdate: any = async (userId:any, artId:any, isLike:any) => {
  const response = await authAPI.get(API_ROUTE.AUTH.LIKE_UPDATE(userId, artId, isLike));
  return response;
};



