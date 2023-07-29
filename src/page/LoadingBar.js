import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingBar = () => {
  const [open, setOpen] = React.useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    bgcolor: "rgba(255,255,255,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  function asyncFunction() {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve();
      }, 3000);
    });
  }

  const test = () => {
    setOpen(true);
    asyncFunction().then(() => setOpen(false));
  };

  return (
    <div>
      <Button variant="outlined" onClick={test}>Async function</Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CircularProgress />
        </Box>
      </Modal>
    </div>
  );
};

export default LoadingBar;
