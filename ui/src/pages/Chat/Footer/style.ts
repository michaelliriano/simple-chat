import { styled } from '@mui/system';

const StyledFooter = styled('form')({
  width: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  height: 50,

  paddingLeft: '20vw',
  bottom: 0,
});

const StyledInput = styled('input')(({ theme }) => ({
  width: '100%',
  padding: '.75rem',
  fontSize: '1rem',
  color: theme.palette.text.primary,
  border: '1px solid #eee',
  backgroundColor: 'inherit',
  '&:focus': {
    outline: 'none',
  },
}));

const StyledButton = styled('button')({
  margin: 0,
});

export { StyledFooter, StyledInput, StyledButton };
