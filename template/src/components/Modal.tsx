import React, { useState } from "react";
import styled from "styled-components";
import ModalImages from "../components/ModalImages";

type Props = {
  title?: string;
  alert?: string;
  images: string[];
  closeModal?: () => void;
};

const Modal = ({ title, alert, closeModal, images }: Props) => {
  return (
    <ModalWrap>
      <ModalBackGround onClick={closeModal} />
      <ModalContainer>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
        <ImageGrid>
          <ModalImages
            images={images}
            alert={alert}
            title={title}
          ></ModalImages>
        </ImageGrid>
      </ModalContainer>
    </ModalWrap>
  );
};

const ModalWrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ModalBackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 90;
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  z-index: 99;
`;

const Text = styled.div`
  font-size: 2rem;
  color: #931515;
  font-weight: 500;
  text-align: center;
  margin-bottom: 15px;
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

const ModalImage = styled.img`
  /* max-width: 100%;
  max-height: 90vh; */
  width: 32vw;
  height: 32vw;
`;

const CloseButton = styled.div`
  background: none;
  border: none;
  color: #333;
  font-size: 2rem;
  cursor: pointer;
  position: absolute;
  right: 10px;
`;

const ImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 32vw;
`;
export default Modal;
