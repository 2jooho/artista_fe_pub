import React from "react";
import styled from "styled-components";
import VideoPlayer from "../components/VideoPlayer";
import InfiniteScroll from "../components/InfiniteScroll";
import { getGallary } from "../mock/main_data";
import { widthPercentage } from "../constants/ResponsiveSize";
import background from "../assets/img/background-gall.jpg";

const Collabor = () => {
  const imageUrl = getGallary();

  return (
    <Wrapper>
      {/* 동영상 */}
      <TopDiv src={background}>
        {/* <ContainerArt></ContainerArt> */}
        {/* <BackgroundOverlay src={`${collaboArt}`}></BackgroundOverlay> */}
        <ParentContainer>
          <TitleContainer>
            <TitleBar></TitleBar>
            <MainTitle>COLLAB</MainTitle>
          </TitleContainer>
          <VideoPlayer videoUrl="https://youtu.be/tXiDl_grTTU"></VideoPlayer>
        </ParentContainer>
      </TopDiv>

      {/* 무한 스크롤 */}
      <InfiniteDiv>
        <InfiniteScroll type={"collabo"} categoryId={""} orderType={""} />
      </InfiniteDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #000407;
`;

const TopDiv = styled.div<{ src: any }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 93vh;
  overflow: hidden;
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
      rgba(0, 4, 7, 0.92) 1%,
      rgba(0, 0, 0, 0),
      rgba(0, 4, 7, 0.92) 99%
    ),
    url(${({ src }) => src});
  background-size: repeat;
  background-size: 100% 100%;
  filter: blur(7px); /* Adjust the blur effect as needed */
  z-index: -1;
`;

const ParentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: rgba(0, 4, 7, 0.72); */
  width: 100%;
  height: 100%;
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

const InfiniteDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  background-color: #000407;
  width: 100%;
`;

export default Collabor;
