import React, { useRef, useState } from "react";
import styled from "styled-components";
import CheckSelectCustom from "./CheckSelectCustom";


interface PostEditorProps {
  onSave: (
    image: File,
    title: string,
    content: string,
    category: string
  ) => void;
}

const ArtPostEditor: React.FC<PostEditorProps> = ({ onSave }) => {
  const [images, setImages]: any = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoToAddList, setPhotoToAddList] = useState([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imagetarget = e.target.files;
    let imageList: any = [...images];
    let PhotoList: any = [...photoToAddList];

    if (imagetarget && imagetarget?.length > 0) {
      for (let i = 0; i < imagetarget.length; i++) {
        imageList.push(imagetarget[i]);
        PhotoList.push(URL.createObjectURL(imagetarget[i]));
      }
      setPhotoToAddList(PhotoList);
      setImages(imageList);
    }
  };

  const handleClickFileInput = () => {
    fileInputRef.current?.click();
  };

  const photoToAddPreview = (num: number) => {
    if (num === 0) {
      return (
        <>
          <ShowImageMainContainer>
            <CloseCircleFilled
              onClick={() => onRemoveToAdd(photoToAddList[num], images[num])}
            >
              X
            </CloseCircleFilled>
            <ShowSubImage src={photoToAddList[num]} />
          </ShowImageMainContainer>
        </>
      );
    } else {
      const result = [];
      for (let i = 1; i < images.length; i++) {
        result.push(
          <>
            <ShowImageSubContainer>
              <CloseCircleFilled
                onClick={() => onRemoveToAdd(photoToAddList[i], images[i])}
              >
                X
              </CloseCircleFilled>
              <ShowSubImage src={photoToAddList[i]} />
            </ShowImageSubContainer>
          </>
        );
      }
      return result;
    }
  };

  const showImg = (i: number) => {};

  const onRemoveToAdd = (deleteUrl: any, imageUrl: any) => {
    setPhotoToAddList(
      photoToAddList.filter((photo: any) => photo !== deleteUrl)
    );
    setImages(images.filter((image: any) => image !== imageUrl));
  };

  const handleSave = () => {
    if (images === null) {
      alert("이미지를 업로드해주세요");
    } else if (title === null) {
      alert("제목을 작성해주세요");
    } else if (content === null) {
      alert("작품 설명을 작성해주세요");
    } else if (category === null) {
      alert("카테고리를 설정해주세요");
    } else {
      onSave(images, title, content, category);
    }
  };

  return (
    <EditorContainer>
      <Section>
        <EditGuideTitle>이미지</EditGuideTitle>
        <EditGuideSubTitle>
          파일 형식 : JPG, PNG, GIF. Max size: 100MB
        </EditGuideSubTitle>

        {images.length <= 0 ? (
          <ShowImageBox onClick={handleClickFileInput}>
            최대 업로드 개수 : 3개
            <FIleInput
              type="file"
              multiple
              accept="image/jpg, image/jpeg, image/png, image/gif"
              ref={fileInputRef}
              onChange={handleImageChange}
            ></FIleInput>
          </ShowImageBox>
        ) : (
          <ShowImageBox>{photoToAddPreview(0)}</ShowImageBox>
        )}
        {images.length > 0 ? (
          <ShowImageSubWrapper>{photoToAddPreview(1)}</ShowImageSubWrapper>
        ) : null}
      </Section>

      <Section>
        <EditGuideTitle>제목</EditGuideTitle>
        <EditGuideSubTitle>작품의 제목을 만들어주세요</EditGuideSubTitle>
        <Input
          type="text"
          value={title}
          maxLength={20}
          onChange={(e: any) => {
            setTitle(e.target.value);
          }}
        />
      </Section>

      <Section>
        <EditGuideTitle>작품 설명</EditGuideTitle>
        <EditGuideSubTitle>
          작품에 대한 견해와 내용을 적어주세요
        </EditGuideSubTitle>
        <ContentTextarea
          placeholder="최대 200자"
          maxLength={200}
          value={content}
          onChange={(e: any) => setContent(e.target.value)}
        />
      </Section>

      <Section>
        <EditGuideTitle>카테고리</EditGuideTitle>
        <EditGuideSubTitle>작품의 카테고리를 설정해주세요</EditGuideSubTitle>
        <CheckSelectCustom categoryList={[]} type='artEdit' setSerchType={useState}></CheckSelectCustom>
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

const ShowImageBox = styled.div`
  font-size: 20px;
  color: rgba(145, 144, 144, 0.63);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30vw;
  height: 30vw;
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

export default ArtPostEditor;
