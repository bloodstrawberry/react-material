import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const steps = ["Step 0", "Step 1", "Step 2", "Step 3"];

const MyStepper = () => {
  const [activeStep, setActiveStep] = useState(-1);
  const [failedStep, setFailedStep] = useState(-1);
  
  const isStepFailed = (step) => {
    return step === failedStep;
  };

  const tempDelay = async (time, value) => {
    await new Promise((resolve) => setTimeout(resolve, time));
    return value;
  };

  const startProgress = async () => {
    setActiveStep(0);
    let step0 = await tempDelay(2000, true);
    if(step0 === false) {    
      setFailedStep(0);
      return;
    }

    setActiveStep(1);
    let step1 = await tempDelay(2000, true);
    if(step1 === false) {    
      setFailedStep(1);
      return;
    }

    setActiveStep(2);
    let step2 = await tempDelay(2000, false);
    if(step2 === false) {
      setFailedStep(2);
      return;
    }

    setActiveStep(3);
    let step3 = await tempDelay(2000, true);
    if(step3 === false) {
      setFailedStep(3);
      return;
    }

    setActiveStep(4);   
  };

  return (
    <Box sx={{ width: "60%", m: 3 }}>
      <Button
        variant="outlined"
        color="secondary"
        sx={{ m: 2 }}
        onClick={startProgress}
      >
        START
      </Button>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const labelProps = {};
          if (isStepFailed(index)) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                Alert message
              </Typography>
            );

            labelProps.error = true;
          }

          return (
            <Step key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default MyStepper;