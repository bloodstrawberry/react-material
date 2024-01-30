import React, { useState } from 'react';

const GitHubImageUploader = () => {
  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleUpload = () => {
    if (!image) {
      console.error('Please select an image first.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64encoded = reader.result.split(',')[1];
      console.log(base64encoded);

      //const apiUrl = 'BASE URL [https://github.example.com]/api/v3/repos/YOUR_USERNAME/YOUR_REPO_NAME/contents/path/to/image.jpg';
      const apiUrl = 'https://api.github.com/repos/bloodstrawberry/auto-test/contents/path/to/image.jpg'; // Update with your GitHub details
      const accessToken = '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'; // Update with your GitHub personal access token

      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Add image',
          content: base64encoded,
          branch: 'main', // Update with your branch name
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Image uploaded successfully:', data.content.name);
        })
        .catch(error => {
          console.error('Error uploading image:', error);
        });
    };

    reader.readAsDataURL(image);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default GitHubImageUploader;
