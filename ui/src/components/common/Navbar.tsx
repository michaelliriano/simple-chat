import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';

import {
  setDark,
  setLight,
} from '../../features/themeControl/themeControlSlice';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';

type NavbarProps = {
  title?: string;
};

function Navbar({ title }: NavbarProps) {
  const theme = useSelector((state: RootState) => state.themeControlSlice);
  const dispatch = useDispatch();

  const handleModeChange = () => {
    if (theme.mode === 'dark') dispatch(setLight());
    else dispatch(setDark());
  };

  return (
    <Box sx={{ flexGrow: 1, height: '10vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {title}
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  color="default"
                  checked={theme.mode === 'dark'}
                  onChange={handleModeChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="Dark"
            />
          </FormGroup>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
