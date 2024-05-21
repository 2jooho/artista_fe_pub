import React from "react";
import styled, { css } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ImagesProps {
  images: string[];
  alert?: string;
  title?: string;
}

const ModalImages: React.FC<ImagesProps> = ({ images, alert, title }) => {
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
      <StyledSlider {...settings}>
        {images.map((imageUrl, index) => (
          <>
            <Text>{title}</Text>
            <ModalImage key={index} src={imageUrl} alt={images[0]} />
            <ModalAlertText>
              {alert}
              {alert}
              {alert}
              {alert}
            </ModalAlertText>
          </>
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
`;

const ModalImage = styled.img`
  /* max-width: 100%;
  max-height: 90vh; */
  width: 32vw;
  height: 32vw;
`;

const Pre = styled.div`
  position: absolute;
  left: -10vw;
  z-index: 5;
  font-size: 5vw;
  background: transparent;
  color: #d1d139;
  border: none;
  cursor: pointer;
  &:hover {
    color: #ffff00c6;
    font-weight: bold;
  }
`;

const NextTo = styled.div`
  position: absolute;
  right: -10vw;
  z-index: 5;
  font-size: 5vw;
  background: transparent;
  color: #d1d139;
  border: none;
  cursor: pointer;
  &:hover {
    color: #ffff00c6;
    font-weight: bold;
  }
`;

const ModalAlertText = styled.div`
  max-width: 32vw;
  font-size: 1rem;
  font-weight: 500;
  color: #1d479c;
  text-align: center;
  margin-top: 20px;
  white-space: normal;
`;

const Text = styled.div`
  font-size: 2rem;
  color: #931515;
  font-weight: 500;
  text-align: center;
  margin-bottom: 15px;
`;

export default ModalImages;
