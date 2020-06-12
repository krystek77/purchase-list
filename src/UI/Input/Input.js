import React, { useEffect } from "react";
import classes from "./Input.module.css";

const Input = React.memo((props) => {
  
  let inputElement = null;
  let inputClass = [
    classes.InputElement,
    !props.valid && props.touched ? classes.Invalid : null,
  ];
  switch (props.inputtype) {
    case "input":
      inputElement = (
        <input
          id={props.elementconfig.id}
          className={inputClass.join(" ")}
          type={props.elementconfig.type}
          placeholder={props.elementconfig.placeholder}
          value={props.value}
          onChange={props.changed}
          ref={props.reference}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classes.InputElement}
          id={props.elementconfig.id}
          placeholder={props.elementconfig.placeholder}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          id={props.elementconfig.id}
          value={props.value}
          onChange={props.changed}
          className={classes.InputElement}
        >
          {props.elementconfig.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.Input}
          type="text"
          placeholder="default input"
          value=""
          onChange={props.changed}
        />
      );
  }

  useEffect(() => {
    ("[INPUT.JS]-mounted");
    return () => {
      ("[INPUT.JS]-unmounted");
    };
  });

  let validationMessage = null;
  if (!props.valid && props.touched)
    validationMessage = (
      <span className={classes.ValidationMessage}>
        {props.validationMessage}
      </span>
    );

  return (
    <div className={classes.Input}>
      {validationMessage}

      {props.elementconfig.label && (
        <label htmlFor={props.elementconfig.id} className={classes.Label}>
          {props.elementconfig.label}
        </label>
      )}

      {inputElement}
    </div>
  );
});
export default Input;
