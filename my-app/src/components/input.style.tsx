import styled from "styled-components";
import { InputStyles } from "./input";

export const FormInput = styled.input`
margin-bottom: 5px;
height: 30px;
border-radius: 15px;
border: solid 1px ${(props:InputStyles) => (props.inputError && props.inputError?.length > 0) ? "red" : "#7C82DB"};
padding: 5px;
padding-left: 20px;
margin: 0px 30px 0px 30px;
color: ${(props:InputStyles) => (props.inputError && props.inputError?.length > 0) ? "red" : "#black"};
::placeholder {
    color:${(props:InputStyles) => (props.inputError && props.inputError?.length > 0) ? "red" : "black"}
}

`;
export const InputLabel = styled.p`
margin: 6px;
margin-left: 35px;
`;
export const ErrorContainer = styled.div `
    display: flex;
    justify-content: center;

`
export const ErrorMessage = styled.p`
margin: 0px;
color: red;
;
`