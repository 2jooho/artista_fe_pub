import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { getGallary, getSelectBoxList } from "../mock/main_data";
import Modal from "../components/Modal";
import useOpenModal from "../constants/useOpenModal";
import CustomSelect from "../components/CustomSelect";

interface ImageSliderProps {
  images: string[];
}

const BackgroundImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const galleryImg = getGallary();
  const boxList = getSelectBoxList();
  const [galleryImgSlide, setGalleryImgSlide] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isOpenModal, clickModal, closeModal } = useOpenModal();

  const handleClick = () => {
    clickModal();
  };

  const NextSlide = (type: string) => {
    if (type === "art") {
      setGalleryImgSlide((nextSlide) =>
        nextSlide === galleryImg.length - 1 ? nextSlide : nextSlide + 1
      );

      setCurrentSlide((nextSlide) =>
        nextSlide === images.length - 1 ? nextSlide : nextSlide + 1
      );
    } else {
      setCurrentSlide((nextSlide) =>
        nextSlide === images.length - 1 ? nextSlide : nextSlide + 1
      );
    }
  };

  const PrevSlide = (type: string) => {
    if (type === "art") {
      setGalleryImgSlide((prevSlide) =>
        prevSlide === 0 ? prevSlide : prevSlide - 1
      );

      setCurrentSlide((prevSlide) =>
        prevSlide === 0 ? prevSlide : prevSlide - 1
      );
    } else {
      setCurrentSlide((prevSlide) =>
        prevSlide === 0 ? prevSlide : prevSlide - 1
      );
    }
  };

  return (
    <Container>
      <SliderContainer src={galleryImg[currentSlide]}>
        <CalendarDiv>
          {/* <CustomSelect datas={boxList.months}></CustomSelect>
          <CustomSelect datas={boxList.years}></CustomSelect> */}
        </CalendarDiv>
        <ArtTitle>
          MONET <br></br>INSIDE
        </ArtTitle>
        <ArtName>
          GROUNDSEESAW <br></br> MYEONGDONG
        </ArtName>
        <ArtFrameDiv>
          <ArtPreButton
            onClick={() => {
              PrevSlide("art");
            }}
            hidden={galleryImgSlide === 0 ? true : false}
          >
            &#9664;
          </ArtPreButton>
          <SlideImgDiv>
            <SlideImage
              onClick={handleClick}
              key={galleryImgSlide}
              src={galleryImg[galleryImgSlide]}
              alt={`Slide ${galleryImgSlide + 1}`}
            />
            <SlideImage_reflection src={galleryImg[galleryImgSlide]} />
            <SlideImage_reflection_second src={galleryImg[galleryImgSlide]} />
            <StarContainer>
              <StarImg src={""}></StarImg>
            </StarContainer>
          </SlideImgDiv>
          <ArtNextButton
            onClick={() => {
              NextSlide("art");
            }}
            hidden={galleryImgSlide === galleryImg.length - 1 ? true : false}
          >
            &#9654;
          </ArtNextButton>
        </ArtFrameDiv>

        {/* 좌우 버튼 */}
        <PreButton
          onClick={() => {
            PrevSlide("");
          }}
          hidden={currentSlide === 0 ? true : false}
        >
          &#9664;
        </PreButton>
        <NextButton
          onClick={() => {
            NextSlide("");
          }}
          hidden={currentSlide === images.length - 1 ? true : false}
        >
          &#9654;
        </NextButton>

        {/* 모달 */}
        {isOpenModal && (
          <Modal
            closeModal={closeModal}
            title="7월 BEST 1"
            alert="귀여운 아이콘입니다."
            images={galleryImg}
          />
        )}
      </SliderContainer>
      <SliderContainer_reflection
        src={galleryImg[currentSlide]}
      ></SliderContainer_reflection>
    </Container>
  );
};

const Container = styled.div``;

const SliderContainer = styled.div<{ src: any }>`
  width: 100%;
  height: 750px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url(${({ src }) => src});
  position: relative;
  z-index: 2;
`;

const SliderContainer_reflection = styled.div<{ src: any }>`
  width: 100%;
  height: 150px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-top: -10px;
  background-image: url(${({ src }) => src});
  filter: blur(2px); /* 그림자의 흐릿함 정도 */
  transform: scaleY(-1); /* 반사를 상하반전 */
  box-shadow: inset 0px -30px 20px -20px rgba(0, 0, 0, 0.8);
`;

