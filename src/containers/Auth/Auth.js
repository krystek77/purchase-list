import React, { useState } from "react";
import classes from "./Auth.module.css";
import Button from "../../UI/Button";
import Input from "../../UI/Input";

const Auth = (props) => {
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
        regExp: "",
      },
      validationMessage: "",
      valid: false,
      touched: false,
      value: "",
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
        regExp: "",
      },
      validationMessage: "",
      valid: false,
      touched: false,
      value: "",
    },
  });

  const inputChangedHandler = (event, id) => {
    console.log("Input handler", id);
    const updatedInputs = { ...inputs };
    const updatedInputElement = { ...updatedInputs[id] };
    updatedInputElement.value = event.target.value;
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
  return (
    <div className={classes.Auth}>
      <p className={classes.AuthTitle}>
        {isSetSignin ? "YOU HAVE TO SIGNIN" : "SIGNUP NOW"}
      </p>
      <form
        className={classes.AuthForm}
        onSubmit={(event) => {
          event.preventDefault();
          console.log("ONSUBMIT");
          if (isSetSignin) console.log("SIGNIN");
          else console.log("SIGNUP");
        }}
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
  );
};

export default Auth;
