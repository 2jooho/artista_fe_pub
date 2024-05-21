import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import PersonalInformationAgreement from "../components/PersonalInformationAgreement";
import { useNavigate } from "react-router-dom";
import { widthPercentageCp } from "../constants/ResponsiveSize";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  join,
  userIdCheck,
  nickNameCheck,
  passAuthApi,
  passSuccessApi,
} from "../api/auth/auth";
import Datetime from "react-datetime";
import { useDispatch, useSelector } from "react-redux";
import { openModal, openCheckModal } from "../redux/modules/modalData";
import { removeSignUpData } from "../redux/modules/signUpData";
import { usePrompt } from "../constants/usePrompt";

const SignupPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    createID: "",
    password: "",
    confirmPassword: "",
    name: "",
    nickname: "",
    phoneNumber: "",
    email: "",
    emailConfirmation: "",
    birthdate: "",
    agreeToTerms: false,
  });

  const [modalMsg, setModalMsg] = useState("다시 시도해주세요.");
  const handleModal = (content: string) => {
    dispatch(openModal(content));
  };
  const handleCheckModal = (checkContent: string) => {
    dispatch(openCheckModal(checkContent));
  };

  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isNickName, setIsNickName] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isBirth, setIsBirth] = useState(false);
  const [agreedToPIA, setAgreedToPIA] = useState(false);
  const [informationAgree, setInformationAgree] = useState(false);
  const [marketingAgree, setMarketingAgree] = useState(false);

  // 오류메세지 상태 저장
  const [idMessage, setIdMessage] = React.useState(" ");
  const [nameMessage, setNameMessage] = React.useState(" ");
  const [nickNameMessage, setNickNameMessage] = React.useState(" ");
  const [passwordMessage, setPasswordMessage] = React.useState(" ");
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    React.useState(" ");
  const [emailMessage, setEmailMessage] = React.useState(" ");
  const [phoneMessage, setPhoneMessage] = React.useState(" ");
  const [birthMessage, setBirthMessage] = React.useState(" ");

  const [sEncData, setSEncData] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      dispatch(removeSignUpData());
    });

    return () => {
      window.removeEventListener("beforeunload", () => {
        dispatch(removeSignUpData());
      });
    };
  }, []);

  const signUp = useSelector((state: any) => {
    return state.signUp;
  });

  useEffect(() => {
    if (signUp.phone !== null) {
      setFormData((prevState) => ({
        ...prevState,
        name: signUp.name,
        birthdate: signUp.birth,
        phoneNumber: signUp.phone,
      }));
      setIsName(true);
      setIsBirth(true);
      setIsPhone(true);
      setShowPrompt(true);
    }
  }, [signUp]);

  const setJoin: any = async (data: any) => mutate(data);

  const { mutate } = useMutation(["join"], (data) => join(data), {
    retry: false,
    onSuccess: (res: any) => {
      navigate("/LoginPage");
    },
    // onError: (error: unknown) => errorHandler(error),
    onError: (error: unknown) => {
      if (error != null) {
        // alert(error);
        console.log(error);
      } else {
        handleModal(
          "서비스 접속이 원활하지 않습니다. 잠시 후 다시 이용해주세요."
        );
      }
    },
  });

  const fetchUserIdCheck = async () => {
    const result = await userIdCheck(formData.createID);
    return result;
  };

  // 외부연동
  // axios
  const { data: isUserId, refetch } = useQuery(
    ["isUserId", formData.createID],
    fetchUserIdCheck,
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled: false,
      onSuccess: (res: any) => {
        setIdMessage("사용 가능한 아이디입니다.");
        handleModal("사용 가능한 아이디입니다.");
        setIsId(true);
      },
      onError: (error: any) => {
        console.log("error?");
        if (error != null) {
          console.log(error);
          setIdMessage("중복된 아이디입니다.");
          handleModal("중복된 아이디입니다.");
        } else {
          handleModal(
            "서비스 접속이 원활하지 않습니다. 잠시 후 다시 이용해주세요."
          );
        }
      },
    }
  );

  const handleUserIdCheckBtn = () => {
    const idRegExp = /^[a-zA-z0-9]{4,12}$/;
    if (!idRegExp.test(formData.createID)) {
      setIdMessage("아이디를 확인해주세요.");
      return;
    }
    refetch();
  };

  const fetchNickNameCheck = async () => {
    const result = await nickNameCheck(formData.nickname);
    return result;
  };

  // 외부연동
  // axios
  const { data: isNickNameCheck, refetch: nickNameRefetch } = useQuery(
    ["isNickName", formData.nickname],
    fetchNickNameCheck,
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled: false,
      onSuccess: (res: any) => {
        setNickNameMessage("사용 가능한 닉네임입니다.");
        handleModal("사용 가능한 닉네임입니다.");
        setIsNickName(true);
      },
      onError: (error: any) => {
        console.log("error?");
        if (error != null) {
          console.log(error);
          setNickNameMessage("중복된 닉네임입니다.");
          handleModal("중복된 닉네임입니다.");
        } else {
          handleModal(
            "서비스 접속이 원활하지 않습니다. 잠시 후 다시 이용해주세요."
          );
        }
      },
    }
  );

  //닉네임 중복확인
  const handleNickDupBtn = () => {
    const idRegExp = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-z0-9|\s]{2,10}$/;
    if (!idRegExp.test(formData.nickname)) {
      setNickNameMessage("닉네임을 확인해주세요.");
      return;
    }
    nickNameRefetch();
  };

  //회원가입 버튼
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.createID) {
      setIdMessage("아이디를 입력해주세요.");
      handleModal("아이디를 입력해주세요.");
      return;
    }
    if (!formData.password) {
      setPasswordMessage("비밀번호를 입력해주세요.");
      handleModal("비밀번호를 입력해주세요.");
      return;
    }
    if (!formData.confirmPassword) {
      setPasswordConfirmMessage("비밀번호 확인을 입력해주세요.");
      handleModal("비밀번호 확인을 입력해주세요.");
      return;
    }
    if (!formData.name) {
      setNameMessage("이름을 입력해주세요.");
      handleModal("이름을 입력해주세요.");
      return;
    }
    if (!formData.nickname) {
      setNickNameMessage("닉네임을 입력해주세요.");
      handleModal("닉네임을 입력해주세요.");
      return;
    }
    if (!formData.phoneNumber) {
      setPhoneMessage("본인인증이 필요합니다.");
      handleModal("본인인증이 필요합니다.");
      return;
    }
    if (!formData.email) {
      setEmailMessage("이메일을 입력해주세요.");
      handleModal("이메일을 입력해주세요.");
      return;
    }
    if (!isId) {
      handleModal(idMessage);
      return;
    }
    if (!isPassword) {
      handleModal(passwordMessage);
      return;
    }
    if (!isPasswordConfirm) {
      handleModal(passwordConfirmMessage);
      return;
    }
    if (!isName) {
      handleModal(nameMessage);
      return;
    }
    if (!isNickName) {
      handleModal(nickNameMessage);
      return;
    }
    if (!isAuth) {
      handleModal(phoneMessage);
      return;
    }
    if (!isEmail) {
      handleModal(emailMessage);
      return;
    }
    // if (!isBirth) {
    //   alert(birthMessage);
    //   return;
    // }
    if (!agreedToPIA && !informationAgree) {
      handleModal("필수 약관동의를 확인해주세요.");
      return;
    }
    const agree1 = agreedToPIA ? "Y" : "N";
    const agree2 = informationAgree ? "Y" : "N";
    const agree3 = marketingAgree ? "Y" : "N";
    const totalAgree = agree1 + ":" + agree2 + ":" + agree3;
    const birth = formData.birthdate.replaceAll("-", "");
    const phone = formData.phoneNumber.replaceAll("-", "");

    setJoin({
      userId: formData.createID,
      password: formData.password,
      name: formData.name,
      birth: birth,
      phone: phone,
      email: formData.email,
      agree: totalAgree,
    });
  };

  //약관동의
  const handlePIAAgree = (type: string) => {
    if (type === "pia") {
      setAgreedToPIA(!agreedToPIA);
    } else if (type === "information") {
      setInformationAgree(!informationAgree);
    } else if (type === "marketing") {
      setMarketingAgree(!marketingAgree);
    } else {
      setAgreedToPIA(!agreedToPIA);
      setInformationAgree(!informationAgree);
      setMarketingAgree(!marketingAgree);
    }
  };

  //변경 감지
  const onChangeId = (e: any) => {
    const currentId = e.target.value;
    setFormData({ ...formData, createID: currentId });
    const idRegExp = /^[a-zA-z0-9]{4,12}$/;
    if (!idRegExp.test(currentId)) {
      setIdMessage("id는 4-12사이 대소문자 또는 숫자만 입력해 주세요.");
      setIsId(false);
    } else {
      setIdMessage("아이디 중복체크 진행해주세요");
      setIsId(false);
    }
  };

  const onChangeName = (e: any) => {
    const currentId = e.target.value;
    setFormData({ ...formData, name: currentId });
    const idRegExp = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,5}$/;
    if (!idRegExp.test(currentId)) {
      setNameMessage("이름은 2글자 이상 5글자 이하로 입력해주세요.");
      setIsName(false);
    } else {
      setNameMessage("");
      setIsName(true);
    }
  };

  const onChangeNickName = (e: any) => {
    const currentId = e.target.value;
    setFormData({ ...formData, nickname: currentId });
    const idRegExp = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-z0-9|\s]{2,10}$/;
    if (!idRegExp.test(currentId)) {
      setNickNameMessage(
        "닉네임은 2글자 이상 10글자 이하로 대소문자 또는 한글, 숫자만 입력해주세요."
      );
      setIsNickName(false);
    } else {
      setNickNameMessage("닉네임 중복체크 진행해주세요");
      setIsNickName(false);
    }
  };

  const onChangePassword = (e: any) => {
    const currentId = e.target.value;
    setFormData({ ...formData, password: currentId });
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    if (!passwordRegExp.test(currentId)) {
      setPasswordMessage(
        "비밀번호는 숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요."
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("");
      setIsPassword(true);
    }
  };

  const onChangePasswordConfirm = (e: any) => {
    const currentPasswordConfirm = e.target.value;
    setFormData({ ...formData, confirmPassword: e.target.value });
    if (formData.password !== currentPasswordConfirm) {
      setPasswordConfirmMessage("비밀번호와 비밀번호 확인이 다릅니다.");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("");
      setIsPasswordConfirm(true);
    }
  };

  // const handlePhoneChange = (e: any) => {
  //   const regex = /^[0-9\b -]{0,13}$/;
  //   if (regex.test(e.target.value)) {
  //     setFormData({ ...formData, phoneNumber: e.target.value });
  //   }
  // };

  const onChangeEmail = (e: any) => {
    const currentEmail = e.target.value;
    setFormData({ ...formData, email: currentEmail });
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegExp.test(currentEmail)) {
      setEmailMessage("이메일의 형식이 올바르지 않습니다.");
      setIsEmail(false);
    } else {
      setEmailMessage("");
      setIsEmail(true);
    }
  };

  const format = "YYYY-MM-DD";
  const getSeparator = () => {
    const regex = /[^0-9a-zA-Z]+/;
    const match = format.match(regex);

    if (match) {
      console.log("match:" + match + "/match[0]:" + match[0]);
      const symbol = match[0];
      const indexes = [];

      for (let i = 0; i < format.length; i++) {
        console.log("symbol:" + symbol + "/format[i]:" + format[i]);
        if (format[i] === symbol) {
          indexes.push(i);
          console.log("i:" + i);
        }
      }

      return { symbol, indexes };
    }
    return { symbol: undefined, indexes: [] };
  };

  const separator = getSeparator();

  const handleChangeDate = (e: any) => {
    let currentDate = e.target.value;

    if (separator.symbol && separator.indexes.length > 0) {
      separator.indexes.forEach((index) => {
        if (
          currentDate.length > index &&
          currentDate.slice(index, index + 1) != separator.symbol
        ) {
          currentDate =
            currentDate.slice(0, index) +
            separator.symbol +
            currentDate.slice(index);
        }
      });
    }

    setFormData({ ...formData, birthdate: currentDate });
    setIsBirth(true);
  };

  const [open, setOpen] = useState(false);
  const handleClickButton = () => {
    setOpen(!open);
  };

  const handleChangeCalendar = (selected: any) => {
    const formattedDate = selected.format(format);
    setFormData({ ...formData, birthdate: formattedDate });
    setIsBirth(true);
    setOpen(false);
  };

  // const handleChangeDate = (e:any) =>{
  //   const format = 'YYYY-MM-DD';
  //   const currentDate = e.target.value;
  //   const regex = /^[0-9]{8}$/;
  //   const match = format.match(regex);
  //   setFormData({ ...formData, birthdate: currentDate });

  //   setIsBirth(true);
  // };

  // useEffect(() => {
  //   if (formData.phoneNumber.length === 10) {
  //     setFormData({
  //       ...formData,
  //       phoneNumber: formData.phoneNumber.replace(
  //         /(\d{3})(\d{3})(\d{4})/,
  //         "$1-$2-$3"
  //       ),
  //     });
  //     setIsPhone(true);
  //   }
  //   if (formData.phoneNumber.length === 13) {
  //     setFormData({
  //       ...formData,
  //       phoneNumber: formData.phoneNumber
  //         .replace(/-/g, "")
  //         .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
  //     });
  //     setIsPhone(true);
  //   }
  // }, [formData.phoneNumber]);

  const passConnection = (sEncData: any) => {
    const form = document.createElement("form");
    form.name = "form_chk";
    form.method = "post";
    form.action =
      // "";
    form.target = "popupChk";

    const inputM = document.createElement("input");
    inputM.type = "hidden";
    inputM.name = "m";
    inputM.value = "checkplusService";
    form.appendChild(inputM);

    const inputEncodeData = document.createElement("input");
    inputEncodeData.type = "hidden";
    inputEncodeData.name = "EncodeData";
    inputEncodeData.value = sEncData;
    form.appendChild(inputEncodeData);

    document.body.appendChild(form);

    window.open(
      "",
      "popupChk",
      "width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, " +
        "status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no"
    );
    // form.action =
    
    // form.target = "popupChk";
    form.submit();
  };

  const passAuthAxios: any = async () => {
    return passAuthApi();
  };

  const { data: passAuthData, refetch: passAuthRefetch } = useQuery(
    ["passAuth"],
    passAuthAxios,
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled: false,
      onSuccess: (res: any) => {
        setSEncData(res.data);
        passConnection(res.data);
      },
      onError: (error: unknown) => {
        if (error != null) {
          handleModal(JSON.stringify(error));
        } else {
          handleModal(
            "서비스 접속이 원활하지 않습니다. 잠시 후 다시 이용해주세요."
          );
        }
      },
    }
  );

  const handleAuthBtn = async () => {
    passAuthRefetch();
  };

  usePrompt(
    "작성중인 정보가 존재합니다. 정말 페이지를 이동하시겠습니까?",
    showPrompt
  );
  return (
    <Wrapper>
      <PageWrapper>
        {/* <ContainerArt></ContainerArt> */}
        {/* <BackgroundOverlay
          src={
            `${signupArt}`
           
          }
        ></BackgroundOverlay> */}
        <SignupForm onSubmit={handleSubmit}>
          <SignupContainer>
            <Title>회원가입</Title>
            <Section>
              <Label>아이디 *</Label>
              <InputContainer type="id">
                <Input
                  type="text"
                  placeholder="아이디를 입력해주세요. (영문 혹은 영문/숫자 조합)"
                  maxLength={20}
                  value={formData.createID}
                  onChange={onChangeId}
                />
                <DuplicateButton type="button" onClick={handleUserIdCheckBtn}>
                  중복확인
                </DuplicateButton>
              </InputContainer>
            </Section>
            <ValidationMsgContainer colorType={isId}>
              {idMessage}
            </ValidationMsgContainer>
            <Section>
              <Label>비밀번호 *</Label>
              <InputContainer type="password">
                <Input
                  type="password"
                  value={formData.password}
                  placeholder="비밀번호를 입력해주세요. (영문/숫자/특수문자 허용, 두 개 이상 조합)"
                  onChange={onChangePassword}
                />
              </InputContainer>
            </Section>
            <ValidationMsgContainer colorType={isPassword}>
              {passwordMessage}
            </ValidationMsgContainer>
            <Section>
              <Label>비밀번호 확인 *</Label>
              <InputContainer type="confirmPassword">
                <Input
                  type="password"
                  placeholder="비밀번호를 한 번 더 입력해주세요."
                  value={formData.confirmPassword}
                  onChange={onChangePasswordConfirm}
                />
              </InputContainer>
            </Section>
            <ValidationMsgContainer colorType={isPasswordConfirm}>
              {passwordConfirmMessage}
            </ValidationMsgContainer>
            {/* <RowSectionContainer> */}
            <Section>
              <Label>이름 *</Label>
              <InputContainer type="name">
                <Input
                  type="text"
                  maxLength={10}
                  placeholder="이름을 입력해주세요."
                  name="name"
                  value={formData.name}
                  onChange={onChangeName}
                  readOnly
                />
              </InputContainer>
            </Section>
            {/* </RowSectionContainer> */}
            <ValidationMsgContainer colorType={isName}>
              {nameMessage}
            </ValidationMsgContainer>
            {/* <Section>
              <Label>주소</Label>
              <Input
                type="text"
                value={formData.address}
                onChange={(e: any) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </Section> */}
            <Section>
              <Label>본인 인증 *</Label>
              <InputContainer type="phone">
                <Input
                  type="text"
                  maxLength={12}
                  placeholder="본인인증을 진행해주세요."
                  id="phone"
                  value={formData.phoneNumber}
                  disabled
                  // onChange={handlePhoneChange}
                />
                <DuplicateButton type="button" onClick={handleAuthBtn}>
                  인증
                </DuplicateButton>
              </InputContainer>
            </Section>
            <ValidationMsgContainer colorType={isAuth}>
              {phoneMessage}
            </ValidationMsgContainer>
            <Section>
              <Label>닉네임 *</Label>
              <InputContainer type="nickname">
                <Input
                  type="text"
                  maxLength={10}
                  placeholder="작가명을 입력해주세요."
                  value={formData.nickname}
                  onChange={onChangeNickName}
                />
                <DuplicateButton type="button" onClick={handleNickDupBtn}>
                  중복확인
                </DuplicateButton>
              </InputContainer>
            </Section>
            <ValidationMsgContainer colorType={isNickName}>
              {nickNameMessage}
            </ValidationMsgContainer>
            <Section>
              <Label>이메일 *</Label>
              <InputContainer type="email">
                <Input
                  type="email"
                  value={formData.email}
                  placeholder="이메일을 입력해주세요. (예 : artista@artista.com)"
                  onChange={onChangeEmail}
                />
              </InputContainer>
            </Section>
            <ValidationMsgContainer colorType={isEmail}>
              {emailMessage}
            </ValidationMsgContainer>
            <Section>
              <Label>생년월일</Label>
              <InputContainer type="birth">
                <Input
                  type="text"
                  placeholder="YYYY-MM-DD"
                  value={formData.birthdate}
                  id="birth"
                  onChange={handleChangeDate}
                />
                <DateBtn type="button" onClick={handleClickButton}></DateBtn>
              </InputContainer>
              {open && (
                <DateTimeContain>
                  <Datetime
                    input={false}
                    timeFormat={false}
                    dateFormat={format}
                    value={formData.birthdate}
                    onChange={handleChangeCalendar}
                  />
                </DateTimeContain>
              )}
            </Section>

            {<PersonalInformationAgreement onAgree={handlePIAAgree} />}
            <br></br>
            <Button type="submit">회원가입</Button>
          </SignupContainer>
        </SignupForm>
      </PageWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const PageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #000407;
  overflow: hidden;
`;

const ContainerArt = styled.div`
  position: absolute;
  z-index: -3;
  background-color: rgb(0, 4, 7);
  width: 100%;
  height: 100%;
`;

const BackgroundOverlay = styled.div<{ src: any }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background-image: linear-gradient(
      90deg,
      rgba(0, 4, 7, 0.97) 1%,
      rgba(0, 0, 0, 0),
      rgba(0, 4, 7, 0.95) 99%
    ),
    url(${({ src }) => src});
  background-size: repeat;
  background-size: 100% 100%;
  filter: blur(7px); /* Adjust the blur effect as needed */
  z-index: -1;
`;

const SignupForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #0e0e0e;
  width: 100%;
  height: 100%;
`;

const SignupContainer = styled.div`
  width: 50vw;
  padding: 40px;
  background-color: #0e0e0e;
  border: 1px solid #b09464;
  border-radius: 38px;
  /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); */
  margin-top: 12vh;
  margin-bottom: 12vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  color: #b09464;
  font-size: 2em;
  font-weight: 600;
  margin-top: 3vh;
  margin-bottom: 3vh;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  width: 65%;
