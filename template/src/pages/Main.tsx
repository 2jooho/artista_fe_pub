import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import ImageSlider from "../components/ImageSlider";
import { getImage } from "../mock/main_data";
import Gallery from "../components/Gallery";
// import PChart from "../components/PChart";
import backgroundImg from "../assets/img/main/mainBack.jpg";
import mainFrame from "../assets/img/main/mainFrame.png";
// import testImg from "../assets/img/main/test.jpeg";
import { useQuery } from "@tanstack/react-query";
import { main } from "../api/auth/auth";
import { heightPercentage } from "../constants/ResponsiveSize";
import aboutBack from "../assets/img/main/aboutBack.gif";
import { useSelector } from "react-redux";
import delaybar from "../assets/icons/use/delaybar.gif";

const Main = () => {
  const [showText, setShowText] = useState(false);
  // const [pageLoading, setPageLoading] = useState(true);
  // const [btmShowText, setBtmShowText] = useState(false);

  // const userData = useSelector((state: any) => {
  //   return state.user;
  // });

  // useEffect(() => {
  //   console.log("userData:" + userData);

  //   const timer = setTimeout(() => {
  //     setShowText(true);
  //   }, 1500);

  //   const timer2 = setTimeout(() => {
  //     setBtmShowText(true);
  //   }, 3000);

  //   return () => {
  //     clearTimeout(timer);
  //     clearTimeout(timer2);
  //   };
  // }, []);

  // 외부연동
  // axios
  const { data: mainInfo } = useQuery(["main"], () => main(), {
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
  });

  return (
    <Wrapper>
      {/* {pageLoading ? (
        <LoadingDiv>
          <LoadingImg src={delaybar}></LoadingImg>
          </LoadingDiv>
      ):( */}
      <>
        {/* 상단 이미지 */}
        <BackImgContainer src={`${backgroundImg}`}>
          <MainFrame src={`${mainFrame}`}>
            <BestImg
              src={
                // `${testImg}`
                mainInfo?.data.mainImgUrl
              }
            ></BestImg>
          </MainFrame>

          {/* <TitleContainer>
            <TopTitle show={showText}>
              SHOW ME YOUR <JpgTitle>&nbsp;.JPG</JpgTitle>
            </TopTitle>
            <BtmTitle btmShow={btmShowText}>너의 그림을 보여줘</BtmTitle>
          </TitleContainer> */}
        </BackImgContainer>
        {/* <ImageSlider images={images} /> */}

        {/* About 공간 */}
        <AboutDiv src={`${aboutBack}`}>
          <TopLine></TopLine>
          {/* <TitleText>About</TitleText> */}
          {/* <AboutTextDiv> */}
          <LengthLine></LengthLine>
          <JpgContainer>
            <TopTitle show={showText}>SHOW ME YOUR</TopTitle>
            <JpgTitle>.JPG</JpgTitle>
          </JpgContainer>
          <SubAboutTextContianer>
            <AboutText>
              <TextBold>' 아르티스타 '&nbsp;</TextBold>
              예술의 별 마당 방문을 환영합니다.
            </AboutText>
            <AboutText>
              <TextBold>작가님</TextBold>의&nbsp;<TextBold>작품</TextBold>을
              보여주세요.
            </AboutText>
          </SubAboutTextContianer>
        </AboutDiv>

        {/* 가이드라인 */}
        {/* <GuideDiv>
          <TitleText>Guide</TitleText>
          <GuideImgDiv>
            <GuideImg
              src={
              }
            ></GuideImg>
          </GuideImgDiv>
        </GuideDiv> */}

        {/* 갤러리 공간 */}
        {/* <GallaryDiv>
          <TitleText>Gallery</TitleText>
          <Gallery galleryDtoList = {mainInfo?.data.mainPopularArt}/>
        </GallaryDiv> */}
      </>
      {/* )} */}
    </Wrapper>
  );
};

const Container = styled.div``;

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

const BackImgContainer = styled.div<{ src: any }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${({ src }) => src});
  background-repeat: repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 93vh;
`;

const JpgContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0 0 20px 58px;
  margin-top: -3%;
`;

