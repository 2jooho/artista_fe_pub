import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Slide from "./Slide";

interface InfiniteProps {
  imageUrl: string;
  text?: string;
}
const TransverseImage: React.FC<InfiniteProps> = ({ imageUrl, text }) => {
  return (
    <>
      <Container>
        <ImageDiv>
          <Slide img={imageUrl} />
        </ImageDiv>
        <ImgaeText>{text}</ImgaeText>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2vw;
`;

const ImageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  /* box-shadow: 0 2vw 4vw rgba(0, 0, 0, 0.1); */
  overflow: hidden;
`;

const ImgaeText = styled.div`
  font-size: 20px;
  color: #b09464;
`;
export default TransverseImage;
