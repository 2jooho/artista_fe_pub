import { Axios } from "../Axios";
import { API_ROUTE } from "../../constants/api";

const authAPI = new Axios(true);

export const collectionInfo: any = async (userId: string) => {
  try {
    const response = await authAPI.get(API_ROUTE.AUTH.COLLECTION_INFO(userId));
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const likeArtList: any = async (
  page: number,
  size: number,
  userId: any
) => {
  const response = await authAPI.get(
    API_ROUTE.AUTH.LIKE_ART_LIST(page, size, userId)
  );
  return response;
};

export const collectionEdit: any = async (data: any) => {
  const response = await authAPI.putFormData(
    API_ROUTE.AUTH.COLLECTION_EDIT,
    data
  );
  return response;
};
