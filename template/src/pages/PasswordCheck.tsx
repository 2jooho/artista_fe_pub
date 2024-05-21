import React, { useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface passwordCheckProps {
  fnPassCheck: any;
}

const PasswordCheck: React.FC<passwordCheckProps> = ({ fnPassCheck }) => {
  const user = useSelector((state: any) => {
    return state.user;
  });
  const [password, setPassword] = useState("");

  const haldleSuccess = () => {
    fnPassCheck({
      userId: user.userId,
      password: password,
      loginType: user.loginType,
    });
  };

  return (
    <Wrap>
      <Container>
        <ContentContainer>
          <Title>개인정보 수정을 위해 비밀번호를 입력해주세요.</Title>
          <InputContainer>
            <Input
              type="password"
              value={password}
              placeholder="비밀번호를 입력해주세요."
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </InputContainer>
          <SuccessBtm onClick={haldleSuccess}>확인</SuccessBtm>
        </ContentContainer>
      </Container>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 93vh;
  background-color: #000407;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50vw;
  height: 45vh;
  padding: 40px;
  background-color: #0e0e0e;
  border: 1px solid #b09464;
  border-radius: 36px;
`;

const Title = styled.div`
  display: flex;
  font-size: 1.2em;
  font-weight: 400;
  color: #b09464;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 65%;
  height: auto;
`;

const SuccessBtm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5.7vh;
  border-radius: 13px;
  color: #000000;
  border: 1px solid #b09464;
  background-color: #b09464;
  cursor: pointer;
  font-size: 1em;
  font-weight: 500;
  margin-top: 15px;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  background-color: transparent;
  height: 5.7vh;
  font-size: 1em;
  font-weight: 400;
  padding-left: 2vh;
  color: #b09464;
  outline: none;

  &::placeholder {
    color: #747474;
    font-size: 1em;
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid #b09464;
  border-radius: 13px;
  background-color: #0e0e0e;
  margin-top: 30px;
`;

export default PasswordCheck;
