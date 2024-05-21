import React, { useRef, useState } from "react";
import styled from "styled-components";
import CheckSelectCustom from "./CheckSelectCustom";

interface PostEditorProps {
  onSave: (
    profileImage: File,
    profileBackgroundImage: File,
    authorName: string,
    authorDescription: string
  ) => void;
}

const CollectionPostEditor: React.FC<PostEditorProps> = ({ onSave }) => {
  const [images, setImages] = useState([]);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileBackgroundImage, setProfileBackgroundImage] =
    useState<File | null>(null);
  const [authorName, setAuthorName] = useState("");
  const [authorDescription, setAuthorDescription] = useState("");

  const handleSave = () => {
    // if (profileImage) {
    //   alert("프로필 이미지를 업로드해주세요");
    // } else if (profileBackgroundImage ) {
    //   alert("프로필 배경 이미지를 업로드해주세요");
    // } else if (authorName === null) {
    //   alert("작가명을 작성해주세요");
    // } else if (authorDescription === null) {
    //   alert("작가 설명을 작성해주세요");
    // } else {
    //   onSave(
    //     profileImage,
    //     profileBackgroundImage,
    //     authorName,
    //     authorDescription
    //   );
    // }
  };

  return (
    <EditorContainer>
      <Section>
        <EditGuideTitle>프로필 이미지</EditGuideTitle>
        <EditGuideSubTitle>
          파일 형식 : JPG, PNG, GIF. Max size: 100MB
        </EditGuideSubTitle>

        {images.length <= 0 ? (
          <ShowImageBox type="">
            image
            <FIleInput
              type="file"
              multiple
              accept="image/jpg, image/jpeg, image/png, image/gif"
            ></FIleInput>
          </ShowImageBox>
        ) : (
          <ShowImageBox type=""></ShowImageBox>
        )}
      </Section>

      <Section>
        <EditGuideTitle>프로필 배경 이미지</EditGuideTitle>
        <EditGuideSubTitle>
          파일 형식 : JPG, PNG, GIF. Max size: 100MB
        </EditGuideSubTitle>

        {images.length <= 0 ? (
          <ShowImageBox type="background">
            image
            <FIleInput
              type="file"
              multiple
              accept="image/jpg, image/jpeg, image/png, image/gif"
            ></FIleInput>
          </ShowImageBox>
        ) : (
          <ShowImageBox type=""></ShowImageBox>
        )}
      </Section>

      <Section>
        <EditGuideTitle>작가명</EditGuideTitle>
        <EditGuideSubTitle>작가명을 적어주세요</EditGuideSubTitle>
        <Input
          type="text"
          value={authorName}
          maxLength={20}
          onChange={(e: any) => {
            setAuthorName(e.target.value);
          }}
        />
      </Section>

      <Section>
        <EditGuideTitle>작가 설명</EditGuideTitle>
        <EditGuideSubTitle>
          작가의 견해와 특징에 대해서 설명해주세요
        </EditGuideSubTitle>
        <ContentTextarea
          placeholder="최대 200자"
          maxLength={200}
          value={authorDescription}
          onChange={(e: any) => setAuthorDescription(e.target.value)}
        />
      </Section>

      <br></br>
      <SaveButton onClick={handleSave}>CREATE</SaveButton>
    </EditorContainer>
  );
};

const EditorContainer = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 50%;
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    width: 80%;
  }
`;

const EditGuideTitle = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: black;
`;

const EditGuideSubTitle = styled.div`
  font-size: 15px;
  color: rgb(145, 144, 144);
`;

const ShowImageBox = styled.div<{ type: any }>`
  font-size: 20px;
  color: rgba(145, 144, 144, 0.63);
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.type ? "600px" : "300px")};
  /* width: 330px; */
  height: 330px;
  padding: 10px;
  border-radius: 8px;
  margin-top: 20px;
  border: 1px dotted rgb(145, 144, 144);
  cursor: pointer;
  position: relative;
  z-index: 5;

  &:hover {
    color: rgb(145, 144, 144);
  }
  @media (max-width: 1200px) {
    width: ${(props) => (props.type ? "320px" : "300px")};
  }
`;

const ShowImageMainContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ShowImageSubWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  height: 100px;
  width: 360px;
  height: 100px;
`;

const ShowImageSubContainer = styled.div`
  width: 33.3%;
  height: 100px;
  border: 1px dotted black;
  position: relative;
  cursor: pointer;
`;

const ShowSubImage = styled.img`
  width: 100%;
  height: 100%;
`;

const CloseCircleFilled = styled.div`
  position: absolute;
  z-index: 99;
  right: 0;
  font-size: 20px;
  margin: 5px;
  color: white;
  cursor: pointer;
`;

const SaveButton = styled.button`
  width: 100px;
  padding: 10px;
  font-size: 15px;
  background-color: #a71f46;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #a71f46d0;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 10px;
`;

const ContentTextarea = styled.textarea`
  width: 80%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 10px;
  resize: none;
`;

const FIleInput = styled.input`
  margin-top: 10px;
  display: none;
`;

export default CollectionPostEditor;
