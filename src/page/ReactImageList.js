import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

// upload button
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import axios from "axios";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const serverUpload = (image) => {
  const formData = new FormData();
  formData.append("image", image);
  console.log(image);
  let server = `http://192.168.55.120:3002`;
  axios
    .post(`${server}/multer`, formData)
    .then((res) => console.log(res.data))
    .catch((error) => console.log(error));
};

const ReactImageList = () => {
  const [itemData, setItemData] = useState([]);

  const handleFileUpload = (e) => {
    const selectedImages = e.target.files;

    const uploadImageWithDelay = async () => {
      serverUpload(selectedImages[0]);
      for (let i = 1; i < selectedImages.length; i++) {
        await new Promise((resolve) => {
          setTimeout(() => {
            serverUpload(selectedImages[i]);
            resolve();
          }, 1000); // 1초 delay
        });
      }
    };

    uploadImageWithDelay();
    e.target.value = ""; // 같은 파일 upload를 위한 처리
  };

  const fileLoad = async () => {
    let server = `http://192.168.55.120:3002`;
    fetch(`${server}/getImagePath`) // 실제로는 이미지가 저장된 경로를 얻는 API 엔드포인트로 변경
    .then((response) => response.json())
    .then((data) => {
      setItemData(data.imagePath);
    })
    .catch((error) => {
      console.error('이미지 경로 가져오기 실패:', error);
    });
  };

  useEffect(() => {
    fileLoad();
  }, [])

  return (
    <Box sx={{ m: 3 }}>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        onChange={handleFileUpload}
      >
        Upload file
        <VisuallyHiddenInput type="file" accept="image/*" multiple />
      </Button>
      <ImageList sx={{ width: 248 * 3 }} cols={3}>
        <ImageListItem key="Subheader" cols={3}>
          <ListSubheader component="div">GitHub Images Directory</ListSubheader>
        </ImageListItem>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={item.author}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.title}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default ReactImageList;
