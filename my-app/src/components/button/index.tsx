import { ButtonContainer, FormButton } from "./input.style";



// type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
export type OurButtonProps = {
    validate : ()=> boolean
  };
  
  interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
      OurButtonProps {}

const Button = (props: ButtonProps) => {
  return (
    <ButtonContainer>
      <FormButton 
      onClick={()=>{
        try {
            if(props.validate()){
                throw new Error(
                    'Error en la validacion'
                )
            }
        } catch (error) {
            console.log(error)
        }
      }
      }
      >Submit</FormButton>
    </ButtonContainer>
  );
};

export default Button;
