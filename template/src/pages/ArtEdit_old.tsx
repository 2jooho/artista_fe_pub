import React, { useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import ArtPostEditor from "../components/ArtPostEditor";

const ArtEdit: React.FC = () => {
  const navigate = useNavigate();

  const handleSavePost = (
    images: File | null,
    title: string,
    content: string,
    category: string
  ) => {
    if (images) {
      const formData = new FormData();
      formData.append("images", images);
    }
    navigate("/GalleryDetail/2");
  };

  return (
    <Wrapper>
      <ArtPostEditor onSave={handleSavePost} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 75px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
`;

export default ArtEdit;
