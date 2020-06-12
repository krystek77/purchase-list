import React, { useEffect } from "react";
import classes from "./PurchaseItem.module.css";
import Button from "../../../UI/Button";

const PurchaseItem = ({ name, amount, unit, removed, edited }) => {
  useEffect(() => {
    ("[PURCHASEITEM.JS]-mounted");
    return () => {
      ("[PURCHASEITEM.JS]-unmounted");
    };
  });

  return (
    <li className={classes.PurchaseItem}>
      <div className={classes.PurchaseData}>
        <p className={classes.PurchaseName}>{name}</p>
        <p className={classes.PurchaseAmount}>{amount}</p>
        <p className={classes.PurchaseUnit}>{unit}</p>
      </div>
      <div className={classes.PurchaseControls}>
        <Button
          type="button"
          btnType="DANGER"
          isFormValid="true"
          clicked={removed}
        >
          REMOVE
        </Button>
        <Button
          type="button"
          btnType="EDIT"
          isFormValid="true"
          clicked={edited}
        >
          EDIT
        </Button>
      </div>
    </li>
  );
};

export default PurchaseItem;
