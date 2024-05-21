import React from "react";
import styled, { css } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface InfiniteProps {
  imageUrls: string[];
}

const TransverseImage: React.FC<InfiniteProps> = ({ imageUrls }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: <Pre>&#9664;</Pre>,
    nextArrow: <NextTo>&#9654;</NextTo>,
  };

  return (
    <>
      <StyledSlider {...settings}>
        {imageUrls.map((imageUrl, index) => (
          <ImageDiv>
            <Image key={index} src={imageUrl} />
          </ImageDiv>
        ))}
      </StyledSlider>
    </>
  );
};

const StyledSlider = styled(Slider)`
  width: 100%;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  margin-top: 10px;
`;

const ImageDiv = styled.div`
  width: 100%;
  height: 260px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const Pre = styled.div`
  font-size: 3vw;
  background: transparent;
  color: #808080;
  border: none;
  cursor: pointer;
  &:hover {
    color: #ffff00c6;
    font-weight: bold;
  }
`;

const NextTo = styled.div`
  font-size: 3vw;
  background: transparent;
  color: #808080;
  border: none;
  cursor: pointer;
  &:hover {
    color: #ffff00c6;
    font-weight: bold;
  }
`;

export default TransverseImage;
