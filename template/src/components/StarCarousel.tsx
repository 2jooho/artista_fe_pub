import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { heightPercentage, widthPercentage } from "../constants/ResponsiveSize";
import { useNavigate } from "react-router-dom";
import testArtist from "../assets/img/star/testArtist.png";

interface ImageSliderProps {
  imageInfoList: any[];
}
const StarCarousel: React.FC<ImageSliderProps> = ({ imageInfoList }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? prevSlide : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((nextSlide) =>
      imageInfoList && nextSlide === imageInfoList?.length - 1
        ? nextSlide
        : nextSlide + 1
    );
  };

  const handleImgClick = (galleryId: any) => {
    navigate(`/GalleryDetail/${galleryId}`);
  };

  return (
    <Container>
      <CarouselSlider
        translateX={currentSlide * 100}
        totalSlides={imageInfoList?.length}
      >
        {imageInfoList &&
          imageInfoList.map((imageInfo, index) => (
            <CarouselSlide>
              {/* <BackgroundOverlay
                    imgUrl={imageInfo?.artUrl}
                ></BackgroundOverlay> */}
              <ParentContainer>
                {/* 작가명 */}
                <ArtistName>
                  {/* 박지훈 */}
                  {imageInfo && imageInfo?.artistName}
                </ArtistName>
                {/* 슬라이더 */}
                <SliderContainer>
                  <Image
                    key={index}
                    src={imageInfo?.artUrl}
                    alt={imageInfo?.artName}
                    onClick={() => handleImgClick(imageInfo?.galleryId)}
                  />
                </SliderContainer>

                <ArtDescription>
                  {/* 무제 */}
                  {imageInfo && imageInfo?.artName}
                </ArtDescription>
              </ParentContainer>
            </CarouselSlide>
          ))}
      </CarouselSlider>
      <PreButton
        onClick={() => {
          handlePrevSlide();
        }}
        hidden={currentSlide === 0 ? true : false}
      >
        &#10094;
      </PreButton>
      <NextButton
        onClick={() => {
          handleNextSlide();
        }}
        hidden={
          imageInfoList && currentSlide === imageInfoList?.length - 1
            ? true
            : false
        }
      >
        &#10095;
      </NextButton>
      {/* 작가이미지 */}
      <StarContainer>
        <StarImg src={testArtist}></StarImg>
      </StarContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  position: relative;
`;

interface sliderProps {
  translateX: any;
  totalSlides: any;
}
const CarouselSlider = styled.div<sliderProps>`
  display: flex;
  flex-direction: row;
  transition: transform 1s ease-in-out;
  transform: translateX(-${(props) => props.translateX}%);
  width: ${(props) => props.totalSlides * 100}%;
  height: 100%;
`;

interface ImageProps {
  imgUrl: string;
}
const CarouselSlide = styled.div`
  display: flex;
  position: relative;
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
`;

const BackgroundOverlay = styled.div<ImageProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 60%;
  background-image: linear-gradient(
      90deg,
      rgba(0, 4, 7, 0.97) 1%,
      rgba(0, 0, 0, 0),
      rgba(0, 4, 7, 0.95) 99%
    ),
    url(${(props) => props.imgUrl});
  background-size: repeat;
  background-size: 100% 100%;
  filter: blur(7px); /* Adjust the blur effect as needed */
  z-index: -1;
`;

const ParentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-color: rgba(0, 4, 7, 0.72); */
  width: 100%;
  height: 100%;
`;

const ArtistName = styled.div`
  display: flex;
  color: #ffffff;
  font-size: 1.5em;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;
`;

const ArtDescription = styled.div`
  font-size: 1.2em;
  font-weight: 400;
  text-align: center;
  line-height: 37.61px;
  width: ${widthPercentage(918)}vw;
  color: #ffffff;
  margin-top: 15px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: pointer;
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 65%;
  height: 54.5vh;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease; /* Add the transition property for the sliding animation */
`;

const PreButton = styled.button<{ hidden: boolean }>`
  position: absolute;
  left: 15%;
  font-size: 2.5em;
  font-weight: 400;
  top: 50%;
  background: transparent;
  color: #b09464;
  border: none;
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
  visibility: visible;
  z-index: 80;
  ${(hidden) =>
    hidden &&
    css`
      overflow: hidden;
    `}
`;

const NextButton = styled.button<{ hidden: boolean }>`
  position: absolute;
  right: 15%;
  font-size: 2.5em;
  font-weight: 400;
  top: 50%;
  background: transparent;
  color: #b09464;
  border: none;
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
  visibility: visible;
  z-index: 80;

  ${(hidden) =>
    hidden &&
    css`
      overflow: hidden;
    `}
`;

const StarContainer = styled.div`
  width: ${widthPercentage(250)}%;
  height: ${heightPercentage(570)}%;
  display: flex;
  position: absolute;
  top: 79%;
  left: 35%;
  transform: translate(-50%, -50%);

  @media (max-width: 700px) {
  }
`;

const StarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;
export default StarCarousel;
