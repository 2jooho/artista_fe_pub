import React from "react";
import styled from "styled-components";
import { widthPercentage } from "../constants/ResponsiveSize";

interface ImageCardProps {
  imageUrl: string;
  artName: string;
  artistName: string;
}

const ImageCard: React.FC<ImageCardProps> = ({
  imageUrl,
  artName,
  artistName,
}) => {
  return (
    <CardContainerWithHover>
      <Image src={imageUrl} alt="Image" />
      <ImageText>{artistName}</ImageText>
      <LineDiv></LineDiv>
      <ImageNameText>{artName}</ImageNameText>
      <CircleAnimation />
    </CardContainerWithHover>
  );
};

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* box-shadow: 0 2vw 4vw rgba(0, 0, 0, 0.1); */
  overflow: hidden;
  position: relative;
  width: 100%;
  cursor: pointer;

  &::after {
    content: "";
    padding-bottom: 100%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: fill;
  object-position: left center;
  transition: filter 0.3s;
`;

const ImageText = styled.div`
  position: absolute;
  top: 33%;
  color: white;
  text-align: center;
  font-size: 1.2em;
  font-weight: 600;
  opacity: 0; /* Initially hidden */
  transition: opacity 0.3s;
`;

const ImageNameText = styled.div`
  position: absolute;
  bottom: 33%;
  color: white;
  text-align: center;
  font-size: 1.2em;
  font-weight: 400;
  opacity: 0; /* Initially hidden */
  transition: opacity 0.3s; /* Add a smooth transition effect */
`;

const LineDiv = styled.div`
  width: 64%;
  height: 1px;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  background-color: white;
  text-align: center;
  opacity: 0; /* Initially hidden */
  transition: opacity 0.3s; /* Add a smooth transition effect */
`;

const CircleAnimation = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border: 1px solid transparent; /* Set a transparent border */
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition: width 0.5s ease, height 0.5s ease, border-color 0.5s ease; /* Add transition for border color */
`;

const CardContainerWithHover = styled(CardContainer)`
  &:hover ${Image} {
    filter: brightness(50%); /* Darken the image on hover */
  }

  &:hover ${ImageText} {
    opacity: 1; /* Make the text visible on hover */
  }

  &:hover ${ImageNameText} {
    opacity: 1; /* Make the text visible on hover */
  }

  &:hover ${LineDiv} {
    opacity: 1; /* Make the text visible on hover */
  }

  &:hover ${LineDiv} {
    opacity: 1; /* Make the text visible on hover */
  }

  &:hover ${CircleAnimation} {
    width: 110%;
    height: 110%;
    border-color: white; /* Change the border color on hover */
  }
`;

export default ImageCard;
