import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Slide from "./Slide";

interface InfiniteProps {
  imageUrls: string[];
}
const STEP_SIZE = 1;
const VIEW_IMG = 5;

const TransverseImage2: React.FC<InfiniteProps> = ({ imageUrls }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);

  // Next 버튼 클릭 시
  const NextSlide = () => {
    // setCurrentSlide((prevIndex) => (prevIndex + STEP_SIZE) % imageUrls.length);
    setCurrentSlide((prevIndex) =>
      prevIndex === imageUrls.length - VIEW_IMG
        ? prevIndex
        : (prevIndex + STEP_SIZE) % imageUrls.length
    );
  };

  // Prev 버튼 클릭 시
  const PrevSlide = () => {
    setCurrentSlide((prevIndex) =>
      prevIndex === 0
        ? 0
        : (prevIndex - STEP_SIZE + imageUrls.length) % imageUrls.length
    );
  };

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = "transform 0.5s ease-in-out";
      const translateX = -currentSlide * (255 / STEP_SIZE);
      slideRef.current.style.transform = `translateX(${translateX}px)`;
    }
  }, [currentSlide]);

  return (
    <>
      <Container>
        <SliderContainer ref={slideRef}>
          {imageUrls.map((imageUrl, index) => (
            <ImageDiv>
              <Slide key={index} img={imageUrl} alt={`Image ${index}`} />
            </ImageDiv>
          ))}
        </SliderContainer>
        <Center>
          <Button onClick={PrevSlide}>Prev</Button>
          <Button onClick={NextSlide}>Next</Button>
        </Center>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin-top: 5px;
`;
const SliderContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-bottom: 2em;
  display: flex;
`;

const ImageDiv = styled.div`
  margin-left: 30px;
`;

const Button = styled.div`
  all: unset;
  padding: 1em 2em;
  margin: 2em 2em;
  color: burlywood;
  border-radius: 10px;
  border: 1px solid burlywood;
  cursor: pointer;
  &:hover {
    background-color: burlywood;
    color: #fff;
  }
`;

const Center = styled.div`
  text-align: center;
`;

export default TransverseImage2;