const ArtTitle = styled.div`
  font-size: 5.2rem;
  font-weight: 500;
  color: white;
  text-align: center;
  padding-top: 3vh;
`;

const ArtName = styled.div`
  position: absolute;
  top: 95%;
  left: 50%;
  transform: translate(-50%, 0%);
  z-index: 99;
  font-size: 2rem;
  font-weight: 300;
  color: white;
  text-align: center;
`;

const ArtFrameDiv = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 900px;
  height: 500px;
  background-color: rgb(1, 1, 1);
  border: 2px solid rgb(63, 56, 72);
  display: flex;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const SlideImage = styled.img`
  display: flex;
  width: 75%;
  height: 75%;
  object-fit: fill;
  transition: transform 0.3s ease; /* Add the transition property for the sliding animation */
  cursor: pointer;

  @media (max-width: 700px) {
    width: 90%;
  }
`;

const SlideImage_reflection = styled.div<{ src: any }>`
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-top: -10px;
  background-image: url(${({ src }) => src});
  filter: blur(2px); /* 그림자의 흐릿함 정도 */
  transform: scaleY(-1); /* 반사를 상하반전 */
  box-shadow: inset 0px -30px 20px -20px rgba(0, 0, 0, 0.8);
  display: flex;
  width: 75%;
  height: 10%;
  transition: transform 0.3s ease; /* Add the transition property for the sliding animation */
  @media (max-width: 700px) {
    width: 90%;
  }
`;

const SlideImage_reflection_second = styled.div<{ src: any }>`
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-top: -10px;
  background-image: url(${({ src }) => src});
  filter: blur(25px); /* 그림자의 흐릿함 정도 */
  transform: scaleY(-1); /* 반사를 상하반전 */
  display: flex;
  width: 75%;
  height: 8%;
  transition: transform 0.3s ease; /* Add the transition property for the sliding animation */
  @media (max-width: 700px) {
    width: 90%;
  }
`;

const SlideImgDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const StarContainer = styled.div`
  width: auto;
  height: 250px;
  display: flex;
  position: absolute;
  top: 40%;
  left: 40%;
  @media (max-width: 700px) {
    left: 33%;
  }
`;

const StarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

const ArtPreButton = styled.button<{ hidden: boolean }>`
  position: absolute;
  left: 0;
  margin-left: 1vw;
  font-size: 3vw;
  top: 50%;
  background: transparent;
  color: #80808071;
  border: none;
  cursor: pointer;
  &:hover {
    color: #f5f5dcc7;
    font-weight: bold;
  }
  visibility: visible;

  ${(hidden) =>
    hidden &&
    css`
      overflow: hidden;
    `}
`;

const ArtNextButton = styled.button<{ hidden: boolean }>`
  position: absolute;
  right: 0;
  margin-right: 1vw;
  font-size: 3vw;
  top: 50%;
  background: transparent;
  color: #80808071;
  border: none;
  cursor: pointer;
  &:hover {
    color: #f5f5dcc7;
    font-weight: bold;
  }
  visibility: visible;

  ${(hidden) =>
    hidden &&
    css`
      overflow: hidden;
    `}
`;

const PreButton = styled.button<{ hidden: boolean }>`
  position: absolute;
  left: 0;
  margin-left: 1vw;
  font-size: 3vw;
  top: 50%;
  background: transparent;
  color: #ff4633;
  border: none;
  cursor: pointer;
  &:hover {
    color: #bebe21c6;
    font-weight: bold;
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
  right: 0;
  margin-right: 1vw;
  font-size: 3vw;
  top: 50%;
  background: transparent;
  color: #ff4633;
  border: none;
  cursor: pointer;
  &:hover {
    color: #bebe21c6;
    font-weight: bold;
  }
  visibility: visible;
  z-index: 80;

  ${(hidden) =>
    hidden &&
    css`
      overflow: hidden;
    `}
`;

const CalendarDiv = styled.div`
  position: absolute;
  z-index: 3;
  right: 2vw;
  margin-top: 1.5vh;
  color: white;
  display: flex;
  flex-direction: row;
`;

export default BackgroundImageSlider;
