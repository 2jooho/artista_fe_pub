import React from "react";
import styled from "styled-components";
import GalleryItem from "./GalleryItem";
import { getGallary } from "../mock/main_data";
import { Link } from "react-router-dom";

const Gallery = ({ galleryDtoList }: any) => {
  const gallaryUrl = getGallary();

  return (
    <ParentContainer>
      <GalleryContainer>
        {galleryDtoList &&
          galleryDtoList.map((item: any, index: any) => (
            <Link to={`/`} key={1}>
              <GalleryItem key={index} imageUrl={item.artImgUrl} type={""} />
            </Link>
          ))}
      </GalleryContainer>
    </ParentContainer>
  );
};

const ParentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 0fr); /* Three columns of equal size */
  grid-template-rows: repeat(3, 0fr); /* Three rows of equal size */
  gap: 20px;
`;

export default Gallery;
