import React, { useState, useEffect } from "react";
import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = (props) => {
  const [dots, setDots] = useState(["."]);
  useEffect(() => {
    const time = setTimeout(() => {
      if (dots.length < 3) {
        setDots([...dots].concat("."));
      } else {
        setDots([]);
      }
    }, 1000);
    return () => {
      clearTimeout(time);
    };
  }, [dots]);
  return <p className={classes.LoadingSpinner}>Loading {dots.join(" ")}</p>;
};
export default LoadingSpinner;
