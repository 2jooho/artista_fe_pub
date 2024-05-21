import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import { getGallary } from "../mock/main_data";
import CollectionInfiniteScroll from "../components/CollectionInfiniteScroll";
import { getCollectionCategoryList } from "../mock/main_data";
import { heightPercentage, widthPercentage } from "../constants/ResponsiveSize";
import { useQuery, useMutation } from "@tanstack/react-query";
import { collectionInfo } from "../api/collection/collection";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import plus from "../assets/icons/use/18plus.png";
import minus from "../assets/icons/use/19minus.png";
import star from "../assets/icons/use/06star.png";
import basicProfile from "../assets/img/myPage/profile-basic.png";
import { collectionEdit } from "../api/collection/collection";
import Resizer from "react-image-file-resizer";
import delaybar from "../assets/icons/use/delaybar.gif";

const CollectionEdit: React.FC = () => {
  const categoryList = getCollectionCategoryList();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("게시물");
  const [categoryType, setCategoryType] = useState("M");
  const [artistDescription, setArtistDescription]: any = useState("");
  const [profileImg, setProfileImg]: any = useState(null);
  const [profilePhoto, setProfilePhoto]: any = useState(null);
  const [backProfileImg, setBackProfileImg]: any = useState(null);
  const [backProfileImgPhoto, setBackProfileImgPhoto]: any = useState(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loding, setLoding] = useState(false);
  const s3Url = process.env.REACT_APP_S3_IMG_URL;

  const userId = useSelector((state: any) => {
    return state.user.userId ? state.user.userId : "artista";
  });
  const isStar = useSelector((state: any) => {
    return state.user.isStar;
  });
  const instaId = useSelector((state: any) => {
    return state.user.instaId;
  });

  const handleCategoryClick = (category: any) => {
    setActiveCategory(category.title);
    setCategoryType(category.type);
  };

  // 외부연동
  // axios
  const { data: collectionData } = useQuery(
    ["collectionInfo", userId],
    () => collectionInfo(userId),
    {
      refetchOnWindowFocus: false,
      retry: false,
      onSuccess: (res: any) => {
        setArtistDescription(res?.data.artistDescription);
        if (res?.data.profileImg) {
          setProfileImg(s3Url + res?.data.profileImg);
          setProfilePhoto(s3Url + res?.data.profileImg);
        }
        if (res?.data.backProfileImg) {
          setBackProfileImg(s3Url + res?.data.backProfileImg);
          setBackProfileImgPhoto(s3Url + res?.data.backProfileImg);
        }
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

  const collectionEditMtate: any = async (data: any) => mutate(data);
  const { mutate } = useMutation(
    ["collectionEdit"],
    (data) => collectionEdit(data),
    {
      retry: false,
      onSuccess: (res: any) => {
        setLoding(false);
        navigate("/Collection");
      },
      onError: (error: unknown) => {
        setLoding(false);
        if (error != null) {
          // alert(error);
          console.log(error);
        } else {
          alert("서비스 접속이 원활하지 않습니다. 잠시 후 다시 이용해주세요.");
        }
      },
    }
  );

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

  const handleBackProfileImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imagetarget = e.target.files && e.target.files[0];
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
        if (compressedFile && e.target.name === "backProfileInput") {
          setBackProfileImg(compressedFile);
          setBackProfileImgPhoto(URL.createObjectURL(compressedFile));
        } else if (compressedFile && e.target.name === "profileInput") {
          setProfileImg(compressedFile);
          setProfilePhoto(URL.createObjectURL(compressedFile));
        }
      } catch (err) {
        alert("사진을 불러올 수 없습니다.");
      }
    } 
  };

  const handleImageRemove = (e: any) => {
    if (e.target.id === "backProfileInput") {
      setBackProfileImg(null);
      setBackProfileImgPhoto(null);
    } else if (e.target.id === "profileInput") {
      setProfileImg(null);
      setProfilePhoto(null);
    }
  };

  const handleSaveClick = () => {
    const formData = new FormData();
    if (profileImg) {
      formData.append("profileImageFile", profileImg);
    }
    if (backProfileImg) {
      formData.append("backProfileImageFile", backProfileImg);
    }
    formData.append("userId", userId);
    formData.append("artistDescription", artistDescription);
    
    setLoding(true);
    collectionEditMtate(formData);
  };

  const handleCancleClick = () => {
    navigate(-1);
  };
  const handleInsertClick = () => {
    navigate("/ArtEdit", { state: "collection" });
  };

  return (
    <Wrapper>
      {loding && (
        <RefDiv loading={loding}>
        <LoadingImg src={delaybar}></LoadingImg>
        </RefDiv>
      )}
      {/* 상단 */}
      
      <TopContainer>
        <BackProfileContainer>
          <FileInput
            type="file"
            accept="image/jpg, image/jpeg, image/png, image/gif"
            ref={fileInputRef}
            name="backProfileInput"
            id="backFileInput"
            onChange={handleBackProfileImageChange}
            src={backProfileImgPhoto}
          ></FileInput>
          <CustomLabelContainer type={"back"}>
            <CustomLabel htmlFor="backFileInput">
              <FileAddImg src={plus}></FileAddImg>
            </CustomLabel>
            <CustomLabel>
              <FileAddImg
                id="backProfileInput"
                src={minus}
                onClick={handleImageRemove}
              ></FileAddImg>
            </CustomLabel>
          </CustomLabelContainer>
          <SubImage
            src={backProfileImgPhoto}
            profile={false}
            htmlFor="backFileInput"
          ></SubImage>

          <UserProfileWarrper>
            <UserMainProfileContainer>
              <FileInput
                type="file"
                accept="image/jpg, image/jpeg, image/png, image/gif"
                ref={fileInputRef}
                name="profileInput"
                id="profileFileInput"
                onChange={handleBackProfileImageChange}
                src={profilePhoto ? profilePhoto : basicProfile}
              ></FileInput>
              <CustomLabelContainer type={"profile"}>
                <CustomLabel htmlFor="profileFileInput">
                  <FileAddImg src={plus}></FileAddImg>
                </CustomLabel>
                <CustomLabel>
                  <FileAddImg
                    id="profileInput"
                    src={minus}
                    onClick={handleImageRemove}
                  ></FileAddImg>
                </CustomLabel>
              </CustomLabelContainer>
              <SubImage
                src={profilePhoto ? profilePhoto : basicProfile}
                profile={true}
                htmlFor="profileFileInput"
              ></SubImage>
            </UserMainProfileContainer>
          </UserProfileWarrper>
        </BackProfileContainer>

        {/* 유저 프로필 */}
        <UserProfileContainer>
          {/* 수정 삭제 활성/비활성 */}
          <UpdateDeleteContainer>
            {/* <Link to={`/CollectionEdit/${userId}`} key={2}> */}
            <CUDButton onClick={handleSaveClick}>확인</CUDButton>
            <CUDButton onClick={handleCancleClick}>취소</CUDButton>
            {/* </Link> */}
          </UpdateDeleteContainer>
          <UserInfoDiv>
            <UserNameContainer>
              <UserName>
                {collectionData && collectionData?.data.artistName}
              </UserName>
              {isStar ? <StarImg src={star}></StarImg> : null}
            </UserNameContainer>
            <UserDetail>{instaId ? instaId : "@artista"}</UserDetail>

            <UserSubInfoContainer>
              <UserSubInfo
                type="text"
                placeholder="소개 내용을 입력해주세요. (30)"
                onChange={(e: any) => {
                  setArtistDescription(e.target.value);
                }}
                value={artistDescription}
              ></UserSubInfo>
            </UserSubInfoContainer>

            <UserArtInfoContainer>
              <UserInfoSectionDiv>
                <UserInfoSection isCount={"true"}>
                  {collectionData && collectionData?.data.myArtCnt}
                </UserInfoSection>
                <UserInfoSectionSub isCount={"true"}>게시물</UserInfoSectionSub>
              </UserInfoSectionDiv>
              <UserInfoSectionDiv>
                <UserInfoSection isCount={"true"}>
                  {collectionData && collectionData?.data.likeArtCnt}
                </UserInfoSection>
                <UserInfoSectionSub isCount={"true"}>좋아요</UserInfoSectionSub>
              </UserInfoSectionDiv>
              <UserInfoSectionDiv>
                <UserInfoSection isCount={"true"}>
                  {collectionData && collectionData?.data.likeArtCnt}
                </UserInfoSection>
                <UserInfoSectionSub isCount={"true"}>찜</UserInfoSectionSub>
              </UserInfoSectionDiv>
              <UserInfoSectionDiv>
                <UserInfoSection
                  isCount={
                    collectionData?.data.makeArtCnt > 0 ? "true" : undefined
                  }
                >
                  -{/* {collectionData && collectionData?.data.makeArtCnt} */}
                </UserInfoSection>
                <UserInfoSectionSub
                  isCount={
                    collectionData?.data.makeArtCnt > 0 ? "true" : undefined
                  }
                >
                  제작
                </UserInfoSectionSub>
              </UserInfoSectionDiv>
              <UserInfoSectionDiv>
                <UserInfoSection
                  isCount={
                    collectionData?.data.returnRate > 0 ? "true" : undefined
                  }
                >
                  -{/* {collectionData && collectionData?.data.returnRate} */}
                </UserInfoSection>
                <UserInfoSectionSub
                  isCount={
                    collectionData?.data.returnRate > 0 ? "true" : undefined
                  }
                >
                  수익률
                </UserInfoSectionSub>
              </UserInfoSectionDiv>
            </UserArtInfoContainer>
          </UserInfoDiv>
        </UserProfileContainer>
      </TopContainer>

      <LowContainer>
        {/* 카테고리 */}
        <CategoryContainer>
          {categoryList.map((category: any, index: number) => (
            <CategorySection
              key={category.type}
              active={activeCategory === category.title}
              onClick={() => handleCategoryClick(category)}
            >
              {category.title}
            </CategorySection>
          ))}
          <BoardContainer>
            {categoryType === "M" ? (
              <CUDButton onClick={handleInsertClick}>등록</CUDButton>
            ) : null}
          </BoardContainer>
        </CategoryContainer>

        {/* 작품 */}
        <InfiniteDiv>
          {/* <BoardContainer>
            {categoryType === "M" ? (
              <CUDButton onClick={handleInsertClick}>등록</CUDButton>
            ) : null}
          </BoardContainer> */}
          <CollectionWrapper>
            <CollectionInfiniteScroll type={categoryType} />
          </CollectionWrapper>
        </InfiniteDiv>
      </LowContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const RefDiv = styled.div<{ loading: any }>`
  display: ${(props) => (!props.loading ? "none" : "flex")};;
  position: ${(props) => (!props.loading ? "none" : "absolute")};

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

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 93vh;
  position: relative;
  background-color: #0e0e0e;
`;

const BackProfileContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 45%;
  background-color: rgba(217, 217, 217, 0.5);
`;

const FileInput = styled.input<{ src: any }>`
  display: none;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const CustomLabelContainer = styled.div<{ type: any }>`
  display: flex;
  flex-direction: row;
  gap: 25px;
  position: absolute;
  z-index: 30;
  bottom: 50%;
  right: 50%;
  transform: translate(50%, 50%);

  ${(props) =>
    props.type === "back" &&
    css`
      right: 4.7%;
      bottom: 7%;
      transform: translate(0%, 0%);
    `}
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
  object-fit: contain;
  border: none;
`;

interface ImageProps {
  src: any;
  profile: any;
}
const SubImage = styled.label<ImageProps>`
  background-image: url(${({ src }) => src});
  background-size: repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 8;

  ${(props) =>
    props.profile &&
    css`
      border-radius: 100%;
    `}/* display : ${(props) => (props.src ? "flex" : "none")}; */
`;

const UpdateDeleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 3.5%;
  top: 7%;
  gap: 15px;
`;

const CUDButton = styled.button`
  width: 8vw;
  height: 45px;
  border: 1px solid #b09464;
  background-color: #0e0e0e;
  font-size: 1.2em;
  font-weight: 400;
  color: #b09464;
  cursor: pointer;
`;

const UserProfileWarrper = styled.div`
  display: flex;
  position: absolute;
  margin-bottom: -5.6%;
  z-index: 20;
`;

const UserMainProfileContainer = styled.div`
  display: flex;
  position: relative;
  width: 210px;
  height: 210px;
  border-radius: 100%;
  @media (max-width: 1200px) {
    width: 110px;
    height: 110px;
    top: 290px;
  }
`;

const UserInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 8%;
`;

const UserNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

const UserName = styled.div`
  display: flex;
  font-size: 2.5em;
  font-weight: 600;
  color: #ffffff;
`;

const StarImg = styled.img`
  display: flex;
  width: 33px;
  height: 33px;
  object-fit: fill;
  right: -45px;
  position: absolute;
`;

const UserDetail = styled.div`
  font-size: 1.2em;
  font-weight: 200;
  color: #ffffff;
  margin-top: 5px;
`;

const UserSubInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 22px;
`;

const UserSubInfo = styled.input`
  display: flex;
  background-color: transparent;
  text-align: center;
  color: #ffffff;
  font-size: 1.2em;
  font-weight: 400;
  border: none;
  outline: none;
  border-bottom: 1px solid #747474;
  padding-bottom: 6px;
  width: 100%;
  &::placeholder {
    color: #747474;
    font-size: 0.8em;
    font-weight: 400;
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

const UserInfoSectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface UserInfoProps {
  isCount: any;
}
const UserInfoSection = styled.div<UserInfoProps>`
  display: flex;
  font-size: 2em;
  font-weight: 600;
  color: ${(props) =>
    props.isCount === "true" ? "#ffffff" : "rgba(255, 255, 255, 0.5)"};
`;

const UserInfoSectionSub = styled.div<UserInfoProps>`
  display: flex;
  font-size: 1em;
  font-weight: 400;
  color: ${(props) =>
    props.isCount === "true" ? "#ffffff" : "rgba(255, 255, 255, 0.5)"};
`;

const UserArtInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 70px;
  margin-top: 43px;
`;

const UserProfileContainer = styled.div`
  display: flex;
  position: relative;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 55%;
`;

const LowContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #0e0e0e;
  border-top: 1px solid #b09464;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  gap: 35px;
  width: 100%;
  margin-top: 40px;
  /* height: 70px; */
  z-index: 1000;
  align-items: center;
  justify-content: center;
  background-color: #0e0e0e;
`;

const ArtCategoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 20%;
  height: 100%;
`;

const ArtCategoryContainer = styled.div`
  position: sticky;
  display: flex;
  flex-direction: column;
  top: 0;
  background-color: #ffffff;
  border: 1px solid #747474;
  border-radius: 14px;
  margin: 40px 0 0 0;
  width: auto;
  height: 100%;

  @media (max-width: 700px) {
  }
`;

const InfiniteDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #0e0e0e;
`;

const CollectionWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`;

interface CategoryProps {
  active: boolean;
}
const CategorySection = styled.div<CategoryProps>`
  display: flex;
  font-size: 1.2em;
  font-weight: 400;
  color: #b09464;
  align-items: center;
  justify-content: center;
  width: 9vw;
  height: 50px;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    border-top: 1.5px solid #b09464;
    font-weight: 600;
  }

  ${(props) =>
    props.active &&
    css`
      border-top: 1.5px solid #b09464;
      font-weight: 600;
    `}
`;

const ArtContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const BoardContainer = styled.div`
  display: flex;
  position: absolute;
  right: 3.5%;
  align-items: center;
  justify-content: center;
`;

export default CollectionEdit;
