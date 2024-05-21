import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { getGallary } from "../mock/main_data";
import Modal from "../components/Modal";
import useOpenModal from "../constants/useOpenModal";

interface ImageSliderProps {
  images: string[];
}

const BackgroundImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const galleryImg = getGallary();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [galleryImgSlide, setGalleryImgSlide] = useState(0);

  const { isOpenModal, clickModal, closeModal } = useOpenModal();

  const handleClick = () => {
    clickModal();
  };

  const handlePrevSlide = (type: any) => {
    if (type === "work") {
      setGalleryImgSlide((prevSlide) =>
        prevSlide === 0 ? prevSlide : prevSlide - 1
      );
    } else {
      setCurrentSlide((prevSlide) =>
        prevSlide === 0 ? prevSlide : prevSlide - 1
      );
    }
  };

  const handleNextSlide = (type: any) => {
    if (type === "work") {
      setGalleryImgSlide((nextSlide) =>
        nextSlide === galleryImg.length - 1 ? nextSlide : nextSlide + 1
      );
    } else {
      setCurrentSlide((nextSlide) =>
        nextSlide === images.length - 1 ? nextSlide : nextSlide + 1
      );
    }
  };

  return (
    <>
      <SliderContainer key={currentSlide} src={images[currentSlide]}>
        <PreButton
          onClick={() => {
            handlePrevSlide("");
          }}
          hidden={currentSlide === 0 ? true : false}
        >
          &#9664;
        </PreButton>
        <NextButton
          onClick={() => {
            handleNextSlide("");
          }}
          hidden={currentSlide === images.length - 1 ? true : false}
        >
          &#9654;
        </NextButton>
        <StarImg src={""}></StarImg>

        <WorkFrameDiv>
          <WorkPreButton
            onClick={() => {
              handlePrevSlide("work");
            }}
            hidden={galleryImgSlide === 0 ? true : false}
          >
            &#9664;
          </WorkPreButton>
          <SlideImage
            onClick={handleClick}
            key={galleryImgSlide}
            src={galleryImg[galleryImgSlide]}
            alt={`Slide ${galleryImgSlide + 1}`}
          />
          <WorkNextButton
            onClick={() => {
              handleNextSlide("work");
            }}
            hidden={galleryImgSlide === galleryImg.length - 1 ? true : false}
          >
            &#9654;
          </WorkNextButton>
        </WorkFrameDiv>

        {isOpenModal && (
          <Modal
            closeModal={closeModal}
            title="7월 BEST 1"
            alert="귀여운 아이콘입니다."
            images={galleryImg}
          />
        )}
      </SliderContainer>
    </>
  );
};

const SliderContainer = styled.div<{ src: any }>`
  width: 100%;
  height: 680px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url(${({ src }) => src});
`;

const PreButton = styled.button<{ hidden: boolean }>`
  position: absolute;
  left: 0;
  margin-left: 1vw;
  font-size: 3vw;
  top: 65%;
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

const NextButton = styled.button<{ hidden: boolean }>`
  position: absolute;
  right: 0;
  margin-right: 1vw;
  font-size: 3vw;
  top: 65%;
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

const StarImg = styled.img`
  width: 42%;
  height: 42%;
  object-fit: contain;
  position: absolute;
  top: 60%;
  left: 25%;
`;

const WorkFrameDiv = styled.div`
  position: absolute;
  top: 53%;
  left: 50%;
  width: 250px;
  height: 250px;
`;

const SlideImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: fill;
  transition: transform 0.3s ease; /* Add the transition property for the sliding animation */
`;

const WorkPreButton = styled.button<{ hidden: boolean }>`
  position: absolute;
  left: 0;
  margin-left: 1vw;
  font-size: 3vw;
  top: 65%;
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

const WorkNextButton = styled.button<{ hidden: boolean }>`
  position: absolute;
  right: 0;
  margin-right: 1vw;
  font-size: 3vw;
  top: 65%;
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

export default BackgroundImageSlider;
