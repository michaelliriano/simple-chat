import { styled } from '@mui/system';

const StyledSidebar = styled('div')({
  width: '20vw',
  minHeight: '90vh',
  padding: '.5rem',
  display: 'flex',
  flexDirection: 'column',
  borderRight: '1px solid #eee',
  overflowY: 'scroll',
  position: 'relative',
});

export { StyledSidebar };
