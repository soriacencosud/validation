import styled from "styled-components";

export const BigPaPaContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
 
  `;
export const FormHeader = styled.div`
  background-color: #abb0ff;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;

`;
export const FormContainer = styled.div`
  background-color: white;
  border-radius: 40px;
  width: 50%;
  border: solid 3px #abb0ff;
  @media (min-width: 575.98px) {
    width: 55%;
  }
  @media (min-width: 767.98px) {
    width: 40%;
  }
  @media (min-width: 991.98px) {
    width: 35%;
  }
  @media (min-width: 1199.98px) {
    width: 30%;
  }
    /* opacity: 0.5; */



`;
export const FormTitle = styled.h1`
  color: #43488f;
  text-decoration: underline;
  margin: 0px;
`;
export const FormSection = styled.div``;
export const Inputontainer = styled.div`
  display: flex;
  flex-direction: column;
`;
