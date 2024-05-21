import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import {
  heightPercentage,
  widthPercentage,
  widthPercentage2,
} from "../constants/ResponsiveSize";
import { galleryList } from "../api/gallery/gallery";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { likeArtList } from "../api/collection/collection";
import delaybar from "../assets/icons/use/delaybar.gif";
import { useSelector } from "react-redux";

interface InfiniteScrollProps {
  type: any;
}

const CollectionInfiniteScroll: React.FC<InfiniteScrollProps> = ({ type }) => {
  const defaultSize = 8;
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(defaultSize);
  const [axiosData, setAxiosData] = useState<any[]>([]);
  const navigate = useNavigate();
  const userId = useSelector((state: any) => {
    return state.user.userId ? state.user.userId : "artista";
  });
  const queryClient = useQueryClient();
  const [dynamicHeight, setDynamicHeight] = useState("100");

  const loadMoreImages = () => {
    setLoading(true);
    setPage((prev) => prev + 1);
    setTimeout(() => {
      fetchData();
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        const dataLength = axiosData.length;
        const isLastReq = dataLength !== (page + 1) * size ? true : false;

        if (firstEntry.isIntersecting && !loading && !isLastReq) {
          loadMoreImages();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.current.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.current?.unobserve(loaderRef.current);
      }
    };
  }, [loading, axiosData]);

  useEffect(() => {
    setPage(0);
    queryClient.clear();
    setAxiosData([]);
    fetchData();
  }, [type]);

  const fetchData = async () => {
    if (type === "M") {
      return galleryList(page, size, userId, "", "D", "M");
    } else if (type === "L") {
      return likeArtList(page, size, userId);
    } else if (type === "S") {
      // return galleryList(page, size, userId, "", "D", "M");
    }
  };

  const handleChangeValue = (res: any) => {
    if (res?.data) {
      let data;
      if (type === "M") {
        data = res?.data.artListDtoList;
        setAxiosData([...axiosData, ...res?.data.artListDtoList]);
      } else if (type === "L") {
        data = res?.data;
        setAxiosData([...axiosData, ...res?.data]);
      } else if (type === "S") {
        // data = res?.data;
        // setAxiosData([...axiosData, ...res?.data.artListDtoList]);
      }

      if (page > 0 && data.length > 0) {
        setDynamicHeight("auto");
        console.log(page + "/" + dynamicHeight + "/" + data.length);
      }

      if (page <= 0) {
        if (data && data.length <= defaultSize / 2) {
          setDynamicHeight("50");
        } else {
          setDynamicHeight("100");
        }
      }
    }
  };

  // 외부연동
  // axios
  const { data: fetchDataList } = useQuery(
    ["collectionFetchList", page, userId, type],
    fetchData,
    {
      refetchOnWindowFocus: false,
      retry: false,
      onSuccess: (res: any) => {
        handleChangeValue(res);
      },
      onError: (error: unknown) => {
        if (error != null) {
          // alert(error);
          console.log(error);
        } else {
          alert("서비스 접속이 원활하지 않습니다. 잠시 후 다시 이용해주세요.");
        }
      },
    }
  );

  const handleArtClick = (artId: any) => {
    navigate(`/GalleryDetail/${artId}`);
  };

  return (
    <Container dynamicHeight={dynamicHeight}>
      {type === "D" ? (
        <>
          <BoardContainer>준비중입니다.</BoardContainer>
        </>
      ) : (
        <>
          {axiosData.length > 0 ? (
            <GridContainer>
              {axiosData &&
                axiosData.map((data: any, index: number) => (
                  <>
                    <BoxContainer>
                      <ImageContainer
                        onClick={() => handleArtClick(data.artId)}
                      >
                        <ImageCard
                          key={index}
                          src={data?.artUrl}
                          alt={data?.artId}
                        />
                      </ImageContainer>
                      <ArtInfoContainer>
                        <ArtTitle key={index}>{data?.artName}</ArtTitle>
                      </ArtInfoContainer>
                    </BoxContainer>
                  </>
                ))}
            </GridContainer>
          ) : (
            <BoardContainer>게시물이 없습니다.</BoardContainer>
          )}
        </>
      )}

      {loading && (
        <RefDiv loading={!loading}>
          <LoadingImg src={delaybar}></LoadingImg>
        </RefDiv>
      )}
      {!loading && <RefDiv loading={!loading} ref={loaderRef}></RefDiv>}
    </Container>
  );
};

const Container = styled.div<{ dynamicHeight: any }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 70%;
  /* height: auto; */
  height: ${(props) =>
    props.dynamicHeight === "auto"
      ? "auto"
      : props.dynamicHeight === "100"
      ? "100vh"
      : "50vh"};
  padding: ${(props) =>
    props.dynamicHeight === "auto" ? "50px 0 50px 0" : "0px"};
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); //repeat(반복횟수, 반복값)
  column-gap: 70px;
  row-gap: 25px;
  width: 100%;
  /* margin: 50px; */

  @media (max-width: 700px) {
    grid-template-columns: repeat(1, 1fr); //repeat(반복횟수, 반복값)
    column-gap: 70px;
    row-gap: 25px;
  }
`;

// const CardContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   height: 350px;
//   border: 1px solid #ccc;
//   overflow: hidden;
//   margin: 16px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   cursor: pointer;
// `;

const BoxContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  &::after {
    content: "";
    padding-bottom: 100%;
  }
  &:hover {
    transform: scale(1.1);
  }
`;

const ImageCard = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  position: absolute;
`;

const ArtInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
`;

const ArtTitle = styled.div`
  font-size: 1.2em;
  font-weight: 400;
  color: #ffffff;
`;

const Author = styled.div`
  font-size: 18px;
  margin-top: 10px;
`;

const RefDiv = styled.div<{ loading: any }>`
  display: flex;
  position: ${(props) => (!props.loading ? "none" : "absolute")};
  align-items: center;
  justify-content: center;
  width: 100%;
  bottom: 0%;
  height: ${(props) => (!props.loading ? "20vh" : "10px")};
`;

const BoardContainer = styled.div`
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  width: 70vw;
  height: 90vh;
  color: #b09464;
  font-size: 1.2em;
  font-weight: 400;
`;

const LoadingImg = styled.img`
  display: flex;
  width: 30%;
  height: 30%;
  object-fit: contain;
`;

export default CollectionInfiniteScroll;
