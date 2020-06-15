import React from "react";
import classes from "./Button.module.css";

const button = (props) => {
  const { btnType, type, clicked, children } = props;
  let btnClass = [classes.Button];

  switch (btnType) {
    case "SUCCESS":
      btnClass = [classes.Button, classes.SUCCESS];
      break;
    case "DANGER":
      btnClass = [classes.Button, classes.DANGER];
      break;
    case "ADD":
      btnClass = [classes.Button, classes.ADD];
      break;
    case "LOGOUT":
      btnClass = [classes.Button, classes.LOGOUT];
      break;
    case "EDIT":
      btnClass = [classes.Button, classes.EDIT];
      break;
    case "SWITCH":
      btnClass = [classes.Button, classes.SWITCH];
      break;
    default:
      btnClass = [classes.Button];
  }

  return (
    <button
      type={type}
      className={btnClass.join(" ")}
      onClick={clicked}
      disabled={props.isFormValid ? false : true}
    >
      {children}
    </button>
  );
};
export default button;
