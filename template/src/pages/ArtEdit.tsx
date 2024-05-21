import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { widthPercentage } from "../constants/ResponsiveSize";
import { useQuery, useMutation } from "@tanstack/react-query";
import { galleryDetailInfo } from "../api/gallery/gallery";
import { artUpdate, artInsert } from "../api/gallery/gallery";
import { useSelector } from "react-redux";
import plus from "../assets/icons/use/18plus.png";
import minus from "../assets/icons/use/19minus.png";
import star from "../assets/icons/use/06star.png";
import GalleryDetailCategoryList from "../components/GalleryDetailCategoryList";
import { categoryList } from "../api/gallery/gallery";
import Resizer from "react-image-file-resizer";
import { useQueryClient } from "@tanstack/react-query";
import delaybar from "../assets/icons/use/delaybar.gif";

const ArtEdit: React.FC = () => {
  const user = useSelector((state: any) => {
    return state.user;
  });
  const navigate = useNavigate();
  const { state } = useLocation();
  const params = useParams();
  const artId: any = params.artId;
  const [isArtId, setIsArtId] = useState(artId ? true : false);
  const [artTitle, setArtTitle]: any = useState("");
  const [artDscription, setArtDscription]: any = useState("");
  const [imageFile, setImageFile]: any[] = useState([]);
  const [photoToAddList, setPhotoToAddList]: any[] = useState([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categoryType, setCategoryType] = useState<string>("1");
  const [categoryListData, setCategoryListData] = useState([]);
  const [mainImgUrl, setMainImgUrl] = useState("");
  const [pageLoading, setPageLoading] = useState(false);
  // const [artIdArray, setArtIdArray]: any[] = useState([]);
  // const [changeImageArray, setChangeImageArray]: any[] = useState([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isArtId) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    return galleryDetailInfo(artId);
  };

  // 외부연동
  // axios
  const { data: galleryDetailData } = useQuery(
    ["galleryDetailInfo", artId],
    fetchData,
    {
      refetchOnWindowFocus: false,
      retry: false,
      onSuccess: (res: any) => {
        setArtTitle(res?.data.artName);
        setArtDscription(res?.data.artDescription);
        imageSetting(res);
      },
      onError: (error: unknown) => {
        if (error != null) {
          // alert(error);
          console.log(error);
        } else {
          alert("서비스 접속이 원활하지 않습니다. 잠시 후 다시 이용해주세요.");
        }
      },
    }
  );
  const frontUrl = process.env.REACT_APP_CLOUDFRONT_IMG_URL;
  const imageSetting = async (res: any) => {
    let imageArray = [];
    let PhotoArray = [];
    // let artIdArray = [];
    for (let i = 0; i < res.data.galleryInfoDtoList.length; i++) {
      let url = res.data.galleryInfoDtoList[i].artUrl;
      let ext = url.split(".").pop();
      let filename = url.split("/").pop();
      let fetchUrl = frontUrl + "/gallery/" + filename;

      try {
        // Fetch the image data from the URL
        const response = await fetch(fetchUrl, {
          method: "GET",
          mode: "no-cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
        // if (!response.ok) {
        //   // Handle errors (e.g., image not found)
        //   console.error("Failed to fetch image data:", response.status);
        //   continue;
        // }

        const blob = await response.blob();

        let metadata = { type: `image/${ext}` };
        let file = new File([blob], filename, metadata);

        imageArray.push(file);
        PhotoArray.push(url);
        // artIdArray.push(res?.data.galleryInfoDtoList[i].artId);
      } catch (error) {
        // Handle any fetch errors
        console.error("Error while fetching image:", error);
      }
    }

    setImageFile(imageArray);
    setPhotoToAddList(PhotoArray);
    // setArtIdArray(artIdArray);
  };

  const { data: categoryData } = useQuery(
    ["categoryList"],
    () => categoryList(),
    {
      refetchOnWindowFocus: false,
      retry: false,
      onSuccess: (res: any) => {
        setCategoryListData(res?.data);
      },
      onError: (error: unknown) => {
        if (error != null) {
          // alert(error);
          console.log(error);
        } else {
          alert("서비스 접속이 원활하지 않습니다. 잠시 후 다시 이용해주세요.");
        }
      },
    }
  );

  const artUpdateMutate: any = async (data: any) => updateMutate(data);
  const { mutate: updateMutate } = useMutation(
    ["artUpdate"],
    (data) => artUpdate(data),
    {
      retry: false,
      onSuccess: (res: any) => {
        setPageLoading(false);
        if (state === "collection") {
          navigate(`/CollectionEdit`);
        } else {
          navigate("/Gallery");
        }
      },
      onError: (error: unknown) => {
        setPageLoading(false);
        if (error != null) {
          // alert(error);
          console.log(error);
        } else {
          alert("서비스 접속이 원활하지 않습니다. 잠시 후 다시 이용해주세요.");
        }
      },
    }
  );

  const artInsertMutate: any = async (data: any) => insertMutate(data);
  const { mutate: insertMutate } = useMutation(
    ["artInsert"],
    (data) => artInsert(data),
    {
      retry: false,
      onSuccess: (res: any) => {
        setPageLoading(false);
        if (state === "collection") {
          navigate(`/CollectionEdit`);
        } else {
          navigate("/Gallery");
        }
      },
      onError: (error: unknown) => {
        setPageLoading(false);
        if (error != null) {
          // alert(error);
          console.log(error);
        } else {
          alert("서비스 접속이 원활하지 않습니다. 잠시 후 다시 이용해주세요.");
        }
      },
    }
  );

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSavePost = () => {
    if (!imageFile) {
      // const formData = new FormData();
      // formData.append("imageFile", imageFile);
      alert("작품을 하나 이상 업로드 해주세요");
    }

    const formData = new FormData();
    formData.append("userId", user.userId);
    formData.append("artName", artTitle);
    formData.append("artDescription", artDscription);
    formData.append("galleryId", artId);
    formData.append("categoryId", categoryType);
    // formData.append("changeImageArray", changeImageArray);
    // formData.append("changeImageIds", '1');

    for (const file of imageFile) {
      formData.append("imageFile", file);
    }

    setPageLoading(true);
    if (artId) {
      queryClient.clear();
      artUpdateMutate(formData);
    } else {
      queryClient.clear();
      artInsertMutate(formData);
    }
  };

  const IMG_MAX_SIZE = 5000000;

  const resizeFile = (file: File) =>
    new Promise((res) => {
      Resizer.imageFileResizer(
        file, // target file
        1500, // maxWidth
        1500, // maxHeight
        "JPEG", // compressFormat : Can be either JPEG, PNG or WEBP.
        80, // quality : 0 and 100. Used for the JPEG compression
        0, // rotation
        (uri: any) => res(uri), // responseUriFunc
        "file" // outputType : Can be either base64, blob or file.(Default type is base64)
      );
    });

  // const resizePreview = (file: File) =>
  //   new Promise((res) => {
  //     Resizer.imageFileResizer(
  //       file,
  //       1500,
  //       1500,
  //       "JPEG",
  //       60,
  //       0,
  //       (uri: any) => res(uri),
  //       "base64"
  //     );
  //   });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imagetarget = e.target.files && e.target.files[0];
    let index = Number(e.target.name);
    let imageList: any = [...imageFile];
    let photoList: any = [...photoToAddList];
    // let changeImageList: any = [...changeImageArray];

    if (imagetarget) {
      if (imagetarget.size > IMG_MAX_SIZE) {
        alert(
          `${Math.round(
            100000000 / IMG_MAX_SIZE
          )}MB 이하의 사진만 등록할 수 있습니다.`
        );
        return;
      }

      try {
        const compressedFile = (await resizeFile(imagetarget)) as File;
        // const compressedPreview = (await resizeFile(imagetarget)) as string;
        imageList.splice(index, 1, compressedFile);
        photoList.splice(index, 1, URL.createObjectURL(compressedFile));
      } catch (err) {
        alert("사진을 불러올 수 없습니다.");
      }

      //중복체크 후 푸시
      // if (!changeImageList.includes(artIdArray[index])) {
      //   changeImageList.push(artIdArray[index]);
      // }
      // if(imageList.length-1 >= index){
      //     console.log("if imageList:"+ JSON.stringify(imageList));
      // imageList.splice(index, 1, URL.createObjectURL(imagetarget));
      // photoList.splice(index, 1, URL.createObjectURL(imagetarget));
      //     console.log("if imageList:"+ JSON.stringify(imageList));
      //     console.log("if photoList:"+ photoList);
      // } else{
      //     imageList.push(URL.createObjectURL(imagetarget));
      //     photoList.push(URL.createObjectURL(imagetarget));
      //     console.log("else imageList:"+ JSON.stringify(imageList));
      //     console.log("else photoList:"+ photoList);
      // }
      setImageFile(imageList);
      setPhotoToAddList(photoList);
      // setChangeImageArray(changeImageList);
    }
    // console.log("artIdArray[index]:" + changeImageList);
    console.log("imageFile:" + imageList);
    console.log("photoToAddList:" + photoList);
  };

  const handleImageRemove = (e: any) => {
    let index = Number(e.target.id);
    let imageList: any = [...imageFile];
    let photoList: any = [...photoToAddList];
    // let changeImageList: any = [...changeImageArray];

    if (imageList[index]) {
      if (mainImgUrl === photoList[index]) {
        setMainImgUrl(photoList[0]);
      }
      imageList.splice(index, 1);
      photoList.splice(index, 1);
      //중복체크 후 푸시
      // if (!changeImageList.includes(artIdArray[index])) {
      //   changeImageList.push(artIdArray[index]);
      // }
      setImageFile(imageList);
      setPhotoToAddList(photoList);
      // setChangeImageArray(changeImageList);
    }
    // console.log("artIdArray[index]:" + changeImageList);
    console.log("imageFile:" + imageList);
    console.log("photoToAddList:" + photoList);
  };

  const handleClickFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubImageClick = (galleryDetailData: any) => {
    if (galleryDetailData) {
      setMainImgUrl(galleryDetailData);
    }
  };

  return (
    <Wrapper>
      {pageLoading && (
        <RefDiv loading={pageLoading}>
          <LoadingImg src={delaybar}></LoadingImg>
        </RefDiv>
      )}
      {/* 이미지 정보 */}
      <ImageDetailDiv>
        <TitleContainer>
          <TitleBar></TitleBar>
          <MainTitle>ART</MainTitle>
        </TitleContainer>
        {/* 작품 상세 정보 */}
        <DescriptionDiv>
          {/* 작가정보 */}
          <WriterDiv>
            <ProfileContainer>
              <WriterProfile
                src={
                  // galleryDetailData && galleryDetailData?.data.profileUrl
                  user.profileUrl
                  // ""
                }
              ></WriterProfile>
            </ProfileContainer>
            <WriterInfoDiv>
              <UserNameContainer>
                <WriterName>
                  {/* 박서보 */}
                  {/* {galleryDetailData && galleryDetailData?.data.artistName} */}
                  {user.nickname}
                  <StarImg src={star}></StarImg>
                </WriterName>
              </UserNameContainer>
              <SnsName>
                @artista
                {/* {galleryDetailData && galleryDetailData?.data.artistInstaAddr} */}
              </SnsName>
            </WriterInfoDiv>
          </WriterDiv>

          {/* 작품 정보 */}
          <ArtInfoContainer>
            <CategoryContainer>
              <GalleryDetailCategoryList
                categoryListData={categoryListData}
                categoryName={
                  galleryDetailData && galleryDetailData?.data.categoryName
                }
                setCateType={setCategoryType}
              ></GalleryDetailCategoryList>
            </CategoryContainer>
            <ArtTitle
              type="text"
              placeholder="작품명을 입력해주세요."
              onChange={(e: any) => {
                setArtTitle(e.target.value);
              }}
              value={artTitle}
            ></ArtTitle>
            <Line></Line>
            {/* 작품상세글 */}
            <ArtDscription
              value={artDscription}
              onChange={(e: any) => {
                setArtDscription(e.target.value);
              }}
              placeholder="작품의 소개를 입력해주세요."
            ></ArtDscription>
          </ArtInfoContainer>

          {/* 수정 삭제 활성/비활성 */}
          <UpdateDeleteContainer>
            <CUDButton type="button" onClick={handleSavePost}>
              완료
            </CUDButton>
            <CUDButton type="button" onClick={handleCancel}>
              취소
            </CUDButton>
          </UpdateDeleteContainer>
        </DescriptionDiv>

        {/* 이미지 */}
        <ImageDiv>
          <MainImageDiv>
            <MainImage
              src={
                mainImgUrl ? mainImgUrl : photoToAddList && photoToAddList[0]
              }
            ></MainImage>
          </MainImageDiv>
          {/* 서브 이미지 3개 */}
          <SubImageContainer>
            <SubImageDiv>
              <FileInput
                type="file"
                accept="image/jpg, image/jpeg, image/png, image/gif"
                ref={fileInputRef}
                name="0"
                id="fileInput0"
                onChange={handleImageChange}
                src={photoToAddList && photoToAddList[0]}
              ></FileInput>
              <CustomLabelContainer>
                <CustomLabel htmlFor="fileInput0">
                  <FileAddImg src={plus}></FileAddImg>
                </CustomLabel>
                <CustomLabel>
                  <FileAddImg
                    id="0"
                    src={minus}
                    onClick={handleImageRemove}
                  ></FileAddImg>
                </CustomLabel>
              </CustomLabelContainer>
              <SubImage
                src={photoToAddList && photoToAddList[0]}
                onClick={() => handleSubImageClick(photoToAddList[0])}
              ></SubImage>
            </SubImageDiv>
            <SubImageDiv>
              <FileInput
                type="file"
                accept="image/jpg, image/jpeg, image/png, image/gif"
                ref={fileInputRef}
                name="1"
                id="fileInput1"
                onChange={handleImageChange}
                src={photoToAddList && photoToAddList[1]}
              ></FileInput>
              <CustomLabelContainer>
                <CustomLabel htmlFor="fileInput1">
                  <FileAddImg src={plus}></FileAddImg>
                </CustomLabel>
                <CustomLabel>
                  <FileAddImg
                    id="1"
                    src={minus}
                    onClick={handleImageRemove}
                  ></FileAddImg>
                </CustomLabel>
              </CustomLabelContainer>
              <SubImage
                src={photoToAddList && photoToAddList[1]}
                onClick={() => handleSubImageClick(photoToAddList[1])}
              ></SubImage>
            </SubImageDiv>
            <SubImageDiv>
              <FileInput
                type="file"
                accept="image/jpg, image/jpeg, image/png, image/gif"
                ref={fileInputRef}
                name="2"
                id="fileInput2"
                onChange={handleImageChange}
                src={photoToAddList && photoToAddList[2]}
              ></FileInput>
              <CustomLabelContainer>
                <CustomLabel htmlFor="fileInput2">
                  <FileAddImg src={plus}></FileAddImg>
                </CustomLabel>
                <CustomLabel>
                  <FileAddImg
                    id="2"
                    src={minus}
                    onClick={handleImageRemove}
                  ></FileAddImg>
                </CustomLabel>
              </CustomLabelContainer>
              <SubImage
                src={photoToAddList && photoToAddList[2]}
                onClick={() => handleSubImageClick(photoToAddList[2])}
              ></SubImage>
            </SubImageDiv>
          </SubImageContainer>
        </ImageDiv>
      </ImageDetailDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const RefDiv = styled.div<{ loading: any }>`
  display: ${(props) => (!props.loading ? "none" : "flex")};
  position: ${(props) => (!props.loading ? "none" : "absolute")};
  align-items: center;
  justify-content: center;
  width: 100%;
  bottom: 0%;
  height: 100%;
  background-color: rgba(14, 14, 14, 0.75);
  z-index: 10000;
`;

const LoadingImg = styled.img`
  display: flex;
  width: 30%;
  height: 30%;
  object-fit: contain;
`;

const ImageDetailDiv = styled.div`
  background-color: #000407;
  width: 100%;
  height: 93vh;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 50px;
`;

const ImageDiv = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
`;

const MainImageDiv = styled.div`
  /* width: ${widthPercentage(852)}vw; */
  width: 34.2vw;
  height: 65vh;
  /* height: ${widthPercentage(852)}vw; */
  border: 1px solid #b09464;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
  /* object-fit: cover; */
  pointer-events: none;
`;

const SubImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  height: 65vh;
  gap: 15px;
  margin-left: 20px;
`;

const SubImageDiv = styled.div`
  width: 10.5vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #b09464;
  overflow: hidden;
  position: relative;
  cursor: pointer;
`;

const FileInput = styled.input<{ src: any }>`
  display: none;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const SubImage = styled.div<{ src: any }>`
  position: absolute;
  background-image: url(${({ src }) => src});
  background-size: repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  cursor: pointer;
  object-fit: fill;
  z-index: 8;
  /* display : ${(props) => (props.src ? "flex" : "none")}; */
`;

const CustomLabel = styled.label`
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const FileAddImg = styled.img`
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 10;
  object-fit: contain;
  border: none;
`;

const CustomLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 25px;
`;

const DescriptionDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 33%;
  height: 65vh;
`;

const UpdateDeleteContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  gap: 15px;
`;

const CUDButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #b09464;
  background-color: transparent;
  font-size: 1.2em;
  font-weight: 400;
  width: 100%;
  height: 45px;
  color: #b09464;
  cursor: pointer;

  &:hover {
    font-weight: 600;
  }
`;

const ArtInfoContainer = styled.div`
  margin-top: 65px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  position: relative;
`;

const CategoryContainer = styled.div`
  display: flex;
  position: absolute;
  z-index: 10;
  right: 0px;
  top: -1.7vh;
`;

const ArtTitle = styled.input`
  display: flex;
  background-color: transparent;
  border: none;
  font-size: 1.2em;
  font-weight: 600;
  color: #ffffff;
  padding-left: 2vh;
  outline: none;

  &::placeholder {
    color: #747474;
    font-size: 0.8em;
    font-weight: 600;
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

const ArtDscription = styled.textarea`
  display: flex;
  width: 100%-20px;
  max-height: 30vh;
  overflow: visible auto;
  font-size: 1.48em;
  font-weight: 400;
  border: none;
  padding-left: 2vh;
  display: flex;
  white-space: normal;
  resize: none;
  color: #ffffff;
  background-color: transparent;
  padding-top: 0px;
  outline: none;
  &::placeholder {
    color: #747474;
    font-size: 0.8em;
    font-weight: 400;
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

const WriterDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 65px;
`;

const WriterName = styled.span`
  display: flex;
  flex-direction: row;
  font-size: 2.5em;
  font-weight: 600;
  color: #ffffff;
`;

const SnsName = styled.div`
  font-size: 1.2em;
  font-weight: 200;
  color: #ffffff;
  margin-top: 0px;
`;

const WriterProfile = styled.div<{ src: any }>`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 100%;
  background: url(${({ src }) => src});
  background-repeat: repeat;
  background-size: 100% 100%;
`;

const WriterInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 40px;
`;

const ProfileContainer = styled.div`
  display: flex;
  width: 170px;
  height: 170px;
  &::after {
    content: "";
    padding-bottom: 100%;
  }
`;

const UserNameContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StarImg = styled.img`
  display: flex;
  width: 33px;
  height: 33px;
  margin: 5px 10px 0 10px;
  object-fit: fill;
`;

const TitleContainer = styled.div`
  position: absolute;
  top: 7%;
  left: 3.5%;
`;

const TitleBar = styled.div`
  width: 160px;
  height: 1.5px;
  background-color: #b09464;
  margin-bottom: 10px;
`;

const MainTitle = styled.div`
  font-size: 1.5em;
  text-align: start;
  font-weight: 400;
  line-height: 26px;
  color: #b09464;
`;

const Line = styled.div`
  display: flex;
  width: 100%;
  height: 1px;
  background-color: #b09464;
  margin: 10px 0 10px 0;
`;

export default ArtEdit;
