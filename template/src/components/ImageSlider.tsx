import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === images.length - 1 ? 0 : prevSlide + 1
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(handleNextSlide, 4000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <SliderContainer>
      <PreButton onClick={handlePrevSlide}>&#9664;</PreButton>
      <SlideImage
        key={currentSlide}
        src={images[currentSlide]}
        alt={`Slide ${currentSlide + 1}`}
        // style={{
        //   transform: `translateX(-${currentSlide * 100}%)`, // Add the translateX property for the sliding animation
        // }}
      />
      <NextButton onClick={handleNextSlide}>&#9654;</NextButton>
      <DotsContainer>
        {images.map((_, index) => (
          <Dot
            key={index}
            active={index === currentSlide}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </DotsContainer>
    </SliderContainer>
  );
};

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  height: 87vh;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease; /* Add the transition property for the sliding animation */
`;

const PreButton = styled.button`
  position: absolute;
  left: 0;
  margin-left: 1vw;
  font-size: 3vw;
  background: transparent;
  color: #80808071;
  border: none;
  cursor: pointer;
  &:hover {
    color: #f5f5dcc7;
    font-weight: bold;
  }
`;

const NextButton = styled.button`
  position: absolute;
  right: 0;
  margin-right: 1vw;
  font-size: 3vw;
  background: transparent;
  color: #80808071;
  border: none;
  cursor: pointer;
  &:hover {
    color: #f5f5dcc7;
    font-weight: bold;
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 3vh;
  width: 100%;
`;

interface DotProps {
  active: boolean;
}

const Dot = styled.div<DotProps>`
  width: 0.6vw;
  height: 0.6vw;
  background-color: #bbb;
  border-radius: 50%;
  margin: 0 0.5vw;
  cursor: pointer;

  ${(props) =>
    props.active &&
    css`
      background-color: #333;
    `}
`;
export default ImageSlider;
