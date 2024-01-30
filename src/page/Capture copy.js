import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import axios from "axios";

const Capture = () => {
  const [image, setImage] = useState(null);

  const handleImagePaste = (event) => {
    const items = (event.clipboardData || event.originalEvent.clipboardData)
      .items;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const blob = items[i].getAsFile();
        const reader = new FileReader();

        reader.onload = () => {
          setImage(reader.result);
        };

        reader.readAsDataURL(blob);
        break;
      }
    }
  };

  const handleUpload = () => {
    if (!image) {
      console.error('Please select an image first.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64encoded = reader.result.split(',')[1];

      const baseUrl = 'https://github.example.com/api/v3/repos';
      const repositoryPath = 'bloodstrawberry/auto-test';
      const filePath = 'images/temp.jpg';
      const apiUrl = `${baseUrl}/${repositoryPath}/contents/${filePath}`;

      const accessToken = process.env.REACT_APP_MY_TOKEN; // Update with your GitHub personal access token

      axios.put(apiUrl, {
        message: 'Add image',
        content: base64encoded,
        branch: 'main', // Update with your branch name
      }, {
        headers: {
          'Authorization': `token ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          console.log('Image uploaded successfully:', response.data.content.name);
        })
        .catch(error => {
          console.error('Error uploading image:', error);
        });
    };

    reader.readAsDataURL(image);
  };

  return (
    <Box sx={{ m: 3 }}>
      <Button
        sx={{ m : 2 }}
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        onClick={handleUpload}
      >
        GitHub Upload
      </Button>
      <div
        onPaste={handleImagePaste}
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1>이미지 붙여넣기</h1>
        {image && <img src={image} />}
      </div>
    </Box>
  );
};

export default Capture;
