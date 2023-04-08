import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import WcIcon from "@mui/icons-material/Wc";

const ButtonTest = () => {
  return (
    <div>
      <Stack direction="row" spacing={1}>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="delete" color="primary">
          <WcIcon>화장실</WcIcon>
        </IconButton>
        <Button
          sx={{
            m: 1,
            color: "red",
            borderColor: "pink",
            ":hover": { borderColor: "red" },
          }}
          variant="outlined"
          startIcon={<WcIcon />}
        >
          화장실
        </Button>
      </Stack>
      <Button
        sx={{
          m: 1,
          color: "black",
          borderColor: "gray",
          ":hover": { borderColor: "black" },
        }}
        variant="outlined"
      >
        Custom Button
      </Button>
      <Button
        sx={{
          m: 1,
          color: "black",
          borderColor: "gray",
          ":hover": { borderColor: "black" },
        }}
        variant="outlined"
        //startIcon={<MapIcon/>}
      >
        Custom Button
      </Button>
      <Stack sx={{ m: 1 }} spacing={2} direction="row">
        <Button variant="text" color="primary">
          Primary
        </Button>
        <Button variant="text" color="secondary">
          Secondary
        </Button>
        <Button variant="text" color="error">
          Error
        </Button>
        <Button variant="text" color="warning">
          Warning
        </Button>
        <Button variant="text" color="info">
          Info
        </Button>
        <Button variant="text" color="success">
          Success
        </Button>
      </Stack>
      <Stack sx={{ m: 1 }} spacing={2} direction="row">
        <Button variant="contained" color="primary">
          Primary
        </Button>
        <Button variant="contained" color="secondary">
          Secondary
        </Button>
        <Button variant="contained" color="error">
          Error
        </Button>
        <Button variant="contained" color="warning">
          Warning
        </Button>
        <Button variant="contained" color="info">
          Info
        </Button>
        <Button variant="contained" color="success">
          Success
        </Button>
      </Stack>
      <Stack sx={{ m: 1 }} spacing={2} direction="row">
        <Button variant="outlined" color="primary">
          Primary
        </Button>
        <Button variant="outlined" color="secondary">
          Secondary
        </Button>
        <Button variant="outlined" color="error">
          Error
        </Button>
        <Button variant="outlined" color="warning">
          Warning
        </Button>
        <Button variant="outlined" color="info">
          Info
        </Button>
        <Button variant="outlined" color="success">
          Success
        </Button>
      </Stack>
    </div>
  );
};

export default ButtonTest;
