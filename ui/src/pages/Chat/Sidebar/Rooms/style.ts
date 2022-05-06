import { styled } from '@mui/system';

const StyledInput = styled('input')(({ theme }) => ({
  marginTop: '1rem',
  padding: '.5rem 0',
  minWidth: 250,
  fontSize: '1rem',
  borderTop: 0,
  borderLeft: 0,
  borderRight: 0,
  borderColor: theme.palette.background.paper,
  '&:focus': {
    outline: 'none',
  },
}));

export { StyledInput };
