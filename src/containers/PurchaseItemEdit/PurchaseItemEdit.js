import React, { useState, useContext } from "react";
import classes from "./PurchaseItemEdit.module.css";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import { AuthContext } from "../../context/auth";

const PurchaseItemEdit = ({ name, amount, unit, saved, id, cancel }) => {
  const [updateForm, setUpdateForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Edit purchase name",
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
      value: name,
    },
    amount: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Edit amount of item",
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
      value: amount,
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
      value: unit,
      validationMessage: "",
      touched: false,
      valid: true,
    },
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const authContext = useContext(AuthContext);

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
      valid = rules.regExp.test(value) === true && valid;
    }
    return valid;
  };

  const inputChangedHandler = (event, id) => {
    const updatedInputsForm = { ...updateForm };
    const updatedInputElement = { ...updateForm[id] };
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
    setUpdateForm(updatedInputsForm);
  };

  let formattedFormToArray = [];
  for (let key in updateForm) {
    formattedFormToArray.push({ id: key, config: updateForm[key] });
  }

  const updatePurchaseFormHandler = (event) => {
    event.preventDefault();
    const updatedPurchase = {
      id: id,
      name: updateForm.name.value,
      amount: updateForm.amount.value,
      unit: updateForm.unit.value,
      isEdit: false,
      userId: authContext.userId,
    };

    saved(updatedPurchase);
  };

  const renderForm = (
    <form onSubmit={(event) => updatePurchaseFormHandler(event)}>
      {formattedFormToArray.map((element) => {
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
      <Button btnType="SAVE" type="submit" isFormValid={isFormValid}>
        SAVE
      </Button>
      <Button btnType="BACK" type="button" isFormValid="true" clicked={cancel}>
        Back
      </Button>
    </form>
  );

  return <li className={classes.PurchaseItemEdit}>{renderForm}</li>;
};

export default PurchaseItemEdit;
