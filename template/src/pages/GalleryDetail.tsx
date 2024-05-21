import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getGallary } from "../mock/main_data";
import { useParams, useNavigate } from "react-router-dom";
import { heightPercentage, widthPercentage } from "../constants/ResponsiveSize";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { galleryDetailInfo } from "../api/gallery/gallery";
import { useDispatch, useSelector } from "react-redux";
import heart from "../assets/icons/use/08heart-red.png";
import heartLine from "../assets/icons/use/07heart-line-red.png";
import star from "../assets/icons/use/06star.png";
import { likeUpdate } from "../api/gallery/gallery";
import { openModal } from "../redux/modules/modalData";

const GalleryDetail: React.FC = () => {
  const queryClient = useQueryClient();
  const galleryImg = getGallary();
  const params = useParams();
  const artId = params.imageId;
  const navigate = useNavigate();
  const [isIdentification, setIsIdentification] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);
  const [mainImgUrl, setMainImgUrl] = useState("");

  const dispatch = useDispatch();
  const handleModal = (content: string) => {
    dispatch(openModal(content));
  };

  const user = useSelector((state: any) => {
    return state.user;
  });

  const handleEditClick = () => {
    navigate("/ArtEdit/" + artId);
  };

  const onClickDeleteChattingRoom = (e: any) => {
    e.preventDefault();

    alert("우클릭은 제한됩니다.");
  };

  useEffect(() => {
    queryClient.clear();
  }, []);

  // 외부연동
  // axios
  const { data: galleryDetailData } = useQuery(
    ["galleryDetailInfo", artId],
    () => galleryDetailInfo(artId),
    {
      refetchOnWindowFocus: false,
      retry: false,
      onSuccess: (res: any) => {
        if (res.data.artistName === user.nickname) {
          setIsIdentification(true);
        }
        // setIsLike(res.data.isLike);
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

  const fetchLike = async () => mutate();
  const { mutate } = useMutation(
    ["likeUpdate", user.userId, artId],
    () => likeUpdate(user.userId, artId, isLike),
    {
      retry: false,
      onSuccess: (res: any) => {
        queryClient.invalidateQueries(["likeUpdate"]);
      },
      // onError: (error: unknown) => errorHandler(error),
      onError: (error: unknown) => {
        if (error != null) {
          console.log("error:" + error);
        } else {
          console.log("error:" + error);
        }
      },
    }
  );

  const handleLikeClick = () => {
    if (!user.userId && user.userId == null) {
      handleModal("로그인이 필요한 서비스입니다. \n 로그인 해주세요");
      return;
    }
    setLikeCnt(!isLike ? likeCnt + 1 : likeCnt - 1);
    setIsLike(!isLike);
    fetchLike();
  };

  const handleSubImageClick = (galleryDetailData: any) => {
    if (galleryDetailData) {
      setMainImgUrl(galleryDetailData);
    }
  };

  return (
    <Wrapper>
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
                  galleryDetailData && galleryDetailData?.data.profileUrl
                  // ""
                }
              ></WriterProfile>
            </ProfileContainer>
            <WriterInfoDiv>
              <UserNameContainer>
                <WriterName>
                  박지훈
                  {/* JOOHO */}
                  {/* {galleryDetailData && galleryDetailData?.data.artistName} */}
                  <StarImg src={star}></StarImg>
                </WriterName>
              </UserNameContainer>
              <SnsName>
                @artista
                {/* {galleryDetailData && galleryDetailData?.data.artistInstaAddr} */}
              </SnsName>
            </WriterInfoDiv>
          </WriterDiv>

          <ArtInfoContainer>
            <ArtCategory>추상화</ArtCategory>
            <ArtTitle>
              아름다운그림
              {/* {galleryDetailData && galleryDetailData?.data.artName} */}
            </ArtTitle>
            <Line></Line>
            {/* 작품상세글 */}
            <ArtDscription>
              꽃,나무,동물 등 어우러진 아름다운 그림 입니다.
              {/* {galleryDetailData && galleryDetailData?.data.artDescription} */}
            </ArtDscription>
          </ArtInfoContainer>
          {/* <Line></Line> */}
          {/* <ViewsDiv>
            <Views>
              {galleryDetailData && galleryDetailData?.data.likeCnt} like
            </Views>
            <Category>
              {galleryDetailData && galleryDetailData?.data.categoryName}
            </Category>
          </ViewsDiv> */}

          {/* 수정 삭제 활성/비활성 */}
          {isIdentification ? (
            <UpdateDeleteContainer>
              <ArtInsertDate>2023-10-22</ArtInsertDate>
              <CUDButton onClick={handleEditClick}>편집</CUDButton>
              {/* <CUDButton>삭제</CUDButton> */}
            </UpdateDeleteContainer>
          ) : (
            <UserInfoLowContainer>
              <ArtInsertDate>2023-10-22</ArtInsertDate>
              <LikeContainer>
                <LikeWrapper>
                  <LikeImg
                    src={isLike ? heart : heartLine}
                    onClick={handleLikeClick}
                  ></LikeImg>
                  <LikeCount>
                    {likeCnt}
                    {/* 100 */}
                  </LikeCount>
                </LikeWrapper>
              </LikeContainer>
            </UserInfoLowContainer>
          )}
        </DescriptionDiv>

        {/* 이미지 */}
        <ImageDiv>
          <MainImageDiv
            onContextMenu={(e: any) => onClickDeleteChattingRoom(e)}
          >
            <MainImage
              src={
                mainImgUrl
                  ? mainImgUrl
                  : galleryDetailData?.data.galleryInfoDtoList[0].artUrl
              }
            ></MainImage>
          </MainImageDiv>
          {/* 서브 이미지 3개 */}
          <SubImageContainer>
            <SubImageDiv
              onClick={() =>
                handleSubImageClick(
                  galleryDetailData.data.galleryInfoDtoList[0]?.artUrl
                )
              }
            >
              <SubImage
                src={
                  galleryDetailData &&
                  galleryDetailData.data.galleryInfoDtoList[0]?.artUrl
                }
              ></SubImage>
            </SubImageDiv>
            <SubImageDiv
              onClick={() =>
                handleSubImageClick(
                  galleryDetailData.data.galleryInfoDtoList[1]?.artUrl
                )
              }
            >
              <SubImage
                src={
                  galleryDetailData &&
                  galleryDetailData.data.galleryInfoDtoList[1]?.artUrl
                }
              ></SubImage>
            </SubImageDiv>
            <SubImageDiv
              onClick={() =>
                handleSubImageClick(
                  galleryDetailData.data.galleryInfoDtoList[2]?.artUrl
                )
              }
            >
              <SubImage
                src={
                  galleryDetailData &&
                  galleryDetailData.data.galleryInfoDtoList[2]?.artUrl
                }
              ></SubImage>
            </SubImageDiv>

            {/* {galleryDetailData &&
              galleryDetailData.data.galleryInfoDtoList?.map(
                (data: any, index: number) => (
                  <>
                    <SubImageDiv>
                      <SubImage src={data && data?.artUrl}></SubImage>
                    </SubImageDiv>
                  </>
                )
              )} */}
          </SubImageContainer>
        </ImageDiv>
      </ImageDetailDiv>

      {/* 이미지 추천 5개 */}
      <ImageRecommandDiv>
        <TitleContainer>
          <TitleBar></TitleBar>
          <MainTitle>RECOMMEND</MainTitle>
        </TitleContainer>
        <RecommandDiv>
          <RecommandImgDiv src={galleryImg[6]}></RecommandImgDiv>
          <RecommandImgDiv src={galleryImg[0]}></RecommandImgDiv>
          <RecommandImgDiv src={galleryImg[3]}></RecommandImgDiv>
          <RecommandImgDiv src={galleryImg[4]}></RecommandImgDiv>
          <RecommandImgDiv src={galleryImg[5]}></RecommandImgDiv>
        </RecommandDiv>
      </ImageRecommandDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

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
  /* width: 50%;
  height: 100%; */
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
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #b09464;
`;

const SubImage = styled.img`
  width: 100%;
  height: 100%;
  filter: brightness(50%);
  object-fit: fill;
  cursor: pointer;
  display: ${(props) => (props.src ? "flex" : "none")};
  &:hover {
    filter: brightness(100%);
  }
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
`;

const UserInfoLowContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const ArtInsertDate = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: flex-start;
  font-size: 1em;
  font-weight: 400;
  color: #747474;
`;

const LikeContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
  gap: 10px;
`;

const LikeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const LikeImg = styled.div<{ src: any }>`
  display: flex;
  width: 33px;
  height: 33px;
  background: url(${({ src }) => src});
  background-repeat: repeat;
  background-size: 100% 100%;
  cursor: pointer;
`;

const LikeCount = styled.div`
  display: flex;
  color: #ff4633;
  font-size: 1.2em;
  font-weight: 400;
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

const ArtCategory = styled.div`
  display: flex;
  position: absolute;
  z-index: 10;
  right: 0px;
  top: 1.5vh;
  font-size: 1.2em;
  font-weight: 400;
  line-height: 36.31%;
  color: #b09464;
`;

const ArtTitle = styled.div`
  display: flex;
  font-size: 1.2em;
  font-weight: 600;
  color: #ffffff;
  padding-left: 2vh;
  border: none;
`;

const ViewsDiv = styled.div`
  width: 90%;
  height: 25px;
  margin: 0 0 0 5vh;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: flex-end;
`;

const Views = styled.div`
  font-size: 28px;
  font-weight: 700;
  line-height: 39.94%;
  text-align: center;
  color: #ffffff;
  margin-right: 25px;
`;

const Category = styled.div`
  font-size: 28px;
  font-weight: 700;
  line-height: 39.94%;
  text-align: center;
  color: #ffffff;
`;

const Line = styled.div`
  display: flex;
  width: 100%;
  height: 1px;
  background-color: #b09464;
  margin: 10px 0 10px 0;
`;

const ArtDscription = styled.div`
  width: 100%-20px;
  max-height: 30vh;
  overflow: visible auto;
  font-size: 1.2em;
  font-weight: 400;
  border: none;
  padding-top: 0px;
  padding-left: 2vh;
  display: flex;
  white-space: normal;
  color: #ffffff;
  padding-top: 0px;
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

const ArtistDiv = styled.div`
  margin: 10px 0 0 10px;
  font-size: 30px;
  font-weight: 700;
  line-height: 30.15px;
  color: #dfd6a6;
  text-align: center;
`;

const SnsName = styled.div`
  font-size: 1.2em;
  font-weight: 200;
  color: #ffffff;
  margin-top: 0px;
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

const UserArtInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  gap: 40px;
`;

const UserInfoSectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UserInfoSection = styled.div`
  font-size: 50px;
  font-weight: 700;
  line-height: 60.51px;
  color: #ffffff;
`;

const UserInfoSectionSub = styled.div`
  font-size: 25px;
  font-weight: 600;
  line-height: 30.26px;
  color: #ffffff;
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

const ImageRecommandDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  border-top: outset;
  display: flex;
  flex-direction: column;
  border-width: 1px;
  background-color: #000407;
  border-color: #b09464;
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

const RecommandDiv = styled.div`
  width: 90%;
  height: 100%;
  gap: 55px;
  align-self: center;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const RecommandImgDiv = styled.div<{ src: any }>`
  width: ${widthPercentage(340)}vw;
  height: ${widthPercentage(340)}vw;
  background-color: #6b6b6b;
  background: url(${({ src }) => src});
  background-repeat: repeat;
  background-size: 100% 100%;
  cursor: pointer;
`;

export default GalleryDetail;
