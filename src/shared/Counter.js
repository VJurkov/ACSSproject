import React, { useEffect, useState } from "react";
import { Typography, Box, CircularProgress } from "@material-ui/core";
function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="static" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
function Counter({ seconds, onStop }) {
  const [currentSecond, setCurrentSecond] = useState(1);
  const [counting, setCounting] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      if (counting) {
        setCurrentSecond(currentSecond + 1);
        if (currentSecond === seconds - 1) {
          clearInterval(interval);
          setCounting(false);
        }
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds, currentSecond, counting]);
  return (
    <div onClick={onStop}>
      <CircularProgressWithLabel value={(currentSecond / seconds) * 100} />
    </div>
  );
}

export default Counter;
