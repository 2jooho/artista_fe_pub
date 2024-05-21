import React, { useState } from "react";
import styled, { css } from "styled-components";
import { widthPercentage } from "../constants/ResponsiveSize";
// import { useNavigate } from "react-router-dom";

interface GalleryItemProps {
  imageUrl: string;
  type: string;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ imageUrl, type }) => {
  return (
    <>
      <StyledGalleryItem type={type}>
        <Image src={imageUrl} alt="Gallery Item" />
      </StyledGalleryItem>
    </>
  );
};

interface ImgTypeProps {
  type: string;
}

const StyledGalleryItem = styled.div<ImgTypeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  /* box-shadow: 0 2vw 4vw rgba(0, 0, 0, 0.1); */
  cursor: pointer;
  transition: transform 0.3s ease; /* Add the CSS transition property */
  &:hover {
    transform: scale(1.1); /* Increase the size of the image on hover */
  }

  ${(props) =>
    props.type === "gallery" &&
    css`
      width: 100%;
      /* width: ${widthPercentage(480)}vw;
      height: ${widthPercentage(468)}vw; */
    `}
  &::after {
    content: "";
    padding-bottom: 100%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  position: absolute;
`;

export default GalleryItem;
