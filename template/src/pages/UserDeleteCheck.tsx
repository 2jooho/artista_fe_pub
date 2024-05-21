import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { heightPercentage, widthPercentage } from "../constants/ResponsiveSize";

const UserDeleteCheck = () => {
    const user = useSelector((state: any) => {
      return state.user;
    });
    const [checkboxChecked1, setCheckboxChecked1] = useState(false);
  
    const handleCheckboxChange = () => {
        setCheckboxChecked1(!checkboxChecked1);
      };

    return (
      <Wrap>
        <Container>
            <Title>회원탈퇴</Title>
            <ContentContainer>
                <SubTilte>유의사항</SubTilte>
                <SubMessage>
                회원탈퇴 시 회원정보 및 서비스 이용에 관한 정보(스타 선정 횟수, 올린 작품들 및 제작 누적 정보들)는 모두 삭제되며, 삭제된 데이터는 복구가 불가능합니다. 다만 개인정보 처리방침에 의거하여 회원탈퇴 후에도 일정기간 보관되는 정보가 있을 수 있습니다.
                </SubMessage>
                <AgreementLabel checked={checkboxChecked1}>
                    <input
                    type="checkbox"
                    id="agreementCheckbox"
                    checked={checkboxChecked1}
                    onChange={handleCheckboxChange}
                    />
                    <Span>
                    유의사항을 모두 확인했습니다.
                    </Span>
                </AgreementLabel>
                <DeleteBtm>탈퇴하기</DeleteBtm>
            </ContentContainer>
        </Container>
      </Wrap>
    );
}

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 89vh;
  background-color: #000407;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 48vw;
    height: 54vh;
    background-color: #0E0E0E;
    border: 1px solid #B09464;
`;

const Title = styled.div`
    display: flex;
    font-size: 32px;
    font-weight: 700;
    line-height: 48.41px;
    color: #B09464;
    margin-bottom: 20px;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70%;
    height: auto;
`;

const SubTilte = styled.div`
    display: flex;
    align-self: flex-start;
    font-size: 18px;
    font-weight: 700;
    color: #B09464;
`;

const SubMessage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    margin: 10px 0 20px 0;
    font-size: 16px;
    font-weight: 500;
    line-height: 26.63px;
    color: #B09464;
    border: 1px solid #B09464;
`;

const DeleteBtm = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 5vh;
    border-radius: 13px;
    color: #000000;
    border: 1px solid #B09464;
    background-color: #B09464;
    font-size: 24px;
    font-weight: 700;
`;

const AgreementLabel = styled.label<{ checked: boolean }>`
  display: flex;
  align-self: flex-start;
  position: relative;
  cursor: pointer;
  margin-bottom: 50px;
  &:before {
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #B09464;
    border-radius: 6px;
    background-color: ${({ checked }) => (checked ? "#B09464" : "transparent")};
    content: "";
    /* content: ${({ checked }) => (checked ? '"✓"' : '"✓"')}; */
    /* color: ${({ checked }) => (checked ? "green" : "red")}; */
  }
  input {
    display: none;
  }
`;

const Span = styled.span`
  color: #B09464;
  font-size: 16px;
  font-weight: 600;
  line-height: 26.63px;
  margin-left: 16px;
`;

export default UserDeleteCheck;