import React from "react";
import styled from "styled-components";
import { widthPercentage } from "../constants/ResponsiveSize";
import background from "../assets/img/background-gall.jpg";

const About = () => {
  return (
    <Wrapper>
      <TopDiv>
        {/* <ContainerArt></ContainerArt> */}
        {/* <BackgroundOverlay src={`${galleryArt}`}></BackgroundOverlay> */}
        <ParentContainer src={background}>
          <TitleContainer>
            <TitleBar></TitleBar>
            <MainTitle>ABOUT</MainTitle>
          </TitleContainer>
          <ContentContainer>
            <TopMainTitle>
              세상의 모든 시각을 예술로 <br></br>
            </TopMainTitle>
            <TopSubTitle>
              아르티스타는 특별한 디자이너 플랫폼으로 <br></br>
              누구나 아티스타가 되어 작품을 소개할 수 있습니다. <br></br>
              <br></br>
              당신의 시각을 예술로 만드는 아이테크(Eye-Tech)로 <br></br>
              다양한 수익을 발생시키는 아트테크(Art-Tech)를 실현합니다.
            </TopSubTitle>
          </ContentContainer>
        </ParentContainer>
      </TopDiv>
      <LowDiv>
        <LowContentContainer>
          <LowMainTitle>01. 아르티스타 란</LowMainTitle>
          <LowSubTitle>
            각 분야의 전문가, 국내외 갤러리, 국내 최초 AI디자이너협회와 협업하여
            당신의 예술적 가치를 빛나게 합니다.<br></br>
            아르티스타에선 누구나 스타디자이너가 될 수 있습니다.
          </LowSubTitle>
        </LowContentContainer>
        <LowContentContainer>
          <LowMainTitle>02. 수익창출의 아름다움</LowMainTitle>
          <LowSubTitle>
            아르티스타는 개인과 기업과의 콜라보레이션을 통하여 원작 고유의
            아름다움에 아르티스타만의 터치로 새롭고 창의적인 방법으로 표현하여
            수익창출의 기회를 제공합니다.<br></br>
            작가들이 창작활동에 집중할 수 있도록 홍보와 판매 등의 관련 서비스를
            지원합니다.
          </LowSubTitle>
        </LowContentContainer>
        <LowContentContainer>
          <LowMainTitle>03. 예술의 대중화</LowMainTitle>
          <LowSubTitle>
            예술을 통해 더 나은 세상을 만들기 위해 아르티스타는 미술과 경제의
            통합을 통해 예술의 가치와 중요성을 알리고 대중화를 실현하고
            있습니다. 누구나 예술의 세계에 도전하고 새로운 문화의 지평을 여는
            주인공이 될 수 있습니다.
          </LowSubTitle>
        </LowContentContainer>
      </LowDiv>

      {/* <MainTitle>Artistar</MainTitle>
      <MainSmallTitle>
        아르티스타는 누구나 디자이너가 될 수 있도록 도움을 주는 플랫폼 입니다.
      </MainSmallTitle> */}

      {/* 첫번째 소개 */}
      {/* <TopDiv>
        <ImgDiv>
          <BigImg src=""></BigImg>
        </ImgDiv>
        <InLineDiv>
          <InLineTitle>Artistar 란</InLineTitle>
          <InLineContent>
            당신의 그림에 가치를 부여하여 수익을 창출 할 수 있도록 도움을
            드리겠습니다.
          </InLineContent>
          <InLineEngContent>
            Help you value your paintings and generate revenue I'll give it to
            you.
          </InLineEngContent>
        </InLineDiv>

        <InLineLocationDiv>
          <LineNum>01</LineNum>
          <LineDiv></LineDiv>
          <LineTitle>Artistar</LineTitle>
        </InLineLocationDiv>
      </TopDiv> */}

      {/* 두번째 소개 */}
      {/* <MidDiv>
        <InLineLocationDiv>
          <LineNum style={{ color: "rgb(70, 70, 70)" }}>02</LineNum>
          <LineDiv style={{ backgroundColor: "rgb(70, 70, 70)" }}></LineDiv>
          <LineTitle style={{ color: "rgb(70, 70, 70)" }}>Artistar</LineTitle>
        </InLineLocationDiv>

        <InLineDiv>
          <InLineTitle style={{ color: "rgb(70, 70, 70)" }}>
            Artistar 란
          </InLineTitle>
          <InLineContent style={{ color: "rgb(70, 70, 70)" }}>
            당신의 그림에 가치를 부여하여 수익을 창출 할 수 있도록 도움을
            드리겠습니다.
          </InLineContent>
          <InLineEngContent style={{ color: "rgb(70, 70, 70)" }}>
            Help you value your paintings and generate revenue I'll give it to
            you.
          </InLineEngContent>
        </InLineDiv>

        <ImgDiv style={{ position: "absolute", right: 0 }}>
          <BigImg src=""></BigImg>
        </ImgDiv>
      </MidDiv> */}

      {/* 세번째 소개 */}
      {/* <BtmDiv>
        <GuideImgDiv>
          <GuideImg
            src={
              ""
            }
          ></GuideImg>
        </GuideImgDiv>
      </BtmDiv> */}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const TopDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 93vh;
  overflow: hidden;
  border-bottom: 1px solid #b09464;
`;

const LowDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  background-color: #000407;
  gap: 50px;
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

const ParentContainer = styled.div<{ src: any }>`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: rgba(0, 4, 7, 0.72); */
  width: 100%;
  height: 100%;
  background-image: url(${({ src }) => src});
  background-size: repeat;
  background-size: 100% 100%;
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

const TopMainTitle = styled.div`
  display: flex;
  font-size: 2.5em;
  font-weight: 500;
  line-height: 26px;
  color: #b09464;
  margin-right: 50px;
`;

const TopSubTitle = styled.div`
  display: flex;
  font-size: 1.5em;
  font-weight: 500;
  line-height: 35.78px;
  text-align: start;
  color: #b09464;
`;

const LowMainTitle = styled.div`
  display: flex;
  font-size: 2.5em;
  font-weight: 500;
  line-height: 26px;
  color: #b09464;
  margin-bottom: 50px;
  align-self: flex-start;
`;

const LowSubTitle = styled.div`
  display: flex;
  font-size: 1.5em;
  font-weight: 500;
  line-height: 35.78px;
  color: #b09464;
  align-self: flex-start;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LowContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 85%;
`;

const MainTitle = styled.div`
  font-size: 1.5em;
  text-align: start;
  font-weight: 400;
  line-height: 26px;
  color: #b09464;
`;

const MainSmallTitle = styled.span`
  font-size: 2vw;
  text-align: center;
  color: rgb(103, 100, 121);
  display: block;
  margin-bottom: 12vh;
`;

const ImgDiv = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const BigImg = styled.img`
  width: 33vw;
  height: 40vh;
`;

const InLineDiv = styled.div`
  width: 38vw;
  height: 55vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  margin-left: 5vw;
`;

const InLineTitle = styled.div`
  font-size: 3vw;
  text-align: center;
  font-weight: bold;
  color: rgb(237, 238, 237);
`;

const InLineContent = styled.div`
  margin-top: 3vh;
  font-size: 1.5vw;
  text-align: center;
  color: rgb(237, 238, 237);
`;

const InLineEngContent = styled.div`
  margin-top: 3vh;
  font-size: 1.1vw;
  text-align: center;
  color: rgb(237, 238, 237);
`;

const InLineLocationDiv = styled.div`
  width: 10vw;
  height: 55vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  margin-left: 5vw;
`;

const LineDiv = styled.div`
  width: 0.15vw;
  height: 30vh;
  margin: 1vw 0 1vw 0;
  border-radius: 5px;
  background-color: rgb(237, 238, 237);
`;

const LineNum = styled.div`
  font-size: 2.5vw;
  text-align: center;
  font-weight: bold;
  color: rgb(237, 238, 237);
`;

const LineTitle = styled.div`
  font-size: 1.2vw;
  font-weight: bold;
  color: rgb(237, 238, 237);
  writing-mode: vertical-rl;
`;

// const TopDiv = styled.div`
//   width: 100%;
//   height: 55vh;
//   flex-direction: row;
//   display: flex;
//   background-color: rgb(43, 60, 110);
// `;

const MidDiv = styled.div`
  width: 100%;
  height: 55vh;
  flex-direction: row;
  display: flex;
  background-color: rgb(236, 236, 236);
  position: relative;
`;

const BtmDiv = styled.div`
  width: 100%;
  height: 55vh;
  flex-direction: row;
  justify-content: center;
  background-color: rgb(175, 175, 175);
`;

const GuideImgDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GuideImg = styled.img<{ src: any }>`
  width: 75vw;
  height: 45vh;
  background: url(${({ src }) => src});
`;

export default About;
