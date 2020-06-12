import React, { useState } from "react";
import classes from "./FormList.module.css";

import Input from "../../UI/Input";
import Button from "../../UI/Button";
import LoadingSpinner from "../../UI/LoadingSpinner";

const FormList = React.memo((props) => {
  const [purchaseData, setPurchaseData] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter purchase name",
        id: "name",
        label: "Purchase name",
      },
      validation: {
        required: true,
        maxLength: 25,
        minLength: 2,
        regExp: "",
      },
      validationMessage:
        "Enter more or equal then 2 and less or equal then 25 letters",
      valid: false,
      touched: false,
      value: "",
    },
    amount: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Enter amount of item",
        id: "amount",
        label: "Amount",
      },
      validation: {
        required: true,
        maxLength: "",
        minLength: "",
        regExp: /^[\d]+$/,
      },
      validationMessage: "Number have to be greater then zero",
      valid: false,
      touched: false,
      value: "",
    },
    unit: {
      elementType: "select",
      elementConfig: {
        type: "select",
        id: "unit",
        label: "Choose unit",
        options: [
          { value: "kilo", displayValue: "kilo" },
          { value: "liter", displayValue: "liter" },
          { value: "package", displayValue: "package" },
          { value: "ml", displayValue: "ml" },
        ],
      },
      validation: {
        required: "",
        maxLength: "",
        minLength: "",
        regExp: "",
      },
      value: "kilo",
      validationMessage: "",
      touched: false,
      valid: true,
    },
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const checkValidation = (value, rules) => {
    let valid = true;
    if (rules.reguired) {
      valid = value.trim() !== "" && valid;
    }
    if (rules.maxLength) {
      valid = value.length <= rules.maxLength && valid;
    }
    if (rules.minLength) {
      valid = value.length >= rules.minLength && valid;
    }
    if (rules.regExp) {
      //more then zero
      valid = rules.regExp.test(value) === true && valid;
    }
    return valid;
  };

  const purchaseFormHandler = (event) => {
    event.preventDefault();
    const newPurchase = {
      name: purchaseData["name"].value,
      amount: purchaseData["amount"].value,
      unit: purchaseData["unit"].value,
      isEdit: false,
    };
    props.addPurchase(newPurchase);
  };

  const inputChangedHandler = (event, id) => {
    const updatedInputsForm = { ...purchaseData };
    const updatedInputElement = { ...updatedInputsForm[id] };

    updatedInputElement.value = event.target.value;
    updatedInputElement.valid = checkValidation(
      updatedInputElement.value,
      updatedInputElement.validation
    );
    updatedInputElement.touched = true;

    updatedInputsForm[id] = updatedInputElement;
    let isFormValid = true;

    for (let key in updatedInputsForm) {
      isFormValid = updatedInputsForm[key].valid === true && isFormValid;
    }

    setIsFormValid(isFormValid);
    setPurchaseData(updatedInputsForm);
  };

  const formElementsArray = [];
  for (let key in purchaseData) {
    formElementsArray.push({ id: key, config: purchaseData[key] });
  }

  const form = (
    <form onSubmit={(event) => purchaseFormHandler(event)}>
      {formElementsArray.map((element) => {
        return (
          <Input
            key={element.id}
            inputtype={element.config.elementType}
            elementconfig={element.config.elementConfig}
            value={element.config.value}
            valid={element.config.valid}
            touched={element.config.touched}
            validationMessage={element.config.validationMessage}
            changed={(event) => inputChangedHandler(event, element.id)}
          />
        );
      })}
      <Button type="submit" btnType="ADD" isFormValid={isFormValid}>
        ADD PURCHASE
      </Button>
      {props.isLoadingAdd && <LoadingSpinner />}
    </form>
  );
  //

  return <div className={classes.FormList}>{form}</div>;
});

export default FormList;
