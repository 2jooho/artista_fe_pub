import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { getGallary } from "../mock/main_data";
import CollectionInfiniteScroll from "../components/CollectionInfiniteScroll";
import { getCollectionCategoryList } from "../mock/main_data";
import { heightPercentage, widthPercentage } from "../constants/ResponsiveSize";
import { useQuery } from "@tanstack/react-query";
import { collectionInfo } from "../api/collection/collection";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import basicProfile from "../assets/img/myPage/profile-basic.png";
import star from "../assets/icons/use/06star.png";
import { openModal } from "../redux/modules/modalData";

const Collection: React.FC = () => {
  const categoryList = getCollectionCategoryList();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("게시물");
  const [categoryType, setCategoryType] = useState("M");
  const [profileImg, setProfileImg]: any = useState(basicProfile);
  const [backProfileImg, setBackProfileImg]: any = useState(null);
  const s3Url = process.env.REACT_APP_S3_IMG_URL;

  const dispatch = useDispatch();
  const handleModal = (content: string) => {
    dispatch(openModal(content));
  };

  const user = useSelector((state: any) => {
    return state.user;
  });

  useEffect(() => {
    if (!user.userId && user.userId == null) {
      handleModal("로그인이 필요한 서비스입니다. \n 로그인 해주세요");
      navigate("/LoginPage");
    }
  }, []);

  const handleCategoryClick = (category: any) => {
    setActiveCategory(category.title);
    setCategoryType(category.type);
  };

  // 외부연동
  // axios
  const { data: collectionData } = useQuery(
    ["collectionInfo", user.userId],
    () => collectionInfo(user.userId),
    {
      refetchOnWindowFocus: false,
      retry: false,
      onSuccess: (res: any) => {
        if (res.data.profileImg) {
          setProfileImg(s3Url + res.data.profileImg);
          console.log(s3Url + res.data.profileImg);
        }
        if (res.data.backProfileImg) {
          setBackProfileImg(s3Url + res.data.backProfileImg);
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

  const handleEditClick = () => {
    navigate("/CollectionEdit");
  };

  return (
    <Wrapper>
      {/* 상단 */}
      <TopContainer>
        <BackProfileImg src={backProfileImg}>
          <UserMainProfileImg src={profileImg}></UserMainProfileImg>
        </BackProfileImg>

        {/* 유저 프로필 */}
        <UserProfileContainer>
          {/* 수정 삭제 활성/비활성 */}
          <UpdateDeleteContainer>
            {/* <Link to={`/CollectionEdit/${userId}`} key={2}> */}
            <CUDButton onClick={handleEditClick}>
              편집
              {/* {collectionData && collectionData.artistDescription
                ? "편집"
                : "등록"} */}
            </CUDButton>
            {/* </Link> */}
          </UpdateDeleteContainer>

          <UserInfoDiv>
            <UserNameContainer>
              <UserName>
                {collectionData && collectionData?.data.artistName}
              </UserName>
              <StarImg src={star}></StarImg>
              {/* {isStar ? <StarImg src={star}></StarImg> : null} */}
            </UserNameContainer>
            <UserDetail>{"@" + user.instaId}</UserDetail>

            <UserSubInfoContainer>
              <UserSubInfo>
                {/* 한국말 테스트 테스트테스트테스트테스트테스트 */}
                {collectionData && collectionData?.data.artistDescription}
              </UserSubInfo>
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
              {/* <UserInfoSectionDiv>
                <UserInfoSection
                  isCount={collectionData?.data.starArtCnt > 0 ? "true" : "-"}
                >
                  {collectionData && collectionData?.data.starArtCnt}
                </UserInfoSection>
                <UserInfoSectionSub
                  isCount={collectionData?.data.starArtCnt > 0 ? "true" : "-"}
                >
                  스타
                </UserInfoSectionSub>
              </UserInfoSectionDiv> */}
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
        </CategoryContainer>

        {/* 작품 */}
        <InfiniteDiv>
          {/* <ArtCategoryWrapper> */}
          {/* <ArtCategoryContainer>
            {categoryList.map((category: any, index: number) => (
              <CategorySection
                key={index}
                active={activeCategory === category}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </CategorySection>
            ))}
          </ArtCategoryContainer> */}
          {/* </ArtCategoryWrapper> */}
          <CollectionWrapper>
            <CollectionInfiniteScroll type={categoryType} />
          </CollectionWrapper>
        </InfiniteDiv>
      </LowContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

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

const BackProfileImg = styled.div<{ src: any }>`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 45%;
  background: url(${({ src }) => src});
  background-color: rgba(217, 217, 217, 0.5);
  background-repeat: repeat;
  background-size: 100% 100%;
`;

const UpdateDeleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 3.5%;
  top: 7%;
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

const UserMainProfileImg = styled.div<{ src: any }>`
  display: flex;
  width: 210px;
  height: 210px;
  background: url(${({ src }) => src});
  background-repeat: repeat;
  background-size: 100% 100%;
  border-radius: 50%;
  margin-bottom: -5.6%;

  @media (max-width: 1200px) {
    width: 150px;
    height: 150px;
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
  /* margin-bottom: 5px; */
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
  margin-top: 22px;
`;

const UserSubInfo = styled.div`
  display: flex;
  color: #ffffff;
  font-size: 1.2em;
  font-weight: 400;
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
  /* position: sticky; */
  /* top: 0; */
  display: flex;
  flex-direction: row;
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
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
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

export default Collection;
