import { styled } from '@mui/system';

const SignUpWrapper = styled('div')({
  width: '100vw',
  minHeight: 500,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const FormWrapper = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  width: 300,
});

export { SignUpWrapper, FormWrapper };
