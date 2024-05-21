import React, { useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import CollectionPostEditor from "../components/CollectionPostEditor";

const CollectionEdit: React.FC = () => {
  const navigate = useNavigate();

  const handleSavePost = (
    profileImage: File | null,
    profileBackgroundImage: File | null,
    authorName: string,
    authorDescription: string
  ) => {
    if (profileImage && profileBackgroundImage) {
      const formData = new FormData();
      formData.append("profileImage", profileImage);
      formData.append("profileBackgroundImage", profileBackgroundImage);
    }
    navigate("/Collection");
  };

  return (
    <Wrapper>
      <CollectionPostEditor onSave={handleSavePost} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
`;

export default CollectionEdit;
