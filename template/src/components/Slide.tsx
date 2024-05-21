import React from "react";
import styled from "styled-components";
import { widthPercentage } from "../constants/ResponsiveSize";
export default function Slide({ img }: any) {
  return <IMG src={img} />;
}

const IMG = styled.img`
  width: ${widthPercentage(350)}vw;
  height: ${widthPercentage(350)}vw;

  @media (max-width: 900px) {
    width: 300px;
    height: 300px;
  }
`;
