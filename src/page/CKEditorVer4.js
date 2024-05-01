import React from "react";
import axios from "axios";

const FileUpload = () => {
  const handleUpload = async (e) => {
    let files = e.target.files;
    let server = `http://192.168.55.120:3002/router_test`;

    const formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    for (let file of files) {
      // encodeURIComponent : 한글 파일 처리
      formData.append("files", file, encodeURIComponent(file.name)); 
    }

    const response = await axios.post(server, formData, config);

    console.log(response);
  };

  return (
    <div>
      <input type="file" multiple onChange={handleUpload} />
    </div>
  );
};

export default FileUpload;
