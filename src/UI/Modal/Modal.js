import React, { Fragment } from "react";
import classes from "./Modal.module.css";
import Button from "../../UI/Button";
import Backdrop from "./Backdrop";

const Modal = (props) => {
  const { title, children, onClose } = props;
  return (
    <Fragment>
      <Backdrop />
      <div className={classes.Modal} onClick={onClose}>
        <div className={classes.TopBar}>
          <p>{title}</p>
          <Button
            btnType="CLOSE"
            type="button"
            isFormValid="true"
            clicked={onClose}
          >
            CLOSE
          </Button>
        </div>
        <div className={classes.Content}>{children}</div>
      </div>
    </Fragment>
  );
};
export default Modal;