`;

const Label = styled.label`
  display: flex;
  align-self: flex-start;
  font-size: 1em;
  font-weight: 500;
  margin-bottom: 6px;
  color: #b09464;

  @media (max-width: 700px) {
    padding-left: 10px;
  }
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
    font-size: 0.8em;
    font-weight: 400;
  }
  &:focus::placeholder {
    color: transparent;
  }

  @media (max-width: 700px) {
    width: 85%;
  }
`;

const DateBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.5%;
  height: 2.5vh;
  margin-right: 1.5%;
  background-color: #b09464;
  border: none;
`;

const SubTitle = styled.span`
  display: flex;
  align-self: flex-start;
  margin-left: 10%;
  color: #b09464;
  font-size: 27px;
  font-weight: 700;
  line-height: 54.46px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 65%;
  height: 5.7vh;
  font-size: 1em;
  font-weight: 500;
  background-color: #b09464;
  color: #000000;
  border: 1px solid #b09464;
  border-radius: 13px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin: 10px 0 3vh 0;
`;

interface InputProps {
  type: string;
}

const InputContainer = styled.div<InputProps>`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: auto;
  border: 1px solid #b09464;
  border-radius: 13px;
  background-color: #0e0e0e;

  /* ${(props) =>
    props.type === "name" &&
    css`
      width: 87%;
      align-self: flex-start;
    `} */
`;

const DuplicateButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 7px;
  width: 5vw;
  height: 65%;
  color: #b09464;
  background-color: #0e0e0e;
  border-radius: 8px;
  border: 1px solid #b09464;
  font-size: 0.8em;
  font-weight: 400;
  cursor: pointer;
`;

interface ValidationProps {
  colorType: any;
}

const ValidationMsgContainer = styled.div<ValidationProps>`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 65%;
  font-size: 0.8em;
  margin-bottom: 3px;
  font-weight: 400;
  color: ${(props) => (props.colorType ? "#ffffff" : "#ff4633")};
`;

const RowSectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: ${widthPercentageCp(823, 1200)}%;
  background-color: transparent;
  border: none;
`;

const DateTimeContain = styled.div`
  display: flex;
  align-self: flex-end;
  margin-top: 10px;
  background-color: #b09464;
  cursor: pointer;
`;

export default SignupPage;
