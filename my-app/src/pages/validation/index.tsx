import React, { useState } from "react";
import Button from "../../components/button";
import Input from "../../components/input";
import useValidationForm from "./useValidationForm.hook";
import {BigPaPaContainer, FormContainer, FormHeader, FormTitle, Inputontainer,  } from './validation.style';

export const enum FORM_KEYS {
  NAME = "NAME",
  LASTNAME = "LASTNAME",
  AGE = "AGE",
  EMAIL = "EMAIL",
  PASSWORD = "PASSWORD",
  RUT = "RUT",
}

function Validation() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setlastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [rut, setRut] = useState<string>("");

  const { validate, errors } = useValidationForm({
    [FORM_KEYS.NAME]: {
      data: firstName,
      message: { isRequired: "El nombre es requerido" },
      options: { isRequired: true },
    },

    [FORM_KEYS.LASTNAME]: {
      data: lastName,
      message: { isRequired: "El apellido es requerido" },
      options: { isRequired: true },
    },
    [FORM_KEYS.EMAIL]: {
      data: email,
      message: { isRequired: "El correo es requerido", isEmail:"El correo es incorrecto" },
      options: { isRequired: true, isEmail:true },
    },
    [FORM_KEYS.PASSWORD]: {
      data: password,
      message: { isRequired: "La contraseña es requerida" },
      options: { isRequired: true },
    },
    [FORM_KEYS.RUT]: {
      data: rut,
      message: { 
        isRequired: "El rut es requerido", 
        isRut: "El rut es invalido" 
      },
      options: { isRequired: true, isRut: true },
    },
    [FORM_KEYS.AGE]: {
      data: age,
      message: { isRequired: "La contraseña es requerida",
    minNumber: 'Debe ser mayor de edad' },
      options: { isRequired: true, minNumber: 18 },
    },
    // para seleccionar las validaciones que va a tener el key
    // isrequiered true etc menos min number
    // type ValidationFormOptions = {
    // 	isRequired: boolean;
    // 	isEmail: boolean;
    // 	isRut: boolean;
    // 	minNumber: number;
    // };
  });

  return (
<>
    <div>
      Rut de prueba: 938340005
    </div>
    <BigPaPaContainer>

    <FormContainer>
      <FormHeader>
      <FormTitle>Registrate ! ! ! </FormTitle>
      </FormHeader>
      <Inputontainer>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFirstName(e.target.value);
          }}
          value={firstName}
          name="firstName"
          minLength={3}
          inputError={
            errors[FORM_KEYS.NAME]?.length > 0
              ? errors[FORM_KEYS.NAME][0].message
              : ""
          }
          label={"Nombre"}
          type="text"
          placeholder="Nombre*"
        />
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setlastName(e.target.value);
          }}
          value={lastName}
          label={"Apellido"}
          type="text"
          placeholder="Apellido*"
          inputError={
            errors[FORM_KEYS.LASTNAME]?.length > 0
              ? errors[FORM_KEYS.LASTNAME][0].message
              : ""
          }
        />
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setAge(e.target.value);
          }}
          value={age}
          label={"Edad"}
          type="text"
          placeholder="Edad*"
          inputError={
            errors[FORM_KEYS.AGE]?.length > 0
              ? errors[FORM_KEYS.AGE][0].message
              : ""
          }
        />
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
          value={email}
          inputError={
            errors[FORM_KEYS.EMAIL]?.length > 0
              ? errors[FORM_KEYS.EMAIL][0].message
              : ""
          }
          label={"Correo"}
          type="email"
          placeholder="Correo*"
        />
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setRut(e.target.value);
          }}
          value={rut}
          inputError={
            errors[FORM_KEYS.RUT]?.length > 0
              ? errors[FORM_KEYS.RUT][0].message
              : ""
          }
          label={"Rut"}
          type="number"
          placeholder="Rut"
        />
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
          value={password}
          inputError={
            errors[FORM_KEYS.PASSWORD]?.length > 0
              ? errors[FORM_KEYS.PASSWORD][0].message
              : ""
          }
          label={"Contraseña"}
          type="password"
          placeholder="Contraseña*"
        />
       <Button validate={validate}/>
      </Inputontainer>
    </FormContainer>
    </BigPaPaContainer>
</>
  );
}

export default Validation;
