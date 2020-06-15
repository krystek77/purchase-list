import React, { useState, useContext } from "react";
import classes from "./Auth.module.css";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import { AuthContext } from "../../context/auth";
import LoadingSpinner from "../../UI/LoadingSpinner";
import ErrorModal from "../../UI/Modal";

const Auth = (props) => {
  const authContext = useContext(AuthContext);
  const [isSetSignin, setIsSetSignin] = useState(true);
  const [inputs, setInputs] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter your email",
        id: "email",
        label: "Email",
      },
      validation: {
        required: true,
        maxLength: "",
        minLength: "",
        regExp: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      },
      validationMessage: "Invalid e-mail",
      valid: false,
      touched: false,
      value: "test@test.pl",
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter your password",
        id: "password",
        label: "Password",
      },
      validation: {
        required: true,
        maxLength: "",
        minLength: "",
        regExp: /((?=.*\d)(?=.*[a-zA-Z])(?=.*[@!-'()+--/:?[-`{}~]).{8,15})/,
      },
      validationMessage:
        "Password must contain at least one upper case letter, number and one special character and have to length from 8 to 15 characters",
      valid: false,
      touched: false,
      value: "test?A0test",
    },
  });

  const checkValidity = (value, rules) => {
    let valid = true;
    if (rules.required) {
      valid = value.trim() !== "" && valid;
    }
    if (rules.maxLength) {
      valid = value.length <= rules.maxLength && valid;
    }
    if (rules.minLength) {
      valid = value.length >= rules.minLength && valid;
    }
    if (rules.regExp) {
      valid = rules.regExp.test(String(value).toLowerCase()) && valid;
    }
    return valid;
  };
  /**
   *
   * @param {event} event
   * @param {number} id
   */
  const inputChangedHandler = (event, id) => {
    const updatedInputs = { ...inputs };
    const updatedInputElement = { ...updatedInputs[id] };
    updatedInputElement.touched = true;
    updatedInputElement.value = event.target.value;
    updatedInputElement.valid = checkValidity(
      updatedInputElement.value,
      updatedInputElement.validation
    );
    updatedInputs[id] = updatedInputElement;
    setInputs(updatedInputs);
  };

  const formattedInputs = [];
  for (let key in inputs) {
    formattedInputs.push({ id: key, config: inputs[key] });
  }

  const inputElements = formattedInputs.map((input) => {
    return (
      <Input
        id={input.id}
        key={input.id}
        inputtype={input.config.elementType}
        elementconfig={input.config.elementConfig}
        value={input.config.value}
        valid={input.config.valid}
        touched={input.config.touched}
        validationMessage={input.config.validationMessage}
        changed={(event) => inputChangedHandler(event, input.id)}
      />
    );
  });

  const authHandler = (event, email, password) => {
    event.preventDefault();
    if (isSetSignin) authContext.signin(email, password);
    else authContext.signup(email, password);
  };

  return (
    <React.Fragment>
      {authContext.error && (
        <ErrorModal title="ERROR OCCURED" onClose={authContext.clearError}>
          {authContext.error.message}
        </ErrorModal>
      )}
      <div className={classes.Auth}>
        <p className={classes.AuthTitle}>
          {isSetSignin ? "YOU HAVE TO SIGNIN" : "SIGNUP NOW"}
        </p>
        <form
          className={classes.AuthForm}
          onSubmit={(event) =>
            authHandler(event, inputs.email.value, inputs.password.value)
          }
        >
          {inputElements}
          <Button type="submit" isFormValid="true">
            {isSetSignin ? "SIGNIN" : "SIGNUP"}
          </Button>
        </form>
        <Button
          btnType="SWITCH"
          type="button"
          isFormValid="true"
          clicked={() => setIsSetSignin((prevState) => !prevState)}
        >
          {isSetSignin ? "Switch to signup" : "Switch to signin"}
        </Button>
      </div>
      {authContext.loading && <LoadingSpinner />}
    </React.Fragment>
  );
};

export default Auth;
