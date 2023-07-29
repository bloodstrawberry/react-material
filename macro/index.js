const fileToDownload = "D://big.zip";
const startDownloadElem = document.getElementById("startDownload");

startDownloadElem.addEventListener("click", () => {
  console.log("Download Started!");

  fetch(`http://192.168.55.120:3002/downloadFile?filePath=${fileToDownload}`).then((response) => {
    const reader = response.body.getReader();
    const totalSize = Number(response.headers.get("content-length"));
    console.log(response);
    console.log(reader);
    
    let totalSizeDownloaded = 0;

    function readData() {
      return reader.read().then((result) => {
 
        if(result.value) {
          totalSizeDownloaded += result.value.length;
          const percentage = Math.floor((totalSizeDownloaded / totalSize) * 100);
  
          console.log(`${totalSizeDownloaded} / ${totalSize} ${percentage}`);
        }
      
        if(!result.done) {
          return readData();
        }      
      });
    }


    return readData();
  });
});


console.log("sex");
