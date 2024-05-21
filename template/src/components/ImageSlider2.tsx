import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { heightPercentage, widthPercentage } from "../constants/ResponsiveSize";
import testArtist from "../assets/img/star/testArtist.png";
import { getStarBackgroundImg } from "../mock/main_data";

interface ImageSliderProps {
  imageInfoList: any[];
}

const ImageSlider2: React.FC<ImageSliderProps> = ({ imageInfoList }) => {
  const backgroundImg = getStarBackgroundImg();
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <Pre>&#9664;</Pre>,
    nextArrow: <NextTo>&#9654;</NextTo>,
  };

  return (
    <>
      <BackgroundOverlay
        imgUrl={imageInfoList && imageInfoList[0]?.artUrl}
      ></BackgroundOverlay>
      {/* <BackgroundOverlay
        imgUrl={imageInfoList && imageInfoList[0]?.artUrl}
        location="left"
      ></BackgroundOverlay> */}
      <ParentContainer>
        {/* 작가명 */}
        <ArtistName>{imageInfoList && imageInfoList[0]?.artistName}</ArtistName>
        {/* 슬라이더 */}
        <SliderContainer>
          <StyledSlider {...settings}>
            {imageInfoList &&
              imageInfoList.map((imageInfo, index) => (
                <>
                  <Image
                    key={index}
                    src={imageInfo?.artUrl}
                    alt={imageInfo?.artName}
                  />
                </>
              ))}
          </StyledSlider>
        </SliderContainer>
        {/* 작가이미지 */}
        <StarContainer>
          <StarImg src={testArtist}></StarImg>
        </StarContainer>
        {/* 작품설명 */}
        <ArtDescription>
          {imageInfoList && imageInfoList[0]?.artName}
        </ArtDescription>
      </ParentContainer>
    </>
  );
};

const ParentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 4, 7, 0.72);
  width: 100%;
  height: 100%;
`;

interface ImageProps {
  imgUrl: string;
}
const BackgroundOverlay = styled.div<ImageProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 60%;
  background-image: linear-gradient(
      90deg,
      rgba(0, 4, 7, 0.97) 1%,
      rgba(0, 0, 0, 0),
      rgba(0, 4, 7, 0.95) 100%
    ),
    url(${(props) => props.imgUrl});
  background-size: repeat;
  background-size: 100% 100%;
  filter: blur(7px); /* Adjust the blur effect as needed */
  z-index: -1;
`;

// const BackgroundOverlay = styled.div<ImageProps>`
//   position: absolute;
//   top: 50%;
//   left: ${(props) => (props.location === "left" ? "25%" : "75%")};
//   transform: translate(-50%, -50%);
//   width: 50%;
//   height: 80%;
//   background-image: linear-gradient(
//       90deg,
//       rgba(0, 4, 7, 0.97) 1%,
//       rgba(0, 0, 0, 0),
//       rgba(0, 4, 7, 0.95) 99%
//     ),
//     url(${(props) => props.imgUrl});
//   background-size: repeat;
//   background-size: 100% 100%;
//   filter: blur(7px); /* Adjust the blur effect as needed */
//   z-index: -1;
// `;

const SliderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  height: 65%;
`;

const StyledSlider = styled(Slider)`
  width: ${widthPercentage(1000)}vw;
  height: ${heightPercentage(681)}vh;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;

const Pre = styled.div`
  position: absolute;
  left: -20%;
  z-index: 5;
  font-size: 60px;
  background: transparent;
  color: #b09464;
  border: none;
  cursor: pointer;
  &:hover {
    color: #e20a5da1;
    font-weight: bold;
  }
`;

const NextTo = styled.div`
  position: absolute;
  left: 110%;
  z-index: 5;
  font-size: 60px;
  background: transparent;
  color: #b09464;
  border: none;
  cursor: pointer;
  &:hover {
    color: #e20a5da1;
    font-weight: bold;
  }
`;

const ArtistName = styled.div`
  display: flex;
  color: #b09464;
  font-size: 35px;
  font-weight: 600;
  text-align: center;
  line-height: 48.01px;
`;

const ArtDescription = styled.div`
  font-size: 25px;
  font-weight: 400;
  text-align: center;
  line-height: 37.61px;
  width: ${widthPercentage(918)}vw;
  color: #ffffff;
`;

const Image = styled.img`
  width: ${widthPercentage(1000)}vw;
  height: ${heightPercentage(681)}vh;
`;

const StarContainer = styled.div`
  width: ${widthPercentage(252)}%;
  height: ${heightPercentage(544)}%;
  display: flex;
  position: absolute;
  top: 77%;
  left: 33%;
  transform: translate(-50%, -50%);

  @media (max-width: 700px) {
  }
`;

const StarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

export default ImageSlider2;
