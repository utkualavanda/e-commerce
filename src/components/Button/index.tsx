import { Button as MuiButton, ButtonProps } from '@mui/material';

interface IProps extends ButtonProps {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  outlined?: boolean;
}

export const Button = (props: IProps) => {
  const { label, type = 'button', outlined = false, ...rest } = props;
  return (
    <MuiButton
      type={type}
      variant={outlined ? 'outlined' : 'contained'}
      fullWidth
      {...rest}
    >
      {label}
    </MuiButton>
  );
};
