import React, { ReactNode } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from "../constants/ResponsiveSize";
import { closeCheckModal } from "../redux/modules/modalData";
type ModalProps = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  children: ReactNode;
};
const CheckModalProm = ({
  visible,
  onCancel,
  onConfirm,
  children,
}: ModalProps) => {
  const confirm = () => {
    onCancel();
    onConfirm();
  };

  const dispatch = useDispatch();
  const modalData = useSelector((state: any) => {
    return state.modalDataSlicer;
  });

  const closeModalHandler = () => {
    dispatch(closeCheckModal());
  };

  return (
    <ModalWrap isOpen={modalData.isCheckOpen}>
      <ModalBackGround onClick={closeModalHandler} />
      <ModalTotalContainer>
        <ModalContainer>
          {/* <CloseButton onClick={closeModalHandler}>&times;</CloseButton> */}
          <TextContainer>
            <ErrorTitle>{children}</ErrorTitle>
          </TextContainer>
          <ButtonContainer>
            <CheckButton onClick={confirm}>확인</CheckButton>
            <CheckButton onClick={() => onCancel()}>취소</CheckButton>
          </ButtonContainer>
        </ModalContainer>
      </ModalTotalContainer>
    </ModalWrap>
  );
};

const ModalWrap = styled.div<{ isOpen: any }>`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const ModalBackGround = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(14, 14, 14, 0.81);
  z-index: 10;
`;

const ModalTotalContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 35vw;
  height: 37vh;
  border: 1px solid #b09464;
  background-color: #0e0e0e;
  z-index: 20;
  position: sticky
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);;
`;

const CloseButton = styled.div`
  background: none;
  border: none;
  color: #b09464;
  font-size: 70px;
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: -5px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const CheckButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 11vw;
  height: 5.5vh;
  color: #b09464;
  border: 1px solid #b09464;
  font-size: 1.2em;
  font-weight: 400;
  background-color: transparent;
  cursor: pointer;
`;

const MainTitle = styled.div`
  font-size: 43px;
  font-weight: 500;
  line-height: 55.67px;
  text-align: center;
  color: #b09464;
  margin-bottom: 20px;
`;

const ErrorTitle = styled.div`
  font-size: 1.2em;
  font-weight: 500;
  text-align: center;
  color: #ffffff;
  white-space: pre-line;
`;

const GuideText = styled.div`
  font-size: 21px;
  font-weight: 600;
  line-height: 30.26px;
  text-align: center;
  color: #ffffff;
`;

export default CheckModalProm;
