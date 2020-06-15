import React, { useContext } from "react";
import classes from "./ToolBar.module.css";
import Button from "../../UI/Button";
import { AuthContext } from "../../context/auth";
const ToolBar = (props) => {
  const authContext = useContext(AuthContext);

  return (
    <div className={classes.ToolBar}>
      <p className={classes.Greeting}>Hi, {authContext.email}</p>
      <Button
        btnType="LOGOUT"
        type="button"
        isFormValid="true"
        clicked={authContext.signout}
      >
        LOGOUT
      </Button>
    </div>
  );
};
export default ToolBar;