const TopTitle = styled.div<{ show: any }>`
  font-size: 3em;
  font-weight: 400;
  color: #ffffff;
  display: flex;
  margin-top: 40px;
  /* opacity: ${(props) => (props.show ? "1" : "0")};
  transition: opacity 1.5s ease-in-out; */

  /* @media (max-width: 1500px) {
    font-size: 33px;
  }
  @media (max-width: 1200px) {
    left: 33%;
    top: 75%;
    font-size: 15px;
  } */
`;
const JpgTitle = styled.div`
  display: flex;
  margin: 35px 0 0 15px;
  font-size: 8em;
  font-weight: 600;
  color: #ffffff;
  display: flex;

  /* @media (max-width: 1500px) {
    font-size: 33px;
  }
  @media (max-width: 1200px) {
    font-size: 15px; */
  /* } */
`;

const MainFrame = styled.div<{ src: any }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10vh;
  width: 17%;
  height: 45%;
  background: url(${({ src }) => src});
  background-repeat: repeat;
  background-size: 100% 100%;
  padding: 3.5vh 1.7% 3.2vh 1.7%;
  box-shadow: 0 18px 15px 12px rgba(0, 0, 0, 0.55);
  /* padding: 3.6vh 1.6vw 3.1vh 1.6vw; */
`;

const BestImg = styled.img<{ src: any }>`
  width: 100%;
  height: 100%;
  object-fit: fill;
  background-color: #ffffff;
`;

const AboutDiv = styled.div<{ src: any }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: url(${({ src }) => src});
  background-repeat: repeat;
  background-size: 100% 100%;
  position: relative;

  @media (max-width: 1000px) {
    height: 50vh;
  }
`;

const TopLine = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: ${heightPercentage(50)}%;
  background-color: #0f1c28;
`;

const LengthLine = styled.div`
  display: flex;
  width: 1.2px;
  height: ${heightPercentage(133)}%;
  background-color: #785f22;
  margin: -3% 0 3% 0;
  /* margin-top: 12.5%; */
`;

const SubAboutTextContianer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 7%;
`;

const AboutText = styled.span`
  display: flex;
  font-size: 1.2em;
  font-weight: 400;
  color: #b09464;
  line-height: 35.83px;
  text-align: center;
`;
const TextBold = styled.span`
  display: flex;
  font-weight: 600;
  color: #b09464;
  line-height: 35.83px;
`;

// const AboutTextEng = styled.span`
//   margin-top: 2vh;
//   font-size: 1.1vw;
//   color: #787272;
//   width: 55vw;
// `;

// const PieChartDiv = styled.div`
//   width: 100%;
//   height: 60%;
//   @media (max-width: 600px) {
//     height: 30%;
//   }
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   margin-top: 15px;
// `;

// const GuideDiv = styled.div`
//   width: 100%;
//   height: 70vh;
//   background-color: #f5f4f4;
// `;

// const GuideImgDiv = styled.div`
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const GuideImg = styled.img<{ src: any }>`
//   width: 75vw;
//   height: 50vh;
//   margin-top: 5vh;
//   background: url(${({ src }) => src});
// `;

// const TitleText = styled.div`
//   font-size: 30px;
//   color: rgb(24, 17, 67);
//   font-weight: 500;
//   margin-left: 3vw;
//   margin-bottom: 20px;
//   padding: 60px 0 10px 0;
//   color: #b09464;
//   width: 155px;
//   border-bottom: 1px solid #b09464;
// `;

// const GallaryDiv = styled.div`
//   width: 100%;
//   /* height: 89vh; */
//   height: 680px;
//   background-color: #000e1d;
// `;

// const BtmTitle = styled.div<{ btmShow: any }>`
//   font-size: 45px;
//   font-weight: 400;
//   color: #ffffff;
//   margin-left: 160px;
//   margin-top: 22.5px;
//   opacity: ${(props) => (props.btmShow ? "1" : "0")};
//   transition: opacity 1.5s ease-in-out;

//   @media (max-width: 1500px) {
//     font-size: 33px;
//   }
//   @media (max-width: 1200px) {
//     margin-left: 8px;
//     font-size: 15px;
//     margin-top: 10px;
//   }
// `;

// const TitleContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   position: absolute;
//   right: 15%;
//   top: 45%;
//   @media (max-width: 1200px) {
//     left: 50%;
//     top: 75%;
//     transform: translate(-50%, -50%);
//     width: 200px;
//     text-align: center;
//   }
// `;

export default Main;
