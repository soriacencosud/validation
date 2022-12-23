import React from "react";
import {
  ErrorContainer,
  ErrorMessage,
  FormInput,
  InputLabel,
} from "../input.style";

export type InputStyles = {
  label: string;
  inputError?: string;
};

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputStyles {}

const Input = (props: InputProps) => {
  return (
    <>
      {props.label && (
          <InputLabel>{props.label}</InputLabel>
      )}
      <FormInput {...props} type="text" name="" id="" />
      {props.inputError && props.inputError?.length > 0 && (
      
      <ErrorContainer>
      <ErrorMessage>{props.inputError}</ErrorMessage>
      </ErrorContainer>
      )}
    </>
  );
};

export default Input;
