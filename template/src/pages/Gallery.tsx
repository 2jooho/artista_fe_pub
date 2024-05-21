import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GalleryItem from "../components/GalleryItem";
import { getOrderCategory } from "../mock/main_data";
import InfiniteScroll from "../components/InfiniteScroll";
import CategoryList from "../components/CategoryList";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { galleryBestInfo, categoryList } from "../api/gallery/gallery";
import { useNavigate } from "react-router-dom";
import background from "../assets/img/background-gall.jpg";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../redux/modules/modalData";
import { userInfo } from "os";
import delaybar from "../assets/icons/use/delaybar.gif";

const Gallery = () => {
  const orderCategoryList = getOrderCategory();
  const navigate = useNavigate();
  const [categoryListData, setCategoryListData] = useState([]);
  const [categoryType, setCategoryType] = useState<string>("1");
  const [orderCategoryType, setOrderCategoryType] = useState<string>("R"); //추천순:R, 인기순:P, 날짜순:D
  // const [pageLoading, setPageLoading] = useState(true);

  const dispatch = useDispatch();
  const handleModal = (content: string) => {
    dispatch(openModal(content));
  };

  const user = useSelector((state: any) => {
    return state.user;
  });

  // 외부연동
  // axios
  const { data: galleryBestData } = useQuery(
    ["galleryBestInfo"],
    () => galleryBestInfo(),
    {
      refetchOnWindowFocus: false,
      retry: false,
      onSuccess: (res: any) => {
        // alert(res.data.mainImgUrl);
        // setPageLoading(false);
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

  // 외부연동
  // axios
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

  const handleCreate = () => {
    if (!user.userId && user.userId == null) {
      handleModal("로그인이 필요한 서비스입니다. \n 로그인 해주세요");
      return;
    }
    navigate("/ArtEdit");
  };

  return (
    <Wrapper>
      {/* {pageLoading ? (
        <LoadingDiv>
          <LoadingImg src={delaybar}></LoadingImg>
          </LoadingDiv>
      ):( */}
      <>
        {/* 이달의 best */}
        <TopDiv src={background}>
          <TitleContainer>
            <TitleBar></TitleBar>
            <MainTitle>GALLERY</MainTitle>
          </TitleContainer>
          {/* <ContainerArt></ContainerArt> */}
          {/* <BackgroundOverlay src={`${galleryArt}`}></BackgroundOverlay> */}
          <ParentContainer>
            <GalleryWarrper>
              <GalleryContainer>
                {galleryBestData?.data.popularArtList.map(
                  (artList: any, index: any) => (
                    <Link to={`/GalleryDetail/${artList?.artId}`} key={index}>
                      <GalleryItem
                        key={index}
                        imageUrl={artList?.artUrl}
                        type={"gallery"}
                      />
                    </Link>
                  )
                )}
              </GalleryContainer>
            </GalleryWarrper>
          </ParentContainer>
        </TopDiv>

        {/* 하단 */}
        <LowDiv>
          <MenuContainer>
            <LowContainer>
              <CategoryList
                categoryListData={categoryListData}
                type="gallery"
                setCateType={setCategoryType}
              ></CategoryList>
              <CategoryList
                categoryListData={orderCategoryList}
                type="order"
                setCateType={setOrderCategoryType}
              ></CategoryList>
              <ArtCreateButton onClick={handleCreate}>등록</ArtCreateButton>
            </LowContainer>
          </MenuContainer>
          <InfiniteDiv>
            <InfiniteScroll
              type={"gallery"}
              categoryId={categoryType}
              orderType={orderCategoryType}
            />
          </InfiniteDiv>
        </LowDiv>
      </>
      {/* )} */}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const LoadingDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #0000009b;
`;

const LoadingImg = styled.img`
  display: flex;
  width: 30%;
  height: 30%;
  object-fit: contain;
  align-items: center;
  justify-content: center;
`;

const TopDiv = styled.div<{ src: any }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 93vh;
  width: 100%;
  border-bottom: 1px solid #b09464;
  background-image: url(${({ src }) => src});
  background-size: repeat;
  background-size: 100% 100%;
`;

const ContainerArt = styled.div`
  position: absolute;
  z-index: -3;
  background-color: rgb(0, 4, 7);
  width: 100%;
  height: 100%;
`;

const BackgroundOverlay = styled.div<{ src: any }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background-image: linear-gradient(
      90deg,
      rgba(0, 4, 7, 0.97) 1%,
      rgba(0, 0, 0, 0),
      rgba(0, 4, 7, 0.95) 99%
    ),
    url(${({ src }) => src});
  background-size: repeat;
  background-size: 100% 100%;
  filter: blur(7px); /* Adjust the blur effect as needed */
  z-index: -1;
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

const ListTitle = styled.div`
  font-size: 2.5rem;
  margin: 60px 45px 15px;
  color: rgb(24, 17, 67);
`;

const LowDiv = styled.div`
  display: flex;
  position: relative;
  background-color: #000407;
  height: 100%;
`;

const InfiniteDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ParentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  width: 70%;
`;

const GalleryWarrper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;
  width: 100%;
`;

const LowContainer = styled.div`
  display: flex;
  position: absolute;
  position: sticky;
  top: 7%;
  left: 3.5%;
  gap: 15px;
  flex-direction: column;
  z-index: 100;
  width: 7.5vw;
`;

const MenuContainer = styled.div`
  display: flex;
  position: sticky;
  position: absolute;
  flex-direction: column;
  top: 7%;
  left: 3.5%;
  width: 7.5vw;
  height: 100%;
`;

const ArtCreateButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 45px;
  font-size: 1.2em;
  font-weight: 400;
  color: #b09464;
  background-color: transparent;
  border: 1px solid #b09464;
  cursor: pointer;

  &:hover {
  }
`;

export default Gallery;
